/**
 * Loads the file store's index at build time and exposes it as plugin data.
 *
 * The store is the source of truth; `index.json` is derived from the bucket
 * and never authored (docs/design/file-hosting.md §3). Pages therefore carry a
 * query — `<Downloads product="wr65" />` — instead of a URL, and a page cannot
 * hold a broken link because it holds no link.
 *
 * In development, documents staged under `static/_upload/` are merged in and
 * take precedence, so an author sees the real page with the real document
 * before anything is uploaded. Those entries never reach a production build:
 * `static/_upload/` is gitignored, so CI has no copy of them, which is what
 * turns local-first authoring into a guarantee rather than a convenience.
 */

const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = '_upload';
const DEFAULT_BASE_URL =
  process.env.WR_FILES_BASE_URL || 'https://files.westonrobot.net';

/** Re-derive a record from a key, matching wrfiles.metadata_for. */
function metadataForKey(key) {
  const [section, product, filename] = key.split('/');
  const stem = filename.replace(/\.tar\.gz$/, '').replace(/\.[^.]+$/, '');
  let rest = stem.slice(product.length + 1);
  let lang = '';
  let version = '';
  const m = rest.match(/-([a-z]{2}(?:-[a-z]+)?)-v(\d+(?:\.\d+)*)$/);
  if (m) {
    lang = m[1];
    version = m[2];
    rest = rest.slice(0, m.index);
  }
  return {section, product, kind: rest, lang, version};
}

function scanStaged(siteDir) {
  const root = path.join(siteDir, 'static', UPLOAD_DIR);
  if (!fs.existsSync(root)) return [];
  const found = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else found.push(full);
    }
  };
  walk(root);
  return found.flatMap((file) => {
    const key = path.relative(root, file).split(path.sep).join('/');
    if (key.split('/').length !== 3) return [];
    return [
      {
        ...metadataForKey(key),
        key,
        url: `/${UPLOAD_DIR}/${key}`,
        bytes: fs.statSync(file).size,
        sha256: '',
        contentType: '',
        updated: '',
        staged: true,
      },
    ];
  });
}

async function fetchIndex(baseUrl) {
  const url = `${baseUrl}/index.json`;
  try {
    const response = await fetch(url, {signal: AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return Array.isArray(data.files) ? data.files : [];
  } catch (error) {
    // Not fatal. An unreachable index means nothing is published yet, which is
    // a true statement about the store rather than a build failure. The gate
    // that catches an unpublished document is scripts/check-downloads.py.
    console.warn(`[file-index] no index at ${url} (${error.message}); continuing with none`);
    return [];
  }
}

module.exports = function fileIndexPlugin(context, options = {}) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  return {
    name: 'file-index',

    async loadContent() {
      const published = await fetchIndex(baseUrl);
      const staged = scanStaged(context.siteDir);
      // Staged wins: while a document is being authored, the local copy is the
      // one under review.
      const byKey = new Map(published.map((f) => [f.key, f]));
      for (const f of staged) byKey.set(f.key, f);
      const files = [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));
      if (staged.length) {
        console.log(`[file-index] ${staged.length} staged document(s) from static/${UPLOAD_DIR}/`);
      }
      return {files, baseUrl};
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};
