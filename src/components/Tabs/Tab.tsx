import React, { useRef, useEffect } from 'react';

import { TTab } from './types';

type TProps = {
  tab: TTab;
  tabIndex: number;
  selectedTabIndex: number;
  onTabSelectChange: (tabIndex: number) => void;
};

const Tab = ({ tab, tabIndex, selectedTabIndex, onTabSelectChange }: TProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selected = selectedTabIndex === tabIndex;

  useEffect(() => {
    // When the tab is selected, make this tab focused, doing this is mainly to make the keydown work
    // in Safari
    selected && buttonRef.current && buttonRef.current.focus();
  }, [buttonRef, selected]);

  return (
    <button
      ref={buttonRef}
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
