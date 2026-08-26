import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
    // ADT was a category over three version pages, v2 and v3 75% identical.
    // It is now one page tabbed by version, so it needs no category.
    {type: 'doc', id: 'adt/intro', label: 'Assisted Driving Toolbox'},
    // navigation and industrial-patrolling are draft: true, so they are
    // stripped from production builds and must not be listed here — a sidebar
    // entry pointing at a draft document fails the build.
  ],
};

export default sidebarsSolution;
