import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const htmlFiles = [];
walkDir('./www.quickmark.co', (filePath) => {
  if (filePath.endsWith('.html')) htmlFiles.push(filePath);
});

const validHtmls = new Map();

htmlFiles.forEach(file => {
  // e.g. "teacher (5).html" -> "teacher.html"
  const canonical = file.replace(/\s\(\d+\)\.html$/, '.html');
  
  const content = fs.readFileSync(file, 'utf8').trim();
  if (content.toLowerCase().startsWith('<!doctype html') || content.toLowerCase().startsWith('<html')) {
    validHtmls.set(canonical, file);
  }
});

validHtmls.forEach((validFile, canonical) => {
  if (validFile !== canonical) {
    fs.copyFileSync(validFile, canonical);
    console.log(`Restored ${canonical} from ${validFile}`);
  }
});

htmlFiles.forEach(file => {
  if (/\s\(\d+\)\.html$/.test(file)) {
    fs.unlinkSync(file);
  }
});
