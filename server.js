import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve Next.js static chunks
app.use('/_next/static', express.static(path.join(__dirname, 'www.quickmark.co/_next/static'), {
  maxAge: '365d',
  immutable: true
}));

// Next.js Image Optimization route handler
app.get('/_next/image', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).send('Missing url parameter');
  }

  // Decode url
  const decoded = decodeURIComponent(targetUrl);
  const cleanName = path.basename(decoded);

  // Check if image exists directly in www.quickmark.co
  const directPath = path.join(__dirname, 'www.quickmark.co', decoded.replace(/^\//, ''));
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return res.sendFile(directPath);
  }

  // Check base name in www.quickmark.co
  const baseFilePath = path.join(__dirname, 'www.quickmark.co', cleanName);
  if (fs.existsSync(baseFilePath) && fs.statSync(baseFilePath).isFile()) {
    return res.sendFile(baseFilePath);
  }

  // Check in _next directory
  const nextFilePath = path.join(__dirname, 'www.quickmark.co/_next', cleanName);
  if (fs.existsSync(nextFilePath) && fs.statSync(nextFilePath).isFile()) {
    return res.sendFile(nextFilePath);
  }

  // Map known images
  const knownMap = {
    'blog-careless': 'blog-careless.png',
    'blog-mark-schemes': 'blog-mark-schemes.png',
    'blog-error-log': 'blog-error-log.png',
    'olevels-logo': 'olevels-logo.png',
    'upi': 'upi.png',
    'favicon': 'favicon.svg'
  };

  for (const [key, val] of Object.entries(knownMap)) {
    if (decoded.includes(key)) {
      const matchFile = path.join(__dirname, 'www.quickmark.co', val);
      if (fs.existsSync(matchFile)) {
        return res.sendFile(matchFile);
      }
    }
  }

  // Fallback to favicon
  return res.sendFile(path.join(__dirname, 'www.quickmark.co', 'favicon.svg'));
});

// Middleware to detect RSC (React Server Component) requests
const isRscRequest = (req) => {
  return !!(
    req.query._rsc ||
    req.headers['rsc'] === '1' ||
    req.headers['next-router-state-tree'] ||
    req.headers['next-router-prefetch']
  );
};

// Route for RSC flight stream responses
app.use((req, res, next) => {
  if (!isRscRequest(req)) {
    return next();
  }

  const cleanPath = req.path.replace(/\/$/, '') || '/';
  
  // Find matching RSC file
  let rscFilePath = null;

  if (cleanPath === '/') {
    rscFilePath = path.join(__dirname, 'www.quickmark.co', 'index (1).html');
  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const candidate = path.join(__dirname, 'www.quickmark.co', 'blog', `${slug} (2).html`);
    if (fs.existsSync(candidate)) rscFilePath = candidate;
  } else {
    // Check known page RSCs
    const directCandidate = path.join(__dirname, 'www.quickmark.co', `${cleanPath.replace(/^\//, '')} (2).html`);
    if (fs.existsSync(directCandidate)) {
      rscFilePath = directCandidate;
    } else {
      const dir = path.dirname(path.join(__dirname, 'www.quickmark.co', cleanPath.replace(/^\//, '')));
      const baseName = path.basename(cleanPath);
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        let maxS = -1;
        for (const f of files) {
          if (f.startsWith(baseName) && (f.includes('(2)') || f.includes('(4)') || f.includes('(1)')) && f.endsWith('.html')) {
            const size = fs.statSync(path.join(dir, f)).size;
            if (size > maxS) {
              maxS = size;
              rscFilePath = path.join(dir, f);
            }
          }
        }
      }
    }
  }

  if (rscFilePath && fs.existsSync(rscFilePath)) {
    res.setHeader('Content-Type', 'text/x-component; charset=utf-8');
    res.setHeader('Vary', 'RSC, Next-Router-State-Tree, Next-Router-Prefetch');
    return res.sendFile(rscFilePath);
  }

  next();
});

// Specific clean route endpoints
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'index.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'blog.html'));
});
app.get('/blog/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'blog.html'));
});

app.get('/blog/:slug', (req, res, next) => {
  const postFile = path.join(__dirname, 'www.quickmark.co', 'blog', `${req.params.slug}.html`);
  if (fs.existsSync(postFile)) {
    return res.sendFile(postFile);
  }
  next();
});

app.get('/partners', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'partners.html'));
});
app.get('/partners/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'partners.html'));
});

app.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'teacher.html'));
});
app.get('/teacher/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'teacher.html'));
});

// Clean path resolution for other marketing and app pages
app.use((req, res, next) => {
  const cleanPath = req.path.endsWith('/') ? req.path.slice(0, -1) : req.path;
  if (!cleanPath) return next();

  const directHtml = path.join(__dirname, 'www.quickmark.co', `${cleanPath}.html`);
  if (fs.existsSync(directHtml)) {
    return res.sendFile(directHtml);
  }

  const indexHtml = path.join(__dirname, 'www.quickmark.co', cleanPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  next();
});

// Static assets from www.quickmark.co root
app.use(express.static(path.join(__dirname, 'www.quickmark.co'), {
  index: false,
  redirect: false,
}));

// Fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'www.quickmark.co', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
