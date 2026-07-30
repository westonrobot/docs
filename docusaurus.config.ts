import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Base for the "Edit this page" links. Docusaurus appends each doc's path
// relative to the repository root, e.g. <base>/robot/humanoid/g1.md
const editUrl = 'https://github.com/westonrobot/docs/edit/main/';

const config: Config = {
  title: 'Weston Robot Documentation',
  tagline: 'Official documentation for Weston Robot products.',
  favicon: 'img/favicon.png',

  // Production url of the site. This must match the domain the site is actually
  // served from: it is what canonical tags, og:image/og:url and sitemap.xml are
  // built from. The custom domain is configured at the GitHub Pages level.
  url: 'https://docs.westonrobot.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'westonrobot', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add Mermaid support
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        // All documentation lives in the six explicit plugin instances declared
        // below, so the preset's default docs instance stays disabled.
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('docusaurus-lunr-search'),
      {
        // Options
        languages: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'general',
        path: 'general',
        routeBasePath: 'general',
        sidebarPath: './sidebars-general.ts',
        editUrl,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'robot',
        path: 'robot',
        routeBasePath: 'robot',
        sidebarPath: './sidebars-robot.ts',
        editUrl,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'peripheral',
        path: 'peripheral',
        routeBasePath: 'peripheral',
        sidebarPath: './sidebars-peripheral.ts',
        editUrl,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'system',
        path: 'system',
        routeBasePath: 'system',
        sidebarPath: './sidebars-system.ts',
        editUrl,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'software',
        path: 'software',
        routeBasePath: 'software',
        sidebarPath: './sidebars-software.ts',
        editUrl,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorial',
        path: 'tutorial',
        routeBasePath: 'tutorial',
        sidebarPath: './sidebars-tutorial.ts',
        editUrl,
        showLastUpdateTime: true,
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
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'robot',
            position: 'left',
            label: 'Robots',
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'peripheral',
            position: 'left',
            label: 'Peripherals',
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'system',
            position: 'left',
            label: 'Systems',
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'software',
            position: 'left',
            label: 'Software',
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'tutorial',
            position: 'left',
            label: 'Tutorials',
        },
        {
            // Operational safety and maintenance. These pages were built and
            // published but reachable from neither the navbar nor the homepage.
            type: 'doc',
            docId: 'operational-safety',
            docsPluginId: 'general',
            position: 'left',
            label: 'Safety & Maintenance',
        },
        {
            href: 'https://forms.office.com/r/qELKzYF33W',
            label: 'Support',
            position: 'right',
        },
        {
          href: 'https://github.com/westonrobot',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://westonrobot.github.io/docs-legacy/',
          label: 'Legacy Doc',
          position: 'right',
        },
        // {
        //   href: 'https://www.westonrobot.com',
        //   label: 'Homepage',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Weston Robot Pte. Ltd. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
