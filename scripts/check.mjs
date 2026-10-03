import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const html = read('dist/index.html');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const context = { document: { getElementById: () => ({ addEventListener() {} }) } };
vm.createContext(context);
vm.runInContext(script.replace('    loadDefaultRun();', ''), context);

for (const file of ['dist/run-latest.json', 'runs/run-latest.json', 'config/run-template.json']) {
  context.input = JSON.parse(read(file));
  vm.runInContext('validateRun(input)', context);
  assert.equal(context.input.stages.length, 7, file);
  for (const s of context.input.stages) for (const card of s.cards) {
    assert.equal(typeof card.score, 'number');
    assert(card.score >= 0 && card.score <= 100);
  }
}
assert.equal(read('dist/run-latest.json'), read('runs/run-latest.json'));
assert.equal(JSON.stringify(vm.runInContext('demoRun', context)), JSON.stringify(JSON.parse(read('dist/run-latest.json'))));
assert.equal(vm.runInContext('safeUrl("javascript:alert(1)")', context), '');
assert.throws(() => vm.runInContext('validateRun({})', context));
assert.throws(() => vm.runInContext('validateRun({meta:{title:"x",state:"x"},agents:[],metrics:[],sources:[],stages:[]})', context));
for (const dir of ['config', 'runs']) for (const file of readdirSync(resolve(root, dir))) {
  if (file.endsWith('.json')) JSON.parse(read(dir + '/' + file));
}
function scan(dir) {
  for (const name of readdirSync(resolve(root, dir))) {
    if (name.startsWith('.') || name === 'downloads') continue;
    const p = dir ? dir + '/' + name : name;
    if (statSync(resolve(root, p)).isDirectory()) scan(p);
    else if (/\.(html|md|json|mjs|py|js)$/.test(name)) assert(!/\p{Script=Han}/u.test(read(p)), 'Untranslated Chinese: ' + p);
  }
}
scan('');
assert(html.includes('lang="en"'));
assert(html.includes('Download source code') || html.includes('Read setup guide'));
console.log('PASS: JavaScript syntax; run structure; seven stages; record parity; embedded fallback; safe links; invalid-import rejection; JSON validity; English text.');
