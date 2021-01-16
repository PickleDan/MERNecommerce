import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { History } from "history"
import { register } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

type LoginScreenProps = {
  location: Location
  history: History
}

const RegisterScreen = ({ location, history }: LoginScreenProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state: State) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают")
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <FormContainer>
      <h1>Регистрация</h1>
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
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
          Зарегистрироваться
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          У вас уже есть аакаунт?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Войти
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
