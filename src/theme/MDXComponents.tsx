import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Figure, FigureGrid} from '@site/src/components/Figure';
import {Split} from '@site/src/components/Split';
import {ProductCard, ProductGrid} from '@site/src/components/ProductCard';
import {KeyPoint, KeyPoints} from '@site/src/components/KeyPoint';

/**
 * Components available in every .md and .mdx file without an import.
 *
 * Tabs and TabItem are included because they otherwise need a two-line import
 * in every file that wants them, which is why they were used nowhere despite
 * being the mechanism the IA proposal specifies for per-revision variants.
 */
export default {
  ...MDXComponents,
  Figure,
  FigureGrid,
  Split,
  ProductCard,
  ProductGrid,
  KeyPoint,
  KeyPoints,
  Tabs,
  TabItem,
};
