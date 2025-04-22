import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSoftware: SidebarsConfig = {
  softwareSidebar: [
    'software-intro',
    {
      type: 'category',
      label: 'Installation Guide',
      items: [
        'installation/apt_source',
      ],
    },
    {
      type: 'category',
      label: 'Software Toolbox',
      items: [
        'toolbox/assisted_driving_toolbox',
      ],
    },
  ],
};

export default sidebarsSoftware;