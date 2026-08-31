import type {ReactNode} from 'react';
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

const LANGUAGES: Record<string, string> = {en: 'English', zh: '中文'};

function formatBytes(bytes: number): string {
  if (!bytes) return '—';
  const mib = bytes / 1048576;
  return mib >= 1 ? `${mib.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function label(entry: FileEntry): string {
  // `user-manual` -> `User manual`. The kind segment is the human name, so it
  // does not need a lookup table that would then need maintaining.
  const words = entry.kind.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
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
            <th scope="col">Document</th>
            <th scope="col">Version</th>
            <th scope="col">Language</th>
            <th scope="col">Size</th>
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
                {file.sha256 ? (
                  <span className={styles.sum} title="SHA-256 of this file">
                    {file.sha256.slice(0, 12)}…
                  </span>
                ) : null}
              </td>
              <td>{file.version ? `v${file.version}` : '—'}</td>
              <td>{LANGUAGES[file.lang] ?? file.lang ?? '—'}</td>
              <td className={styles.size}>{formatBytes(file.bytes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
