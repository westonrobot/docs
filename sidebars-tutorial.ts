import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsTutorial: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Before You Operate',
      items: [
        'operational-safety',
        'robot-maintenance',
      ],
    },
    {
      type: 'category',
      label: 'Software Setup',
      items: [
        'installation/apt_source',
      ],
    },
    {
      type: 'category',
      label: 'UGV Guides',
      items: [
        'agilex/ugv_base_control',
      ],
    },
    {
      type: 'category',
      label: 'Quadruped Guides',
      items: [
        'unitree/go2_diag_guide',
        'unitree/go2_slam',
        'unitree/b2_diag_guide',
      ],
    },
    {
      type: 'category',
      label: 'Humanoid Guides',
      items: [
        'unitree/g1_dev_guide',
        'unitree/g1_diag_guide',
        'unitree/g1_internet_guide',
      ],
    },
  ],
};

export default sidebarsTutorial;
