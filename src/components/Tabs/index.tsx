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
  const UNKNOW_TAB_INDEX = -1;

  const history = useHistory();
  const location = useLocation();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(UNKNOW_TAB_INDEX);

  useEffect(() => {
    let tabIndex = UNKNOW_TAB_INDEX;
    tabs.find((tab, index) => {
      // check if the location path name matches the tab link or tab link with extra / at the end
      if (location.pathname === tab.link || location.pathname === tab.link + '/') {
        tabIndex = index;
        return true;
      }
    });

    setSelectedTabIndex(tabIndex);
  }, [location.pathname]);

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
        const tabIndexOnTheRight = selectedTabIndex < tabs?.length - 1 ? selectedTabIndex + 1 : FIRST_TAB_INDEX;
        setSelectedTabIndex(tabIndexOnTheRight);
        history.push(tabs[tabIndexOnTheRight].link);
        isKeyDownHandled = true;
        break;
      case 'ArrowLeft':
        const tabIndexOnTheLeft = selectedTabIndex > 0 ? selectedTabIndex - 1 : LAST_TAB_INDEX;
        setSelectedTabIndex(tabIndexOnTheLeft);
        history.push(tabs[tabIndexOnTheLeft].link);
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
    history.push(tabs[tabIndex].link);
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
