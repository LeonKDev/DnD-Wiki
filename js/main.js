/* Start-up. Loaded last. */
viewEl.addEventListener('click', function(ev){
  var b = ev.target.closest('button[data-filter]');
  if(b){ qFilter = b.getAttribute('data-filter'); var blk = document.getElementById('quest-block'); if(blk) blk.innerHTML = questFilterBlock(); }
});
qEl.addEventListener('input', showSearch);
window.addEventListener('hashchange', function(){ qEl.value=''; route(); window.scrollTo(0,0); });

rebuild(null);
setDmUi();
route();
