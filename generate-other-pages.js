import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.join(process.cwd(), 'www.quickmark.co');

function renderRSC(node, map = {}) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string") {
    if (node.startsWith("$S")) return "";
    if (node.startsWith("$L") || node.startsWith("$@")) {
      const refId = node.replace(/^\$(L|@)/, "");
      if (map[refId]) return renderRSC(map[refId], map);
      return "";
    }
    return node
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  if (typeof node === "number") return String(node);

  if (Array.isArray(node)) {
    if (node[0] === "$" && typeof node[1] === "string") {
      const type = node[1];
      const props = node[3] || {};

      if (type.startsWith("$")) {
        const refId = type.replace(/^\$L?/, "");
        const mapped = map[refId];
        if (mapped && typeof mapped !== "string" && !Array.isArray(mapped)) {
          return renderRSC(mapped, map);
        }
        if (Array.isArray(mapped) && mapped[0] === "$") {
          return renderRSC(mapped, map);
        }
        if (props.children) {
          return renderRSC(props.children, map);
        }
        return "";
      }

      const tag = type;
      const attrs = [];
      for (const [k, v] of Object.entries(props)) {
        if (k === "children" || k === "key" || k.startsWith("on")) continue;
        if (k === "className") {
          attrs.push(`class="${v}"`);
        } else if (k === "style" && typeof v === "object") {
          const styleStr = Object.entries(v).map(([sk, sv]) => `${sk.replace(/([A-Z])/g, "-$1").toLowerCase()}:${sv}`).join(";");
          attrs.push(`style="${styleStr}"`);
        } else if (typeof v === "string" || typeof v === "number") {
          attrs.push(`${k}="${v}"`);
        } else if (v === true) {
          attrs.push(`${k}`);
        }
      }
      const attrString = attrs.length > 0 ? " " + attrs.join(" ") : "";
      
      const voidTags = ["img", "input", "br", "hr", "meta", "link", "path", "circle", "rect", "line", "polyline", "polygon", "ellipse"];
      if (voidTags.includes(tag)) {
        return `<${tag}${attrString}/>`;
      }

      let inner = "";
      if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
        inner = props.dangerouslySetInnerHTML.__html;
      } else if (props.children) {
        inner = renderRSC(props.children, map);
      }

      return `<${tag}${attrString}>${inner}</${tag}>`;
    }
    return node.map(n => renderRSC(n, map)).join("");
  }
  if (typeof node === "object") {
    if (node.children) {
      return renderRSC(node.children, map);
    }
    if (node.f) {
      return renderRSC(node.f, map);
    }
  }
  return "";
}

function getCommonHead(title, description) {
  return `
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title} | QuickMark</title>
  <meta name="description" content="${description}"/>
  <link rel="icon" href="/favicon.ico" sizes="any"/>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
  <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
  <link rel="manifest" href="/manifest.webmanifest"/>
  
  <link rel="stylesheet" href="/_next/static/chunks/1yqc0je-jeg6o.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/28t21d98xnf1y.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/32df63a23fb5f524.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/d51a66ff567634f1.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/79e8a719d36371dc.css"/>
  
  <script>
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    function toggleTheme() {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  </script>
`;
}

function getHeader(activePage = '') {
  return `
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-boutique-cream/85 dark:bg-dark-bg/85 border-b border-boutique-ink/10 dark:border-boutique-cream/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 cursor-pointer group">
        <span class="block shrink-0 overflow-hidden rounded-full w-10 h-10">
          <img src="/favicon.svg" width="40" height="40" alt="QuickMark" class="w-full h-full scale-[1.147] select-none"/>
        </span>
        <span class="font-display font-black text-2xl tracking-tight text-boutique-ink dark:text-boutique-cream">QuickMark.</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1 p-1.5 rounded-full border-2 border-boutique-ink/10 dark:border-boutique-cream/10 bg-boutique-cream/50 dark:bg-dark-surface/50">
        <a href="/#features" class="px-5 py-2.5 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/70 dark:text-boutique-cream/70 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Features</a>
        <a href="/teacher" class="px-5 py-2.5 rounded-full text-sm font-black whitespace-nowrap ${activePage === 'teacher' ? 'bg-boutique-sage/20 text-boutique-sage-deep dark:text-boutique-sage' : 'text-boutique-ink/70 dark:text-boutique-cream/70 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15'} transition-all">For Teachers</a>
        <a href="/blog" class="px-5 py-2.5 rounded-full text-sm font-black whitespace-nowrap ${activePage === 'blog' ? 'bg-boutique-sage/20 text-boutique-sage-deep dark:text-boutique-sage' : 'text-boutique-ink/70 dark:text-boutique-cream/70 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15'} transition-all">Blog</a>
        <a href="/partners" class="px-5 py-2.5 rounded-full text-sm font-black whitespace-nowrap ${activePage === 'partners' ? 'bg-boutique-sage/20 text-boutique-sage-deep dark:text-boutique-sage' : 'text-boutique-ink/70 dark:text-boutique-cream/70 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15'} transition-all">Partners</a>
        <a href="/#leaderboard" class="px-5 py-2.5 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/70 dark:text-boutique-cream/70 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Ranks</a>
      </nav>

      <!-- Right CTAs -->
      <div class="flex items-center gap-3">
        <button onclick="toggleTheme()" type="button" aria-label="Toggle theme" class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-boutique-ink/10 text-boutique-ink transition-colors hover:border-boutique-ink hover:bg-boutique-ink hover:text-boutique-cream dark:border-boutique-cream/20 dark:text-boutique-cream dark:hover:border-boutique-cream dark:hover:bg-boutique-cream dark:hover:text-boutique-ink">
          <svg class="h-4 w-4 dark:hidden" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          <svg class="h-4 w-4 hidden dark:block" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        </button>
        <a href="/app/practice" class="inline-flex items-center justify-center rounded-full border-2 border-boutique-ink bg-boutique-ink px-5 py-2.5 text-sm font-black text-boutique-cream shadow-[var(--shadow-sticker-soft)] transition-all hover:bg-boutique-sage hover:text-boutique-ink hover:border-boutique-sage dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:hover:bg-boutique-sage dark:hover:text-boutique-ink dark:hover:border-boutique-sage">
          <span>Start Practice</span>
        </a>
      </div>
    </div>
  </header>
  <div class="h-20"></div>
`;
}

function getFooter() {
  return `
  <footer data-marketing-footer="true" class="relative overflow-hidden border-t-2 border-boutique-ink bg-boutique-cream px-4 pb-10 pt-16 text-boutique-ink dark:border-boutique-cream dark:bg-dark-bg dark:text-boutique-cream sm:px-6 sm:pt-20">
    <div class="relative z-10 mx-auto max-w-6xl">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <span class="inline-flex items-center gap-3">
          <span class="block shrink-0 overflow-hidden rounded-full w-10 h-10">
            <img src="/favicon.svg" width="40" height="40" alt="QuickMark" class="h-full w-full scale-[1.147] select-none"/>
          </span>
          <span class="font-display font-black tracking-tight text-2xl text-boutique-ink dark:text-boutique-cream">QuickMark.</span>
        </span>
        <span class="eyebrow text-xs font-bold uppercase tracking-widest text-boutique-ink/45 dark:text-boutique-cream/45">QM/26/PAGES/01</span>
      </div>
      
      <div class="mt-16 grid gap-10 sm:grid-cols-12 sm:gap-8">
        <div class="grid grid-cols-2 gap-8 sm:col-span-8 sm:grid-cols-4">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Practice</p>
            <ul class="mt-4 space-y-3 text-sm font-bold">
              <li><a href="/app/practice" class="hover:text-boutique-sage transition-colors">Past papers</a></li>
              <li><a href="/app/topicals" class="hover:text-boutique-sage transition-colors">Topicals</a></li>
              <li><a href="/app/ranked" class="hover:text-boutique-sage transition-colors">Ranked mode</a></li>
              <li><a href="/#leaderboard" class="hover:text-boutique-sage transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Teachers</p>
            <ul class="mt-4 space-y-3 text-sm font-bold">
              <li><a href="/teacher" class="hover:text-boutique-sage transition-colors">For Teachers</a></li>
              <li><a href="/app/assignments" class="hover:text-boutique-sage transition-colors">Assignments</a></li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Resources</p>
            <ul class="mt-4 space-y-3 text-sm font-bold">
              <li><a href="/blog" class="hover:text-boutique-sage transition-colors">Blog</a></li>
              <li><a href="/learn" class="hover:text-boutique-sage transition-colors">Learn Hub</a></li>
              <li><a href="/partners" class="hover:text-boutique-sage transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Company</p>
            <ul class="mt-4 space-y-3 text-sm font-bold">
              <li><a href="/about" class="hover:text-boutique-sage transition-colors">About</a></li>
              <li><a href="/contact" class="hover:text-boutique-sage transition-colors">Contact</a></li>
              <li><a href="/privacy" class="hover:text-boutique-sage transition-colors">Privacy</a></li>
              <li><a href="/terms" class="hover:text-boutique-sage transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div class="sm:col-span-4 flex flex-col justify-between">
          <p class="text-sm font-medium leading-relaxed text-boutique-ink/65 dark:text-boutique-cream/65">
            QuickMark is a free, student-built revision and instant marking platform for Cambridge IGCSE, O Level, and A Level past papers.
          </p>
          <div class="mt-6">
            <a href="/app/practice" class="inline-flex items-center gap-2 rounded-full border-2 border-boutique-ink bg-boutique-ink px-6 py-3 text-sm font-black text-boutique-cream shadow-[var(--shadow-sticker-soft)] hover:bg-boutique-sage hover:text-boutique-ink dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:hover:bg-boutique-sage dark:hover:text-boutique-ink transition-all">
              <span>Start free practice</span>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-boutique-ink/10 pt-8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-boutique-ink/45 dark:text-boutique-cream/45">
        <p>© 2026 QuickMark. Built for students worldwide.</p>
        <div class="flex items-center gap-6">
          <a href="/privacy" class="hover:text-boutique-sage transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-boutique-sage transition-colors">Terms of Service</a>
          <a href="https://instagram.com/quickmark.co" target="_blank" rel="noopener noreferrer" class="hover:text-boutique-sage transition-colors">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
`;
}

const PAGES = [
  { name: "about", title: "About Us", desc: "Learn about QuickMark, our mission, and our team." },
  { name: "contact", title: "Contact Us", desc: "Get in touch with the QuickMark team." },
  { name: "privacy", title: "Privacy Policy", desc: "QuickMark Privacy Policy." },
  { name: "terms", title: "Terms of Service", desc: "QuickMark Terms of Service." },
  { name: "editorial-standards", title: "Editorial Standards", desc: "QuickMark Editorial Standards and Content Guidelines." },
  { name: "learn", title: "Learn Hub", desc: "Revision guides and exam insights from QuickMark." }
];

PAGES.forEach(p => {
  const f2 = path.join(ROOT_DIR, `${p.name} (2).html`);
  if (!fs.existsSync(f2)) return;

  const content = fs.readFileSync(f2, "utf8");
  const lines = content.split("\n");
  const map = {};
  lines.forEach(l => {
    const colonIdx = l.indexOf(":");
    if (colonIdx !== -1) {
      const id = l.substring(0, colonIdx);
      const rest = l.substring(colonIdx + 1);
      try { map[id] = JSON.parse(rest); } catch(e) { map[id] = rest; }
    }
  });

  const pageObj = map["0"]?.f?.[0]?.[5]?.[1];
  let bodyHtml = "";
  if (pageObj) {
    bodyHtml = renderRSC(pageObj, map);
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="en" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  ${getCommonHead(p.title, p.desc)}
</head>
<body class="bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream font-sans antialiased min-h-screen flex flex-col selection:bg-boutique-sage selection:text-boutique-ink">
  ${getHeader()}
  <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12">
    ${bodyHtml || `<h1 class="text-4xl font-black mb-6">${p.title}</h1><p>${p.desc}</p>`}
  </main>
  ${getFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, `${p.name}.html`), fullHtml);
  const dirPath = path.join(ROOT_DIR, p.name);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(path.join(dirPath, 'index.html'), fullHtml);
  console.log(`Generated ${p.name}.html`);
});
