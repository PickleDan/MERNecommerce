import React, { FormEvent, useEffect, useState } from "react"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../app/store"
import { History } from "history"
import {
  getUserDetails,
  register,
  updateUserProfile,
  UserId,
} from "./userSlice"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { getMyOrders } from "../PlaceOrder/orderSlice"
import { LinkContainer } from "react-router-bootstrap"

type ProfileScreenProps = {
  location: Location
  history: History
}

const ProfileScreen = ({ location, history }: ProfileScreenProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const dispatch = useDispatch()

  const { status, error, userInfo: user } = useSelector(
    (state: State) => state.userDetails
  )

  const userLogin = useSelector((state: State) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(
    (state: State) => state.userUpdateProfile
  )

  const { status: loadingOrders, error: errorOrders, orders } = useSelector(
    (state: State) => state.orderListMy
  )

  const { success } = userUpdateProfile

  useEffect(() => {
    dispatch(getMyOrders())
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(getMyOrders())
      if (user && !user.name) {
        dispatch(getUserDetails("profile" as UserId))
      } else {
        if (user) {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают")
    } else {
      if (user) {
        dispatch(updateUserProfile({ id: user._id, name, password }))
      }
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>Профиль</h2>
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && <Message variant={"success"}>Профиль обновлен</Message>}
        {status === "loading" && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Ваше имя</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Введите ваше имя"}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type={"email"}
              placeholder={"Введите ваш email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type={"password"}
              placeholder={"Введите ваш пароль"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control
              type={"password"}
              placeholder={"Подтвердите пароль"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>

          <Button type={"submit"} variant={"primary"}>
            Обновить
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Мои заказы</h2>

        {status === "loading" ? (
          <Loader />
        ) : status === "failed" ? (
          <Message>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>ДАТА</th>
                <th>ИТОГО</th>
                <th>ОПЛАТА</th>
                <th>ДОСТАВКА</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Подробнее
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
