(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function current() {
    return root.dataset.theme || (system.matches ? 'dark' : 'light');
  }

  function sync() {
    if (!toggle) return;
    var dark = current() === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
      document.dispatchEvent(new CustomEvent('themechange'));
    });

    if (system.addEventListener) {
      system.addEventListener('change', function () {
        if (!stored()) {
          delete root.dataset.theme;
          sync();
          document.dispatchEvent(new CustomEvent('themechange'));
        }
      });
    }

    sync();
  }

  document.querySelectorAll('.post-content pre').forEach(function (pre) {
    if (pre.scrollWidth > pre.clientWidth) pre.tabIndex = 0;
  });
})();
