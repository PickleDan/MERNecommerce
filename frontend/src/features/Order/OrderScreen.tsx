import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, match } from "react-router-dom"
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import Message from "../../components/Message"
import { getOrderDetails, OrderId } from "../PlaceOrder/orderSlice"
import Loader from "../../components/Loader"

type OrderScreenProps = {
  match: match<{ id: OrderId }>
}

const OrderScreen = ({ match }: OrderScreenProps) => {
  const orderId = match.params.id

  const orderDetails = useAppSelector((state) => state.orderDetails)
  const { order, status, error } = orderDetails

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [orderId])

  if (!order) return null
  const user = order.user

  let itemsPrice: number = 0
  if (status !== "loading") {
    const addDecimals = (num: number) => Math.round(num * 100) / 100
    //  Calculate prices
    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  return status === "loading" ? (
    <Loader />
  ) : status === "failed" ? (
    <Message variant={"danger"}>{error}</Message>
  ) : (
    <>
      <h1>Заказ #{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Доставка</h2>
              {user && (
                <>
                  <p>
                    <strong>Пользователь: </strong> {user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                </>
              )}
              <p>
                <strong>Адрес: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant={"success"}>
                  Доставлен {order.deliveredAt}
                </Message>
              ) : (
                <Message variant={"danger"}>Не доставлен</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Способ оплаты</h2>
              <p>
                <strong>Оплата: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant={"success"}>Оплачен {order.paidAt}</Message>
              ) : (
                <Message variant={"danger"}>Не оплачен</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Список товаров</h2>
              {order.orderItems.length === 0 ? (
                <Message>Заказ не сформирован</Message>
              ) : (
                <ListGroup variant={"flush"}>
                  {order.orderItems.map((item, index) => (
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
                  {itemsPrice && <Col>{itemsPrice} ₽</Col>}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Доставка</Col>
                  <Col>{order.shippingPrice} ₽</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Итого</Col>
                  <Col>{order.totalPrice} ₽</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
