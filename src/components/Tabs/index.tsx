import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Tab from './Tab';
import { TTab } from './types';

import './Tabs.scss';

type TProps = {
  tabs: TTab[];
};

const Tabs = ({ tabs }: TProps): JSX.Element => {
  const FIRST_TAB_INDEX = 0;
  const LAST_TAB_INDEX = tabs.length - 1;

  const location = useLocation();
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  useEffect(() => {
    let tabIndex = 0;
    // find the tab that matches the url, if no tab matches the url, then change the tab index to 0
    // which is the first tab.
    tabs.find((tab, index) => {
      if (location.pathname === tab.link) {
        tabIndex = index;
        return true;
      }
    });

    setSelectedTabIndex(tabIndex);
  }, [location.pathname]);

  /**
   * keyboard key down event handler
   *
   * When arrow right is clicked, change tab to the next tab on the right. If the current active
   * tab is already the last tab, then change tab to the first tab
   *
   * When arrow left is clicked, change tab to the next tab on the left. If the current active
   * tab is already the first tab, then change tab to the last tab
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.code) {
      case 'ArrowRight':
        const nextSelettedTabIndex = selectedTabIndex < tabs?.length - 1 ? selectedTabIndex + 1 : FIRST_TAB_INDEX;
        setSelectedTabIndex(nextSelettedTabIndex);
        history.push(tabs[nextSelettedTabIndex].link);
        break;
      case 'ArrowLeft':
        const nextSelettedTabIndex2 = selectedTabIndex > 0 ? selectedTabIndex - 1 : LAST_TAB_INDEX;
        setSelectedTabIndex(nextSelettedTabIndex2);
        history.push(tabs[nextSelettedTabIndex2].link);
        break;
    }
  };

  /**
   * tab select change handler
   *
   * @param tabIndex the tab index that is selected
   */
  const onTabSelectChange = (tabIndex: number) => {
    setSelectedTabIndex(tabIndex);
    history.push(tabs[tabIndex].link);
  };

  return (
    <nav className="tabs">
      <ul role="tablist" onKeyDown={onKeyDown}>
        {tabs?.map((tab, tabIndex) => (
          <Tab
            key={tab.id}
            tab={tab}
            onTabSelectChange={onTabSelectChange}
            tabIndex={tabIndex}
            selectedTabIndex={selectedTabIndex}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
