import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSystem: SidebarsConfig = {
  systemSidebar: [
    'intro',
    {
      type: 'category',
      label: 'UGV Development Kit',
      items: [
        'ugv_devkit/v1.0',
        'ugv_devkit/v1.1'
      ],
    },
  ],
};

export default sidebarsSystem;