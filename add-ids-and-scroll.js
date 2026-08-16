import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'www.quickmark.co/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The script to inject
const scriptToInject = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const findButton = (text) => Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === text);
  
  const teachersBtn = findButton('For Teachers');
  const featuresBtn = findButton('Features');
  const leaderboardBtn = findButton('Leaderboard');
  const partnersBtn = findButton('Partners');
  const blogBtn = findButton('Blog');
  
  const scrollToText = (text) => {
    // Find heading with text
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
  
  if (teachersBtn) {
    teachersBtn.style.cursor = 'pointer';
    teachersBtn.onclick = (e) => { e.preventDefault(); scrollToText('Set a paper. See every score.'); };
  }
  if (featuresBtn) {
    featuresBtn.style.cursor = 'pointer';
    featuresBtn.onclick = (e) => { e.preventDefault(); scrollToText('Instant, intelligent marking'); };
  }
  if (leaderboardBtn) {
    leaderboardBtn.style.cursor = 'pointer';
    leaderboardBtn.onclick = (e) => { e.preventDefault(); scrollToText('Global rankings'); };
  }
  if (blogBtn) {
    blogBtn.style.cursor = 'pointer';
    blogBtn.onclick = (e) => { e.preventDefault(); scrollToText('The QuickMark Journal.'); };
  }
  if (partnersBtn) {
    partnersBtn.style.cursor = 'pointer';
    partnersBtn.onclick = (e) => { e.preventDefault(); scrollToText('Partners'); };
  }
});
</script>
</body>
`;

html = html.replace('</body>', scriptToInject);
fs.writeFileSync(indexPath, html);
console.log('Injected scroll script!');
