'use strict';

function isScientific(s) {
  s = s.trim().replace(/\s/g, '');
  if (/^-?[1-9](\.\d+)?[xX]10\^[+-]?\d+$/.test(s)) return true;
  return /^-?[1-9](\.\d+)?[eE][+-]?\d+$/.test(s);
}

function run() {
  const raw = document.getElementById('inp').value.trim();
  const echo = document.getElementById('echo');
  const rright = document.getElementById('rright');
  const schip = document.getElementById('schip');
  const vword = document.getElementById('vword');
  const vsub = document.getElementById('vsub');

  if (!raw) {
    echo.textContent = 'READY_';
    rright.className = 'lcd-right';
    schip.textContent = 'WAITING';
    vword.innerHTML = '—';
    vsub.textContent = 'NO_DATA';
    return;
  }

  const ok = isScientific(raw);
  echo.textContent = '> ' + raw;

  rright.classList.add('flicker');
  setTimeout(() => rright.classList.remove('flicker'), 200);

  if (ok) {
    rright.className = 'lcd-right is-valid';
    schip.textContent = 'SYSTEM_OK';
    vword.innerHTML = '<span class="coin-spin">🪙</span> YES';
    const n = parseFloat(raw.replace(/[xX]10\^/, 'e'));
    vsub.textContent = 'VAL: ' + n.toLocaleString('id-ID');
  } else {
    rright.className = 'lcd-right is-invalid';
    schip.textContent = 'ERR_FORMAT';
    vword.textContent = 'NO';
    const n2 = parseFloat(raw);
    vsub.textContent = isNaN(n2) ? 'BAD_INPUT' : 'SUGGEST: ' + n2.toExponential(1);
  }
}

function tryEx(v) {
  document.getElementById('inp').value = v;
  run();
}

document.getElementById('inp').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') run();
});