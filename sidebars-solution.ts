import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Assisted Driving Toolbox',
      link: {type: 'doc', id: 'adt/intro'},
      items: [
        'adt/v3',
        'adt/v2',
        'adt/v1',
      ],
    },
    // navigation and industrial-patrolling are draft: true, so they are
    // stripped from production builds and must not be listed here — a sidebar
    // entry pointing at a draft document fails the build.
  ],
};

export default sidebarsSolution;
