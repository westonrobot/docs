import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    // Same order as the cards on solution/intro.md; change both together.
    // Why this order: docs/design/release-pages-plan.md §2.
    {
      type: 'category',
      label: 'Robot Platforms',
      link: {type: 'doc', id: 'robot-platforms/index'},
      items: [
        'robot-platforms/network-configuration',
      ],
    },
    // Scan capture is a scanner procedure, so it is in Manifold Scanner Guides
    // rather than here. See docs/adr/0002.
    {
      type: 'category',
      label: 'Robot Deployment Toolbox',
      // The overview is the category's own landing page, so clicking the
      // category goes somewhere useful instead of just expanding. Same shape
      // as ugv_devkit in sidebars-system.ts.
      link: {type: 'doc', id: 'robot-deployment-toolbox/index'},
      // Inspector before editor, matching the overview's own order.
      items: [
        'robot-deployment-toolbox/map-inspector',
        'robot-deployment-toolbox/map-editor',
      ],
    },
    {
      type: 'category',
      label: 'Robot Management Toolbox',
      link: {type: 'doc', id: 'robot-management-toolbox/index'},
      // Ordered as the overview's feature sections are, so the sidebar and
      // the page agree about what comes after what.
      items: [
        'robot-management-toolbox/robot-dashboard',
        'robot-management-toolbox/robot-teleoperation',
        'robot-management-toolbox/mission-editing',
        'robot-management-toolbox/detection-review',
        'robot-management-toolbox/tenant-management',
        'robot-management-toolbox/audit-log',
        'robot-management-toolbox/deployment-and-servicing',
      ],
    },
    // solution/adt/intro is `unlisted`, so it is not listed here. Old
    // /software/toolbox/* and /solution/adt/v1-v3 URLs redirect to it.
    //
    // navigation and industrial-patrolling are `draft: true`. A sidebar entry
    // pointing at a draft document fails the production build.
  ],
};

export default sidebarsSolution;
