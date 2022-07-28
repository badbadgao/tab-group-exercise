import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from '../App';

test('check the whole app with 3 tabs', () => {
  const history = createMemoryHistory();
  const app = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  // Snapshot test
  expect(app).toMatchSnapshot();

  // 1 element with the role 'tablist'
  const tabList = screen.getAllByRole('tablist');
  expect(tabList).toHaveLength(1);

  // 3 element with the role 'tablist'
  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(3);

  // Only the home tab is selected
  const activeTabs = screen.getAllByRole('tab', { selected: true });
  expect(activeTabs).toHaveLength(1);
  expect(activeTabs[0]).toHaveTextContent('Home');

  // Only products and about tab are not selected
  const inActiveTabs = screen.getAllByRole('tab', { selected: false });
  expect(inActiveTabs).toHaveLength(2);
  expect(inActiveTabs[0]).toHaveTextContent('Products');
  expect(inActiveTabs[1]).toHaveTextContent('About');

  // only the home tab panel is displaying
  const tabPanels = screen.getAllByRole('tabpanel');
  expect(tabPanels).toHaveLength(1);
  expect(tabPanels[0]).toHaveAttribute('aria-labelledby', 'tab-home');
  expect(tabPanels[0]).toHaveTextContent(/This is home page/i);
});

test('tab on click change', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const activeTab = screen.getByRole('tab', { selected: true });
  expect(activeTab).toHaveTextContent('Home');
  const inActiveTabs = screen.getAllByRole('tab', { selected: false });
  expect(inActiveTabs).toHaveLength(2);
  const productsTab = inActiveTabs[0];
  const aboutTab = inActiveTabs[1];
  expect(productsTab).toHaveTextContent('Products');
  expect(aboutTab).toHaveTextContent('About');

  // click products tab
  fireEvent.click(productsTab);
  // expect the selected tab to be products tab
  const updatedActiveTabs1 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs1).toHaveLength(1);
  expect(updatedActiveTabs1[0]).toHaveTextContent('Products');
  // expect the products page displays
  const tabPanels1 = screen.getAllByRole('tabpanel');
  expect(tabPanels1).toHaveLength(1);
  expect(tabPanels1[0]).toHaveAttribute('aria-labelledby', 'tab-products');
  expect(tabPanels1[0]).toHaveTextContent(/This is products page/i);

  // click about tab
  fireEvent.click(aboutTab);
  // expect the selected tab to be about tab
  const updatedActiveTabs2 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs2).toHaveLength(1);
  expect(updatedActiveTabs2[0]).toHaveTextContent('About');
  // expect the about page displays
  const tabPanels2 = screen.getAllByRole('tabpanel');
  expect(tabPanels2).toHaveLength(1);
  expect(tabPanels2[0]).toHaveAttribute('aria-labelledby', 'tab-about');
  expect(tabPanels2[0]).toHaveTextContent(/This is about page/i);
});

test('tab keydown change - arrow right key', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const tabList = screen.getAllByRole('tablist');
  expect(tabList).toHaveLength(1);

  const activeTab = screen.getByRole('tab', { selected: true });
  expect(activeTab).toHaveTextContent('Home');
  const inActiveTabs = screen.getAllByRole('tab', { selected: false });
  expect(inActiveTabs).toHaveLength(2);
  const productsTab = inActiveTabs[0];
  const aboutTab = inActiveTabs[1];
  expect(productsTab).toHaveTextContent('Products');
  expect(aboutTab).toHaveTextContent('About');

  // trigger arrow right key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowRight', code: 'ArrowRight' });
  // expect the selected tab to be products tab
  const updatedActiveTabs1 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs1).toHaveLength(1);
  expect(updatedActiveTabs1[0]).toHaveTextContent('Products');
  const tabPanels1 = screen.getAllByRole('tabpanel');
  expect(tabPanels1).toHaveLength(1);
  expect(tabPanels1[0]).toHaveAttribute('aria-labelledby', 'tab-products');
  expect(tabPanels1[0]).toHaveTextContent(/This is products page/i);

  // trigger arrow right key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowRight', code: 'ArrowRight' });
  // expect the selected tab to be about tab
  const updatedActiveTabs2 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs2).toHaveLength(1);
  expect(updatedActiveTabs2[0]).toHaveTextContent('About');
  const tabPanels2 = screen.getAllByRole('tabpanel');
  expect(tabPanels2).toHaveLength(1);
  expect(tabPanels2[0]).toHaveAttribute('aria-labelledby', 'tab-about');
  expect(tabPanels2[0]).toHaveTextContent(/This is about page/i);

  // trigger arrow right key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowRight', code: 'ArrowRight' });
  // expect the selected tab to be home tab
  const updatedActiveTabs3 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs3).toHaveLength(1);
  expect(updatedActiveTabs3[0]).toHaveTextContent('Home');
  const tabPanels3 = screen.getAllByRole('tabpanel');
  expect(tabPanels3).toHaveLength(1);
  expect(tabPanels3[0]).toHaveAttribute('aria-labelledby', 'tab-home');
  expect(tabPanels3[0]).toHaveTextContent(/This is home page/i);
});

test('tab keydown change - arrow left key', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const tabList = screen.getAllByRole('tablist');
  expect(tabList).toHaveLength(1);

  const activeTab = screen.getByRole('tab', { selected: true });
  expect(activeTab).toHaveTextContent('Home');
  const inActiveTabs = screen.getAllByRole('tab', { selected: false });
  expect(inActiveTabs).toHaveLength(2);
  const productsTab = inActiveTabs[0];
  const aboutTab = inActiveTabs[1];
  expect(productsTab).toHaveTextContent('Products');
  expect(aboutTab).toHaveTextContent('About');

  // trigger arrow left key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowLeft', code: 'ArrowLeft' });
  // expect the selected tab to be about tab
  const tabPanels1 = screen.getAllByRole('tabpanel');
  expect(tabPanels1).toHaveLength(1);
  expect(tabPanels1[0]).toHaveAttribute('aria-labelledby', 'tab-about');
  expect(tabPanels1[0]).toHaveTextContent(/This is about page/i);
  const updatedActiveTabs1 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs1).toHaveLength(1);
  expect(updatedActiveTabs1[0]).toHaveTextContent('About');

  // trigger arrow left key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowLeft', code: 'ArrowLeft' });
  // expect the selected tab to be products tab
  const updatedActiveTabs2 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs2).toHaveLength(1);
  expect(updatedActiveTabs2[0]).toHaveTextContent('Products');
  const tabPanels2 = screen.getAllByRole('tabpanel');
  expect(tabPanels2).toHaveLength(1);
  expect(tabPanels2[0]).toHaveAttribute('aria-labelledby', 'tab-products');
  expect(tabPanels2[0]).toHaveTextContent(/This is products page/i);

  // trigger arrow left key down event
  fireEvent.keyDown(tabList[0], { key: 'ArrowLeft', code: 'ArrowLeft' });
  // expect the selected tab to be home tab
  const updatedActiveTabs3 = screen.getAllByRole('tab', { selected: true });
  expect(updatedActiveTabs3).toHaveLength(1);
  expect(updatedActiveTabs3[0]).toHaveTextContent('Home');
  const tabPanels3 = screen.getAllByRole('tabpanel');
  expect(tabPanels3).toHaveLength(1);
  expect(tabPanels3[0]).toHaveAttribute('aria-labelledby', 'tab-home');
  expect(tabPanels3[0]).toHaveTextContent(/This is home page/i);
});
