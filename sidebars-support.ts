import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsSupport: SidebarsConfig = {
  // Support is deliberately two things: what to collect, and where to send it.
  supportSidebar: [
    'before-you-contact-us',
    {
      type: 'link',
      label: 'Submit a support request',
      href: 'https://forms.office.com/r/qELKzYF33W',
    },
  ],
};

export default sidebarsSupport;
