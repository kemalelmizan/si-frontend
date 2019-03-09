import React, { Component } from "react";
import ProductTable from "./components/ProductTable";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductTable />
      </div>
    );
  }
}

export default App;
