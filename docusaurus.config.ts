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
        // Old URLs stay working because support engineers paste them into
        // tickets. Why each move happened: docs/design/ia-proposal.md §11.
        redirects: [
          {from: '/software/toolbox/assisted_driving_toolbox', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v1', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v2', to: '/solution/adt/intro'},
          {from: '/software/toolbox/adt_v3', to: '/solution/adt/intro'},
          {from: '/solution/adt/v1', to: '/solution/adt/intro'},
          {from: '/solution/adt/v2', to: '/solution/adt/intro'},
          {from: '/solution/adt/v3', to: '/solution/adt/intro'},
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
          {from: '/tutorial/intro', to: '/guides/intro'},
          {from: '/tutorial/agilex/ranger_mini_calibration', to: '/guides/agilex/ranger_mini_calibration'},
          {from: '/tutorial/agilex/ugv_base_control', to: '/guides/agilex/ugv_base_control'},
          {from: '/tutorial/installation/apt_source', to: '/guides/installation/apt_source'},
          {from: '/tutorial/maintenance/humanoids', to: '/guides/maintenance/humanoids'},
          {from: '/tutorial/maintenance/manipulators', to: '/guides/maintenance/manipulators'},
          {from: '/tutorial/maintenance/quadrupeds', to: '/guides/maintenance/quadrupeds'},
          {from: '/tutorial/maintenance/wheeled-bases', to: '/guides/maintenance/wheeled-bases'},
          {from: '/tutorial/manifold/connecting', to: '/guides/manifold/connecting'},
          {from: '/tutorial/manifold', to: '/guides/manifold'},
          {from: '/tutorial/manifold/processing', to: '/guides/manifold/processing'},
          {from: '/tutorial/manifold/scanning', to: '/guides/manifold/scanning'},
          {from: '/tutorial/operational-safety', to: '/guides/operational-safety'},
          {from: '/tutorial/robot-maintenance', to: '/guides/robot-maintenance'},
          {from: '/tutorial/safety/humanoids', to: '/guides/safety/humanoids'},
          {from: '/tutorial/safety/manipulators', to: '/guides/safety/manipulators'},
          {from: '/tutorial/safety/quadrupeds', to: '/guides/safety/quadrupeds'},
          {from: '/tutorial/safety/wheeled-bases', to: '/guides/safety/wheeled-bases'},
          {from: '/tutorial/unitree/b2_diag_guide', to: '/guides/unitree/b2_diag_guide'},
          {from: '/tutorial/unitree/g1_dev_guide', to: '/guides/unitree/g1_dev_guide'},
          {from: '/tutorial/unitree/g1_diag_guide', to: '/guides/unitree/g1_diag_guide'},
          {from: '/tutorial/unitree/g1_internet_guide', to: '/guides/unitree/g1_internet_guide'},
          {from: '/tutorial/unitree/go2_diag_guide', to: '/guides/unitree/go2_diag_guide'},
          {from: '/tutorial/unitree/go2_slam', to: '/guides/unitree/go2_slam'},
          {from: '/software/installation/apt_source', to: '/guides/installation/apt_source'},
          {from: '/software/slam/go2_slam', to: '/guides/unitree/go2_slam'},
          {from: '/software/intro', to: '/solution/intro'},
          {from: '/general/operational-safety', to: '/guides/operational-safety'},
          {from: '/general/robot-maintenance', to: '/guides/robot-maintenance'},
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
        // This plugin does not read `unlisted: true`. Every page carrying
        // that flag must also be named here. See docs/LESSONS.md.
        excludeRoutes: [
          '**/robot/ugv/ranger-mini-v2',
          '**/solution/adt/intro',
          '**/robot/quadruped/as2',
          '**/robot/humanoid/h2',
          '**/robot/manipulator/nero',
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
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebars-guides.ts',
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
        // Top level runs on a single axis. See docs/design/ia-proposal.md §2.1.
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
            docsPluginId: 'guides',
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
