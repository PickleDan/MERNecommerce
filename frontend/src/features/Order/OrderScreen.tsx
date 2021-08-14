import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, match } from "react-router-dom"
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import Message from "../../components/Message"
import {
  getOrderDetails,
  OrderId,
  orderPayReset,
  payOrder,
} from "../PlaceOrder/orderSlice"
import Loader from "../../components/Loader"
import { PayPalButton } from "react-paypal-button-v2"

type OrderScreenProps = {
  match: match<{ id: OrderId }>
}

const OrderScreen = ({ match }: OrderScreenProps) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useAppSelector((state) => state.orderDetails)
  const { order, status, error } = orderDetails

  const orderPay = useAppSelector((state) => state.orderPay)
  const { status: statusPay, error: errorPay } = orderPay

  const dispatch = useAppDispatch()

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || statusPay === "succeeded") {
      dispatch(orderPayReset())
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      // @ts-ignore
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, statusPay, order])

  const successPaymentHandler = (paymentResult: any) => {
    console.log(paymentResult)
    dispatch(payOrder({ orderId, paymentResult }))
  }

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

              {!order.isPaid && (
                <ListGroup.Item>
                  {statusPay === "loading" && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

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
