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

  const history = useHistory();
  const location = useLocation();

  // Find the tab that matches the url, if no tab matches the url, then change the tab index to 0
  // which is the first tab.
  let tabIndex = 0;
  tabs.find((tab, index) => {
    if (location.pathname === tab.link) {
      tabIndex = index;
      return true;
    }
  });

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(tabIndex);

  useEffect(() => {
    history.push(tabs[selectedTabIndex].link);
  }, [selectedTabIndex]);

  /**
   * keyboard key down event handler
   *
   * When right arrow key is clicked, change tab to the next tab on the right. If the current active
   * tab is already the last tab, then change tab to the first tab
   *
   * When left arrow key is clicked, change tab to the next tab on the left. If the current active
   * tab is already the first tab, then change tab to the last tab
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    let isKeyDownHandled = false;
    switch (e.code) {
      case 'ArrowRight':
        setSelectedTabIndex((previousTabIndex) =>
          previousTabIndex < tabs?.length - 1 ? previousTabIndex + 1 : FIRST_TAB_INDEX,
        );
        isKeyDownHandled = true;
        break;
      case 'ArrowLeft':
        setSelectedTabIndex((previousTabIndex) => (previousTabIndex > 0 ? previousTabIndex - 1 : LAST_TAB_INDEX));
        isKeyDownHandled = true;
        break;
      default:
        break;
    }

    if (isKeyDownHandled) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  /**
   * tab select change handler
   *
   * @param tabIndex the tab index that is selected
   */
  const onTabSelectChange = (tabIndex: number): void => {
    setSelectedTabIndex(tabIndex);
  };

  return (
    <nav className="tabs">
      <div role="tablist" onKeyDown={onKeyDown} aria-labelledby="nav-tablist">
        {tabs?.map((tab, tabIndex) => (
          <Tab
            key={tab.id}
            tab={tab}
            onTabSelectChange={onTabSelectChange}
            tabIndex={tabIndex}
            selectedTabIndex={selectedTabIndex}
          />
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
