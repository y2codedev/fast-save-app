import type { SevenZipModuleFactory, SevenZipModule, FileSystem } from '7z-wasm';

export interface WorkerInputMessage {
  type: 'convert';
  inputBuffer: ArrayBuffer;
  inputName: string;
  targetFormat?: string; // e.g. 'zip', '7z', 'tar', 'tar.gz', 'tar.bz2', 'tar.xz', 'gz', 'bz2', 'xz', 'rar', 'iso'
  extractPassword?: string; // password to unlock input archive
  compressPassword?: string; // password to encrypt output archive
  splitSize?: string; // volume size for splitting, e.g. '5m', '10m', '25m'
}

export type WorkerOutputMessage =
  | { type: 'status'; stage: string }
  | { type: 'complete'; outputBuffer: ArrayBuffer; outputName: string; splitFiles?: { name: string; buffer: ArrayBuffer }[] }
  | { type: 'error'; message: string };

function cleanDirRecursive(fs: FileSystem, path: string): void {
  try {
    const entries = fs.readdir(path).filter((name: string) => name !== '.' && name !== '..');
    for (const entry of entries) {
      const fullPath = `${path}/${entry}`;
      try {
        const stat = fs.stat(fullPath);
        if (fs.isDir(stat.mode)) {
          cleanDirRecursive(fs, fullPath);
          try { fs.rmdir(fullPath); } catch {}
        } else {
          try { fs.unlink(fullPath); } catch {}
        }
      } catch {}
    }
  } catch {}
}

function cleanVirtualFilesystem(fs: FileSystem): void {
  try {
    const rootItems = fs.readdir('/').filter(
      (name: string) =>
        name !== '.' &&
        name !== '..' &&
        name !== 'tmp' &&
        name !== 'home' &&
        name !== 'dev' &&
        name !== 'proc'
    );
    for (const item of rootItems) {
      if (
        item.startsWith('input_') ||
        item.startsWith('output.') ||
        item.startsWith('temp.') ||
        item === 'input.zip' ||
        item === 'output.7z'
      ) {
        try {
          fs.unlink(`/${item}`);
        } catch {}
      } else if (item === 'work' || item === 'work_tar' || item === 'work2') {
        try {
          cleanDirRecursive(fs, `/${item}`);
          fs.rmdir(`/${item}`);
        } catch {}
      }
    }
  } catch {}
}

function analyzeExtractionErrors(logs: string[], didThrow: boolean, hadPassword?: boolean): void {
  const fullOutput = logs.join(' ').toLowerCase();

  if (hadPassword && (fullOutput.includes('wrong password') || fullOutput.includes('data error') || fullOutput.includes('crc failed'))) {
    throw new Error('Incorrect password: The password you entered does not match this protected archive.');
  }
  if (
    fullOutput.includes('enter password') ||
    fullOutput.includes('wrong password') ||
    fullOutput.includes('encrypted') ||
    fullOutput.includes('can not open encrypted archive')
  ) {
    throw new Error('Password-protected archive: This archive is encrypted. Please use our Unlock ZIP tool or supply the correct password.');
  }
  if (fullOutput.includes('unsupported method') || fullOutput.includes('unimplemented')) {
    throw new Error('Unsupported compression method: The archive uses an advanced compression method that cannot be decoded.');
  }
  if (
    didThrow ||
    fullOutput.includes('is not archive') ||
    fullOutput.includes('can not open file as archive') ||
    fullOutput.includes('data error') ||
    fullOutput.includes('crc failed') ||
    fullOutput.includes('unexpected end of archive')
  ) {
    throw new Error('Corrupted archive file: The archive is corrupted or incomplete and could not be extracted.');
  }
}

function handleUnknownError(error: unknown): never {
  if (error instanceof Error) {
    const knownPrefixes = [
      'Incorrect password',
      'Password-protected',
      'Unsupported compression',
      'Corrupted archive',
      'Wrong file format',
      'Empty archive',
      'Archive creation failure',
      'Output file not generated',
      'WASM loading failure',
      'Browser out-of-memory error',
    ];
    if (knownPrefixes.some((prefix) => error.message.startsWith(prefix))) {
      throw error;
    }
  }
  const msg = error instanceof Error ? error.message : String(error);
  if (
    msg.toLowerCase().includes('memory') ||
    msg.toLowerCase().includes('oom') ||
    msg.toLowerCase().includes('range') ||
    msg.toLowerCase().includes('allocation')
  ) {
    throw new Error("Browser out-of-memory error: The file is too large to process within your browser's available memory.");
  }
  throw new Error(`Conversion failed: ${msg || 'An unexpected error occurred during processing.'}`);
}

self.onmessage = async (event: MessageEvent<WorkerInputMessage>): Promise<void> => {
  const { type, inputBuffer, inputName, targetFormat, extractPassword, compressPassword, splitSize } = event.data;
  if (type !== 'convert') return;

  const logs: string[] = [];

  try {
    const inputData = new Uint8Array(inputBuffer);
    if (inputData.byteLength < 4) {
      throw new Error('Wrong file format: The selected file is too small to be a valid archive.');
    }

    // Stage 1: Load converter engine
    self.postMessage({ type: 'status', stage: 'Loading converter' });
    let SevenZipFactory: SevenZipModuleFactory | null = null;
    try {
      const moduleImport = await import('7z-wasm');
      SevenZipFactory = (moduleImport.default || moduleImport) as unknown as SevenZipModuleFactory;
    } catch (importErr: unknown) {
      console.error('[Worker] Failed to dynamically import 7z-wasm:', importErr);
      const errDetail = importErr instanceof Error ? importErr.message : String(importErr);
      throw new Error(`WASM loading failure: Failed to load the archive conversion engine (${errDetail}).`);
    }

    if (!SevenZipFactory) {
      throw new Error('WASM loading failure: The archive conversion engine could not be initialized.');
    }

    let sevenZip: SevenZipModule;
    try {
      sevenZip = await SevenZipFactory({
        locateFile: (path: string) => {
          if (path.endsWith('.wasm')) {
            const cleanName = path.split('/').pop() || path;
            return new URL(`/wasm/${cleanName}`, self.location.origin).href;
          }
          return path;
        },
        print: (line: string) => {
          logs.push(line);
        },
        printErr: (line: string) => {
          logs.push(line);
        },
      });
    } catch (error) {
      console.error('[Worker] Failed to instantiate WASM engine:', error);
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.toLowerCase().includes('memory') || msg.toLowerCase().includes('oom') || msg.toLowerCase().includes('allocation')) {
        throw new Error('Browser out-of-memory error: Your browser ran out of memory while loading the conversion engine.');
      }
      throw new Error(`WASM loading failure: Failed to initialize the WebAssembly archive engine (${msg}).`);
    }

    try {
      cleanVirtualFilesystem(sevenZip.FS);

      // Stage 2: Write archive to virtual filesystem
      self.postMessage({ type: 'status', stage: 'Reading archive' });
      const ext = inputName.includes('.') ? inputName.slice(inputName.lastIndexOf('.')) : '.zip';
      const stagedInput = `input_archive${ext}`;
      try {
        sevenZip.FS.writeFile(stagedInput, inputData);
      } catch (error) {
        handleUnknownError(error);
      }

      // Stage 3: Extracting files
      self.postMessage({ type: 'status', stage: 'Extracting archive files' });
      try {
        sevenZip.FS.mkdir('/work');
      } catch {}

      logs.length = 0;
      let extractFailed = false;
      const extractArgs = ['x', stagedInput, '-o/work', '-y'];
      if (extractPassword) {
        extractArgs.push(`-p${extractPassword}`);
      }

      try {
        sevenZip.callMain(extractArgs);
      } catch (e) {
        extractFailed = true;
        console.error('[Worker] Error during extract callMain:', e);
      }
      analyzeExtractionErrors(logs, extractFailed, !!extractPassword);

      // Check if extracted files exist
      let extractedItems: string[] = [];
      try {
        extractedItems = sevenZip.FS.readdir('/work').filter((name: string) => name !== '.' && name !== '..');
      } catch {
        throw new Error('Empty archive: No files were found inside the uploaded archive.');
      }
      if (extractedItems.length === 0) {
        throw new Error('Empty archive: No files were found inside the uploaded archive.');
      }

      // If extracting a compressed tarball resulted in a single .tar file, unpack the tarball
      if (extractedItems.length === 1 && extractedItems[0].toLowerCase().endsWith('.tar')) {
        self.postMessage({ type: 'status', stage: 'Unpacking internal tar archive' });
        try {
          sevenZip.FS.mkdir('/work_tar');
        } catch {}
        try {
          sevenZip.callMain(['x', `/work/${extractedItems[0]}`, '-o/work_tar', '-y']);
          const tarItems = sevenZip.FS.readdir('/work_tar').filter((name: string) => name !== '.' && name !== '..');
          if (tarItems.length > 0) {
            cleanDirRecursive(sevenZip.FS, '/work');
            try {
              sevenZip.FS.rmdir('/work');
            } catch {}
            sevenZip.FS.rename('/work_tar', '/work');
            extractedItems = tarItems;
          }
        } catch {}
      }

      // Stage 4: Creating target archive
      const fmt = (targetFormat || 'zip').toLowerCase().replace(/^\./, '');
      const statusTitle = compressPassword ? 'Applying AES password protection' : splitSize ? `Creating split ${fmt.toUpperCase()} volumes` : `Creating ${fmt.toUpperCase()} archive`;
      self.postMessage({ type: 'status', stage: statusTitle });

      let outputFilename = `output.${fmt}`;
      logs.length = 0;

      const baseCompressArgs = ['a', `-t${fmt === 'rar' || fmt === '7z' ? '7z' : fmt === 'iso' || fmt === 'zip' ? 'zip' : 'zip'}`, outputFilename, '/work/*', '-r'];
      
      if (compressPassword) {
        baseCompressArgs.push(`-p${compressPassword}`);
        if (fmt === 'zip') {
          baseCompressArgs.push('-mem=AES256');
        }
      }
      if (splitSize) {
        baseCompressArgs.push(`-v${splitSize}`);
      }

      try {
        if (fmt === 'zip' || fmt === '7z' || fmt === 'rar' || fmt === 'iso' || compressPassword || splitSize) {
          sevenZip.callMain(baseCompressArgs);
        } else if (fmt === 'tar') {
          sevenZip.callMain(['a', '-ttar', outputFilename, '/work/*', '-r']);
        } else if (fmt === 'tar.gz' || fmt === 'gz' || fmt === 'tgz') {
          outputFilename = `output.${fmt}`;
          sevenZip.callMain(['a', '-ttar', 'temp.tar', '/work/*', '-r']);
          sevenZip.callMain(['a', '-tgzip', outputFilename, 'temp.tar']);
          try {
            sevenZip.FS.unlink('temp.tar');
          } catch {}
        } else if (fmt === 'tar.bz2' || fmt === 'bz2' || fmt === 'tbz2') {
          outputFilename = `output.${fmt}`;
          sevenZip.callMain(['a', '-ttar', 'temp.tar', '/work/*', '-r']);
          sevenZip.callMain(['a', '-tbzip2', outputFilename, 'temp.tar']);
          try {
            sevenZip.FS.unlink('temp.tar');
          } catch {}
        } else if (fmt === 'tar.xz' || fmt === 'xz' || fmt === 'txz') {
          outputFilename = `output.${fmt}`;
          sevenZip.callMain(['a', '-ttar', 'temp.tar', '/work/*', '-r']);
          sevenZip.callMain(['a', '-txz', outputFilename, 'temp.tar']);
          try {
            sevenZip.FS.unlink('temp.tar');
          } catch {}
        } else {
          sevenZip.callMain(baseCompressArgs);
        }
      } catch (e) {
        console.error('[Worker] Error during compress callMain:', e);
        throw new Error(`Archive creation failure: Failed to generate ${fmt.toUpperCase()} format archive.`);
      }

      // Stage 5: Preparing download
      self.postMessage({ type: 'status', stage: 'Preparing download' });
      
      const baseName = inputName.includes('.') ? inputName.slice(0, inputName.lastIndexOf('.')) : inputName;

      // Handle split volume outputs
      if (splitSize) {
        const generatedFiles = sevenZip.FS.readdir('/').filter((name: string) => 
          (name.startsWith('output.') || name.startsWith('output_')) && name !== 'output.7z' && name !== 'output.zip' && name !== '.' && name !== '..'
        ).sort();

        // If split size was larger than file, normal output.zip might exist without sequence suffix
        const filesToReturn = generatedFiles.length > 0 ? generatedFiles : [outputFilename];

        const splitFiles: { name: string; buffer: ArrayBuffer }[] = [];
        const transferList: ArrayBuffer[] = [];

        for (const fname of filesToReturn) {
          try {
            const fData = sevenZip.FS.readFile(`/${fname}`);
            if (fData && fData.byteLength > 0) {
              const buf = fData.byteOffset === 0 && fData.byteLength === fData.buffer.byteLength
                ? fData.buffer
                : fData.slice().buffer;
              
              const cleanName = fname.replace(/^output/, baseName);
              splitFiles.push({ name: cleanName, buffer: buf });
              transferList.push(buf);
            }
          } catch (e) {
            console.error('Failed reading split part:', fname, e);
          }
        }

        if (splitFiles.length === 0) {
          throw new Error('Output file not generated: Could not create split volumes.');
        }

        self.postMessage({ type: 'status', stage: 'Completed' });
        self.postMessage(
          {
            type: 'complete',
            outputBuffer: splitFiles[0].buffer,
            outputName: splitFiles[0].name,
            splitFiles,
          },
          transferList
        );
        return;
      }

      // Single file download
      let outputData: Uint8Array;
      try {
        outputData = sevenZip.FS.readFile(outputFilename);
      } catch (error) {
        handleUnknownError(error);
      }

      if (!outputData || outputData.byteLength === 0) {
        throw new Error('Output file not generated: The generated archive is empty.');
      }

      const transferBuffer =
        outputData.byteOffset === 0 && outputData.byteLength === outputData.buffer.byteLength
          ? outputData.buffer
          : outputData.slice().buffer;

      const outputName = `${baseName}${compressPassword ? '_protected' : extractPassword ? '_unlocked' : ''}.${fmt}`;

      // Stage 6: Completed
      self.postMessage({ type: 'status', stage: 'Completed' });
      self.postMessage(
        {
          type: 'complete',
          outputBuffer: transferBuffer,
          outputName,
        },
        [transferBuffer]
      );
    } finally {
      cleanVirtualFilesystem(sevenZip.FS);
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during processing.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    self.postMessage({ type: 'error', message: errorMessage });
  }
};
