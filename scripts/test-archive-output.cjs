// Exercises the actual worker and WASM encoder without browser UI.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const JSZip = require('jszip');
const sevenZipFactory = require('7z-wasm');
const source = fs.readFileSync('src/workers/archive-converter.worker.ts', 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
async function run(targetFormat, inputBuffer) {
  const messages = [];
  const self = {location:{origin:'http://localhost:3100'},postMessage:message=>messages.push(message)};
  const sandbox = {self, exports:{}, URL, Uint8Array, ArrayBuffer, Error, console,
    require:name=> {
      assert.equal(name,'7z-wasm');
      // Resolve the same bundled WASM locally; no network dependency in this test.
      return options=>sevenZipFactory({...options,locateFile:file=>path.join(path.dirname(require.resolve('7z-wasm')),path.basename(file))});
    }};
  vm.runInNewContext(compiled,sandbox);
  await self.onmessage({data:{type:'convert',targetFormat,inputBuffer,inputName:'fixture.zip'}});
  return messages.at(-1);
}
(async()=>{
  const zip = new JSZip();
  zip.file('nested/audit.txt','File contents must survive conversion.');
  const input = await zip.generateAsync({type:'arraybuffer'});
  for(const format of ['rar','iso']) {
    const result=await run(format,input);
    assert.equal(result.type,'error');
    assert.match(result.message,/cannot create RAR or ISO/);
  }
  const bad=await run('7z',new TextEncoder().encode('invalid ZIP').buffer);
  assert.equal(bad.type,'error');
  const good=await run('7z',input);
  assert.equal(good.type,'complete',JSON.stringify(good));
  assert.equal(good.outputName,'fixture.7z');
  assert.equal(Buffer.from(good.outputBuffer).subarray(0,6).toString('hex'),'377abcaf271c');
  const engine=await sevenZipFactory({print:()=>{},printErr:()=>{}});
  engine.FS.writeFile('/test.7z',new Uint8Array(good.outputBuffer));
  engine.callMain(['x','/test.7z','-o/extracted','-y']);
  assert.equal(new TextDecoder().decode(engine.FS.readFile('/extracted/nested/audit.txt')),'File contents must survive conversion.');
  console.log('PASS: RAR/ISO refused; corrupt input rejected; valid 7Z signature, filename and extracted contents verified after retry.');
})().catch(error=>{console.error(error);process.exitCode=1});
