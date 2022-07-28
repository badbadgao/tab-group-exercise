import React from 'react';
import { render, screen } from '@testing-library/react';
import { TTab } from 'components/Tabs/types';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Tabs from 'components/Tabs';

test('check the whole app with 3 tabs', () => {
  const tabArray: TTab[] = [
    { id: 'tab1', label: 'Tab1', link: '/tab1' },
    { id: 'tab2', label: 'Tab2', link: '/tab2' },
    { id: 'tab3', label: 'Tab3', link: '/tab3' },
  ];

  const history = createMemoryHistory();
  const tabsElement = render(
    <Router history={history}>
      <Tabs tabs={tabArray} />
    </Router>,
  );

  // snapshot test
  expect(tabsElement).toMatchSnapshot();

  // 1 element with the role 'tablist'
  const tabList = screen.getAllByRole('tablist');
  expect(tabList).toHaveLength(1);

  // 3 element with the role 'tablist'
  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(3);

  // Only one tab with selected status
  const activeTabs = screen.getAllByRole('tab', { selected: true });
  expect(activeTabs).toHaveLength(1);
  expect(activeTabs[0]).toHaveTextContent('Tab1');

  // Only products and about tab with not selected status
  const inActiveTabs = screen.getAllByRole('tab', { selected: false });
  expect(inActiveTabs).toHaveLength(2);
  expect(inActiveTabs[0]).toHaveTextContent('Tab2');
  expect(inActiveTabs[1]).toHaveTextContent('Tab3');
});
