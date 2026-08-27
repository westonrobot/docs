import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  FaShieldAlt,
  FaTerminal,
  FaQuestionCircle,
  FaWrench,
  FaHeadset,
} from 'react-icons/fa';

import {ProductCard, ProductGrid} from '@site/src/components/ProductCard';
import styles from './index.module.css';

/**
 * The landing page for a site whose readers already own the hardware.
 *
 * Two constraints shape it. It fits in one viewport without scrolling, and
 * everything on it is a real destination — it replaced a decision tree where
 * nothing was reachable in one click, the sub-steps lived in React state so
 * they had no URLs and broke the back button, and search indexing saw only the
 * opening question.
 */

const FAMILIES = [
  {
    to: '/robot/intro',
    src: require('@site/robot/img/unitree/Go2_robot.png').default,
    alt: 'Robot platforms',
    title: 'Robots',
    body: 'UGVs, quadrupeds, humanoids, manipulators',
  },
  {
    to: '/peripheral/intro',
    src: require('@site/peripheral/img/westonrobot/j4012.png').default,
    alt: 'Peripherals',
    title: 'Peripherals',
    body: 'Computers, networking, power, sensors',
  },
  {
    to: '/system/ugv_devkit',
    src: require('@site/system/ugv_devkit/img/devkit_views_standard.png').default,
    alt: 'Integrated systems',
    title: 'Systems',
    body: 'Pre-integrated kits for a robot base',
  },
  {
    to: '/solution/intro',
    src: require('@site/solution/img/fleet-cover.jpg').default,
    alt: 'The robot dashboard: the site map with the robot on it, live camera feeds, telemetry and the control panel',
    title: 'Solutions',
    body: 'Capabilities we deploy on a platform',
  },
];

/* The top row covers Products and Solutions; these are the other two navbar
   sections. Each entry carries one line of what it actually contains, so a
   first-time reader can tell whether it is the page they want before clicking. */
const SECTIONS = [
  {
    lead: 'Guides',
    to: '/tutorial/intro',
    links: [
      {
        to: '/tutorial/operational-safety',
        text: 'Operational safety',
        body: 'Read before the first power-on',
        icon: FaShieldAlt,
      },
      {
        to: '/tutorial/robot-maintenance',
        text: 'Robot maintenance',
        body: 'Tyres, batteries, joints, storage',
        icon: FaWrench,
      },
      {
        to: '/tutorial/installation/apt_source',
        text: 'Package source',
        body: 'Add before installing our packages',
        icon: FaTerminal,
      },
    ],
  },
  {
    lead: 'Support',
    to: '/support/before-you-contact-us',
    links: [
      {
        to: '/support/before-you-contact-us',
        text: 'Before you contact us',
        body: 'What to collect, and the commands for it',
        icon: FaQuestionCircle,
      },
      {
        to: 'https://forms.office.com/r/qELKzYF33W',
        text: 'Submit a request',
        body: 'Opens our support form',
        icon: FaHeadset,
      },
    ],
  },
];

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      wrapperClassName="homepage"
      description="Setup, interfaces and support for Weston Robot platforms, peripherals and systems.">
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.heroTitle}>
              Weston Robot Documentation
            </Heading>
            <p className={styles.heroSubtitle}>
              Setup, interfaces and support for the hardware you own.
            </p>
          </div>
        </header>

        <main className={styles.main}>
          <div className="container">
            <div className={styles.families}>
              <ProductGrid columns={4}>
                {FAMILIES.map(({to, src, alt, title, body}) => (
                  <ProductCard key={to} to={to} src={src} alt={alt} title={title}>
                    {body}
                  </ProductCard>
                ))}
              </ProductGrid>
            </div>

            <div className={styles.sections}>
              {SECTIONS.map(({lead, to, links}) => (
                <section key={lead} className={styles.sectionGroup}>
                  <h2 className={styles.sectionLead}>
                    <Link to={to}>{lead}</Link>
                  </h2>
                  <div className={styles.sectionTiles}>
                    {links.map(({to: href, text, body, icon: Icon}) => (
                      <Link key={href} to={href} className={styles.sectionTile}>
                        <Icon className={styles.sectionIcon} aria-hidden="true" />
                        <span className={styles.sectionText}>
                          <span className={styles.sectionTitle}>{text}</span>
                          <span className={styles.sectionBody}>{body}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
