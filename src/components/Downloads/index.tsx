import {useState, type ReactNode} from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

/** One record from the store's derived `index.json`. */
export type FileEntry = {
  key: string;
  url: string;
  section: string;
  product: string;
  kind: string;
  lang: string;
  version: string;
  sha256: string;
  bytes: number;
  contentType: string;
  updated: string;
  /** True for a document staged locally under `static/_upload/` and not yet published. */
  staged?: boolean;
};

type DownloadsProps = {
  /** Product slug, matching the second segment of the key: `wr65`, `scout-mini`. */
  product: string;
  /** Narrow to one kind: `user-manual`, `sdk`, `firmware`. Omit for everything. */
  kind?: string;
  /** Narrow to one language. Omit to show every language, which is usually right. */
  lang?: string;
  /** Shown instead of the table when the query matches nothing. */
  empty?: ReactNode;
};

const LANGUAGES: Record<string, string> = {
  en: 'English',
  zh: '中文',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
};

/** Words that are acronyms, not words. Without this `cad` renders as "Cad". */
const ACRONYMS = new Set(['cad', 'sdk', 'api', 'ros', 'urdf', 'pdf', 'usb', 'can']);

/** `…-v2.3.tar.gz` -> `TAR.GZ`, `…-v2.3.pdf` -> `PDF`. Tells a reader what
 *  they are about to download, which `kind` alone does not: a CAD file may be
 *  a ZIP or a STEP, and a datasheet may be a PDF or a spreadsheet. */
function fileType(key: string): string {
  const name = key.slice(key.lastIndexOf('/') + 1).toLowerCase();
  if (name.endsWith('.tar.gz')) return 'TAR.GZ';
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toUpperCase() : '—';
}

function formatBytes(bytes: number): string {
  if (!bytes) return '—';
  // Decimal units, because the label says MB and KB. Dividing by 1048576 and
  // calling it MB is off by 5%, which is the kind of small wrongness nobody
  // reports and everybody notices.
  const mb = bytes / 1e6;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

function label(entry: FileEntry): string {
  // `user-manual` -> "User manual", `sdk-manual` -> "SDK manual". The kind
  // segment is the human name, so it needs no lookup table — only a list of
  // the words that are acronyms rather than words.
  return entry.kind
    .split('-')
    .map((w, i) =>
      ACRONYMS.has(w) ? w.toUpperCase() : i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w,
    )
    .join(' ');
}

/* Inline SVG rather than an icon font or a dependency: two small shapes, drawn
   in `currentColor` so they follow the theme without a second definition. */
const CopyIcon = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.5" />
    <path d="M10.5 3.5v-1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1V9a1 1 0 0 0 1 1h1" />
  </svg>
);

const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5l3.5 3.5L13 5" />
  </svg>
);

/** A shortened SHA256 with a button that copies the full value.
 *
 * The column is headed SHA256 rather than "Checksum" on purpose: twelve hex
 * characters could be a truncated MD5, SHA-1 or CRC, and the one thing a
 * reader must not do with an integrity control is guess the algorithm. This
 * store carries firmware, so the person checking a file before flashing it to
 * a robot in the field is exactly the one who cannot afford to be wrong.
 *
 * Twelve characters are enough to compare against the sidecar by eye; nobody
 * transcribes sixty-four. The button copies all of it, because the only real
 * use of a hash is pasting it into `sha256sum -c`.
 */
function Checksum({value}: {value: string}): ReactNode {
  const [copied, setCopied] = useState(false);
  if (!value) return <span className={styles.muted}>—</span>;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard needs a secure context and permission. Failing silently
      // would leave the button looking broken, so say what happened.
      setCopied(false);
      window.prompt('Copy the SHA-256:', value);
    }
  };

  return (
    <span className={styles.sumCell}>
      <code className={styles.sum} title={value}>
        {value.slice(0, 12)}
      </code>
      <button
        type="button"
        className={`${styles.copy} ${copied ? styles.copied : ''}`}
        onClick={copy}
        // An icon-only control has no text to read, so the label is the only
        // thing a screen reader has. It changes with the state, which is how a
        // non-sighted user gets the same confirmation as the checkmark.
        aria-label={copied ? 'SHA256 copied' : 'Copy the full SHA256'}
        title={copied ? 'Copied' : 'Copy the full SHA256 — verify with: sha256sum -c'}>
        {copied ? CheckIcon : CopyIcon}
      </button>
    </span>
  );
}

/**
 * The downloadable documents for a product, resolved from the file store.
 *
 * The page carries a query, not URLs — so it cannot hold a broken link,
 * because it holds no link. A revision that supersedes another needs no edit
 * here: the store answers with what it currently has.
 *
 *     <Downloads product="wr65" />
 *     <Downloads product="scout-mini" kind="user-manual" />
 *
 * A query that matches nothing renders the `empty` message. That is not
 * silently tolerated: `scripts/check-downloads.py` fails the build on an
 * unsatisfied query whenever the index is reachable.
 */
export function Downloads({product, kind, lang, empty}: DownloadsProps): ReactNode {
  const data = usePluginData('file-index') as {files?: FileEntry[]} | undefined;
  const all = data?.files ?? [];

  const files = all
    .filter((f) => f.product === product)
    .filter((f) => (kind ? f.kind === kind : true))
    .filter((f) => (lang ? f.lang === lang : true))
    // Newest version first within a kind, so the current revision leads.
    .sort((a, b) =>
      a.kind === b.kind
        ? b.version.localeCompare(a.version, undefined, {numeric: true})
        : a.kind.localeCompare(b.kind),
    );

  if (files.length === 0) {
    return <p className={styles.empty}>{empty ?? `No documents published for ${product} yet.`}</p>;
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">File</th>
            <th scope="col">Type</th>
            <th scope="col">Version</th>
            <th scope="col">Language</th>
            <th scope="col">Size</th>
            <th scope="col">SHA256</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.key}>
              <td>
                <a href={file.url} download>
                  {label(file)}
                </a>
                {file.staged ? (
                  <span className={styles.staged} title="Staged locally, not yet published">
                    staged
                  </span>
                ) : null}
              </td>
              <td className={styles.type}>{fileType(file.key)}</td>
              <td>{file.version ? `v${file.version}` : '—'}</td>
              <td>{LANGUAGES[file.lang] ?? file.lang ?? '—'}</td>
              <td className={styles.size}>{formatBytes(file.bytes)}</td>
              <td>
                <Checksum value={file.sha256} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
