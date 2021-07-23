import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../app/store"
import { History } from "history"
import {
  getUserDetails,
  register,
  updateUserProfile,
} from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

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

  const userDetails = useSelector((state: State) => state.userDetails)
  const { loading, error, userInfo: user } = userDetails

  const userLogin = useSelector((state: State) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(
    (state: State) => state.userUpdateProfile
  )
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают")
    } else {
      dispatch(updateUserProfile({ id: user._id, name, password }))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>Профиль</h2>
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && <Message variant={"success"}>Профиль обновлен</Message>}
        {loading && <Loader />}
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
      </Col>
    </Row>
  )
}

export default ProfileScreen
