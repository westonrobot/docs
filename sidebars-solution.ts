import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Robot Management Toolbox',
      // The overview is the category's own landing page, so clicking the
      // category goes somewhere useful instead of just expanding. Same shape
      // as ugv_devkit in sidebars-system.ts.
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
    {
      type: 'category',
      label: 'Robot Deployment Toolbox',
      link: {type: 'doc', id: 'robot-deployment-toolbox/index'},
      // Inspector before editor, matching the overview's own order.
      items: [
        'robot-deployment-toolbox/map-inspector',
        'robot-deployment-toolbox/map-editor',
      ],
    },
    // The Assisted Driving Toolbox is retired and `unlisted`, so it is not
    // listed here. Its URL stays alive because seven redirects from the old
    // /software/toolbox/* paths point at it (§11) and those are in
    // circulation with customers.
    // navigation and industrial-patrolling are draft: true, so they are
    // stripped from production builds and must not be listed here — a sidebar
    // entry pointing at a draft document fails the build.
  ],
};

export default sidebarsSolution;
