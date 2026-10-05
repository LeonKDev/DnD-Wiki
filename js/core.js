/* Core: entry graph, link syntax [[id]], backlinks, DM merge. No page markup here. */
var PUBLIC = WIKI.entries;
var EVENTS = WIKI.events;

var ENTRIES = [], ENT = {}, BACK = {}, dmOn = false;
var viewEl = document.getElementById('view');
var qEl = document.getElementById('q');
var qFilter = 'active';

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function refLink(id){ var e = ENT[id]; return e ? '<a class="ref" href="#'+id+'">'+esc(e.title)+'</a>' : ''; }
function rt(s){ return esc(s).replace(/\[\[([a-z0-9-]+)\]\]/g, function(m,id){ return refLink(id); }); }
function plain(s){ return String(s).replace(/\[\[([a-z0-9-]+)\]\]/g, function(m,id){ return ENT[id] ? ENT[id].title : ''; }); }
function refsIn(s){ var out=[], re=/\[\[([a-z0-9-]+)\]\]/g, m; while((m=re.exec(s))){ if(ENT[m[1]] && out.indexOf(m[1])<0) out.push(m[1]); } return out; }

function entryText(e){
  var t = [e.title, e.sub||'', e.summary||'', e.tag||'', e.note||''];
  (e.sections||[]).forEach(function(s){ t.push(s.h); (s.p||[]).forEach(function(x){t.push(x)}); (s.ul||[]).forEach(function(x){t.push(x)}); });
  if(e.stat){ t.push(e.stat.core, e.stat.abil); e.stat.groups.forEach(function(g){ g.forEach(function(x){ t.push((x.n||'')+' '+x.t); }); }); }
  return t.join(' ');
}
function entryRefs(e){
  var out=[]; function add(a){ a.forEach(function(id){ if(id!==e.id && out.indexOf(id)<0) out.push(id); }); }
  add(refsIn(e.summary||''));
  (e.sections||[]).forEach(function(s){ (s.p||[]).forEach(function(x){add(refsIn(x))}); (s.ul||[]).forEach(function(x){add(refsIn(x))}); });
  return out;
}
function eventsFor(id){ return EVENTS.filter(function(v){ return v.quest===id || refsIn(v.text).indexOf(id)>=0; }); }

/* Build the active entry list: public only, or public plus decrypted DM content. */
function rebuild(dm){
  var list = JSON.parse(JSON.stringify(PUBLIC));
  if(dm){
    list.forEach(function(e){
      var x = dm.extra[e.id]; if(!x) return;
      (x.sections||[]).forEach(function(s){ s.dm = true; e.sections = (e.sections||[]).concat([s]); });
      if(x.stat){ e.stat = x.stat; e.dmStat = true; }
    });
    dm.entries.forEach(function(e){ e.dmOnly = true; list.push(e); });
  }
  ENTRIES = list; ENT = {}; BACK = {};
  list.forEach(function(e){ ENT[e.id] = e; });
  list.forEach(function(e){ entryRefs(e).forEach(function(id){ (BACK[id] = BACK[id]||[]); if(BACK[id].indexOf(e.id)<0) BACK[id].push(e.id); }); });
}
