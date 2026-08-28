import type {ReactNode} from 'react';
import styles from './styles.module.css';

type VideoProps = {
  /**
   * Use `require('../video/foo.mp4').default`. Docusaurus has a media rule
   * (`@docusaurus/utils`, url-loader with a 10 KB inline threshold), so an MP4
   * is fingerprinted and emitted to `assets/medias/` exactly like an image.
   */
  src: string;
  /**
   * A still shown before playback, as `require('../video/foo.poster.jpg').default`.
   * Required: without one the browser paints a black rectangle, and with
   * `preload="metadata"` it has no frame to fall back on.
   */
  poster: string;
  /**
   * What the recording shows. Required, and it is the text equivalent for
   * anyone who cannot watch it — these clips are silent, so there is no
   * narration to caption and the surrounding prose has to carry the content.
   */
  title: string;
  /** Rendered under the video. */
  caption?: ReactNode;
  /** Named widths, matching Figure so the two line up on a page. */
  size?: 'md' | 'lg' | 'full';
  /** Hairline border, for captures whose own background is white. */
  framed?: boolean;
};

/**
 * A screen recording with a caption, sized like a Figure.
 *
 * Three deliberate choices:
 *
 * `controls` rather than autoplay. These are minutes long and silent, so they
 * are reference material a reader chooses to watch, not decoration. It also
 * gives a fullscreen button for free, which matters because the captures are
 * 2558px wide and the docs column is 958px — inline, the UI renders at 75% and
 * the smaller labels are marginal. Fullscreen is how a reader actually reads
 * them.
 *
 * `preload="metadata"` so the page costs a poster JPEG and a few KB of headers
 * until someone presses play, rather than several megabytes on load.
 *
 * No `loop`. A workflow recording has a real beginning and end; looping one
 * makes it ambiguous where the flow starts.
 */
export function Video({
  src,
  poster,
  title,
  caption,
  size = 'full',
  framed = false,
}: VideoProps): ReactNode {
  return (
    <figure className={`${styles.video} ${styles[size]} ${framed ? styles.framed : ''}`}>
      <video controls preload="metadata" playsInline poster={poster} aria-label={title}>
        <source src={src} type="video/mp4" />
        {title}
      </video>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
