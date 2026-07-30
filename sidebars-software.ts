import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSoftware: SidebarsConfig = {
  softwareSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Installation Guide',
      items: [
        'installation/apt_source',
      ],
    },
    {
      type: 'category',
      label: 'Assisted Driving Toolbox',
      // The versioned ADT pages were previously reachable only from inline
      // links on the parent page, so they appeared nowhere in the navigation.
      link: {type: 'doc', id: 'toolbox/assisted_driving_toolbox'},
      items: [
        'toolbox/adt_v3',
        'toolbox/adt_v2',
        'toolbox/adt_v1',
      ],
    },
    {
      type: 'category',
      label: 'Unitree Slam Guide',
      items: [
        'slam/go2_slam',
      ],
    },
  ],
};

export default sidebarsSoftware;
