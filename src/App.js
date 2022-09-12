import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageInicial from './Components/PageInicial';
import ShoppingCart from './Components/ShoppingCart';
import ProductDetails from './Components/ProductDetails';
import CheckoutPage from './Components/CheckoutPage';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ PageInicial } />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route exact path="/productdetails" component={ ProductDetails } />
          <Route exact path="/checkout" component={ CheckoutPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
