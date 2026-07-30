import type {ReactNode} from 'react';
import styles from './styles.module.css';

type FigureProps = {
  /**
   * Use `require('./img/foo.png').default` so webpack fingerprints the asset
   * and the build fails if the path is wrong. A bare string works for anything
   * already in `static/`.
   */
  src: string;
  /** Describe what the image shows. Required — a figure without alt text is a gap. */
  alt: string;
  /** Rendered under the image. Omit for a plain image. */
  caption?: ReactNode;
  /** Named widths keep pages consistent; `full` is the default. */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /**
   * Draw a hairline border and surface background. Use for screenshots, whose
   * white background otherwise bleeds into the page. Do NOT use for transparent
   * product cutouts — it frames empty space.
   */
  framed?: boolean;
};

/**
 * An image with an optional caption and a consistent width.
 *
 * Replaces the `import` + `<img style={{width: 350}} />` pattern that appears
 * 69 times across this site with 55 different inline sizes.
 */
export function Figure({src, alt, caption, size = 'full', framed = false}: FigureProps): ReactNode {
  return (
    <figure className={`${styles.figure} ${styles[size]} ${framed ? styles.framed : ''}`}>
      <img src={src} alt={alt} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

type FigureGridProps = {
  children: ReactNode;
  /** Columns on a wide screen. Collapses to one column on narrow screens. */
  columns?: 2 | 3 | 4;
};

/**
 * Side-by-side figures. Replaces the hand-rolled `<div>` wrappers (41 uses) and
 * the markdown tables being used as image grids (22 uses), both of which
 * overflow on a phone.
 */
export function FigureGrid({children, columns = 2}: FigureGridProps): ReactNode {
  return (
    <div className={styles.grid} data-columns={columns}>
      {children}
    </div>
  );
}
