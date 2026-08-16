import fs from 'fs';
import path from 'path';

// Helper to chunk RSC content into self.__next_f script tags
function formatRSCAsScriptTags(rscContent) {
  const chunks = [];
  const chunkSize = 3500;
  for (let i = 0; i < rscContent.length; i += chunkSize) {
    const slice = rscContent.slice(i, i + chunkSize);
    chunks.push(`<script>self.__next_f.push([1,${JSON.stringify(slice)}])</script>`);
  }
  return chunks.join('\n');
}

// Extract base head & scripts from index (4).html
const baseIndex = fs.readFileSync('www.quickmark.co/index (4).html', 'utf8');

// Extract head links & styles
const headMatch = baseIndex.match(/<head>([\s\S]*?)<\/head>/);
const baseHead = headMatch ? headMatch[1] : '';

// Base chunks that load on every page
const baseScripts = [
  '/_next/static/chunks/3vtmlhx9_32d3.js',
  '/_next/static/chunks/3q1crw8-2-axn.js',
  '/_next/static/chunks/2ejk_26znfoeu.js',
  '/_next/static/chunks/3nc6x0_y5iwnk.js',
  '/_next/static/chunks/2niun102n800c.js',
  '/_next/static/chunks/turbopack-1vam6zq3cwz-a.js',
  '/_next/static/chunks/41b7_b86c05f6.js',
  '/_next/static/chunks/1w3xod3xi2utw.js',
  '/_next/static/chunks/1ntn7efqc-iiw.js',
  '/_next/static/chunks/1v3re3k_f--y2.js',
  '/_next/static/chunks/1c4j54i39kiac.js',
  '/_next/static/chunks/1hykt1bvqqwmf.js',
  '/_next/static/chunks/0uqlkj1r-5j8s.js',
  '/_next/static/chunks/04egqlolbfs2g.js',
  '/_next/static/chunks/0zkoroj62dkeq.js',
  '/_next/static/chunks/1w1sqtys51p87.js',
  '/_next/static/chunks/3tmivvbt533uc.js',
  '/_next/static/chunks/0norfn5wfc83s.js',
  '/_next/static/chunks/0jfblsttiz-2d.js',
  '/_next/static/chunks/0p2nstub2ma_0.js',
  '/_next/static/chunks/1fwsrixvsol8d.js',
  '/_next/static/chunks/2ul3_73_rc7ql.js',
  '/_next/static/chunks/2wxi_r2v4ztim.js',
  '/_next/static/chunks/44qoko-mz0h5s.js'
];

function generateHydratedHtml(title, description, canonical, bodyContent, rscFile, extraScripts = []) {
  const rscContent = fs.existsSync(rscFile) ? fs.readFileSync(rscFile, 'utf8') : '';
  const rscScripts = formatRSCAsScriptTags(rscContent);

  const scriptsToInclude = [...new Set([...baseScripts, ...extraScripts])];
  const scriptTags = scriptsToInclude.map(src => `<script src="${src}" async=""></script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-scroll-behavior="smooth" class="plus_jakarta_sans_b0d39083-module__1uT0OG__variable jetbrains_mono_19eb996b-module__MZwBYa__variable">
<head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
  <meta name="description" content="${description}"/>
  <link rel="canonical" href="https://www.quickmark.co${canonical}"/>
  <link rel="stylesheet" href="/_next/static/chunks/1yqc0je-jeg6o.css" data-precedence="next"/>
  <link rel="stylesheet" href="/_next/static/chunks/28t21d98xnf1y.css" data-precedence="next"/>
  <link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/1ycd5by80-dnr.js"/>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" as="style"/>
  <link rel="manifest" href="/manifest.webmanifest"/>
  <link rel="icon" href="/favicon.png"/>
  <link rel="apple-touch-icon" href="/favicon.png"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
  <style>
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    .animate-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
  </style>
</head>
<body class="bg-boutique-paper dark:bg-boutique-navy min-h-screen text-boutique-ink dark:text-boutique-paper/90 font-sans antialiased">
  ${bodyContent}

  <!-- Next.js Client Chunks -->
  ${scriptTags}
  <script src="/_next/static/chunks/0cz1d0mv5g_q7.js" noModule=""></script>
  <script>requestAnimationFrame(function(){$RT=performance.now()});</script>
  <script src="/_next/static/chunks/1ycd5by80-dnr.js" id="_R_" async=""></script>
  <script>$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var d=c.previousSibling;d.data="$!";var f=d._reactRetry;if(f){var g=c.dataset;if(g){var h=g.errorDigest;f(h,g.digestArgs)}else f()}d.data="$~";$RC(d,c)}};</script>
  <script>(self.__next_f=self.__next_f||[]).push([0])</script>
  ${rscScripts}
</body>
</html>`;
}

// Process all pages
console.log('Building hydrated pages with complete scripts, animations, and RSC streams...');

// 1. Process blog.html
if (fs.existsSync('www.quickmark.co/blog.html')) {
  const rawBlog = fs.readFileSync('www.quickmark.co/blog.html', 'utf8');
  const bodyMatch = rawBlog.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const currentBody = bodyMatch ? bodyMatch[1] : rawBlog;
  // Strip old script tags from body
  const cleanBody = currentBody.replace(/<script[\s\S]*?<\/script>/gi, '');

  const hydratedBlog = generateHydratedHtml(
    'Journal & Study Guides | QuickMark',
    'Practical IGCSE revision playbooks, past paper strategies, error logs, and Cambridge exam techniques written by top scorers.',
    '/blog',
    cleanBody,
    'www.quickmark.co/blog (2).html',
    ['/_next/static/chunks/1fwsrixvsol8d.js']
  );
  fs.writeFileSync('www.quickmark.co/blog.html', hydratedBlog, 'utf8');
  console.log('Updated www.quickmark.co/blog.html with full hydration');
}

// 2. Process all blog articles
const blogDir = 'www.quickmark.co/blog';
if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  for (const f of files) {
    if (f.endsWith('.html') && !f.includes('(')) {
      const slug = f.replace('.html', '');
      const fullPath = path.join(blogDir, f);
      const rscPath = path.join(blogDir, `${slug} (2).html`);
      
      const rawArticle = fs.readFileSync(fullPath, 'utf8');
      const titleMatch = rawArticle.match(/<title>([\s\S]*?)<\/title>/);
      const descMatch = rawArticle.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/);
      const bodyMatch = rawArticle.match(/<body[^>]*>([\s\S]*?)<\/body>/);
      
      const title = titleMatch ? titleMatch[1] : 'Cambridge IGCSE MCQ Guide | QuickMark';
      const description = descMatch ? descMatch[1] : 'Cambridge IGCSE revision playbook by QuickMark.';
      const body = bodyMatch ? bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '') : rawArticle;

      const hydratedArticle = generateHydratedHtml(
        title,
        description,
        `/blog/${slug}`,
        body,
        rscPath,
        ['/_next/static/chunks/2wxi_r2v4ztim.js', '/_next/static/chunks/2ul3_73_rc7ql.js']
      );
      fs.writeFileSync(fullPath, hydratedArticle, 'utf8');
      console.log(`Updated blog article: ${f}`);
    }
  }
}

// 3. Process partners, teacher, about, contact, privacy, terms, editorial-standards, learn
const otherPages = [
  { file: 'partners.html', title: 'Partners | QuickMark', desc: 'Partnering with global student communities and educators.', path: '/partners', rsc: 'www.quickmark.co/partners (2).html' },
  { file: 'teacher.html', title: 'For Teachers, Create & Share Assignments | QuickMark', desc: 'Build instant assignments, topicals, and assessments for your students.', path: '/teacher', rsc: 'www.quickmark.co/teacher (4).html' },
  { file: 'about.html', title: 'About Us | QuickMark', desc: 'About QuickMark - The smarter way to practice Cambridge MCQs.', path: '/about', rsc: 'www.quickmark.co/about (2).html' },
  { file: 'contact.html', title: 'Contact Us | QuickMark', desc: 'Get in touch with the QuickMark team.', path: '/contact', rsc: 'www.quickmark.co/contact (2).html' },
  { file: 'privacy.html', title: 'Privacy Policy | QuickMark', desc: 'QuickMark Privacy Policy and data protection.', path: '/privacy', rsc: 'www.quickmark.co/privacy (3).html' },
  { file: 'terms.html', title: 'Terms of Service | QuickMark', desc: 'QuickMark Terms of Service.', path: '/terms', rsc: 'www.quickmark.co/terms (2).html' },
  { file: 'editorial-standards.html', title: 'Editorial Standards | QuickMark', desc: 'QuickMark Editorial Standards and Integrity.', path: '/editorial-standards', rsc: 'www.quickmark.co/editorial-standards (3).html' },
  { file: 'learn.html', title: 'Learn Hub | QuickMark', desc: 'Cambridge IGCSE subject guides and insights.', path: '/learn', rsc: 'www.quickmark.co/learn (2).html' }
];

for (const p of otherPages) {
  const fullPath = path.join('www.quickmark.co', p.file);
  if (fs.existsSync(fullPath)) {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    const body = bodyMatch ? bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '') : raw;
    const hydrated = generateHydratedHtml(p.title, p.desc, p.path, body, p.rsc);
    fs.writeFileSync(fullPath, hydrated, 'utf8');
    console.log(`Updated ${p.file}`);
  }
}

console.log('All pages successfully re-hydrated!');
