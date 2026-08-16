import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.join(process.cwd(), 'www.quickmark.co');

// Posts database
const POSTS = [
  {
    slug: "night-before-igcse-exam-tips",
    title: "The Night Before Your IGCSE Exam: What To Do and What Not To Do",
    excerpt: "The twelve hours before your exam matter more than most students realise. Here is a practical, calm guide to your evening routine, what to avoid, and how to arrive ready.",
    author: "Ved Shivane",
    date: "2026-05-22",
    readTime: 7,
    category: "Exam Strategy",
    colorIndex: 0,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><path d="M148 52a48 48 0 1 1-56 56 36 36 0 0 0 56-56z" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="76" cy="44" r="3" fill="currentColor" opacity="0.5"/><circle cx="90" cy="32" r="2" fill="currentColor" opacity="0.35"/><circle cx="104" cy="24" r="2.5" fill="currentColor" opacity="0.45"/><circle cx="62" cy="56" r="2" fill="currentColor" opacity="0.3"/><rect x="148" y="98" width="44" height="5" rx="2.5" fill="currentColor" opacity="0.25"/><rect x="148" y="110" width="34" height="5" rx="2.5" fill="currentColor" opacity="0.18"/><rect x="148" y="122" width="38" height="5" rx="2.5" fill="currentColor" opacity="0.25"/><line x1="140" y1="96" x2="140" y2="130" stroke="currentColor" stroke-width="1.5" opacity="0.2"/></svg>`
  },
  {
    slug: "use-reports-page-plan-next-week-revision",
    title: "How to Use Your QuickMark Reports Page to Plan Next Week's Revision",
    excerpt: "Stop guessing what to revise. Your QuickMark Reports page gives you a full breakdown of wrong answers, skipped questions, and weakest topics so you can plan next week with data instead of instinct.",
    author: "Ved Shivane",
    date: "2026-05-20",
    readTime: 10,
    category: "Feature Guide",
    colorIndex: 1,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="44" y="28" width="152" height="110" rx="7" fill="none" stroke="currentColor" stroke-width="3"/><rect x="44" y="28" width="152" height="22" rx="7" fill="currentColor" opacity="0.18"/><rect x="44" y="42" width="152" height="8" fill="currentColor" opacity="0.18"/><rect x="60" y="62" width="36" height="8" rx="2" fill="currentColor" opacity="0.2"/><rect x="60" y="62" width="10" height="8" rx="2" fill="currentColor" opacity="0.7"/><rect x="60" y="78" width="36" height="8" rx="2" fill="currentColor" opacity="0.2"/><rect x="60" y="78" width="22" height="8" rx="2" fill="currentColor" opacity="0.7"/><rect x="60" y="94" width="36" height="8" rx="2" fill="currentColor" opacity="0.2"/><rect x="60" y="94" width="16" height="8" rx="2" fill="currentColor" opacity="0.7"/><rect x="60" y="110" width="36" height="8" rx="2" fill="currentColor" opacity="0.2"/><rect x="60" y="110" width="30" height="8" rx="2" fill="currentColor" opacity="0.7"/><rect x="140" y="58" width="14" height="60" rx="3" fill="currentColor" opacity="0.25"/><rect x="160" y="72" width="14" height="46" rx="3" fill="currentColor" opacity="0.45"/><rect x="120" y="80" width="14" height="38" rx="3" fill="currentColor" opacity="0.65"/><line x1="112" y1="120" x2="182" y2="120" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.4"/></svg>`
  },
  {
    slug: "review-mcq-mark-schemes-efficiently",
    title: "How to Review MCQ Mark Schemes Efficiently After a Past Paper",
    excerpt: "Turn mark schemes into actionable revision: log what matters, spot recurring errors, and choose your next study session with a concrete 20-minute workflow.",
    author: "Ved Shivane",
    date: "2026-04-17",
    readTime: 8,
    category: "Exam Strategy",
    colorIndex: 2,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="66" y="36" width="68" height="92" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="84" cy="58" r="4.5" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="94" y="54" width="30" height="7" rx="3" fill="currentColor" opacity="0.25"/><circle cx="84" cy="76" r="4.5" fill="currentColor" opacity="0.6"/><rect x="94" y="72" width="30" height="7" rx="3" fill="currentColor" opacity="0.35"/><circle cx="84" cy="94" r="4.5" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="94" y="90" width="30" height="7" rx="3" fill="currentColor" opacity="0.25"/><circle cx="84" cy="112" r="4.5" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="94" y="108" width="30" height="7" rx="3" fill="currentColor" opacity="0.25"/><circle cx="164" cy="94" r="24" fill="none" stroke="currentColor" stroke-width="3"/><line x1="181" y1="111" x2="194" y2="124" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>`
  },
  {
    slug: "reduce-careless-mistakes-mcq-exams",
    title: "How to Reduce Careless Mistakes in MCQ Exams Without Over-Studying Theory",
    excerpt: "Learn how to separate careless errors from concept gaps, apply a 20-minute daily routine, and use practical checklists that reduce avoidable mark loss.",
    author: "Ved Shivane",
    date: "2026-04-16",
    readTime: 9,
    category: "Mindset",
    colorIndex: 0,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><circle cx="120" cy="80" r="50" fill="none" stroke="currentColor" stroke-width="2" opacity="0.25"/><circle cx="120" cy="80" r="34" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.45"/><circle cx="120" cy="80" r="18" fill="none" stroke="currentColor" stroke-width="3" opacity="0.65"/><circle cx="120" cy="80" r="5" fill="currentColor" opacity="0.8"/><line x1="120" y1="24" x2="120" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="120" y1="120" x2="120" y2="136" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="64" y1="80" x2="80" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="160" y1="80" x2="176" y2="80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/></svg>`
  },
  {
    slug: "error-logs-improve-mcq-scores",
    title: "Building an Error Log That Actually Improves Your MCQ Scores",
    excerpt: "Most error logs fail because they are too long and never reviewed. Use this minimal format, weekly cadence, and decision rules to turn mistakes into score gains.",
    author: "Ved Shivane",
    date: "2026-04-15",
    readTime: 8,
    category: "Study Framework",
    colorIndex: 1,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="44" y="30" width="152" height="116" rx="7" fill="none" stroke="currentColor" stroke-width="3"/><rect x="96" y="22" width="48" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="108" y="18" width="24" height="10" rx="5" fill="currentColor" opacity="0.12" stroke="currentColor" stroke-width="2.5"/><rect x="60" y="108" width="18" height="26" rx="2" fill="currentColor" opacity="0.3"/><rect x="86" y="94" width="18" height="40" rx="2" fill="currentColor" opacity="0.45"/><rect x="112" y="78" width="18" height="56" rx="2" fill="currentColor" opacity="0.6"/><rect x="138" y="60" width="18" height="74" rx="2" fill="currentColor" opacity="0.75"/><rect x="164" y="44" width="18" height="90" rx="2" fill="currentColor" opacity="0.9"/><line x1="54" y1="134" x2="190" y2="134" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/></svg>`
  },
  {
    slug: "last-30-days-igcse-revision-plan",
    title: "Your Final 30 Days: The IGCSE Revision Framework That Works",
    excerpt: "A realistic 30-day plan split into three 10-day phases: diagnosing weak areas, timed paper conditioning, and fine-tuning accuracy before the real exam.",
    author: "Ved Shivane",
    date: "2026-04-14",
    readTime: 11,
    category: "Revision Plan",
    colorIndex: 2,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="60" y="42" width="120" height="86" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><rect x="60" y="42" width="120" height="20" rx="6" fill="currentColor" opacity="0.2"/><rect x="60" y="54" width="120" height="8" fill="currentColor" opacity="0.2"/><rect x="90" y="35" width="6" height="14" rx="3" fill="currentColor" opacity="0.5"/><rect x="117" y="35" width="6" height="14" rx="3" fill="currentColor" opacity="0.5"/><rect x="144" y="35" width="6" height="14" rx="3" fill="currentColor" opacity="0.5"/><text x="120" y="110" text-anchor="middle" font-size="44" font-weight="700" fill="currentColor" opacity="0.75" font-family="'JetBrains Mono', monospace">30</text></svg>`
  },
  {
    slug: "14-day-comeback-plan-bad-mock-result",
    title: "The 14-Day Comeback Plan After a Bad Mock or Past Paper",
    excerpt: "Recover from a weak mock with a focused two-week cycle of diagnosis, repair, and testing. Turn unexpected drops into measurable score gains.",
    author: "Ved Shivane",
    date: "2026-04-13",
    readTime: 9,
    category: "Comeback Plan",
    colorIndex: 0,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><line x1="50" y1="120" x2="196" y2="120" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/><line x1="50" y1="36" x2="50" y2="120" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/><path d="M58 58 C78 64 94 104 116 112 C138 120 156 78 188 44" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M58 58 C78 64 94 104 116 112 C138 120 156 78 188 44 L188 120 L58 120 Z" fill="currentColor" opacity="0.07"/><circle cx="116" cy="112" r="5" fill="currentColor" opacity="0.45"/><circle cx="188" cy="44" r="5" fill="currentColor"/></svg>`
  },
  {
    slug: "final-2-weeks-paper-selection-strategy",
    title: "Which Past Papers to Pick in the Final 2 Weeks Before Exams",
    excerpt: "Pick the highest-value papers in the final stretch instead of revising at random. Prioritise recent series, difficult variants, and targeted question types.",
    author: "Ved Shivane",
    date: "2026-04-12",
    readTime: 8,
    category: "Paper Strategy",
    colorIndex: 1,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="68" y="50" width="76" height="92" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35" transform="rotate(-5 106 96)"/><rect x="68" y="46" width="76" height="92" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" transform="rotate(-2 106 92)"/><rect x="68" y="42" width="76" height="92" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="80" y="60" width="52" height="3.5" rx="1.5" fill="currentColor" opacity="0.5"/><rect x="80" y="70" width="40" height="3.5" rx="1.5" fill="currentColor" opacity="0.35"/><rect x="80" y="80" width="46" height="3.5" rx="1.5" fill="currentColor" opacity="0.5"/></svg>`
  },
  {
    slug: "topicals-vs-full-papers-igcse",
    title: "Topicals vs Full Papers: A Decision Framework for IGCSE Success",
    excerpt: "Choose the right practice mode based on your weak spots, timing needs, and exam stage. Avoid common traps like staying on topicals too long.",
    author: "Ved Shivane",
    date: "2026-04-10",
    readTime: 10,
    category: "Study Strategy",
    colorIndex: 2,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="52" y="46" width="60" height="76" rx="5" fill="none" stroke="currentColor" stroke-width="3" opacity="0.45"/><rect x="128" y="38" width="60" height="84" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><rect x="138" y="54" width="40" height="3" rx="1.2" fill="currentColor" opacity="0.5"/><rect x="138" y="63" width="32" height="3" rx="1.2" fill="currentColor" opacity="0.35"/><rect x="138" y="72" width="36" height="3" rx="1.2" fill="currentColor" opacity="0.5"/><rect x="138" y="81" width="28" height="3" rx="1.2" fill="currentColor" opacity="0.35"/><rect x="138" y="90" width="34" height="3" rx="1.2" fill="currentColor" opacity="0.5"/><text x="120" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-style="italic" opacity="0.7">vs</text></svg>`
  },
  {
    slug: "how-we-built-quickmark",
    title: "How We Built QuickMark: A Technical Breakdown",
    excerpt: "See the product decisions, system tradeoffs, and practice-loop thinking behind QuickMark. From browser-side PDF processing to real-time ranked matchmaking.",
    author: "Ved Shivane",
    date: "2026-03-20",
    readTime: 9,
    category: "Engineering",
    colorIndex: 0,
    svg: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full"><rect x="30" y="28" width="180" height="112" rx="7" fill="none" stroke="currentColor" stroke-width="3"/><rect x="30" y="28" width="180" height="26" rx="7" fill="currentColor" opacity="0.2"/><rect x="30" y="46" width="180" height="8" fill="currentColor" opacity="0.2"/><circle cx="50" cy="41" r="4" fill="currentColor" opacity="0.5"/><circle cx="64" cy="41" r="4" fill="currentColor" opacity="0.5"/><circle cx="78" cy="41" r="4" fill="currentColor" opacity="0.5"/><rect x="108" y="140" width="24" height="10" rx="2" fill="currentColor" opacity="0.3"/><rect x="96" y="150" width="48" height="5" rx="2.5" fill="currentColor" opacity="0.3"/><polyline points="80,72 62,90 80,108" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="160,72 178,90 160,108" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><line x1="130" y1="68" x2="110" y2="112" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.7"/></svg>`
  }
];

const COLORS = [
  { bgClass: "bg-boutique-sage/25 dark:bg-boutique-sage/10", textClass: "text-boutique-sage-deep dark:text-boutique-sage", pillClass: "bg-boutique-sage/40 dark:bg-boutique-sage/20" },
  { bgClass: "bg-boutique-coral/25 dark:bg-boutique-coral/10", textClass: "text-boutique-coral-deep dark:text-boutique-coral", pillClass: "bg-boutique-coral/40 dark:bg-boutique-coral/20" },
  { bgClass: "bg-boutique-sky/25 dark:bg-boutique-sky/10", textClass: "text-info-strong dark:text-boutique-sky", pillClass: "bg-boutique-sky/40 dark:bg-boutique-sky/20" }
];

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
        <span class="eyebrow text-xs font-bold uppercase tracking-widest text-boutique-ink/45 dark:text-boutique-cream/45">QM/26/JOURNAL/01</span>
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

// 1. GENERATE PARTNERS PAGE
function generatePartnersPage() {
  const html = `<!DOCTYPE html>
<html lang="en" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  ${getCommonHead("Partners", "Student communities and organizations partnering with QuickMark to make quality exam practice accessible to everyone.")}
</head>
<body class="bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream font-sans antialiased min-h-screen flex flex-col selection:bg-boutique-sage selection:text-boutique-ink">
  ${getHeader('partners')}

  <main class="flex-1">
    <!-- Hero Header -->
    <section class="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div class="absolute top-20 -right-32 w-64 h-64 bg-boutique-sage/20 dark:bg-boutique-sage/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute bottom-20 -left-32 w-64 h-64 bg-boutique-coral/20 dark:bg-boutique-coral/10 rounded-full blur-3xl animate-blob" style="animation-delay:1s"></div>
      
      <div class="max-w-4xl mx-auto relative z-10 text-center space-y-6">
        <a href="/" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/60 dark:text-boutique-cream/60 hover:text-boutique-sage transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Back to home</span>
        </a>

        <div>
          <div class="inline-block mb-3">
            <div class="h-[2px] w-12 bg-boutique-sage mx-auto mb-3"></div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/60 dark:text-boutique-cream/60">Our partners</p>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-boutique-ink dark:text-boutique-cream mb-4">
            Built with student communities
          </h1>
          <p class="text-base sm:text-lg font-medium text-boutique-ink/60 dark:text-boutique-cream/70 max-w-2xl mx-auto">
            We partner with communities and organizations that share our vision: making quality exam practice free and accessible to every student, everywhere.
          </p>
        </div>
      </div>
    </section>

    <!-- Partner List Section -->
    <section class="relative py-8 sm:py-12 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid gap-8">
          <!-- r/OLevels Card -->
          <article class="paper-sheet p-8 sm:p-12 border-2 border-boutique-ink bg-white dark:border-white/10 dark:bg-dark-elevated rounded-[var(--radius-modal)] shadow-[var(--shadow-sticker-lift)]">
            <div class="space-y-8">
              <div>
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <h2 class="text-3xl sm:text-4xl font-black text-boutique-ink dark:text-boutique-cream">r/OLevels</h2>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.16em] bg-boutique-sage/20 text-boutique-sage-deep dark:text-boutique-sage border border-boutique-sage/30">Verified partner</span>
                </div>
                <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em] mb-4">Student-led community · Reddit</p>
                <div class="prose prose-lg max-w-none">
                  <p class="text-base sm:text-lg leading-relaxed text-boutique-ink/80 dark:text-boutique-cream/80 font-medium">
                    r/OLevels is a vibrant, student-led community on Reddit dedicated to supporting Cambridge and Pearson Edexcel O Level candidates worldwide. Built on the principle of "students helping students", the subreddit serves as a study hub where learners exchange resources, clarify complex concepts, and share past paper strategies. Beyond just academics, it offers a crucial space for peer support, helping students navigate the high-pressure exam season with shared experiences and collective motivation.
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-8 border-y border-boutique-ink/10 dark:border-white/10 py-6">
                <div class="space-y-1">
                  <p class="text-3xl font-black text-boutique-ink dark:text-boutique-cream">8K+</p>
                  <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em]">Weekly visitors</p>
                </div>
                <div class="space-y-1">
                  <p class="text-3xl font-black text-boutique-ink dark:text-boutique-cream">Global</p>
                  <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em]">Reach</p>
                </div>
                <div class="space-y-1">
                  <p class="text-3xl font-black text-boutique-ink dark:text-boutique-cream">24/7</p>
                  <p class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-[0.16em]">Peer Support</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-4">
                <a href="https://reddit.com/r/OLevels" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-boutique-ink bg-boutique-ink text-boutique-cream rounded-full font-black text-sm shadow-[var(--shadow-sticker-soft)] transition-all hover:bg-boutique-sage hover:text-boutique-ink hover:border-boutique-sage dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:hover:bg-boutique-sage dark:hover:text-boutique-ink">
                  <span>Visit community</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
                <a href="https://discord.gg/olevels" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-boutique-ink/20 dark:border-white/20 text-boutique-ink dark:text-boutique-cream rounded-full font-black text-sm hover:border-boutique-sage hover:bg-boutique-sage/10 transition-colors">
                  <span>Join Discord</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Partner CTA -->
    <section class="relative py-20 sm:py-28 px-4 sm:px-6">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-boutique-ink dark:text-boutique-cream">Interested in partnering?</h2>
        <p class="text-base sm:text-lg font-medium text-boutique-ink/60 dark:text-boutique-cream/70">
          We're always looking to collaborate with student communities and educational organizations that share our mission.
        </p>
        <div>
          <a href="mailto:hello@quickmark.co" class="inline-flex items-center gap-3 px-8 py-4 border-2 border-boutique-ink bg-boutique-ink text-boutique-cream rounded-full font-black text-base shadow-[var(--shadow-sticker-soft)] transition-all hover:bg-boutique-sage hover:text-boutique-ink hover:border-boutique-sage dark:border-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink dark:hover:bg-boutique-sage dark:hover:text-boutique-ink">
            <span>Get in touch</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  </main>

  ${getFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'partners.html'), html);
  if (!fs.existsSync(path.join(ROOT_DIR, 'partners'))) fs.mkdirSync(path.join(ROOT_DIR, 'partners'));
  fs.writeFileSync(path.join(ROOT_DIR, 'partners', 'index.html'), html);
  console.log('Successfully generated partners.html');
}

// 2. GENERATE BLOG INDEX PAGE
function generateBlogIndexPage() {
  const cardsHtml = POSTS.map((p, idx) => {
    const color = COLORS[p.colorIndex];
    return `
      <article data-post-slug="${p.slug}" data-post-category="${p.category}" data-search-text="${(p.title + ' ' + p.excerpt + ' ' + p.category + ' ' + p.author).toLowerCase()}" class="blog-card group relative block border-2 border-boutique-ink bg-white/90 p-4 shadow-[var(--shadow-sticker-lift)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-none dark:border-white/10 dark:bg-dark-elevated/88 dark:shadow-none dark:hover:bg-dark-elevated sm:p-6 lg:p-8 rounded-[var(--radius-modal)]">
        <a href="/blog/${p.slug}" class="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-7 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <div class="relative flex aspect-[1.55] items-center justify-center overflow-hidden rounded-2xl border-2 border-boutique-ink dark:border-4 dark:border-white/15 md:aspect-square ${color.bgClass} ${color.textClass}" style="background-image:radial-gradient(circle, rgba(42,42,42,0.08) 1px, transparent 1px); background-size:20px 20px;">
            <div class="h-[94%] w-[94%] flex items-center justify-center">
              ${p.svg}
            </div>
          </div>
          <div class="flex min-w-0 flex-col justify-center py-1">
            <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-boutique-ink/45 dark:text-boutique-cream/45 sm:mb-4 sm:gap-x-4 sm:text-sm">
              <span class="rounded-full border-2 border-boutique-ink px-3 py-1 text-[11px] text-boutique-ink dark:border-4 dark:border-white/15 sm:px-4 sm:text-xs ${color.pillClass}">${p.category}</span>
              <span class="min-w-0">
                <time datetime="${p.date}">${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</time> • ${p.readTime} min read
              </span>
            </div>
            <h2 class="max-w-[620px] text-[20px] sm:text-[24px] font-black leading-[1.15] tracking-tight text-boutique-ink transition-colors group-hover:text-boutique-sage dark:text-boutique-cream dark:group-hover:text-boutique-sage">
              ${p.title}
            </h2>
            <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-boutique-ink/65 dark:text-boutique-cream/65 sm:text-base font-medium">
              ${p.excerpt}
            </p>
            <div class="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-boutique-sage-deep dark:text-boutique-sage">
              <span>Read playbook</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join('\n');

  const categories = ['All', ...new Set(POSTS.map(p => p.category))];
  const catPills = categories.map((c, i) => `
    <button type="button" onclick="filterCategory('${c}')" data-cat-btn="${c}" class="cat-filter-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${i === 0 ? 'bg-boutique-ink text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink' : 'border border-boutique-ink/10 dark:border-white/10 text-boutique-ink/60 dark:text-boutique-cream/60 hover:bg-boutique-sage/10'}">
      ${c}
    </button>
  `).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  ${getCommonHead("Journal & Study Guides", "Practical IGCSE revision playbooks, past paper strategies, error log frameworks, and technical writeups from QuickMark.")}
</head>
<body class="bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream font-sans antialiased min-h-screen flex flex-col selection:bg-boutique-sage selection:text-boutique-ink">
  ${getHeader('blog')}

  <main class="flex-1">
    <!-- Header Banner -->
    <section class="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div class="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div class="organic-blob absolute -left-28 -top-28 h-[360px] w-[360px] bg-boutique-sage opacity-20 dark:opacity-10 sm:h-[520px] sm:w-[520px]"></div>
        <div class="organic-blob absolute -right-28 top-1/3 h-[320px] w-[320px] bg-boutique-coral opacity-15 dark:opacity-10 sm:h-[480px] sm:w-[480px]"></div>
      </div>

      <div class="max-w-4xl mx-auto text-center space-y-6">
        <div class="inline-block">
          <div class="h-[2px] w-12 bg-boutique-sage mx-auto mb-3"></div>
          <p class="text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/60 dark:text-boutique-cream/60">QuickMark Journal</p>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-boutique-ink dark:text-boutique-cream">
          Playbooks & Revision Strategy
        </h1>
        <p class="text-base sm:text-lg font-medium text-boutique-ink/60 dark:text-boutique-cream/70 max-w-2xl mx-auto">
          Tactical frameworks, MCQ timing workflows, error log systems, and platform breakdowns for Cambridge students.
        </p>
      </div>
    </section>

    <!-- Filter & Search Controls -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-8 space-y-4">
      <div class="rounded-[var(--radius-modal)] border-2 border-boutique-ink bg-white/90 p-4 shadow-[var(--shadow-sticker-lift)] backdrop-blur-sm dark:border-white/10 dark:bg-dark-elevated/88 dark:shadow-none sm:p-5">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label class="relative block flex-1">
            <span class="sr-only">Search blogs</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-boutique-ink/35 dark:text-boutique-cream/35"><path d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"/></svg>
            <input id="searchInput" type="search" placeholder="Search guides, strategies, errors, topics..." oninput="handleSearch()" class="h-14 w-full rounded-full border-2 border-boutique-ink/10 bg-boutique-cream/80 pl-12 pr-12 text-sm font-bold text-boutique-ink placeholder:text-boutique-ink/35 focus:border-boutique-sage dark:border-white/10 dark:bg-dark-surface/70 dark:text-boutique-cream dark:placeholder:text-boutique-cream/35 sm:text-base"/>
          </label>
          <div class="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-boutique-ink/45 dark:text-boutique-cream/45">
            <span id="resultsCount" class="rounded-full border-2 border-boutique-ink/10 bg-boutique-cream/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">${POSTS.length} Results</span>
          </div>
        </div>
      </div>

      <!-- Categories Pills -->
      <div class="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
        ${catPills}
      </div>
    </section>

    <!-- Blog Posts Feed -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <div id="postsContainer" class="space-y-6">
        ${cardsHtml}
      </div>
      
      <div id="noResults" class="hidden text-center py-16 border-2 border-dashed border-boutique-ink/20 dark:border-white/20 rounded-2xl">
        <p class="text-lg font-bold text-boutique-ink/60 dark:text-boutique-cream/60">No articles matched your search.</p>
        <button onclick="clearSearch()" class="mt-4 px-6 py-2.5 rounded-full bg-boutique-ink text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink font-black text-sm">Reset filters</button>
      </div>
    </section>
  </main>

  ${getFooter()}

  <script>
    let activeCategory = 'All';
    
    function handleSearch() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.blog-card');
      let visible = 0;

      cards.forEach(card => {
        const text = card.getAttribute('data-search-text');
        const cat = card.getAttribute('data-post-category');
        
        const matchesCategory = (activeCategory === 'All' || cat === activeCategory);
        const matchesQuery = (!q || text.includes(q));

        if (matchesCategory && matchesQuery) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      document.getElementById('resultsCount').innerText = visible + (visible === 1 ? ' Result' : ' Results');
      document.getElementById('noResults').classList.toggle('hidden', visible > 0);
    }

    function filterCategory(cat) {
      activeCategory = cat;
      document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-cat-btn') === cat;
        btn.className = 'cat-filter-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ' +
          (isMatch ? 'bg-boutique-ink text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink' : 'border border-boutique-ink/10 dark:border-white/10 text-boutique-ink/60 dark:text-boutique-cream/60 hover:bg-boutique-sage/10');
      });
      handleSearch();
    }

    function clearSearch() {
      document.getElementById('searchInput').value = '';
      filterCategory('All');
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'blog.html'), html);
  if (!fs.existsSync(path.join(ROOT_DIR, 'blog'))) fs.mkdirSync(path.join(ROOT_DIR, 'blog'));
  fs.writeFileSync(path.join(ROOT_DIR, 'blog', 'index.html'), html);
  console.log('Successfully generated blog.html');
}

// 3. GENERATE ALL 10 BLOG POST PAGES
function generateAllBlogPosts() {
  POSTS.forEach(post => {
    // Read raw markdown / content from `blog/${post.slug} (2).html`
    const rscPath = path.join(ROOT_DIR, 'blog', `${post.slug} (2).html`);
    let markdownLines = [];
    if (fs.existsSync(rscPath)) {
      const raw = fs.readFileSync(rscPath, 'utf8');
      const lines = raw.split('\n');
      markdownLines = lines.filter(l => !l.match(/^[0-9a-f]+:/));
    }

    // Convert markdown lines into beautiful HTML sections
    let contentHtml = '';
    let inList = false;
    let listType = 'ul';

    markdownLines.forEach(line => {
      line = line.trim();
      if (!line) {
        if (inList) {
          contentHtml += `</${listType}>\n`;
          inList = false;
        }
        return;
      }

      if (line.startsWith('## ')) {
        if (inList) { contentHtml += `</${listType}>\n`; inList = false; }
        const h2 = line.replace('## ', '');
        const id = h2.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        contentHtml += `<h2 id="${id}" class="text-2xl sm:text-3xl font-black tracking-tight text-boutique-ink dark:text-boutique-cream mt-12 mb-4 scroll-mt-28">${h2}</h2>\n`;
      } else if (line.startsWith('### ')) {
        if (inList) { contentHtml += `</${listType}>\n`; inList = false; }
        const h3 = line.replace('### ', '');
        const id = h3.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        contentHtml += `<h3 id="${id}" class="text-xl sm:text-2xl font-bold tracking-tight text-boutique-ink dark:text-boutique-cream mt-8 mb-3 scroll-mt-28">${h3}</h3>\n`;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList || listType !== 'ul') {
          if (inList) contentHtml += `</${listType}>\n`;
          contentHtml += `<ul class="list-disc pl-6 space-y-2 my-4 text-base sm:text-lg leading-relaxed text-boutique-ink/80 dark:text-boutique-cream/80 font-medium">\n`;
          inList = true;
          listType = 'ul';
        }
        const item = line.replace(/^[-*]\s+/, '');
        contentHtml += `<li>${item}</li>\n`;
      } else if (/^\d+\.\s+/.test(line)) {
        if (!inList || listType !== 'ol') {
          if (inList) contentHtml += `</${listType}>\n`;
          contentHtml += `<ol class="list-decimal pl-6 space-y-2 my-4 text-base sm:text-lg leading-relaxed text-boutique-ink/80 dark:text-boutique-cream/80 font-medium">\n`;
          inList = true;
          listType = 'ol';
        }
        const item = line.replace(/^\d+\.\s+/, '');
        contentHtml += `<li>${item}</li>\n`;
      } else if (line.startsWith('> ')) {
        if (inList) { contentHtml += `</${listType}>\n`; inList = false; }
        contentHtml += `<blockquote class="border-l-4 border-boutique-sage bg-boutique-sage/10 p-4 rounded-r-2xl my-6 font-medium text-boutique-ink dark:text-boutique-cream italic">${line.replace('> ', '')}</blockquote>\n`;
      } else {
        if (inList) { contentHtml += `</${listType}>\n`; inList = false; }
        contentHtml += `<p class="text-base sm:text-lg leading-relaxed text-boutique-ink/80 dark:text-boutique-cream/80 font-medium my-4">${line}</p>\n`;
      }
    });

    if (inList) {
      contentHtml += `</${listType}>\n`;
    }

    const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
    const relatedHtml = related.map(rp => `
      <a href="/blog/${rp.slug}" class="p-6 border-2 border-boutique-ink/10 dark:border-white/10 rounded-2xl bg-white dark:bg-dark-elevated hover:border-boutique-sage transition-all block group">
        <span class="text-xs font-bold uppercase tracking-wider text-boutique-sage-deep dark:text-boutique-sage">${rp.category}</span>
        <h4 class="font-black text-lg text-boutique-ink dark:text-boutique-cream group-hover:text-boutique-sage transition-colors mt-2 mb-2 line-clamp-2">${rp.title}</h4>
        <p class="text-sm font-medium text-boutique-ink/60 dark:text-boutique-cream/60 line-clamp-2">${rp.excerpt}</p>
      </a>
    `).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  ${getCommonHead(post.title, post.excerpt)}
</head>
<body class="bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream font-sans antialiased min-h-screen flex flex-col selection:bg-boutique-sage selection:text-boutique-ink">
  ${getHeader('blog')}

  <main class="flex-1">
    <!-- Article Header -->
    <header class="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 border-b border-boutique-ink/10 dark:border-white/10">
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-boutique-ink/50 dark:text-boutique-cream/50">
          <a href="/blog" class="hover:text-boutique-sage transition-colors">Blog</a>
          <span>/</span>
          <span class="text-boutique-sage-deep dark:text-boutique-sage">${post.category}</span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-boutique-ink dark:text-boutique-cream">
          ${post.title}
        </h1>

        <p class="text-lg sm:text-xl font-medium text-boutique-ink/70 dark:text-boutique-cream/70 leading-relaxed">
          ${post.excerpt}
        </p>

        <!-- Author & Date Info -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-boutique-ink/10 dark:border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-boutique-sage/30 flex items-center justify-center font-black text-sm text-boutique-sage-deep dark:text-boutique-sage">
              VS
            </div>
            <div>
              <p class="text-sm font-black text-boutique-ink dark:text-boutique-cream">${post.author}</p>
              <p class="text-xs font-bold text-boutique-ink/40 dark:text-boutique-cream/40">Founder & Lead Developer, QuickMark</p>
            </div>
          </div>
          
          <div class="text-xs font-bold text-boutique-ink/50 dark:text-boutique-cream/50 uppercase tracking-wider">
            <span>${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span> • <span>${post.readTime} min read</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Article Body -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <article class="prose prose-lg dark:prose-invert max-w-none">
        ${contentHtml}
      </article>

      <!-- CTA Box -->
      <div class="my-16 p-8 rounded-3xl border-2 border-boutique-ink bg-boutique-sage/15 dark:border-white/15 dark:bg-dark-elevated text-center space-y-4">
        <h3 class="text-2xl font-black text-boutique-ink dark:text-boutique-cream">Put this into practice today</h3>
        <p class="text-base font-medium text-boutique-ink/70 dark:text-boutique-cream/70 max-w-xl mx-auto">
          Start timed past papers, topical drills, or compete in live ranked multiplayer tests on QuickMark.
        </p>
        <div>
          <a href="/app/practice" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-boutique-ink text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink font-black text-sm shadow-[var(--shadow-sticker-soft)] hover:bg-boutique-sage hover:text-boutique-ink transition-all">
            <span>Start Practice Now</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <!-- Related Posts -->
      <div class="mt-16 pt-12 border-t border-boutique-ink/10 dark:border-white/10">
        <h3 class="text-2xl font-black text-boutique-ink dark:text-boutique-cream mb-6">More revision playbooks</h3>
        <div class="grid sm:grid-cols-3 gap-6">
          ${relatedHtml}
        </div>
      </div>
    </section>
  </main>

  ${getFooter()}
</body>
</html>`;

    fs.writeFileSync(path.join(ROOT_DIR, 'blog', `${post.slug}.html`), html);
  });
  console.log('Successfully generated all 10 blog article pages!');
}

generatePartnersPage();
generateBlogIndexPage();
generateAllBlogPosts();
