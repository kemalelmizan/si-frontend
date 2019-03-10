import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import MyCarousel from "./components/Carousel";
import MyTab from "./components/Tab";
import "./App.css";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            <MyCarousel />
            <MyTab />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
