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
  ],
};

export default sidebarsSoftware;