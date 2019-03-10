import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Cart from "./Cart";
import Order from "./Order";
import Header from "./components/Header";
import NotFound from "./404";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div className="main-container">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/order/:id" component={Order} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
