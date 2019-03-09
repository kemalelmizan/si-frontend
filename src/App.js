import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Header from "./components/Header";
import MyCarousel from "./components/Carousel";
import MyTab from "./components/Tab";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="12">
              <Header />
              <MyCarousel />
              <MyTab />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
