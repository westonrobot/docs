import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function DocSection({title, description, to}) {
  return (
    <div className={clsx('col col--4', styles.docSection)}>
      <div className="card-demo margin-bottom--md">
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link className="button button--primary button--block" to={to}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation for Weston Robot products and solutions">
      <HomepageHeader />
      <main>
        <div className={styles.docSections}>
          <div className="container">
            <div className="row">
              <DocSection
                title="General Information"
                description="Essential safety guidelines, maintenance procedures, and general information about Weston Robot products."
                to="/general/operational-safety"
              />
              <DocSection
                title="Robot Documentation"
                description="Comprehensive documentation for our robot platforms including UGVs, quadrupeds, and manipulators."
                to="/robot/robot-intro"
              />
              <DocSection
                title="Peripherals"
                description="Information about power regulators, robot hands, wireless chargers, and other peripheral devices."
                to="/peripheral/peripheral-intro"
              />
              <DocSection
                title="Development Kit"
                description="Resources and guides for the Weston Robot Development Kit to help you build custom solutions."
                to="/kit/kit-intro"
              />
              <DocSection
                title="User Guide"
                description="Step-by-step guides and tutorials for getting started with Weston Robot products."
                to="/guide/guide-intro"
              />
              <DocSection
                title="Support"
                description="Get help from our support team and access additional resources."
                to="https://forms.office.com/r/UXzrrsgEyW"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
