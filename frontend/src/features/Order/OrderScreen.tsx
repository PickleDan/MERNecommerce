import React from "react"
import { useAppSelector } from "../../app/hooks"
import { Link } from "react-router-dom"
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"
import { Col, ListGroup, Row, Image, Button, Card } from "react-bootstrap"
import Message from "../../components/Message"

type OrderScreenProps = {}

const OrderScreen = ({}: OrderScreenProps) => {
  const cart = useAppSelector((state) => state.cart)

  const addDecimals = (num: number) => Math.round(num * 100) / 100

  //  Calculate prices
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = addDecimals(+itemsPrice > 500 ? 0 : 100)

  const placeOrderHandler = () => {
    console.log("order")
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Доставка</h2>
              <p>
                <strong>Адрес:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Способ оплаты</h2>
              <strong>Оплата: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Список товаров</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Ваша корзина пуста</Message>
              ) : (
                <ListGroup variant={"flush"}>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Итого</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Товары</Col>
                  <Col>{itemsPrice} ₽</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Доставка</Col>
                  <Col>{shippingPrice} ₽</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Итого</Col>
                  <Col>{itemsPrice + shippingPrice} ₽</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className={"btn-block"}
                  disabled={cart.cartItems.length == 0}
                  onClick={placeOrderHandler}
                >
                  Сделать заказ
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
