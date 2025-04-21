import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Weston Robot Documentation',
  tagline: 'Official documentation for Weston Robot products.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://westonrobot.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs-next/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'westonrobot', // Usually your GitHub org/user name.
  projectName: 'docs-next', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'general',
        path: 'general',
        routeBasePath: 'general',
        sidebarPath: './sidebars-general.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'robot',
        path: 'robot',
        routeBasePath: 'robot',
        sidebarPath: './sidebars-robot.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'peripheral',
        path: 'peripheral',
        routeBasePath: 'peripheral',
        sidebarPath: './sidebars-peripheral.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'system',
        path: 'system',
        routeBasePath: 'system',
        sidebarPath: './sidebars-system.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'software',
        path: 'software',
        routeBasePath: 'software',
        sidebarPath: './sidebars-software.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorial',
        path: 'tutorial',
        routeBasePath: 'tutorial',
        sidebarPath: './sidebars-tutorial.ts',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/wr-social-card.png',
    navbar: {
      title: 'Weston Robot',
      logo: {
        alt: 'Logo',
        src: 'img/wr-logo.png',
      },
      items: [
        // { to: '/', label: 'Home', position: 'left' },
        // {
        //   type: 'doc',
        //   docId: 'operational-safety',
        //   docsPluginId: 'general',
        //   position: 'left',
        //   label: 'General',
        // },
        {
            type: 'doc',
            docId: 'robot-intro',
            docsPluginId: 'robot',
            position: 'left',
            label: 'Robots',
        },
        {
            type: 'doc',
            docId: 'peripheral-intro',
            docsPluginId: 'peripheral',
            position: 'left',
            label: 'Peripherals',
        },
        {
            type: 'doc',
            docId: 'system-intro',
            docsPluginId: 'system',
            position: 'left',
            label: 'Systems',
        },
        {
            type: 'doc',
            docId: 'software-intro',
            docsPluginId: 'software',
            position: 'left',
            label: 'Software',
        },
        {
            type: 'doc',
            docId: 'tutorial-intro',
            docsPluginId: 'tutorial',
            position: 'left',
            label: 'Tutorials',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {
            href: 'https://forms.office.com/r/UXzrrsgEyW',
            label: 'Support',
            position: 'right',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/westonrobot',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.westonrobot.com',
          label: 'Homepage',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Weston Robot Pte. Ltd. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
