// Mermaid entry is pinned and loaded over HTTPS. SRI cannot be applied to a
// dynamic import, so the CDN origin is restricted by the page CSP instead.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs';

var diagrams = [];
document.querySelectorAll('pre > code.language-mermaid').forEach(function (code) {
  var box = document.createElement('div');
  box.className = 'mermaid';
  box.dataset.src = code.textContent;
  box.textContent = code.textContent;
  code.parentElement.replaceWith(box);
  diagrams.push(box);
});

var system = window.matchMedia('(prefers-color-scheme: dark)');

function isDark() {
  var set = document.documentElement.dataset.theme;
  return set ? set === 'dark' : system.matches;
}

function draw() {
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark() ? 'dark' : 'neutral',
    securityLevel: 'strict'
  });
  diagrams.forEach(function (box) {
    box.removeAttribute('data-processed');
    box.textContent = box.dataset.src;
  });
  return mermaid.run({ nodes: diagrams });
}

draw();
document.addEventListener('themechange', draw);
