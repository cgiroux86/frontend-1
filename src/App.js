import React from 'react';
import logo from './logo.svg';
import './styles/app.scss';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
