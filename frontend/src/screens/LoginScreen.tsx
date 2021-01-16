import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { History } from "history"
import { login } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

type LoginScreenProps = {
  location: Location
  history: History
}

const LoginScreen = ({ location, history }: LoginScreenProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector((state: State) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Вход</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type={"email"}
            placeholder={"Введите ваш email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Введите ваш пароль"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type={"submit"} variant={"primary"}>
          Войти
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Еще не зарегистрированы?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Зарегистрироваться
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
