// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();

// Přepínač tmavý / světlý vzhled + ukázka „moje rozhodnutí“
(function () {
  var r = document.documentElement, b = document.querySelector('.tema');
  if (b) b.addEventListener('click', function () {
    var t = r.dataset.tema === 'svetle' ? 'tmave' : 'svetle';
    r.dataset.tema = t; try { localStorage.setItem('tema', t); } catch (e) {}
  });
  document.querySelectorAll('.chips').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var x = e.target.closest('button'); if (!x) return;
      g.querySelectorAll('button').forEach(function (y) { y.setAttribute('aria-pressed', y === x ? 'true' : 'false'); });
    });
  });
})();
