import React from "react";
import Rating from "./Rating";
import { Card } from "react-bootstrap";
import { ProductDetails } from "../common/types";
import { Link } from "react-router-dom";

type ProductProps = {
  product: ProductDetails;
};
const Product = ({ product }: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.productId}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.productId}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
