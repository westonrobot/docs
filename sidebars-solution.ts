import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    // Ordered by the workflow, not by how often a page is opened: a Robot
    // Platform is what a customer physically has, a site is mapped with the
    // Robot Deployment Toolbox before anything can be run, and the Robot
    // Management Toolbox is what it is run from afterwards. The overview
    // page's cards are in the same order, so the sidebar and the page agree.
    //
    // Plural on purpose. The page presents a set — three supported bases and a
    // comparison matrix — not one product, and the singular collides with the
    // glossary's `Platform`, which means base + low-level hardware and so
    // excludes the payload this page is mostly about.
    //
    // A category since 2026-09-11, when network configuration was added. The
    // index stays the category's landing page, so the URL never moved — which
    // is why the page was put in a directory on day one.
    {
      type: 'category',
      label: 'Robot Platforms',
      link: {type: 'doc', id: 'robot-platforms/index'},
      items: [
        'robot-platforms/network-configuration',
      ],
    },
    //
    // Capturing the scan the deployment toolbox starts from is a scanner
    // procedure rather than a solution (ADR 0002), so it is not listed here —
    // Manifold Scanner Guides is linked from the deployment toolbox instead.
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
