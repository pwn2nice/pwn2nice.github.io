(function () {
  var input = document.getElementById('post-search');
  var items = Array.prototype.slice.call(document.querySelectorAll('.post-item'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filter-chip'));
  var filterGroup = document.querySelector('.filters');
  var count = document.querySelector('.result-count');
  var empty = document.querySelector('[data-empty]');
  if (!input || !items.length || !filterGroup) return;

  var params = new URLSearchParams(window.location.search);
  var active = new Set();
  var available = new Set();

  chips.forEach(function (chip) {
    if (chip.dataset.filter) available.add(chip.dataset.filter);
  });

  params.getAll('category').forEach(function (value) {
    var key = value.toLowerCase();
    if (available.has(key)) active.add(key);
  });

  var query = params.get('q') || '';
  if (query) input.value = query;

  chips
    .filter(function (chip) { return chip.dataset.filter !== ''; })
    .sort(function (a, b) { return a.textContent.localeCompare(b.textContent); })
    .forEach(function (chip) { filterGroup.appendChild(chip); });

  function pressed() {
    chips.forEach(function (chip) {
      var key = chip.dataset.filter;
      chip.setAttribute('aria-pressed', String(key ? active.has(key) : active.size === 0));
    });
  }

  function syncUrl() {
    var next = new URLSearchParams(window.location.search);
    next.delete('category');
    Array.from(active).sort().forEach(function (key) { next.append('category', key); });
    var value = input.value.trim();
    if (value) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    var search = next.toString();
    var url = window.location.pathname + (search ? '?' + search : '') + window.location.hash;
    try { window.history.replaceState(null, '', url); } catch (e) {}
  }

  function apply() {
    var value = input.value.trim().toLowerCase();
    var shown = 0;

    items.forEach(function (item) {
      var categories = (item.dataset.categories || '').split('|');
      var inCategory = active.size === 0 || categories.some(function (key) { return active.has(key); });
      var matches = !value || (item.dataset.search || '').indexOf(value) !== -1;
      var visible = inCategory && matches;

      item.hidden = !visible;
      if (visible) shown++;
    });

    count.textContent = shown + (shown === 1 ? ' post' : ' posts');
    empty.hidden = shown !== 0;
    syncUrl();
  }

  function pop(chip) {
    chip.classList.remove('chip-pop');
    void chip.offsetWidth;
    chip.classList.add('chip-pop');
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.dataset.filter;
      if (!key) {
        active.clear();
      } else if (active.has(key)) {
        active.delete(key);
      } else {
        active.add(key);
      }
      pop(chip);
      pressed();
      apply();
    });

    chip.addEventListener('animationend', function () {
      chip.classList.remove('chip-pop');
    });
  });

  input.addEventListener('input', apply);

  pressed();
  apply();
})();
