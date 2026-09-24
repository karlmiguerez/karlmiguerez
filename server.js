#!/usr/bin/env node
/* Local dev server for the portfolio — Node built-ins only, nothing to install.
 *
 * Mirrors the bits of Vercel this project actually relies on:
 *   - cleanUrls  (/tmc → tmc.html)
 *   - /api/*     runs the real api/*.js handler, so there's one source of truth
 *   - Range requests, so the Q&A videos seek properly
 *
 * Usage:  node server.js        (PORT env var overrides the default)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 4830;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.webm': 'video/webm', '.mp4': 'video/mp4',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

// Give the plain Node response the couple of helpers Vercel handlers expect.
function asVercelRes(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', MIME['.json']);
    res.end(JSON.stringify(obj));
  };
  return res;
}

function serveFile(req, res, file) {
  const stat = fs.statSync(file);
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;

  // Partial content — needed for video scrubbing
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (m) {
      const start = m[1] ? parseInt(m[1], 10) : 0;
      const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
      if (start >= stat.size || end >= stat.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
      });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
  }

  res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  } catch {
    res.writeHead(400); return res.end('Bad request');
  }

  // --- API routes: hand off to the same file Vercel would run ---
  if (pathname.startsWith('/api/')) {
    const handlerFile = path.join(ROOT, pathname.replace(/\/+$/, '') + '.js');
    if (handlerFile.startsWith(path.join(ROOT, 'api')) && fs.existsSync(handlerFile)) {
      try {
        delete require.cache[require.resolve(handlerFile)]; // pick up edits without a restart
        return await require(handlerFile)(req, asVercelRes(res));
      } catch (err) {
        console.error('[api]', err);
        res.writeHead(500, { 'Content-Type': MIME['.json'] });
        return res.end(JSON.stringify({ error: err.message }));
      }
    }
    res.writeHead(404); return res.end('Not found');
  }

  // --- Static files, with cleanUrls ---
  let file = path.join(ROOT, pathname);
  if (pathname === '/') {
    file = path.join(ROOT, 'index.html');
  } else if (!path.extname(file)) {
    if (fs.existsSync(file + '.html')) file += '.html';
    else if (fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
  }

  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  try {
    if (!fs.statSync(file).isFile()) throw new Error('not a file');
    serveFile(req, res, file);
  } catch {
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    res.end('<h1>404</h1><p>Not found</p>');
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') console.error(`Port ${PORT} is already in use.`);
  else console.error(err);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Ready! Available at http://localhost:${PORT}`));
