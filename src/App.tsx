import React from 'react';
import Tabs from 'components/Tabs';
import HomePage from 'pages/HomePage/HomePage';
import AboutPage from 'pages/AboutPage';
import ProductsPage from 'pages/ProductsPage';

import './css/index.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { tabs } from 'config/app.config';

const App: React.FC = () => {
  return (
    <div className="app">
      <Tabs tabs={tabs} />
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
