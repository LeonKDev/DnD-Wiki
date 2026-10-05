/* Rendering: cards, lists, quest pages, entry pages, search results. Returns HTML strings. */
function statusPill(e){
  if(!e.status) return '';
  var on = (e.status==='Active' || e.status==='Upcoming');
  return '<span class="pill'+(on?' on':'')+'">'+esc(e.status)+'</span>';
}
function whoTag(w){ return '<span class="tag '+(w==='Party'?'party':'player')+'">'+esc(w)+'</span>'; }
function chapterProgress(e){
  var q = ENTRIES.filter(function(x){ return x.parent===e.id && x.type==='quest'; });
  return {done: q.filter(function(x){ return x.status==='Resolved'; }).length, total: q.length};
}
function progressHtml(e){
  if(e.type!=='chapter') return '';
  var p = chapterProgress(e); if(!p.total) return '';
  return '<div class="progress"><div class="progress-text">'+p.done+' of '+p.total+' quests resolved</div>'
    + '<div class="bar" role="progressbar" aria-label="Chapter progress" aria-valuemin="0" aria-valuemax="'+p.total+'" aria-valuenow="'+p.done+'"><span style="width:'+Math.round(p.done/p.total*100)+'%"></span></div></div>';
}
function stripLinks(h){ return h.replace(/<a [^>]*>([^<]*)<\/a>/g,'$1'); }

function card(e, hideParent){
  var d = e.summary || e.sub || '';
  var pl = (!hideParent && e.parent && ENT[e.parent]) ? '<span class="typelabel">Part of '+esc(ENT[e.parent].title)+'</span>' : '';
  return '<a class="card" href="#'+e.id+'"><div class="card-top">'+pl+'<h3>'+esc(e.title)+'</h3>'+(e.dmOnly?'<span class="dmtag">DM only</span>':'')+statusPill(e)+'</div>'
    + (d ? '<p>'+stripLinks(rt(d))+'</p>' : '') + progressHtml(e) + '</a>';
}
function cardWithType(e){
  var d = e.summary || e.sub || '';
  return '<a class="card" href="#'+e.id+'"><div class="card-top"><span class="typelabel">'+TYPES[e.type].one+(e.parent&&ENT[e.parent]?' \u00b7 part of '+esc(ENT[e.parent].title):'')+'</span><h3>'+esc(e.title)+'</h3>'+(e.dmOnly?'<span class="dmtag">DM only</span>':'')+statusPill(e)+'</div>'
    + (d ? '<p>'+stripLinks(rt(d))+'</p>' : '') + '</a>';
}
function eventsList(list, opts){
  opts = opts||{};
  if(!list.length) return '<p class="empty">Nothing logged yet.</p>';
  return '<ul class="events">' + list.map(function(v, i){
    return '<li>'
      + (opts.parts ? '<span class="part">Part '+(i+1)+'</span>' : '')
      + whoTag(v.who)
      + '<span class="txt">'+rt(v.text)+'</span>'
      + (!opts.parts && v.quest && ENT[v.quest] ? '<a class="chip" href="#'+v.quest+'">'+esc(ENT[v.quest].title)+'</a>' : '')
      + '</li>';
  }).join('') + '</ul>';
}

function questFilterBlock(){
  var quests = ENTRIES.filter(function(e){ return e.type==='quest'; });
  var active = quests.filter(function(e){ return e.status==='Active'; });
  var resolved = quests.filter(function(e){ return e.status==='Resolved'; });
  var shown = qFilter==='active' ? active : qFilter==='resolved' ? resolved : quests;
  function btn(key,label,n){ return '<button type="button" data-filter="'+key+'" aria-pressed="'+(qFilter===key)+'">'+label+' ('+n+')</button>'; }
  var body = shown.length ? '<div class="cards">'+shown.map(function(x){ return card(x); }).join('')+'</div>'
    : '<p class="empty">No '+(qFilter==='resolved'?'resolved':'active')+' quests right now. Finished quests move to Resolved and stay searchable.</p>';
  return '<div class="filters">'+btn('active','Active',active.length)+btn('resolved','Resolved',resolved.length)+btn('all','All',quests.length)+'</div>'+body;
}

function typesWithEntries(){
  return Object.keys(TYPES).filter(function(k){ return ENTRIES.some(function(e){ return e.type===k; }); });
}

function renderHome(){
  var upcoming = ENTRIES.filter(function(e){ return e.type==='encounter' && e.status==='Upcoming'; });
  var recent = EVENTS.slice().reverse().slice(0,5);
  var browse = typesWithEntries().map(function(k){
    var n = ENTRIES.filter(function(e){ return e.type===k; }).length;
    return '<a href="#'+TYPES[k].list+'"><span>'+TYPES[k].label+'</span><span class="n">'+n+'</span></a>';
  }).join('') + '<a href="#list-history"><span>History</span><span class="n">'+EVENTS.length+'</span></a>';
  var chaps = ENTRIES.filter(function(e){ return e.type==='chapter'; });
  return '<p class="intro">Everything the party knows so far. Search, browse by type, or follow the links between entries.</p>'
    + (chaps.length ? '<section><div class="sec-head"><h2>Chapters</h2><a class="more" href="#list-chapters">All chapters</a></div><div class="cards">'+chaps.map(function(x){ return card(x); }).join('')+'</div></section>' : '')
    + '<section><div class="sec-head"><h2>Quests</h2><a class="more" href="#list-quests">All quests</a></div><div id="quest-block">'+questFilterBlock()+'</div></section>'
    + (upcoming.length ? '<section><div class="sec-head"><h2>Coming up</h2><a class="more" href="#list-encounters">All encounters</a></div><div class="cards">'+upcoming.map(function(x){ return card(x); }).join('')+'</div></section>' : '')
    + '<section><div class="sec-head"><h2>Recent history</h2><a class="more" href="#list-history">Full history</a></div>'+eventsList(recent)+'</section>'
    + '<section><div class="sec-head"><h2>Browse</h2></div><div class="browse">'+browse+'</div></section>';
}

function renderList(typeKey){
  var t = TYPES[typeKey];
  var items = ENTRIES.filter(function(e){ return e.type===typeKey; });
  var html = '<div><h1 class="page-h">'+t.label+'</h1></div>';
  if(typeKey==='quest') html += '<div id="quest-block">'+questFilterBlock()+'</div>';
  else html += items.length ? '<div class="cards">'+items.map(function(x){ return card(x); }).join('')+'</div>' : '<p class="empty">Nothing here yet.</p>';
  return html;
}
function renderHistory(){
  return '<div><h1 class="page-h">History</h1><p class="sub">Everything that has happened, oldest first. Each line links to its quest.</p></div>' + eventsList(EVENTS);
}

function statHtml(s){
  var h = '<div class="stat'+(s.pc?' pc':'')+'"><div class="core">'+esc(s.core)+'</div><div class="abil">'+esc(s.abil)+'</div>';
  s.groups.forEach(function(g){
    h += '<p>' + g.map(function(x){ return x.n ? '<b>'+esc(x.n)+'.</b> '+rt(x.t) : rt(x.t); }).join('<br>') + '</p>';
  });
  return h + '</div>';
}
function chips(ids){ return '<div class="chips">'+ids.map(function(id){ return '<a class="chip" href="#'+id+'">'+esc(ENT[id].title)+'</a>'; }).join('')+'</div>'; }

function renderEntry(e){
  var t = TYPES[e.type];
  var h = '<div><div class="crumb"><a href="#'+t.list+'">'+t.label+'</a>'+(e.parent&&ENT[e.parent]?' / <a href="#'+e.parent+'">'+esc(ENT[e.parent].title)+'</a>':'')+'</div>'
    + '<div class="entry-title"><h1>'+esc(e.title)+'</h1>'+(e.tag?'<span class="homebrew">'+esc(e.tag)+'</span>':'')+(e.dmOnly?'<span class="dmtag">DM only</span>':'')+statusPill(e)+'</div>'
    + (e.sub ? '<p class="sub">'+esc(e.sub)+'</p>' : '') + '</div>';
  if(e.summary) h += '<p class="lead">'+rt(e.summary)+'</p>';
  h += progressHtml(e);
  if(e.stat){
    if(e.dmStat) h += '<section class="block dm"><h3>Stat block <span class="dmtag">DM only</span></h3>'+statHtml(e.stat)+'</section>';
    else h += '<div>'+statHtml(e.stat)+(e.note?'<p class="pending">'+esc(e.note)+'</p>':'')+'</div>';
  }
  if(e.type==='quest' || e.type==='chapter'){
    var kids = ENTRIES.filter(function(x){ return x.parent===e.id; });
    if(kids.length) h += '<section class="block"><h3>'+(e.type==='chapter'?'In this chapter':'Parts')+'</h3><div class="cards">'+kids.map(function(k){ return card(k, true); }).join('')+'</div></section>';
    var ids = [e.id].concat(kids.map(function(k){ return k.id; }));
    h += '<section class="block"><h3>Timeline</h3>'+eventsList(EVENTS.filter(function(v){ return ids.indexOf(v.quest)>=0; }), kids.length ? {} : {parts:true})+'</section>';
  }
  (e.sections||[]).forEach(function(s){
    var dmMark = s.dm && !e.dmOnly;
    h += '<section class="block'+(dmMark?' dm':'')+'"><h3>'+esc(s.h)+(dmMark?' <span class="dmtag">DM only</span>':'')+'</h3>'
      + (s.p||[]).map(function(x){ return '<p>'+rt(x)+'</p>'; }).join('')
      + (s.ul ? '<ul>'+s.ul.map(function(x){ return '<li>'+rt(x)+'</li>'; }).join('')+'</ul>' : '') + '</section>';
  });
  if(e.type!=='quest' && e.type!=='chapter'){
    var evs = eventsFor(e.id);
    if(evs.length) h += '<section class="block"><h3>In the history</h3>'+eventsList(evs)+'</section>';
  }
  var out = entryRefs(e), back = BACK[e.id]||[];
  if(out.length) h += '<section><div class="label">Links to</div>'+chips(out)+'</section>';
  if(back.length) h += '<section><div class="label">Linked from</div>'+chips(back)+'</section>';
  return h;
}

function renderSearch(raw){
  var toks = raw.toLowerCase().split(/\s+/).filter(Boolean);
  var res = [];
  ENTRIES.forEach(function(e){
    var hay = plain(entryText(e)).toLowerCase();
    if(toks.every(function(w){ return hay.indexOf(w)>=0; })){
      var inTitle = toks.every(function(w){ return e.title.toLowerCase().indexOf(w)>=0; });
      res.push({score:inTitle?0:1, html:cardWithType(e)});
    }
  });
  EVENTS.forEach(function(v){
    var hay = plain(v.text+' '+v.who).toLowerCase();
    if(toks.every(function(w){ return hay.indexOf(w)>=0; })){
      res.push({score:2, html:'<div class="card"><div class="card-top"><span class="typelabel">History</span>'+whoTag(v.who)+'</div><p class="result-snippet">'+rt(v.text)+'</p></div>'});
    }
  });
  res.sort(function(a,b){ return a.score-b.score; });
  return '<div><h1 class="page-h">Search</h1><p class="sub">'+res.length+(res.length===1?' result':' results')+' for “'+esc(raw)+'”</p></div>'
    + (res.length ? '<div class="cards">'+res.map(function(r){ return r.html; }).join('')+'</div>' : '<p class="empty">Nothing matches. Try a name, a place, or a single word.</p>');
}
