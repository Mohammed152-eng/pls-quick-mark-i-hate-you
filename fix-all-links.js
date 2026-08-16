import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'www.quickmark.co/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const scriptToInject = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const scrollToText = (text) => {
    const tags = ['h2', 'h1', 'h3', 'p', 'span'];
    for (const tag of tags) {
      const els = Array.from(document.querySelectorAll(tag));
      const target = els.find(e => e.textContent.includes(text));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
      }
    }
    return false;
  };

  // Scroll to section based on URL path on initial load
  setTimeout(() => {
    const path = window.location.pathname;
    if (path === '/teacher' || path === '/teacher/') {
      scrollToText('Set a paper. See every score.');
    } else if (path === '/blog' || path === '/blog/') {
      scrollToText('The QuickMark Journal.');
    } else if (path === '/partners' || path === '/partners/') {
      scrollToText('Partners');
    }
  }, 500);

  // Use event delegation in capture phase to beat React
  document.addEventListener('click', function(e) {
    let target = e.target;
    while (target && target !== document.body) {
      if (target.tagName === 'BUTTON') {
        const text = target.textContent.trim();
        if (text === 'For Teachers') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Set a paper. See every score.'); 
          window.history.pushState({}, '', '/teacher');
          return;
        } else if (text === 'Features') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Instant, intelligent marking'); return;
        } else if (text === 'Leaderboard') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Global rankings'); return;
        } else if (text === 'Blog') {
          e.preventDefault(); e.stopPropagation(); scrollToText('The QuickMark Journal.'); 
          window.history.pushState({}, '', '/blog');
          return;
        } else if (text === 'Partners') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Partners'); 
          window.history.pushState({}, '', '/partners');
          return;
        }
      } else if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href === '/teacher') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Set a paper. See every score.'); 
          window.history.pushState({}, '', '/teacher');
          return;
        } else if (href === '/blog') {
          e.preventDefault(); e.stopPropagation(); scrollToText('The QuickMark Journal.'); 
          window.history.pushState({}, '', '/blog');
          return;
        } else if (href === '/partners') {
          e.preventDefault(); e.stopPropagation(); scrollToText('Partners'); 
          window.history.pushState({}, '', '/partners');
          return;
        }
      }
      target = target.parentNode;
    }
  }, true); // Capture phase
});
</script>
</body>
`;

html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>\s*<\/body>/, '</body>');
html = html.replace('</body>', scriptToInject);

fs.writeFileSync(indexPath, html);
console.log('Injected capture-phase scroll script with pushState!');
