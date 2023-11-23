import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ProductCard } from './pages/ProductCard/ProductCard';
import { MainPage } from './pages/MainPage';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:card" exact component={ProductCard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
