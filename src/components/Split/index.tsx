import type {ReactNode} from 'react';
import styles from './styles.module.css';

type SplitProps = {
  /**
   * Two children, laid out side by side on a wide screen and stacked on a narrow
   * one. Intended for a portrait image next to a table — a tall product cutout
   * on its own leaves a lot of dead space beside it.
   *
   * Markdown children work, provided they are separated by blank lines.
   */
  children: ReactNode;
  /** Width of the first column relative to the second. Default is narrow-then-wide. */
  ratio?: 'narrow-wide' | 'even' | 'wide-narrow';
};

export function Split({children, ratio = 'narrow-wide'}: SplitProps): ReactNode {
  return (
    <div className={styles.split} data-ratio={ratio}>
      {children}
    </div>
  );
}
