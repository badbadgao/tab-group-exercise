import React from 'react';
import Tabs from 'components/Tabs';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import ProductsPage from 'pages/ProductsPage';

import './css/index.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { tabs, getTabId } from 'config/app.config';

const App: React.FC = () => {
  return (
    <div className="app">
      <Tabs tabs={tabs} />
      <Switch>
        <Route path="/home">
          <HomePage tabId={getTabId('/home')} />
        </Route>
        <Route path="/about">
          <AboutPage tabId={getTabId('/about')} />
        </Route>
        <Route path="/products">
          <ProductsPage tabId={getTabId('/products')} />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
