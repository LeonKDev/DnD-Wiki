/* Navigation and routing: type tabs, #hash routes, search. */
function setNav(h){
  var items = [{id:'home',label:'Home'}].concat(typesWithEntries().map(function(k){ return {id:TYPES[k].list,label:TYPES[k].label}; })).concat([{id:'list-history',label:'History'}]);
  var active = h;
  if(ENT[h]) active = TYPES[ENT[h].type].list;
  document.getElementById('typenav').innerHTML = items.map(function(i){
    return '<a href="#'+i.id+'"'+(i.id===active?' class="on" aria-current="page"':'')+'>'+i.label+'</a>';
  }).join('');
}

function route(){
  var h = (location.hash||'').replace(/^#/,'') || 'home';
  var html;
  if(h==='home') html = renderHome();
  else if(h==='list-history') html = renderHistory();
  else if(h.indexOf('list-')===0){
    var key = Object.keys(TYPES).filter(function(k){ return TYPES[k].list===h; })[0];
    html = (key && ENTRIES.some(function(e){ return e.type===key; })) ? renderList(key) : '<div><h1 class="page-h">Not available</h1><p class="sub">That page isn’t available. <a class="ref" href="#home">Back to home</a></p></div>';
  }
  else if(ENT[h]) html = renderEntry(ENT[h]);
  else html = '<div><h1 class="page-h">Not available</h1><p class="sub">That page isn’t available. <a class="ref" href="#home">Back to home</a></p></div>';
  viewEl.innerHTML = html;
  setNav(h);
}

function showSearch(){
  var v = qEl.value.trim();
  if(!v){ route(); return; }
  viewEl.innerHTML = renderSearch(v);
  setNav('');
}
function refresh(){ if(qEl.value.trim()) showSearch(); else route(); }
