import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSolution: SidebarsConfig = {
  solutionSidebar: [
    'intro',
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
