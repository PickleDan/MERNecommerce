import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { State } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { fetchListProducts, ProductDetails } from "../Product/productSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListProducts());
  }, [dispatch]);

  const productList = useAppSelector((state) => state.productList);
  const { status, products, error } = productList;
  return (
    <>
      <h1>Новые товары</h1>
      {status === "loading" ? (
        <Loader />
      ) : status === "failed" ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product: ProductDetails) => (
            <Col key={product.productId} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
