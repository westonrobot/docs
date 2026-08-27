import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Fleet Management System',
      // The overview is the category's own landing page, so clicking the
      // category goes somewhere useful instead of just expanding. Same shape
      // as ugv_devkit in sidebars-system.ts.
      link: {type: 'doc', id: 'fleet-management/index'},
      // Ordered as the overview's feature sections are, so the sidebar and
      // the page agree about what comes after what.
      items: [
        'fleet-management/robot-dashboard',
        'fleet-management/robot-teleoperation',
        'fleet-management/mission-editing',
        'fleet-management/detection-review',
        'fleet-management/tenant-management',
        'fleet-management/audit-log',
        'fleet-management/deployment-and-servicing',
      ],
    },
    // The Deployment Toolbox is still `unlisted` pending its own review, so it
    // is not listed here yet. Its ProductCard on the Solutions hub still
    // reaches it.
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
