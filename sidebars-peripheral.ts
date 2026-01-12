import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebarsPeripheral: SidebarsConfig = {
  peripheralSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Onboard Computers',
      items: [
        'computer/nanopc',
        'computer/cm4',
        'computer/j4012'],
    },
    {
      type: 'category',
      label: 'Network Devices',
      items: [
        'network/industrial_5g_router'],
    },
    {
      type: 'category',
      label: 'Power Devices',
      items: [
        'power/power_regulator_v2'],
    },
    {
      type: 'category',
      label: 'Sensors',
      items: [
        'sensor/manifold_pocket'],
    },
  ],
};

export default sidebarsPeripheral;