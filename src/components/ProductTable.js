import React from "react";
import {
  Table,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Alert
} from "reactstrap";
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
export default class ProductTable extends React.Component {
  constructor() {
    super();
    this.state = { products: [], cart: {}, alertAddedSuccess: false };
    this.onAlertAddedSuccessDismiss = this.onAlertAddedSuccessDismiss.bind(
      this
    );
  }
  componentDidMount() {
    options.url = `${process.env.REACT_APP_BACKEND_BASE_URL}/products/1/10`;
    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      response.body = JSON.parse(response.body);
      console.log(response.body);
      this.setState({ products: response.body.data });
    });
  }

  updateProductCartQuantity = e => {
    const productId = parseInt(e.target.getAttribute("data-productid")) || 0;
    const quantity = parseInt(e.target.value) || 0;
    if (productId !== 0) {
      this.setState({
        cart: {
          productId: productId,
          quantity: quantity
        }
      });
    }
  };

  addToCart = () => {
    console.log("adding to cart...");
    console.log(this.state.cart);

    options.url = `${process.env.REACT_APP_BACKEND_BASE_URL}/addToCart`;
    options.method = "POST";
    options.json = true;
    options.body = {
      user_id: 1,
      product_id: this.state.cart.productId,
      quantity: this.state.cart.quantity
    };
    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(response.statusCode);
      console.log(response.body.data);
      if (response.statusCode === 201) {
        this.setState({
          alertAddedSuccess: true
        });
      }
    });
  };

  onAlertAddedSuccessDismiss() {
    this.setState({ alertAddedSuccess: false });
  }

  render() {
    const products = this.state.products.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
          <td>
            <InputGroup>
              <Input
                type="number"
                data-productid={item.id}
                onChange={this.updateProductCartQuantity}
              />
              <InputGroupAddon addonType="append">
                <Button outline color="success" onClick={this.addToCart}>
                  <span role="img" aria-label="Add to Cart">
                    🛒
                  </span>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Alert
          color="info"
          isOpen={this.state.alertAddedSuccess}
          toggle={this.onAlertAddedSuccessDismiss}
        >
          Successfully added to cart!
        </Alert>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </Table>
      </div>
    );
  }
}
