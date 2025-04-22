import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsTutorial: SidebarsConfig = {
  tutorialSidebar: [
    'tutorial-intro',
    {
      type: 'category',
      label: 'Unitree Tutorials',
      items: [
        'unitree/g1_dev_guide'
      ],
    },
  ],
};

export default sidebarsTutorial;