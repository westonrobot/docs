import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ProductCardProps = {
  /** Destination, as a site-absolute path so it does not depend on the page's depth. */
  to: string;
  /** Imported image, e.g. require('./img/x.png').default. Omit if we have no photo yet. */
  src?: string;
  alt?: string;
  title: string;
  /** One line on what it is and what it is for. Shown under the title. */
  children?: ReactNode;
};

/**
 * A product entry on a hub page: picture, name, and one line of routing text.
 *
 * Hub pages exist so someone can find the page for the thing in front of them.
 * A name alone does not support that — "J4012" and "NanoPC" are indistinguishable
 * to anyone who has not already learned them — so the picture is the primary
 * identifier here and the text is the confirmation.
 *
 * The global `product-card` class is not decorative: `custom.css` underlines every
 * link inside `.markdown`, which would underline the whole card. It is excluded
 * there by name rather than fought with specificity.
 */
export function ProductCard({to, src, alt, title, children}: ProductCardProps) {
  return (
    <Link to={to} className={`${styles.card} product-card`}>
      <div className={styles.media}>
        {src ? (
          <img src={src} alt={alt ?? title} loading="lazy" />
        ) : (
          /* Better an honest blank than a picture of something else — the Power
             Regulator's only image is a screenshot of its configuration widget. */
          <span className={styles.noImage}>No photo yet</span>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        {children ? <span className={styles.description}>{children}</span> : null}
      </div>
    </Link>
  );
}

type ProductGridProps = {
  children: ReactNode;
  /** Cards per row on a wide screen. Collapses on narrow screens regardless. */
  columns?: 2 | 3 | 4;
};

export function ProductGrid({children, columns = 3}: ProductGridProps) {
  return (
    <div className={styles.grid} data-columns={columns}>
      {children}
    </div>
  );
}
