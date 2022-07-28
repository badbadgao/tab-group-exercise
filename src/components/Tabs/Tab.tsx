import React from 'react';

import { TTab } from './types';

type TProps = {
  tab: TTab;
  tabIndex: number;
  selectedTabIndex: number;
  onTabSelectChange: (tabIndex: number) => void;
};

const Tab = ({ tab, tabIndex, selectedTabIndex, onTabSelectChange }: TProps): JSX.Element => {
  const selected = selectedTabIndex === tabIndex;
  return (
    <button
      id={`tab-${tab.id}`}
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      aria-controls={`tabpanel-${tab.id}`}
      onClick={() => onTabSelectChange(tabIndex)}
    >
      <span>{tab.label}</span>
    </button>
  );
};
export default Tab;
