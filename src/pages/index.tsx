import React, { useState } from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { 
  FaRobot, 
  FaPlug, 
  FaMicrochip, 
  FaCode, 
  FaBook, 
  FaHeadset, 
  FaQuestion,
  FaArrowRight,
  FaArrowLeft,
  FaTools,
  FaLaptopCode,
  FaHandsHelping,
  FaPuzzlePiece,
  FaCog
} from 'react-icons/fa';

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

// Decision tree component data structure
const decisionTree = {
  root: {
    question: "How can we guide you today?",
    options: [
      {
        text: "Hardware & Information",
        nextNode: "hardware"
      },
      {
        text: "Software & Development",
        nextNode: "software"
      },
      {
        text: "Questions & Support",
        nextNode: "support"
      }
    ]
  },
  hardware: {
    question: "Which type of hardware?",
    options: [
      {
        text: "Robot Platforms",
        destination: "/robot/intro",
        description: "UGVs, quadrupeds, humanoids and manipulators",
        icon: FaRobot
      },
      {
        text: "Robot Peripherals",
        destination: "/peripheral/intro",
        description: "Power regulators, robot hands, wireless chargers, etc.",
        icon: FaPlug
      },
      {
        text: "Integrated Systems",
        destination: "/system/intro",
        description: "UGV development kits and custom solutions",
        icon: FaMicrochip
      },
      {
        text: "Go Back",
        nextNode: "root",
        isBackButton: true
      }
    ]
  },
  software: {
    question: "What development resources do you need?",
    options: [      
      {
        text: "SDKs & Tools",
        destination: "/software/intro",
        description: "Development tools to build applications",
        icon: FaCode
      },      
      {
        text: "Tutorials & Guides",
        destination: "/tutorial/intro",
        description: "Step-by-step guides for getting started",
        icon: FaBook
      },
      {
        text: "Integration & Customization",
        destination: "/system/intro",
        description: "Instructions for system integration",
        icon: FaCog
      },
      {
        text: "Go Back",
        nextNode: "root",
        isBackButton: true
      }
    ]
  },
  support: {
    question: "How can we further help you?",
    options: [     
      {
        text: "Legacy Product Docs",
        destination: "https://westonrobot.github.io/docs-legacy/",
        description: "Information of older products and systems",
        icon: FaBook
      }, 
      {
        text: "Contact Support",
        destination: "https://forms.office.com/r/qELKzYF33W",
        description: "Submit a support request to our team",
        icon: FaHeadset
      },
      {
        text: "Go Back",
        nextNode: "root",
        isBackButton: true
      }
    ]
  }
};

function DecisionTreeNavigation() {
  const [currentNode, setCurrentNode] = useState('root');
  const node = decisionTree[currentNode];

  return (
    <div className={styles.decisionTree}>
      <div className={styles.questionBox}>
        {/* <FaQuestion className={styles.questionIcon} /> */}
        <h2>{node.question}</h2>
      </div>
      <div className={styles.optionsContainer}>
        {node.options.map((option, index) => (
          <div 
            key={index} 
            className={clsx(
              styles.optionCard, 
              option.isBackButton && styles.backButton
            )}
          >
            {option.destination ? (
              // Destination link
              <Link 
                to={option.destination} 
                className={styles.optionLink}
              >
                <div className={styles.optionContent}>
                  {option.icon && <option.icon className={styles.optionIcon} />}
                  <h3>{option.text}</h3>
                  {option.description && <p>{option.description}</p>}
                  <div className={styles.goArrow}>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            ) : (
              // Navigation button
              <button 
                onClick={() => setCurrentNode(option.nextNode)}
                className={styles.optionButton}
              >
                <div className={styles.optionContent}>
                  {option.isBackButton ? (
                    <div className={styles.backButtonContent}>
                      <FaArrowLeft className={styles.backIcon} />
                      <span>{option.text}</span>
                    </div>
                  ) : (
                    <>
                      <h3>{option.text}</h3>
                      <div className={styles.goArrow}>
                        <FaArrowRight />
                      </div>
                    </>
                  )}
                </div>
              </button>
            )}
          </div>
        ))}
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
        <div className="container margin-top--lg">
          <DecisionTreeNavigation />
        </div>
      </main>
    </Layout>
  );
}
