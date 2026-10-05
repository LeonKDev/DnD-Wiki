/* Checks the wiki data for mistakes. Usage: npm run check
   - ids are unique, types exist, parent and quest references point to real entries
   - every [[link]] points to a real entry
   - public text never links to a DM-only entry (players would see a blank)
   If the DM folder is next to this project it is checked too. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const dmDir = path.resolve(root, '..', 'DnD-Wiki-DM');

const sandbox = {};
vm.createContext(sandbox);
function run(file) { vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, {filename: file}); }
run('js/wiki.js');
run('data/config.js');
fs.readdirSync(path.join(root, 'data')).filter(f => f.endsWith('.js') && f !== 'config.js' && f !== 'dm-payload.js').sort().forEach(f => run('data/' + f));
const W = vm.runInContext('WIKI', sandbox), TYPES = vm.runInContext('TYPES', sandbox);

let dmExtra = {}, dmEntries = [];
const haveDm = fs.existsSync(path.join(dmDir, 'entries.js')) && fs.existsSync(path.join(dmDir, 'extras.js'));
if (haveDm) { dmExtra = require(path.join(dmDir, 'extras.js')); dmEntries = require(path.join(dmDir, 'entries.js')); }

const problems = [], warnings = [];
const pubIds = new Set(), dmIds = new Set(), seen = new Set();
W.entries.forEach(e => { if (seen.has(e.id)) problems.push('Duplicate id: ' + e.id); seen.add(e.id); pubIds.add(e.id); });
dmEntries.forEach(e => { if (seen.has(e.id)) problems.push('Duplicate id (DM): ' + e.id); seen.add(e.id); dmIds.add(e.id); });

function strings(v, out) { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach(x => strings(x, out)); else if (v && typeof v === 'object') Object.keys(v).forEach(k => strings(v[k], out)); return out; }
function links(text) { const r = [], re = /\[\[([a-z0-9-]+)\]\]/g; let m; while ((m = re.exec(text))) r.push(m[1]); return r; }

function checkEntry(e, isDm) {
  const where = (isDm ? '[DM] ' : '') + e.id;
  if (!TYPES[e.type]) problems.push(where + ': unknown type "' + e.type + '"');
  if (!e.title) problems.push(where + ': missing title');
  if ((e.type === 'quest' || e.type === 'chapter') && e.status && !['Active', 'Resolved'].includes(e.status)) problems.push(where + ': quest/chapter status must be Active or Resolved');
  if (e.type === 'encounter' && e.status && !['Done', 'Upcoming'].includes(e.status)) problems.push(where + ': encounter status must be Done or Upcoming');
  if (e.parent && !seen.has(e.parent)) problems.push(where + ': parent "' + e.parent + '" does not exist');
  if (e.parent && !isDm && dmIds.has(e.parent)) warnings.push(where + ': parent is a DM-only entry');
  strings(e, []).forEach(s => links(s).forEach(id => {
    if (!seen.has(id)) problems.push(where + ': broken link [[' + id + ']]');
    else if (!isDm && dmIds.has(id)) warnings.push(where + ' links to DM-only [[' + id + ']]. Players will see a blank there.');
  }));
}
W.entries.forEach(e => checkEntry(e, false));
dmEntries.forEach(e => checkEntry(e, true));
Object.keys(dmExtra).forEach(id => {
  if (!pubIds.has(id)) problems.push('[DM extras] "' + id + '" is not a public entry id');
  strings(dmExtra[id], []).forEach(s => links(s).forEach(l => { if (!seen.has(l)) problems.push('[DM extras] ' + id + ': broken link [[' + l + ']]'); }));
});
W.events.forEach(v => {
  if (v.quest && !seen.has(v.quest)) problems.push('Event ' + v.id + ': quest "' + v.quest + '" does not exist');
  else if (dmIds.has(v.quest)) warnings.push('Event ' + v.id + ' belongs to a DM-only quest');
  links(v.text).forEach(id => {
    if (!seen.has(id)) problems.push('Event ' + v.id + ': broken link [[' + id + ']]');
    else if (dmIds.has(id)) warnings.push('Event ' + v.id + ' links to DM-only [[' + id + ']]');
  });
});

console.log('Checked ' + W.entries.length + ' public entries, ' + W.events.length + ' history lines' + (haveDm ? ', ' + dmEntries.length + ' DM entries, ' + Object.keys(dmExtra).length + ' DM extras.' : '. (DM folder not found next to the project, so DM files were skipped.)'));
warnings.forEach(w => console.log('  warning: ' + w));
problems.forEach(p => console.log('  PROBLEM: ' + p));
if (problems.length) { console.log(problems.length + ' problem(s) found.'); process.exit(1); }
console.log(warnings.length ? 'No errors, ' + warnings.length + ' warning(s).' : 'All good.');
