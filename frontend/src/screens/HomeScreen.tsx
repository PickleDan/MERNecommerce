import React from "react";
import products from "../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductInfo } from "../common/types";

type HomeScreenProps = {};

const HomeScreen = () => {
  return (
    <>
      <h1>Новые товары</h1>
      <Row>
        {products.map((product: ProductInfo) => (
          <Col key={product._id} sm={12} md={6} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
