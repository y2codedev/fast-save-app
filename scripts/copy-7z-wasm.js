const fs = require('fs');
const path = require('path');

const destDir = path.join(process.cwd(), 'public', 'wasm');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find 7z-wasm package directory
const packagePath = require.resolve('7z-wasm');
const sevenZipDir = path.dirname(packagePath);

const allFiles = fs.readdirSync(sevenZipDir);
const filesToCopy = allFiles.filter(f => f.endsWith('.wasm') || f.endsWith('.js'));

if (filesToCopy.length === 0) {
  console.error('No WASM or JS files found in 7z-wasm package directory!');
  process.exit(1);
}

filesToCopy.forEach((f) => {
  const src = path.join(sevenZipDir, f);
  const dst = path.join(destDir, f);
  fs.copyFileSync(src, dst);
  console.log(`Copied ${f} to public/wasm/`);
});

console.log('7z-wasm binary files copied to public/wasm/ successfully.');
