(function () {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var stage = root.querySelector('[data-stage]');
  var faces = Array.prototype.slice.call(root.querySelectorAll('[data-face]'));
  var nextButton = root.querySelector('[data-next]');
  var status = root.querySelector('[data-status]');
  if (faces.length < 2 || !stage) return;

  var params = new URLSearchParams(window.location.search);
  var heights = [];
  var index = 0;

  var requested = parseInt(params.get('project'), 10);
  if (requested >= 1 && requested <= faces.length) index = requested - 1;

  function syncUrl() {
    params.set('project', String(index + 1));
    var search = params.toString();
    var url = window.location.pathname + (search ? '?' + search : '') + window.location.hash;
    try { window.history.replaceState(null, '', url); } catch (e) {}
  }

  function render(announce) {
    stage.style.height = heights[index] + 'px';

    faces.forEach(function (face, i) {
      var active = i === index;
      face.classList.toggle('is-active', active);
      face.setAttribute('aria-hidden', String(!active));
      if (active) {
        face.removeAttribute('inert');
      } else {
        face.setAttribute('inert', '');
      }
    });

    if (announce && status) {
      var title = faces[index].querySelector('.work-title');
      status.textContent = 'Showing ' + (title ? title.textContent : 'project ' + (index + 1));
    }
  }

  function measure() {
    var height = 0;

    faces.forEach(function (face) { face.style.display = 'block'; });

    faces.forEach(function (face, i) {
      var inner = face.firstElementChild;
      var style = window.getComputedStyle(face);
      heights[i] = Math.max(
        inner.scrollHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
        180
      );
    });

    faces.forEach(function (face) {
      face.style.display = '';
      face.style.transform = '';
    });

    root.classList.add('is-ready');
    render(false);
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        root.classList.add('is-animated');
      });
    });
  }

  function go(next) {
    index = (next + faces.length) % faces.length;
    render(true);
    syncUrl();
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      go(index + 1);
    });
  }

  document.addEventListener('surprise:project', function (event) {
    go(Number(event.detail));
  });

  window.addEventListener('resize', function () {
    window.clearTimeout(root._resize);
    root._resize = window.setTimeout(measure, 150);
  });

  measure();
})();
