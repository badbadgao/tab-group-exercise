import { TTab } from 'components/Tabs/types';

export const tabs: TTab[] = [
  { id: 'home', label: 'Home', link: '/home' },
  { id: 'products', label: 'Products', link: '/products' },
  { id: 'about', label: 'About', link: '/about' },
];

export const getTabId = (link: string): string => {
  return tabs.find((tab) => tab.link === link)?.id || 'id-not-found';
};
