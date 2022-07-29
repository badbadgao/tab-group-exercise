import React from 'react';
import Tabs from 'components/Tabs';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import ProductsPage from 'pages/ProductsPage';
import PageNotFound from 'pages/PageNotFound';

import 'css/index.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { tabs, getTabId } from 'config/app.config';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Tabs tabs={tabs} />
      <Switch>
        <Route exact path="/home">
          <HomePage tabId={getTabId('/home')} />
        </Route>
        <Route exact path="/about">
          <AboutPage tabId={getTabId('/about')} />
        </Route>
        <Route exact path="/products">
          <ProductsPage tabId={getTabId('/products')} />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
