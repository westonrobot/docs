import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsTutorial: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'UGV Tutorials',
      items: [
        'agilex/ugv_base_control'
      ],
    },
    {
      type: 'category',
      label: 'Humanoid Tutorials',
      items: [
        'unitree/g1_dev_guide',
        'unitree/g1_diag_guide'
      ],
    },
  ],
};

export default sidebarsTutorial;