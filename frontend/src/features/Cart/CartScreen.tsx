import { History } from "history"
import React, { useEffect } from "react"
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import { Link, match } from "react-router-dom"
import { addToCart, removeFromCart } from "./cartSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Message from "../../components/Message"
import { ProductId } from "../Product/productSlice"

type CartScreenProps = {
  match: match<MatchParams>
  history: History
  location: Location
}

type MatchParams = {
  id: string
}

const CartScreen = ({ match, location, history }: CartScreenProps) => {
  const productId = match.params.id as ProductId

  const qty = location.search ? location.search.split("=")[1] : 1

  const dispatch = useAppDispatch()

  const cart = useAppSelector((state) => state.cart)

  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, +qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id: ProductId) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Корзина с товарами</h1>
        {cartItems.length === 0 ? (
          <Message>
            В вашей корзине ничего нет <Link to="/">Назад</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Итого ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                товаров
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Перейти к оформлению
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
