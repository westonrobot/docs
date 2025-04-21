import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsRobot: SidebarsConfig = {
  robotSidebar: [
    'robot-intro',
    {
      type: 'category',
      label: 'UGVs',
      items: [
        'ugv/ranger-mini-v2',
        'ugv/ranger-mini-v3'],
    },
    {
      type: 'category',
      label: 'Quadrupeds',
      items: [
        'quadruped/go2',
        'quadruped/b2',
      ],
    },
    {
      type: 'category',
      label: 'Humanoid',
      items: [
        'humanoid/g1',
        'humanoid/h1-2',
      ],
    },
    {
      type: 'category',
      label: 'Manipulators',
      items: [
        'manipulator/z1',
        'manipulator/piper',
      ],
    },
  ],
};

export default sidebarsRobot;