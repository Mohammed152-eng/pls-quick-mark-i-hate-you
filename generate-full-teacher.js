import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'www.quickmark.co');

const headerHtml = `
<header class="fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,backdrop-filter,transform,opacity] duration-300 ease-in-out py-6 bg-transparent translate-y-0 opacity-100" aria-hidden="false">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
    <a href="/" class="flex items-center gap-4 cursor-pointer mr-3 sm:mr-6 text-decoration-none">
      <button class="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 aspect-square rounded-full flex items-center justify-center shadow-[var(--shadow-sticker)] dark:shadow-[var(--shadow-sticker-dark)] active:shadow-none transition-shadow p-0" tabindex="0" style="transform:none">
        <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">
          <span class="block shrink-0 overflow-hidden rounded-full h-full w-full">
            <img src="/favicon.svg" width="40" height="40" alt="QuickMark" draggable="false" class="h-full w-full scale-[1.147] select-none"/>
          </span>
        </span>
      </button>
      <span class="text-3xl font-display font-black tracking-tight hidden sm:block text-boutique-ink dark:text-boutique-cream">QuickMark.</span>
    </a>
    
    <nav class="hidden lg:flex items-center gap-1 p-1.5 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-200 ease-out border-transparent">
      <a href="/" class="px-6 py-3 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/40 dark:text-boutique-cream/60 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Features</a>
      <a href="/teacher" class="px-6 py-3 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink dark:text-boutique-cream bg-white dark:bg-dark-elevated border-2 border-boutique-ink dark:border-white/20 shadow-[var(--shadow-sticker-sm)] transition-all">For Teachers</a>
      <a href="/blog" class="px-6 py-3 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/40 dark:text-boutique-cream/60 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Blog</a>
      <a href="/partners" class="px-6 py-3 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/40 dark:text-boutique-cream/60 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Partners</a>
      <a href="/#leaderboard" class="px-6 py-3 rounded-full text-sm font-black whitespace-nowrap text-boutique-ink/40 dark:text-boutique-cream/60 hover:text-boutique-ink dark:hover:text-boutique-cream hover:bg-boutique-sage/10 dark:hover:bg-boutique-sage/15 transition-all">Leaderboard</a>
    </nav>
    
    <div class="flex items-center gap-6">
      <a href="/app/practice" class="sticker-button hidden h-12 items-center !py-0 !px-6 text-sm sm:flex" tabindex="0" style="transform:none">
        <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">Start Practice</span>
      </a>
      <button id="theme-toggle-btn" class="w-12 h-12 rounded-full border-2 border-boutique-ink dark:border-boutique-sage/25 bg-white dark:bg-dark-elevated flex items-center justify-center text-boutique-ink dark:text-boutique-cream shadow-[var(--shadow-sticker-sm)] dark:shadow-[var(--shadow-sticker-dark)] active:shadow-none p-0 cursor-pointer" tabindex="0" style="transform:none" aria-label="Toggle theme">
        <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </span>
      </button>
    </div>
  </div>
</header>
`;

const footerHtml = `
<footer data-marketing-footer="true" class="relative overflow-hidden border-t-2 border-boutique-ink bg-boutique-cream px-4 pb-10 pt-16 text-boutique-ink dark:border-boutique-cream dark:bg-dark-bg dark:text-boutique-cream sm:px-6 sm:pt-20">
  <div class="relative z-10 mx-auto max-w-6xl">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <span class="inline-flex items-center" style="gap:11.2px">
        <span class="block shrink-0 overflow-hidden rounded-full" style="width:40px;height:40px">
          <img src="/favicon.svg" width="40" height="40" alt="QuickMark" draggable="false" class="h-full w-full scale-[1.147] select-none"/>
        </span>
        <span class="font-display font-black tracking-tight text-boutique-ink dark:text-boutique-cream" style="font-size:24.8px;line-height:1">QuickMark.</span>
      </span>
      <span class="eyebrow text-boutique-ink/45 dark:text-boutique-cream/45">QM/26/HOME/01</span>
    </div>
    <div class="mt-16 grid gap-10 sm:grid-cols-12 sm:gap-8">
      <div class="grid grid-cols-2 gap-8 sm:col-span-8 sm:grid-cols-4 sm:gap-6">
        <ul class="space-y-3.5 text-[15px] font-bold">
          <li class="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-35">Product</li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/#leaderboard">Global rankings</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/teacher">For teachers</a></li>
        </ul>
        <ul class="space-y-3.5 text-[15px] font-bold">
          <li class="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-35">Learn</li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/blog">Journal</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/learn">Revision Hub</a></li>
        </ul>
        <ul class="space-y-3.5 text-[15px] font-bold">
          <li class="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-35">Legal</li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/privacy">Privacy</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/terms">Terms</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/editorial-standards">Editorial</a></li>
        </ul>
        <ul class="space-y-3.5 text-[15px] font-bold">
          <li class="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-35">Contact</li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/about">About</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/partners">Partners</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/help">Help</a></li>
          <li class="opacity-55 transition-opacity duration-150 hover:opacity-100"><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="sm:col-span-4 sm:col-start-9 sm:flex sm:items-start sm:justify-end">
        <a class="inline-block" href="/app/practice">
          <button tabindex="-1" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-boutique-sage focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-dark-bg dark:focus-visible:ring-boutique-sage bg-boutique-ink dark:bg-boutique-cream border-2 border-boutique-ink dark:border-boutique-cream text-boutique-cream dark:text-boutique-ink shadow-[var(--shadow-sticker-soft)] dark:shadow-[var(--shadow-sticker-dark)] hover:shadow-[var(--shadow-sticker-soft-lift)] dark:hover:shadow-[var(--shadow-sticker-dark)] active:shadow-none transition-shadow duration-150 h-auto px-8 py-4 text-base">
            <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">Start free practice
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </span>
          </button>
        </a>
      </div>
    </div>
    <div class="mt-16 flex items-center gap-4 border-t border-boutique-ink/10 pt-8 dark:border-white/10 sm:mt-24">
      <span class="font-mono text-[10px] font-bold tracking-[0.07em] text-boutique-ink/30 dark:text-boutique-cream/30">© 2026 QuickMark</span>
    </div>
  </div>
  <div aria-hidden="true" class="pointer-events-none relative mt-6 overflow-hidden sm:mt-10">
    <p class="display-heading -mb-[0.08em] whitespace-nowrap text-center text-[clamp(56px,17vw,320px)] leading-none text-boutique-ink/5 dark:text-boutique-cream/5">QuickMark</p>
  </div>
</footer>
`;

const teacherFullHtml = `<!DOCTYPE html>
<html lang="en" data-scroll-behavior="smooth" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="stylesheet" href="/_next/static/chunks/1yqc0je-jeg6o.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/28t21d98xnf1y.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <title>For Teachers, Create & Share Assignments | QuickMark</title>
  <meta name="description" content="Create paper assignments, share with students, and track their scores in real-time."/>
  <link rel="icon" href="/favicon.png"/>
  <link rel="apple-touch-icon" href="/favicon.png"/>
</head>
<body class="bg-boutique-cream dark:bg-dark-bg text-boutique-ink dark:text-boutique-cream selection:bg-boutique-sage/40 overflow-x-hidden min-h-screen">
  ${headerHtml}
  
  <main class="relative z-10 pt-20">
    <!-- SECTION 1: TeacherHero -->
    <section data-scene="teacher-hero" class="relative overflow-hidden bg-boutique-cream pb-28 pt-20 dark:bg-dark-bg sm:pb-24 sm:pt-36">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid gap-14 sm:grid-cols-12 sm:items-center sm:gap-10">
          
          <div class="sm:col-span-6">
            <span data-scene="t-eyebrow" class="mb-5 inline-block -rotate-1 rounded-full border-[1.5px] border-boutique-ink bg-boutique-lavender px-4 py-1.5 font-mono text-sm font-bold text-boutique-ink" style="box-shadow:var(--shadow-sticker-sm)">
              for teachers
            </span>
            
            <h1 data-scene="t-h1" class="display-lg text-boutique-ink dark:text-boutique-cream font-black tracking-tight text-5xl sm:text-6xl leading-[1.08]">
              Set a paper.<br/>See every score.
            </h1>
            
            <p data-scene="t-lede" class="lede mt-6 max-w-md text-boutique-ink/60 dark:text-boutique-cream/60 text-lg">
              Turn any past paper into a shareable assignment. Students join with a code, scores land automatically.
            </p>
            
            <div data-scene="t-cta" class="mt-8">
              <a href="/app/practice" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-boutique-sage focus-visible:ring-offset-2 bg-boutique-ink dark:bg-boutique-cream border-2 border-boutique-ink dark:border-boutique-cream text-boutique-cream dark:text-boutique-ink shadow-[var(--shadow-sticker-soft)] dark:shadow-[var(--shadow-sticker-dark)] hover:shadow-[var(--shadow-sticker-soft-lift)] dark:hover:shadow-[var(--shadow-sticker-dark)] active:shadow-none transition-shadow duration-150 h-auto px-8 py-4 text-base">
                <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">
                  Open dashboard
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </span>
              </a>
            </div>
            
            <div data-scene="t-strip" class="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-boutique-ink/40 dark:text-boutique-cream/40">
              <span>No student accounts</span>
              <span>No marking pile</span>
            </div>
          </div>
          
          <div class="relative sm:col-span-6 sm:col-start-7 sm:pt-4">
            <!-- Join Code Sticker -->
            <div data-scene="t-slip" class="absolute -right-2 -top-8 rotate-[-6deg] rounded-lg border-2 border-boutique-ink bg-boutique-highlighter px-5 py-3 sm:-right-6 z-20" style="box-shadow:var(--shadow-sticker)">
              <div aria-hidden="true" class="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-3 border border-boutique-ink/10 bg-white/60"></div>
              <span class="block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-boutique-ink/50">join code</span>
              <span class="font-mono text-xl font-bold tracking-[0.08em] text-boutique-ink">BRX-204</span>
            </div>

            <!-- Paper Sheet -->
            <div data-scene="t-sheet" class="paper-sheet mx-auto max-w-sm rotate-1 p-6 relative border-2 border-boutique-ink bg-white dark:bg-dark-elevated rounded-2xl" style="box-shadow:var(--shadow-sticker)">
              <div class="mb-4 flex items-center justify-between border-b-[1.5px] border-boutique-ink pb-3 dark:border-boutique-cream">
                <span class="text-sm font-black text-boutique-ink dark:text-boutique-cream">Class 10B · 0625/11</span>
                <span class="font-mono text-[10px] font-bold text-boutique-ink/40 dark:text-boutique-cream/40">4 students</span>
              </div>
              
              <div class="flex flex-col divide-y divide-dashed divide-boutique-ink/15 dark:divide-white/15">
                <div data-scene="t-row" class="relative flex items-center justify-between py-2.5">
                  <span class="text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Gangadutt S.</span>
                  <span class="flex items-center gap-1.5 font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5 text-boutique-sage-deep dark:text-boutique-sage"><path d="M4.5 13.2c2.1 1.6 3.4 3.3 4.6 5.1C12 12.9 15.4 8.4 20 4.8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    36/40
                  </span>
                </div>
                
                <div data-scene="t-row" class="relative flex items-center justify-between py-2.5">
                  <span class="text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Ved S.</span>
                  <span class="flex items-center gap-1.5 font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5 text-boutique-sage-deep dark:text-boutique-sage"><path d="M4.5 13.2c2.1 1.6 3.4 3.3 4.6 5.1C12 12.9 15.4 8.4 20 4.8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    34/40
                  </span>
                </div>
                
                <div data-scene="t-row" class="relative flex items-center justify-between py-2.5">
                  <span class="text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Aarav K.</span>
                  <span class="flex items-center gap-1.5 font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5 text-boutique-sage-deep dark:text-boutique-sage"><path d="M4.5 13.2c2.1 1.6 3.4 3.3 4.6 5.1C12 12.9 15.4 8.4 20 4.8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    31/40
                  </span>
                </div>
                
                <div data-scene="t-row" class="relative flex items-center justify-between py-2.5">
                  <span class="text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Keerthan B.</span>
                  <span class="flex items-center gap-1.5 font-mono text-xs font-bold text-boutique-ink/45 dark:text-boutique-cream/45">
                    in progress<span class="inline-flex w-3 justify-start" aria-hidden="true">…</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: CodeJourney (Stations 01 -> 04 connected by curvy path) -->
    <section data-scene="code-journey" class="bg-white py-20 dark:bg-dark-surface sm:py-28">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <div class="relative">
          
          <!-- Serpentine background line on desktop -->
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" class="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
            <path d="M50 1 C46 5 24 6 24 13 C24 24 76 24 76 37 C76 50 24 51 24 63 C24 76 76 76 76 88 C76 95 60 97 50 99" fill="none" stroke-width="0.5" stroke-dasharray="1.5 2.5" stroke-linecap="round" class="text-boutique-ink/25 dark:text-boutique-cream/20" stroke="currentColor"></path>
            <path data-scene="ink-path" d="M50 1 C46 5 24 6 24 13 C24 24 76 24 76 37 C76 50 24 51 24 63 C24 76 76 76 76 88 C76 95 60 97 50 99" fill="none" stroke-width="0.7" stroke-linecap="round" class="text-boutique-coral-deep dark:text-boutique-coral" stroke="currentColor"></path>
          </svg>

          <!-- Mobile vertical line -->
          <svg aria-hidden="true" viewBox="0 0 4 1000" preserveAspectRatio="none" class="pointer-events-none absolute left-1 top-0 block h-full w-2 sm:hidden">
            <path d="M2 0 L2 1000" stroke-width="2" stroke-dasharray="6 10" class="text-boutique-ink/25 dark:text-boutique-cream/20" stroke="currentColor"></path>
            <path data-scene="ink-path" d="M2 0 L2 1000" stroke-width="3" class="text-boutique-coral-deep dark:text-boutique-coral" stroke="currentColor"></path>
          </svg>

          <div class="relative flex flex-col gap-16 sm:gap-24">
            
            <!-- Station 01: Create -->
            <div data-scene="station" class="flex pl-9 sm:pl-0 sm:justify-start">
              <div class="relative w-full max-w-[440px]">
                <span data-scene="station-dot" class="absolute -left-9 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-boutique-ink bg-white font-mono text-[10px] font-bold text-boutique-ink dark:border-boutique-cream dark:bg-dark-surface dark:text-boutique-cream sm:top-2">01</span>
                <div data-scene="station-copy" class="relative -mx-2 -my-1 bg-white px-2 py-1 dark:bg-dark-surface">
                  <h3 class="display-sm text-boutique-ink dark:text-boutique-cream text-2xl font-black">Create.</h3>
                  <p class="mt-2 max-w-md text-[15px] leading-relaxed text-boutique-ink/70 dark:text-boutique-cream/70">Pick any past paper with simple dropdowns — board, subject, year, session, paper. A unique shareable code prints in seconds.</p>
                </div>
                <div data-scene="shot" class="mt-5 overflow-hidden rounded-2xl p-3 bg-boutique-lavender/25 dark:bg-boutique-lavender/[0.07]" style="box-shadow:var(--shadow-sticker-soft)">
                  <div class="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-dark-elevated">
                    <div class="flex items-center gap-1.5 border-b border-boutique-ink/8 px-3 py-2 dark:border-white/8">
                      <span class="h-2 w-2 rounded-full bg-boutique-coral/60"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-highlighter"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-sage/70"></span>
                      <span class="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-boutique-ink/30 dark:text-boutique-cream/30">quickmark.co/app</span>
                    </div>
                    <div class="p-4 flex flex-col gap-2.5">
                      <span class="text-[11px] font-black text-boutique-ink dark:text-boutique-cream">Create assignment</span>
                      <div>
                        <span class="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Board</span>
                        <div class="flex items-center justify-between rounded-lg border-[1.5px] border-boutique-ink/15 bg-boutique-cream px-2.5 py-1.5 text-[11px] font-bold text-boutique-ink dark:border-white/12 dark:bg-dark-surface dark:text-boutique-cream">
                          <span>IGCSE</span><span aria-hidden="true" class="ml-1 text-boutique-ink/40">▾</span>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <span class="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Subject</span>
                          <div class="flex items-center justify-between rounded-lg border-[1.5px] border-boutique-ink/15 bg-boutique-cream px-2.5 py-1.5 text-[11px] font-bold text-boutique-ink dark:border-white/12 dark:bg-dark-surface dark:text-boutique-cream">
                            <span class="truncate">Biology (0610)</span><span aria-hidden="true" class="ml-1 text-boutique-ink/40">▾</span>
                          </div>
                        </div>
                        <div>
                          <span class="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Year</span>
                          <div class="flex items-center justify-between rounded-lg border-[1.5px] border-boutique-ink/15 bg-boutique-cream px-2.5 py-1.5 text-[11px] font-bold text-boutique-ink dark:border-white/12 dark:bg-dark-surface dark:text-boutique-cream">
                            <span>2024</span><span aria-hidden="true" class="ml-1 text-boutique-ink/40">▾</span>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <span class="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Session</span>
                          <div class="flex items-center justify-between rounded-lg border-[1.5px] border-boutique-ink/15 bg-boutique-cream px-2.5 py-1.5 text-[11px] font-bold text-boutique-ink dark:border-white/12 dark:bg-dark-surface dark:text-boutique-cream">
                            <span>May/June</span><span aria-hidden="true" class="ml-1 text-boutique-ink/40">▾</span>
                          </div>
                        </div>
                        <div>
                          <span class="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-boutique-ink/45 dark:text-boutique-cream/45">Paper</span>
                          <div class="flex items-center justify-between rounded-lg border-[1.5px] border-boutique-ink/15 bg-boutique-cream px-2.5 py-1.5 text-[11px] font-bold text-boutique-ink dark:border-white/12 dark:bg-dark-surface dark:text-boutique-cream">
                            <span>12</span><span aria-hidden="true" class="ml-1 text-boutique-ink/40">▾</span>
                          </div>
                        </div>
                      </div>
                      <div class="mt-1 flex items-center justify-between rounded-lg bg-boutique-ink px-3 py-2 text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink">
                        <span class="text-[11px] font-black">Create & get code</span>
                        <span class="font-mono text-[11px] font-bold tracking-[0.14em] text-boutique-highlighter dark:text-boutique-coral-deep">BRX-204</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Station 02: Share -->
            <div data-scene="station" class="flex pl-9 sm:pl-0 sm:justify-end">
              <div class="relative w-full max-w-[440px]">
                <span data-scene="station-dot" class="absolute -left-9 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-boutique-ink bg-white font-mono text-[10px] font-bold text-boutique-ink dark:border-boutique-cream dark:bg-dark-surface dark:text-boutique-cream sm:top-2">02</span>
                <div data-scene="station-copy" class="relative -mx-2 -my-1 bg-white px-2 py-1 dark:bg-dark-surface">
                  <h3 class="display-sm text-boutique-ink dark:text-boutique-cream text-2xl font-black">Share.</h3>
                  <p class="mt-2 max-w-md text-[15px] leading-relaxed text-boutique-ink/70 dark:text-boutique-cream/70">Copy the code or a direct join link and send it by WhatsApp or email. Students join in one tap, no account needed.</p>
                </div>
                <div data-scene="shot" class="mt-5 overflow-hidden rounded-2xl p-3 bg-boutique-sky/30 dark:bg-boutique-sky/[0.07]" style="box-shadow:var(--shadow-sticker-soft)">
                  <div class="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-dark-elevated">
                    <div class="flex items-center gap-1.5 border-b border-boutique-ink/8 px-3 py-2 dark:border-white/8">
                      <span class="h-2 w-2 rounded-full bg-boutique-coral/60"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-highlighter"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-sage/70"></span>
                      <span class="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-boutique-ink/30 dark:text-boutique-cream/30">quickmark.co/app</span>
                    </div>
                    <div class="p-4 flex flex-col gap-3">
                      <div class="rounded-xl bg-boutique-cream py-3 text-center dark:bg-dark-surface">
                        <span class="mb-1 block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-boutique-ink/40 dark:text-boutique-cream/40">Assignment code</span>
                        <span class="block font-mono text-2xl font-black italic tracking-[0.24em] text-boutique-sage-deep dark:text-boutique-sage">BRX-204</span>
                      </div>
                      <div class="flex items-center gap-2 rounded-lg border-[1.5px] border-boutique-ink/12 px-2.5 py-1.5 dark:border-white/12">
                        <span class="truncate font-mono text-[10px] text-boutique-ink/60 dark:text-boutique-cream/60">quickmark.co/join/BRX-204</span>
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <span class="rounded-full border-2 border-boutique-ink bg-white py-1.5 text-center text-[11px] font-bold text-boutique-ink dark:border-transparent dark:bg-dark-surface dark:text-boutique-cream shadow-[var(--shadow-sticker-sm)]">Copy code</span>
                        <span class="rounded-full border-2 border-boutique-ink bg-white py-1.5 text-center text-[11px] font-bold text-boutique-ink dark:border-transparent dark:bg-dark-surface dark:text-boutique-cream shadow-[var(--shadow-sticker-sm)]">Copy link</span>
                      </div>
                      <div class="flex flex-wrap gap-1.5">
                        <span class="rounded-full border-[1.5px] border-boutique-ink/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-boutique-ink/55 dark:border-white/15 dark:text-boutique-cream/55">WhatsApp</span>
                        <span class="rounded-full border-[1.5px] border-boutique-ink/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-boutique-ink/55 dark:border-white/15 dark:text-boutique-cream/55">Email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Station 03: Solve -->
            <div data-scene="station" class="flex pl-9 sm:pl-0 sm:justify-start">
              <div class="relative w-full max-w-[440px]">
                <span data-scene="station-dot" class="absolute -left-9 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-boutique-ink bg-white font-mono text-[10px] font-bold text-boutique-ink dark:border-boutique-cream dark:bg-dark-surface dark:text-boutique-cream sm:top-2">03</span>
                <div data-scene="station-copy" class="relative -mx-2 -my-1 bg-white px-2 py-1 dark:bg-dark-surface">
                  <h3 class="display-sm text-boutique-ink dark:text-boutique-cream text-2xl font-black">Solve.</h3>
                  <p class="mt-2 max-w-md text-[15px] leading-relaxed text-boutique-ink/70 dark:text-boutique-cream/70">Students answer the MCQs exactly as they would in the app. Score, time and answers auto-submit the moment they finish.</p>
                </div>
                <div data-scene="shot" class="mt-5 overflow-hidden rounded-2xl p-3 bg-boutique-highlighter/25 dark:bg-boutique-highlighter/[0.06]" style="box-shadow:var(--shadow-sticker-soft)">
                  <div class="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-dark-elevated">
                    <div class="flex items-center gap-1.5 border-b border-boutique-ink/8 px-3 py-2 dark:border-white/8">
                      <span class="h-2 w-2 rounded-full bg-boutique-coral/60"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-highlighter"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-sage/70"></span>
                      <span class="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-boutique-ink/30 dark:text-boutique-cream/30">quickmark.co/app</span>
                    </div>
                    <div class="p-4 flex flex-col gap-2.5">
                      <div class="flex items-center justify-between">
                        <span class="font-mono text-[9px] font-bold text-boutique-ink/40 dark:text-boutique-cream/40">0625/12 · Q7</span>
                        <span class="font-mono text-[9px] font-black text-boutique-sage-deep dark:text-boutique-sage">7 / 40</span>
                      </div>
                      <p class="text-[12px] font-bold leading-snug text-boutique-ink dark:text-boutique-cream">Which type of wave is used for satellite communications?</p>
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center gap-2 rounded-lg border-[1.5px] border-boutique-ink/10 px-2.5 py-1.5 text-[11px] font-medium text-boutique-ink/75 dark:border-white/10 dark:text-boutique-cream/70">
                          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-boutique-ink/25 font-mono text-[8px] font-bold dark:border-white/25">A</span>
                          Light waves
                        </div>
                        <div class="flex items-center gap-2 rounded-lg border-[1.5px] border-boutique-ink bg-boutique-sky/40 text-boutique-ink dark:border-boutique-sky dark:bg-boutique-sky/15 dark:text-boutique-cream px-2.5 py-1.5 text-[11px] font-bold">
                          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-boutique-ink/25 font-mono text-[8px] font-bold dark:border-white/25">B</span>
                          Microwaves
                        </div>
                        <div class="flex items-center gap-2 rounded-lg border-[1.5px] border-boutique-ink/10 px-2.5 py-1.5 text-[11px] font-medium text-boutique-ink/75 dark:border-white/10 dark:text-boutique-cream/70">
                          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-boutique-ink/25 font-mono text-[8px] font-bold dark:border-white/25">C</span>
                          Sound waves
                        </div>
                        <div class="flex items-center gap-2 rounded-lg border-[1.5px] border-boutique-ink/10 px-2.5 py-1.5 text-[11px] font-medium text-boutique-ink/75 dark:border-white/10 dark:text-boutique-cream/70">
                          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-boutique-ink/25 font-mono text-[8px] font-bold dark:border-white/25">D</span>
                          X-rays
                        </div>
                      </div>
                      <div class="mt-0.5 flex justify-end">
                        <span class="rounded-full bg-boutique-ink px-3 py-1 text-[11px] font-black text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink">Next →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Station 04: Score -->
            <div data-scene="station" class="flex pl-9 sm:pl-0 sm:justify-end">
              <div class="relative w-full max-w-[440px]">
                <span data-scene="station-dot" class="absolute -left-9 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-boutique-ink bg-white font-mono text-[10px] font-bold text-boutique-ink dark:border-boutique-cream dark:bg-dark-surface dark:text-boutique-cream sm:top-2">04</span>
                <div data-scene="station-copy" class="relative -mx-2 -my-1 bg-white px-2 py-1 dark:bg-dark-surface">
                  <h3 class="display-sm text-boutique-ink dark:text-boutique-cream text-2xl font-black">Score.</h3>
                  <p class="mt-2 max-w-md text-[15px] leading-relaxed text-boutique-ink/70 dark:text-boutique-cream/70">Every name, score, percentage and time lands as it comes in — colour-coded, so you spot who is struggling at a glance.</p>
                </div>
                <div data-scene="shot" class="mt-5 overflow-hidden rounded-2xl p-3 bg-boutique-sage/25 dark:bg-boutique-sage/[0.07]" style="box-shadow:var(--shadow-sticker-soft)">
                  <div class="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-dark-elevated">
                    <div class="flex items-center gap-1.5 border-b border-boutique-ink/8 px-3 py-2 dark:border-white/8">
                      <span class="h-2 w-2 rounded-full bg-boutique-coral/60"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-highlighter"></span>
                      <span class="h-2 w-2 rounded-full bg-boutique-sage/70"></span>
                      <span class="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-boutique-ink/30 dark:text-boutique-cream/30">quickmark.co/app</span>
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                      <div class="flex items-center justify-between">
                        <span class="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-boutique-ink/45 dark:text-boutique-cream/45">4 submissions</span>
                        <span class="text-[11px] font-black italic text-boutique-sage-deep dark:text-boutique-sage">Class avg 77%</span>
                      </div>
                      <div class="grid grid-cols-12 gap-1 border-b border-boutique-ink/10 pb-1 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-boutique-ink/40 dark:border-white/10 dark:text-boutique-cream/40">
                        <span class="col-span-6">Student</span>
                        <span class="col-span-2 text-right">Score</span>
                        <span class="col-span-2 text-right">%</span>
                        <span class="col-span-2 text-right">Time</span>
                      </div>
                      <div class="flex flex-col gap-1.5 divide-y divide-dashed divide-boutique-ink/10 dark:divide-white/10">
                        <div class="grid grid-cols-12 items-center gap-1 text-[11px] pt-1">
                          <span class="col-span-6 flex items-center gap-1 truncate font-bold text-boutique-ink dark:text-boutique-cream">
                            <span class="truncate">Gangadutt S.</span>
                            <span class="rounded-full bg-boutique-sage/20 px-1 py-px font-mono text-[7px] font-black uppercase tracking-wider text-boutique-sage-deep dark:text-boutique-sage">✓</span>
                          </span>
                          <span class="col-span-2 text-right font-mono font-bold text-boutique-ink/70 dark:text-boutique-cream/70">36/40</span>
                          <span class="col-span-2 text-right font-mono font-black text-boutique-sage-deep dark:text-boutique-sage">90%</span>
                          <span class="col-span-2 text-right font-mono text-boutique-ink/40 dark:text-boutique-cream/40">32m</span>
                        </div>
                        <div class="grid grid-cols-12 items-center gap-1 text-[11px] pt-1">
                          <span class="col-span-6 flex items-center gap-1 truncate font-bold text-boutique-ink dark:text-boutique-cream">
                            <span class="truncate">Ved S.</span>
                          </span>
                          <span class="col-span-2 text-right font-mono font-bold text-boutique-ink/70 dark:text-boutique-cream/70">34/40</span>
                          <span class="col-span-2 text-right font-mono font-black text-boutique-sage-deep dark:text-boutique-sage">85%</span>
                          <span class="col-span-2 text-right font-mono text-boutique-ink/40 dark:text-boutique-cream/40">38m</span>
                        </div>
                        <div class="grid grid-cols-12 items-center gap-1 text-[11px] pt-1">
                          <span class="col-span-6 flex items-center gap-1 truncate font-bold text-boutique-ink dark:text-boutique-cream">
                            <span class="truncate">Aarav K.</span>
                          </span>
                          <span class="col-span-2 text-right font-mono font-bold text-boutique-ink/70 dark:text-boutique-cream/70">22/40</span>
                          <span class="col-span-2 text-right font-mono font-black text-boutique-coral-deep dark:text-boutique-coral">55%</span>
                          <span class="col-span-2 text-right font-mono text-boutique-ink/40 dark:text-boutique-cream/40">44m</span>
                        </div>
                        <div class="grid grid-cols-12 items-center gap-1 text-[11px] pt-1">
                          <span class="col-span-6 flex items-center gap-1 truncate font-bold text-boutique-ink dark:text-boutique-cream">
                            <span class="truncate">Keerthan B.</span>
                          </span>
                          <span class="col-span-2 text-right font-mono font-bold text-boutique-ink/70 dark:text-boutique-cream/70">31/40</span>
                          <span class="col-span-2 text-right font-mono font-black text-boutique-sage-deep dark:text-boutique-sage">78%</span>
                          <span class="col-span-2 text-right font-mono text-boutique-ink/40 dark:text-boutique-cream/40">29m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: ClassSheet (Doodles with margin rule & sheet) -->
    <section class="relative bg-boutique-cream py-20 dark:bg-dark-bg sm:py-28">
      <div aria-hidden="true" class="absolute inset-y-0 left-[clamp(16px,4vw,56px)] w-0.5 bg-boutique-coral-deep/35 dark:bg-boutique-coral/25"></div>
      <div class="mx-auto max-w-6xl pl-[clamp(36px,8vw,96px)] pr-4 sm:pr-6">
        <div class="grid gap-14 sm:grid-cols-12 sm:gap-10">
          
          <!-- Annotations & Doodles -->
          <div class="order-2 flex flex-col gap-10 sm:order-1 sm:col-span-4">
            
            <!-- Hourglass Doodle -->
            <div data-scene="annotation" class="flex items-start gap-4">
              <span data-scene="annotation-doodle" class="block h-12 w-12 shrink-0 text-boutique-coral">
                <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" class="w-full" style="filter:drop-shadow(4px 4px 0 rgba(26,26,26,0.07))">
                  <g stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M52 24 h96 M52 178 h96"></path>
                    <path d="M58 24 Q58 92 100 100 Q142 108 142 178"></path>
                    <path d="M142 24 Q142 92 100 100 Q58 108 58 178"></path>
                    <path d="M80 46 Q100 62 120 46" fill="currentColor"></path>
                  </g>
                </svg>
              </span>
              <div class="pt-1">
                <p data-scene="annotation-note" class="relative inline-block max-w-[220px] text-[15px] font-semibold leading-snug text-boutique-coral-deep dark:text-boutique-coral">
                  Set an expiry, submissions close themselves.
                </p>
                <span data-scene="annotation-underline" class="mt-1 block">
                  <svg aria-hidden="true" viewBox="0 0 154 10" fill="none" class="h-[6px] w-32 text-boutique-coral-deep/70 dark:text-boutique-coral/70">
                    <path d="M3 6.8C40 2.2 80 8.4 120 3.6c14-1.4 22 1.8 30 0.4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Padlock Doodle -->
            <div data-scene="annotation" class="flex items-start gap-4">
              <span data-scene="annotation-doodle" class="block h-12 w-12 shrink-0 text-boutique-lavender">
                <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" class="w-full" style="filter:drop-shadow(4px 4px 0 rgba(26,26,26,0.07))">
                  <g stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="46" y="92" width="108" height="86" rx="10" fill="currentColor" fill-opacity="0.18"></rect>
                    <path d="M66 92 v-24 a34 34 0 0 1 68 0 v24"></path>
                    <line x1="100" y1="126" x2="100" y2="152"></line>
                  </g>
                </svg>
              </span>
              <div class="pt-1">
                <p data-scene="annotation-note" class="relative inline-block max-w-[220px] text-[15px] font-semibold leading-snug text-boutique-coral-deep dark:text-boutique-coral">
                  Guests share only the name they type. Nothing else.
                </p>
                <span data-scene="annotation-underline" class="mt-1 block">
                  <svg aria-hidden="true" viewBox="0 0 154 10" fill="none" class="h-[6px] w-32 text-boutique-coral-deep/70 dark:text-boutique-coral/70">
                    <path d="M3 6.8C40 2.2 80 8.4 120 3.6c14-1.4 22 1.8 30 0.4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
                  </svg>
                </span>
              </div>
            </div>

            <!-- PaperStack Doodle with Strike -->
            <div data-scene="annotation" class="flex items-start gap-4">
              <span data-scene="annotation-doodle" class="block h-12 w-12 shrink-0">
                <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" class="w-full" style="filter:drop-shadow(4px 4px 0 rgba(26,26,26,0.07))">
                  <g stroke="#1A1A1A" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
                    <rect x="46" y="96" width="118" height="80" rx="4" fill="#FDFBF7" transform="rotate(-4 105 136)"></rect>
                    <rect x="40" y="70" width="118" height="80" rx="4" fill="#FDFBF7" transform="rotate(3 99 110)"></rect>
                    <rect x="44" y="42" width="118" height="80" rx="4" fill="#FDFBF7" transform="rotate(-2 103 82)"></rect>
                    <line x1="66" y1="66" x2="122" y2="62" opacity="0.35"></line>
                    <line x1="66" y1="80" x2="140" y2="78" opacity="0.35"></line>
                  </g>
                </svg>
              </span>
              <div class="pt-1">
                <p data-scene="annotation-note" class="relative inline-block max-w-[220px] text-[15px] font-semibold leading-snug text-boutique-coral-deep dark:text-boutique-coral">
                  The Sunday marking pile.
                  <span data-scene="annotation-strike" aria-hidden="true" class="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-boutique-coral-deep dark:bg-boutique-coral"></span>
                </p>
              </div>
            </div>

          </div>

          <!-- Right: Sheet Table -->
          <div class="order-1 sm:order-2 sm:col-span-8">
            <div data-scene="cs-sheet" class="paper-sheet rotate-1 p-6 sm:p-7 border-2 border-boutique-ink bg-white dark:bg-dark-elevated rounded-2xl" style="box-shadow:var(--shadow-sticker)">
              <div class="mb-4 flex items-center justify-between border-b-[1.5px] border-boutique-ink pb-3 dark:border-boutique-cream">
                <span class="text-sm font-black text-boutique-ink dark:text-boutique-cream">Class 10B · Physics 0625/11</span>
                <span class="font-mono text-[10px] font-bold text-boutique-ink/40 dark:text-boutique-cream/40">4 of 4 submitted</span>
              </div>
              <div class="grid grid-cols-12 gap-2 pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-boutique-ink/40 dark:text-boutique-cream/40">
                <span class="col-span-5">Name</span>
                <span class="col-span-3 text-right">Score</span>
                <span class="col-span-2 text-right">%</span>
                <span class="col-span-2 text-right">Time</span>
              </div>
              <div class="flex flex-col divide-y divide-dashed divide-boutique-ink/15 dark:divide-white/15">
                <div class="grid grid-cols-12 items-center gap-2 py-2.5">
                  <span class="col-span-5 truncate text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Gangadutt S.</span>
                  <span class="col-span-3 text-right font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">36/40</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/60 dark:text-boutique-cream/60">90%</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/40 dark:text-boutique-cream/40">32m</span>
                </div>
                <div class="grid grid-cols-12 items-center gap-2 py-2.5">
                  <span class="col-span-5 truncate text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Ved S.</span>
                  <span class="col-span-3 text-right font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">34/40</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/60 dark:text-boutique-cream/60">85%</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/40 dark:text-boutique-cream/40">38m</span>
                </div>
                <div class="grid grid-cols-12 items-center gap-2 py-2.5">
                  <span class="col-span-5 truncate text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Aarav K.</span>
                  <span class="col-span-3 text-right font-mono text-xs font-bold text-boutique-coral-deep dark:text-boutique-coral">22/40</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/60 dark:text-boutique-cream/60">55%</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/40 dark:text-boutique-cream/40">44m</span>
                </div>
                <div class="grid grid-cols-12 items-center gap-2 py-2.5">
                  <span class="col-span-5 truncate text-[13px] font-bold text-boutique-ink dark:text-boutique-cream">Keerthan B.</span>
                  <span class="col-span-3 text-right font-mono text-xs font-bold text-boutique-sage-deep dark:text-boutique-sage">31/40</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/60 dark:text-boutique-cream/60">78%</span>
                  <span class="col-span-2 text-right font-mono text-xs text-boutique-ink/40 dark:text-boutique-cream/40">29m</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SECTION 4: TeacherClosing (Callout ticket + Sage Close Section) -->
    <div>
      <!-- Callout Ticket -->
      <section data-scene="callout" class="bg-white py-20 dark:bg-dark-surface sm:py-28">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
          <div data-scene="callout-ticket" class="relative mx-auto flex max-w-xl overflow-hidden rounded-2xl border-2 border-boutique-ink bg-boutique-cream dark:border-white/15 dark:bg-dark-elevated" style="box-shadow:var(--shadow-sticker)">
            <div class="flex items-center justify-center border-r-2 border-dashed border-boutique-ink/25 bg-boutique-highlighter/70 px-4 dark:border-white/20 dark:bg-boutique-highlighter/20">
              <span class="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-boutique-ink [writing-mode:vertical-rl] rotate-180">Join</span>
            </div>
            <div data-scene="callout-note" class="relative flex-1 px-6 py-8 text-center">
              <h2 class="display-sm text-boutique-ink dark:text-boutique-cream text-2xl font-black">Got a code from your teacher?</h2>
              <p class="relative mt-4 inline-block font-mono text-base font-bold text-boutique-ink dark:text-boutique-cream">
                <span data-scene="callout-highlight" aria-hidden="true" class="absolute inset-x-[-6px] top-1/2 -z-10 h-[1.1em] origin-left -translate-y-1/2 -rotate-1 rounded-sm bg-boutique-highlighter/75 dark:bg-boutique-sage/25"></span>
                <span class="relative">quickmark.co/join/CODE</span>
              </p>
              <span data-scene="callout-arrow" class="pointer-events-none absolute -bottom-3 left-1/2 block h-12 w-16 -translate-x-1/2 text-boutique-coral-deep dark:text-boutique-coral">
                <svg aria-hidden="true" viewBox="0 0 200 160" fill="none" class="h-full w-full">
                  <path d="M14 140 Q60 20 130 70 Q168 98 108 112 Q90 116 100 96 Q112 76 150 84" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M128 68 L150 84 L130 92" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Teacher Close (Sage Green Section) -->
      <section data-scene="teacher-close" class="relative overflow-hidden bg-boutique-sage px-4 py-24 dark:bg-boutique-sage sm:px-6 sm:py-32">
        <div aria-hidden="true" class="graph-paper pointer-events-none absolute inset-0 opacity-[0.4]"></div>
        <div class="relative mx-auto grid max-w-5xl items-center gap-14 sm:grid-cols-12 sm:gap-10">
          
          <div class="sm:col-span-7">
            <span class="eyebrow text-boutique-ink/50 text-xs font-bold uppercase tracking-[0.14em]">two minutes, start to scores</span>
            <h2 data-scene="close-heading" class="display-lg mt-3 max-w-xl text-boutique-ink text-4xl sm:text-5xl font-black">Set your first paper.</h2>
            <p data-scene="close-body" class="lede mt-6 max-w-md text-boutique-ink/70 text-lg">Turn any past paper into a shareable assignment and watch the scores land themselves.</p>
            <div data-scene="close-cta" class="mt-9">
              <a href="/app/practice" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-boutique-sage focus-visible:ring-offset-2 bg-boutique-ink dark:bg-boutique-ink border-2 border-boutique-ink dark:border-boutique-ink text-boutique-cream dark:text-boutique-cream shadow-[var(--shadow-sticker-soft)] dark:shadow-[var(--shadow-sticker-dark)] hover:shadow-[var(--shadow-sticker-soft-lift)] dark:hover:shadow-[var(--shadow-sticker-dark)] active:shadow-none transition-shadow duration-150 h-auto px-8 py-4 text-base">
                <span class="inline-flex w-full items-center gap-3 min-w-0 justify-center">
                  Open dashboard
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </span>
              </a>
            </div>
            <div data-scene="close-stamp-row" class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-boutique-ink/45">
              <span>Free forever</span>
              <span>No credit card</span>
              <span>Any device</span>
            </div>
          </div>

          <div class="sm:col-span-5">
            <div data-scene="close-ticket" class="relative mx-auto max-w-[300px] -rotate-2 rounded-2xl border-2 border-boutique-ink bg-white p-5 dark:bg-dark-elevated" style="box-shadow:var(--shadow-modal)">
              <div class="flex items-center justify-between border-b-[1.5px] border-dashed border-boutique-ink/25 pb-3 dark:border-white/20">
                <span class="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-boutique-ink/60 dark:text-boutique-cream/60">New assignment</span>
                <span class="rounded bg-boutique-ink px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-boutique-cream dark:bg-boutique-cream dark:text-boutique-ink">Ready</span>
              </div>
              <p class="mt-3 text-[11px] font-bold text-boutique-ink/60 dark:text-boutique-cream/60">Biology 0610 · 2024 · Paper 12</p>
              <span class="mt-4 block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-boutique-ink/40 dark:text-boutique-cream/40">Join code</span>
              <div class="mt-1 flex items-baseline gap-2">
                <span data-scene="close-code" class="font-mono text-3xl font-black italic tracking-[0.18em] text-boutique-sage-deep dark:text-boutique-sage">BRX-204</span>
              </div>
              <span aria-hidden="true" class="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-boutique-sage dark:bg-boutique-sage"></span>
              <span aria-hidden="true" class="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-boutique-sage dark:bg-boutique-sage"></span>
            </div>
          </div>

        </div>
      </section>
    </div>
  </main>

  ${footerHtml}

  <script>
    function initTheme() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    initTheme();

    document.addEventListener('DOMContentLoaded', () => {
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.toggle('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'teacher.html'), teacherFullHtml);

const teacherDir = path.join(baseDir, 'teacher');
if (!fs.existsSync(teacherDir)) {
  fs.mkdirSync(teacherDir, { recursive: true });
}
fs.writeFileSync(path.join(teacherDir, 'index.html'), teacherFullHtml);

console.log('Successfully written complete teacher page from github repo!');
