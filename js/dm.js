/* DM lock: decrypts data/dm-payload.js in the browser with the password. */
/* ---------- DM lock ---------- */
var dmBtn = document.getElementById('dmbtn'), dmPanel = document.getElementById('dmpanel');
var dmForm = document.getElementById('dmform'), dmPw = document.getElementById('dmpw'), dmMsg = document.getElementById('dmmsg'), dmGo = document.getElementById('dmgo');

function b64(s){ return Uint8Array.from(atob(s), function(c){ return c.charCodeAt(0); }); }
async function decryptDM(pw){
  var km = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  var key = await crypto.subtle.deriveKey({name:'PBKDF2', salt:b64(PAYLOAD.salt), iterations:PAYLOAD.iter, hash:'SHA-256'}, km, {name:'AES-GCM', length:256}, false, ['decrypt']);
  var pt = await crypto.subtle.decrypt({name:'AES-GCM', iv:b64(PAYLOAD.iv)}, key, b64(PAYLOAD.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}
function setDmUi(){
  dmBtn.textContent = dmOn ? 'DM view on · Lock' : 'DM';
  dmBtn.setAttribute('aria-pressed', String(dmOn));
}
function lockDM(){
  dmOn = false; rebuild(null); setDmUi();
  if(!ENT[(location.hash||'').replace(/^#/,'')] && /^#(list-(notes))$/.test(location.hash||'')) location.hash = '#home';
  refresh();
}
dmBtn.addEventListener('click', function(){
  if(dmOn){ lockDM(); return; }
  dmPanel.hidden = !dmPanel.hidden;
  dmBtn.setAttribute('aria-expanded', String(!dmPanel.hidden));
  dmMsg.textContent = '';
  if(!dmPanel.hidden) dmPw.focus();
});
dmForm.addEventListener('submit', async function(ev){
  ev.preventDefault();
  var pw = dmPw.value.trim();
  if(!pw){ dmMsg.textContent = 'Enter the DM password.'; return; }
  if(!window.crypto || !crypto.subtle){ dmMsg.textContent = 'This browser cannot unlock the DM section here. Use a current Chrome, Edge, Firefox or Safari.'; return; }
  dmGo.disabled = true; dmMsg.textContent = 'Unlocking…';
  try{
    var data = await decryptDM(pw);
    dmOn = true; rebuild(data); setDmUi();
    dmPanel.hidden = true; dmBtn.setAttribute('aria-expanded','false');
    dmPw.value = ''; dmMsg.textContent = '';
    refresh();
  }catch(err){
    dmMsg.textContent = 'Wrong password.';
  }
  dmGo.disabled = false;
});
