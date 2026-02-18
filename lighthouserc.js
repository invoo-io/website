const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/**
 * Discover all pages from the static export by scanning for index.html files.
 * Converts file paths like out/es/precios/index.html → http://localhost/es/precios/
 */
function discoverUrls(outDir) {
  const urls = [];

  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.name === 'index.html') {
        const relativePath = path.relative(outDir, dir);
        const urlPath = relativePath === '' ? '/' : `/${relativePath}/`;
        urls.push(`http://localhost${urlPath}`);
      }
    }
  }

  if (fs.existsSync(outDir)) {
    scan(outDir);
  }

  return urls;
}

const outDir = path.resolve(__dirname, 'out');
const urls = discoverUrls(outDir);

// Fallback URLs if out/ doesn't exist yet (e.g., config validation before build)
const fallbackUrls = [
  'http://localhost/es/',
  'http://localhost/es/precios/',
  'http://localhost/es/blog/',
  'http://localhost/en/',
];

module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: urls.length > 0 ? urls : fallbackUrls,
      numberOfRuns: 3,
      chromePath: puppeteer.executablePath(),
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
