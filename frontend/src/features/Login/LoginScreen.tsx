import React, { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../app/store"
import { History } from "history"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { login } from "../Profile/userSlice"

type LoginScreenProps = {
  location: Location
  history: History
}

const LoginScreen = ({ location, history }: LoginScreenProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector((state: State) => state.userLogin)
  const { status, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <FormContainer>
      <h1>Вход</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {status === "loading" && <Loader />}
      <Form onSubmit={submitHandler}>
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
