import React, {type ReactNode} from 'react';
import styles from './styles.module.css';

type KeyPointProps = {
  /** Shown large in the corner. A numeral, or a very short word. */
  marker?: string;
  title: string;
  /** One line under the title, for the "so what". */
  lede?: string;
  children?: ReactNode;
};

/**
 * A card for the one or two things on a page that matter more than the rest.
 *
 * A flat list implies its items are equal. Where they are not — the serial
 * number and the sequence of events carry a support request; the other five
 * items help — these give the important ones visible weight without needing
 * more words to say so.
 */
export function KeyPoint({marker, title, lede, children}: KeyPointProps) {
  return (
    <div className={styles.card}>
      {marker ? <span className={styles.marker} aria-hidden="true">{marker}</span> : null}
      <h3 className={styles.title}>{title}</h3>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export function KeyPoints({children}: {children: ReactNode}) {
  return <div className={styles.grid}>{children}</div>;
}
