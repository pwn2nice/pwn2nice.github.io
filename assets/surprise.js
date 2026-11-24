(function () {
  var button = document.querySelector('[data-surprise]');
  var projectsSection = document.getElementById('projects');
  if (!button) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var busy = false;
  var label = button.textContent;

  button.addEventListener('click', function () {
    if (busy) return;

    var posts = Array.prototype.slice.call(document.querySelectorAll('.post-item'));
    var faces = Array.prototype.slice.call(document.querySelectorAll('[data-face]'));
    var options = posts.map(function (post) {
      return { type: 'post', url: post.href };
    }).concat(faces.map(function (face, i) {
      return { type: 'project', index: i };
    }));
    if (!options.length) return;

    var pick = options[Math.floor(Math.random() * options.length)];

    busy = true;
    button.disabled = true;
    button.textContent = 'Finding\u2026';

    window.setTimeout(function () {
      if (pick.type === 'post') {
        window.location.href = pick.url;
        return;
      }

      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: reduce.matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
      document.dispatchEvent(new CustomEvent('surprise:project', { detail: pick.index }));

      busy = false;
      button.disabled = false;
      button.textContent = label;
    }, reduce.matches ? 250 : 650);
  });
})();
