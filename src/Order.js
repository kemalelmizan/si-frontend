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

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = { products: [], cart: {} };
  }
  componentDidMount() {
    options.url = `${process.env.REACT_APP_BACKEND_BASE_URL}/orderDetails/${
      this.props.match.params.id
    }`;
    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      response.body = JSON.parse(response.body);
      console.log(response.body);
      this.setState({ products: response.body.data });
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
          <td>{item.order_status}</td>
          <td>{item.payment_amount}</td>
          <td>{item.payment_status}</td>
          <td>{item.created_at}</td>
          <td>{item.updated_at}</td>
        </tr>
      );
    });
    return (
      <Container>
        <Row>
          <Col xs="12">
            <br />
            <h1>My Order #{this.props.match.params.id}</h1>
            <br />
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>order_status</th>
                  <th>payment_amount</th>
                  <th>payment_status</th>
                  <th>created_at</th>
                  <th>updated_at</th>
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
