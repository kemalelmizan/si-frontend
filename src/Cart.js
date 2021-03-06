import React from "react";
import { Table, Container, Row, Col, Button } from "reactstrap";
import Request from "request";

let options = {
  method: "GET",
  url: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  headers: {
    access_token: process.env.REACT_APP_ACCESS_TOKEN,
    user_email: "kemalelmizan@gmail.com",
    authorization: process.env.REACT_APP_AUTHORIZATION
  }
};

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = { products: [], cart: {} };
  }
  componentDidMount() {
    options.url = `${process.env.REACT_APP_BACKEND_BASE_URL}/cartDetails/1`;
    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      response.body = JSON.parse(response.body);
      console.log(response.body);
      this.setState({ products: response.body.data });
    });
  }

  checkout() {
    console.log("checking out...");
    options.url = `${process.env.REACT_APP_BACKEND_BASE_URL}/checkout`;
    options.method = "POST";
    options.json = true;
    options.body = {
      user_id: 1,
      cart_id: 1,
      order_detail: "test"
    };
    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(response.body.data);
      window.location.href = `/order/${response.body.data.id}`;
    });
  }

  render() {
    const products = this.state.products.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
    return (
      <Container>
        <Row>
          <Col xs="12">
            <br />
            <h1>My Cart</h1>
            <br />
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
            <Button outline color="success" onClick={this.checkout}>
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
