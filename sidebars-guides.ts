import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsGuides: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Before You Operate',
      items: [
        // The landing page is the category's own doc, as in Manifold Scanner
        // Guides. Why per-type pages: docs/design/ia-proposal.md §10.
        {
          type: 'category',
          label: 'Operational Safety',
          link: {type: 'doc', id: 'operational-safety'},
          items: [
            'safety/wheeled-bases',
            'safety/quadrupeds',
            'safety/humanoids',
            'safety/manipulators',
          ],
        },
        {
          type: 'category',
          label: 'Robot Maintenance',
          link: {type: 'doc', id: 'robot-maintenance'},
          items: [
            'maintenance/wheeled-bases',
            'maintenance/quadrupeds',
            'maintenance/humanoids',
            'maintenance/manipulators',
          ],
        },
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
        'agilex/ranger_mini_calibration',
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
    {
      type: 'category',
      label: 'Manifold Scanner Guides',
      // The index is the category's own landing page, so clicking the category
      // opens the overview instead of just expanding.
      link: {type: 'doc', id: 'manifold/index'},
      // Ordered as the workflow runs: connect, capture, process.
      items: [
        'manifold/connecting',
        'manifold/scanning',
        'manifold/processing',
      ],
    },
  ],
};

export default sidebarsGuides;
