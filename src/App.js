import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageInicial from './Components/PageInicial';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact patch="/" component={ PageInicial } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
