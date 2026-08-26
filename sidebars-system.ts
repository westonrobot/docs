import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSystem: SidebarsConfig = {
  systemSidebar: [
    'intro',
    {
      type: 'category',
      label: 'UGV Development Kit',
      // The product page is the category's own landing page, so clicking the
      // category goes somewhere useful instead of just expanding.
      link: {type: 'doc', id: 'ugv_devkit/index'},
      items: [
        // Previously only the two version pages were listed, which left the
        // guides below reachable only through inline links — and
        // getting_started reachable from nowhere at all.
        'ugv_devkit/v1/getting_started',
        'ugv_devkit/component_reconfiguration',
        'ugv_devkit/v1/nav2_sample_setup_guide',
        'ugv_devkit/v1/mid360_extension',
        'ugv_devkit/v1/vision_extension',
      ],
    },
  ],
};

export default sidebarsSystem;
