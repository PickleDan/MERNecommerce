import React, { useEffect, useState } from "react";
import { Link, match } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import { ProductId } from "../common/types";
import { State } from "../app/store";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductState } from "../reducers/productReducers";
import { History } from "history";

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

  const { loading, error, product }: ProductState = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id as ProductId));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Назад
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
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
