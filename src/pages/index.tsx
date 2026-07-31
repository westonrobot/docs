import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  FaSearch,
  FaShieldAlt,
  FaBoxOpen,
  FaTerminal,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaHeadset,
} from 'react-icons/fa';

import {ProductCard, ProductGrid} from '@site/src/components/ProductCard';
import styles from './index.module.css';

/**
 * The landing page for a site whose readers already own the hardware.
 *
 * It replaced a two-step decision tree in which nothing was reachable in one
 * click, the first click revealed nothing ("Hardware & Information" is not
 * information), and the sub-steps lived in React state — so they had no URLs,
 * broke the back button, and were invisible to search indexing.
 *
 * Everything here is a real destination, visible without interaction.
 */

const FAMILIES = [
  {
    to: '/robot/intro',
    src: require('@site/robot/img/unitree/Go2_robot.png').default,
    alt: 'Robot platforms',
    title: 'Robots',
    body: 'UGVs, quadrupeds, humanoids and manipulators — 13 platforms.',
  },
  {
    to: '/peripheral/intro',
    src: require('@site/peripheral/img/westonrobot/j4012.png').default,
    alt: 'Peripherals',
    title: 'Peripherals',
    body: 'Onboard computers, networking, power and sensors.',
  },
  {
    to: '/system/ugv_devkit',
    src: require('@site/system/ugv_devkit/img/devkit_views_standard.png').default,
    alt: 'Integrated systems',
    title: 'Systems',
    body: 'Pre-integrated kits that mount on a robot base.',
  },
  {
    to: '/solution/intro',
    src: require('@site/solution/adt/img/adt/adt_v3_04.png').default,
    alt: 'Solutions',
    title: 'Solutions',
    body: 'Capabilities we develop and deploy on a platform.',
  },
];

const FIRST_RUN = [
  {
    to: '/tutorial/operational-safety',
    icon: FaShieldAlt,
    title: 'Operational Safety',
    body: 'Read before powering anything for the first time.',
  },
  {
    to: '/support/identify-your-product',
    icon: FaBoxOpen,
    title: 'Identify your product',
    body: 'Which model you have, and where the serial number is.',
  },
  {
    to: '/tutorial/installation/apt_source',
    icon: FaTerminal,
    title: 'Add our package source',
    body: 'Needed before installing any Weston Robot package.',
  },
];

const WHEN_STUCK = [
  {
    to: '/support/faq',
    icon: FaQuestionCircle,
    title: 'Support FAQ',
    body: 'Waterproofing, joint wear, thermal behaviour, wired vs WiFi.',
  },
  {
    to: '/support/fault-codes',
    icon: FaExclamationTriangle,
    title: 'Fault codes',
    body: 'What an error or alarm code means.',
  },
  {
    to: '/support/before-you-contact-us',
    icon: FaHeadset,
    title: 'Contact support',
    body: 'What to collect first, and the commands to collect it.',
  },
];

/**
 * A large target that hands off to the real search in the navbar.
 *
 * Rendering a second <SearchBar> here does not work: docusaurus-lunr-search
 * binds its autocomplete to `#search_input_react`, so a second instance
 * duplicates that id (invalid HTML) and only the first one in the DOM — the
 * navbar's — is ever wired up. The hero box looked fine and did nothing.
 */
function SearchPrompt() {
  const focusNavbarSearch = () => {
    const input = document.querySelector<HTMLInputElement>('.navbar__search-input');
    input?.focus();
  };
  return (
    <button
      type="button"
      className={styles.searchPrompt}
      onClick={focusNavbarSearch}
      aria-label="Search the documentation">
      <FaSearch className={styles.searchPromptIcon} aria-hidden="true" />
      <span className={styles.searchPromptText}>Search the documentation</span>
      <kbd className={styles.searchPromptKbd}>Ctrl K</kbd>
    </button>
  );
}

function TaskList({items}: {items: typeof FIRST_RUN}) {
  return (
    <div className={styles.taskGrid}>
      {items.map(({to, icon: Icon, title, body}) => (
        <Link key={to} to={to} className={styles.taskCard}>
          <Icon className={styles.taskIcon} aria-hidden="true" />
          <span className={styles.taskText}>
            <span className={styles.taskTitle}>{title}</span>
            <span className={styles.taskBody}>{body}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Setup, interfaces and support for Weston Robot platforms, peripherals and systems.">
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            Weston Robot Documentation
          </Heading>
          <p className={styles.heroSubtitle}>
            Setup, interfaces and support for the hardware you own.
          </p>
          <div className={styles.heroSearch}>
            <SearchPrompt />
          </div>
        </div>
      </header>

      <main className="container margin-vert--lg">
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Find your product
          </Heading>
          <ProductGrid columns={4}>
            {FAMILIES.map(({to, src, alt, title, body}) => (
              <ProductCard key={to} to={to} src={src} alt={alt} title={title}>
                {body}
              </ProductCard>
            ))}
          </ProductGrid>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            First time with a new unit
          </Heading>
          <TaskList items={FIRST_RUN} />
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Something not working
          </Heading>
          <TaskList items={WHEN_STUCK} />
        </section>
      </main>
    </Layout>
  );
}
