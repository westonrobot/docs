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
    // Loads the file store's derived index at build time so pages carry a
    // query instead of a URL. See docs/design/file-hosting.md §3.
    require.resolve('./plugins/file-index'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        // The Software section was dissolved: its pages were a solution (ADT)
        // and two task guides, none of which belonged in a section of their
        // own. These redirects keep old URLs working, which matters because
        // support engineers paste them into tickets.
        redirects: [
          {from: '/software/toolbox/assisted_driving_toolbox', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v1', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v2', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v3', to: '/solution/adt/intro'},
          // ADT v1/v2/v3 were three pages, v2 and v3 75% identical. Now one
          // page tabbed by version.
          {from: '/solution/adt/v1', to: '/solution/adt/intro'},
          {from: '/solution/adt/v2', to: '/solution/adt/intro'},
          {from: '/solution/adt/v3', to: '/solution/adt/intro'},
          // Release 1's two products were renamed to their trademark names,
          // Robot Management Toolbox and Robot Deployment Toolbox, and their
          // directories renamed to match. Every one of these old URLs is in
          // circulation with customers and in support tickets.
          {from: '/solution/fleet-management', to: '/solution/robot-management-toolbox'},
          {from: '/solution/fleet-management/robot-dashboard', to: '/solution/robot-management-toolbox/robot-dashboard'},
          {from: '/solution/fleet-management/robot-teleoperation', to: '/solution/robot-management-toolbox/robot-teleoperation'},
          {from: '/solution/fleet-management/mission-editing', to: '/solution/robot-management-toolbox/mission-editing'},
          {from: '/solution/fleet-management/detection-review', to: '/solution/robot-management-toolbox/detection-review'},
          {from: '/solution/fleet-management/tenant-management', to: '/solution/robot-management-toolbox/tenant-management'},
          {from: '/solution/fleet-management/audit-log', to: '/solution/robot-management-toolbox/audit-log'},
          {from: '/solution/fleet-management/deployment-and-servicing', to: '/solution/robot-management-toolbox/deployment-and-servicing'},
          {from: '/solution/deployment-toolbox', to: '/solution/robot-deployment-toolbox'},
          {from: '/solution/deployment-toolbox/map-editor', to: '/solution/robot-deployment-toolbox/map-editor'},
          {from: '/solution/deployment-toolbox/map-inspector', to: '/solution/robot-deployment-toolbox/map-inspector'},
          {from: '/software/installation/apt_source', to: '/tutorial/installation/apt_source'},
          {from: '/software/slam/go2_slam', to: '/tutorial/unitree/go2_slam'},
          {from: '/software/intro', to: '/solution/intro'},
          // Safety and maintenance are procedures you follow, which makes
          // them Guides rather than Support. Support is scoped to "something
          // is wrong or I need a human".
          {from: '/general/operational-safety', to: '/tutorial/operational-safety'},
          {from: '/general/robot-maintenance', to: '/tutorial/robot-maintenance'},
          // The two UGV devkit version pages were 76% identical. They are now
          // one page whose differences are a comparison table and a few tabbed
          // images. Both old URLs are in circulation with customers.
          {from: '/system/ugv_devkit/v1.0', to: '/system/ugv_devkit'},
          {from: '/system/ugv_devkit/v1.1', to: '/system/ugv_devkit'},
          {
            from: '/system/ugv_devkit/v1.0/component_reconfiguration',
            to: '/system/ugv_devkit/component_reconfiguration',
          },
          {
            from: '/system/ugv_devkit/v1.1/component_reconfiguration',
            to: '/system/ugv_devkit/component_reconfiguration',
          },
        ],
      },
    ],
    // Click any content image to enlarge it. Connector pinouts and interface
    // photos are unreadable at inline size, and there was no way to enlarge them.
    'docusaurus-plugin-image-zoom',
    [
      require.resolve('docusaurus-lunr-search'),
      {
        // Options
        languages: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        // The plugin does not honour `unlisted: true` front matter, so an
        // unlisted page still turns up in site search unless named here.
        // Keep this in step with any page carrying that flag.
        excludeRoutes: [
          '**/robot/ugv/ranger-mini-v2',
          '**/solution/adt/intro',
        ]
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'support',
        path: 'support',
        routeBasePath: 'support',
        sidebarPath: './sidebars-support.ts',
        editUrl,
        showLastUpdateTime: true,
        onInlineTags: 'throw',
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
        onInlineTags: 'throw',
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
        onInlineTags: 'throw',
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
        onInlineTags: 'throw',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'solution',
        path: 'solution',
        routeBasePath: 'solution',
        sidebarPath: './sidebars-solution.ts',
        editUrl,
        showLastUpdateTime: true,
        onInlineTags: 'throw',
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
        onInlineTags: 'throw',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/wr-social-card.png',
    zoom: {
      // Content images only. Two exclusions:
      //   :not(a) > img  — an image that *is* the link's only child
      //   :not(.no-zoom) — an image nested deeper inside a link, which the
      //                    selector above does not catch. Product cards render
      //                    a > div > img, so all 21 card images on the hub
      //                    pages were zooming instead of navigating.
      selector: '.markdown :not(a) > img:not(.no-zoom)',
      background: {light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(16, 19, 23, 0.95)'},
    },
    navbar: {
      title: 'Weston Robot',
      logo: {
        alt: 'Logo',
        src: 'img/wr-logo.png',
      },
      items: [
        // The top level runs on a single axis: what you own, what capability
        // you deploy, what you want to do, and reference. It previously mixed
        // product taxonomy (Robots/Peripherals/Systems) with document type
        // (Software/Tutorials), which is why nothing was findable.
        {
            type: 'dropdown',
            label: 'Products',
            position: 'left',
            items: [
                {type: 'doc', docId: 'intro', docsPluginId: 'robot', label: 'Robots'},
                {type: 'doc', docId: 'intro', docsPluginId: 'peripheral', label: 'Peripherals'},
                {type: 'doc', docId: 'intro', docsPluginId: 'system', label: 'Systems'},
            ],
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'solution',
            position: 'left',
            label: 'Solutions',
        },
        {
            type: 'doc',
            docId: 'intro',
            docsPluginId: 'tutorial',
            position: 'left',
            label: 'Guides',
        },
        {
            type: 'doc',
            docId: 'before-you-contact-us',
            docsPluginId: 'support',
            position: 'left',
            label: 'Support',
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
