import { History } from "history";
import React, { useEffect, useState } from "react";
import {
  Button, Card, Col, Form, Image,
  ListGroup, Row
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, match } from "react-router-dom";
import { State } from "../../app/store";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Rating from "../../components/Rating";
import { fetchProductDetails, ProductId, ProductState } from "./productSlice";

type ProductScreenProps = {
  match: match<MatchParams>;
  history: History;
};

type MatchParams = {
  id: string;
};

const ProductScreen = ({ history, match }: ProductScreenProps) => {
  const [qty, setQty] = useState<number>(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state: State) => state.productDetails);

  const { status, error, product }: ProductState = productDetails;

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id as ProductId));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Назад
      </Link>
      {status === "loading" ? (
        <Loader />
      ) : status === "failed" ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {product && (
            <>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product?.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Цена: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Описание товара: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant={"flush"}>
                    <ListGroup.Item>
                      <Row>
                        <Col>Цена:</Col>{" "}
                        <Col>
                          <strong>{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Статус:</Col>{" "}
                        <Col>
                          {product.countInStock > 0
                            ? "В наличии"
                            : "Нет в наличии"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Кол-во</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(+e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className={"btn-block"}
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Добавить в корзину
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
