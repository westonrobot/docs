import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { FaShieldAlt, FaRobot, FaPlug, FaTools, FaBook, FaHeadset, FaMicrochip, FaCode } from 'react-icons/fa';

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

function DocSection({title, description, to, buttonText = 'View Documentation', icon: Icon}) {
  return (
    <div className={clsx('col col--4', styles.docSection)}>
      <div className="card-demo margin-bottom--md">
        <div className={clsx('card', styles.sectionCard)}>
          <div className={clsx('card__header', styles.cardHeader)}>
            {Icon && <Icon className={styles.sectionIcon} />}
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link className="button button--primary button--block" to={to}>
              {buttonText}
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
              {/* <DocSection
                title="General"
                description="Essential safety guidelines, maintenance procedures, and general information about Weston Robot products."
                to="/general/operational-safety"
                buttonText="Learn More"
                icon={FaShieldAlt}
              /> */}
              <DocSection
                title="Robots"
                description="Information and resources for our robot platforms including UGVs, quadrupeds, humanoids and manipulators."
                to="/robot/robot-intro"
                buttonText="Learn More"
                icon={FaRobot}
              />
              <DocSection
                title="Peripherals"
                description="Information about robot peripherals such as power regulators, robot hands, wireless chargers, and other peripheral devices."
                to="/peripheral/peripheral-intro"
                buttonText="Learn More"
                icon={FaPlug}
              />
              <DocSection
                title="Systems"
                description="Resources and guides for integrated systems such as UGV development kit that help you build custom solutions."
                to="/system/system-intro"
                buttonText="Learn More"
                icon={FaMicrochip}
              />
              <DocSection
                title="Software"
                description="Documentation for our SDKs, and software tools to help you develop applications."
                to="/software/software-intro"
                buttonText="Learn More"
                icon={FaCode}
              />
              <DocSection
                title="Tutorials"
                description="Step-by-step guides and tutorials for getting started with Weston Robot products."
                to="/tutorial/tutorial-intro"
                buttonText="Learn More"
                icon={FaBook}
              />
              <DocSection
                title="Support"
                description="Submit a support request through our online form to get assistance from our technical team."
                to="https://forms.office.com/r/UXzrrsgEyW"
                buttonText="Submit Request"
                icon={FaHeadset}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
