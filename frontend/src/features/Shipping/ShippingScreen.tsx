import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useDispatch } from "react-redux"
import { saveShippingAddress } from "../Cart/cartSlice"
import CheckoutSteps from "../../components/CheckoutSteps"

type ShippingScreenProps = {
  history?: any
}

const ShippingScreen = ({ history }: ShippingScreenProps) => {
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress)

  const [address, setAddress] = useState<string>(shippingAddress.address)
  const [city, setCity] = useState<string>(shippingAddress.city)
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode
  )
  const [country, setCountry] = useState<string>(shippingAddress.country)

  const dispatch = useAppDispatch()

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, country, postalCode }))
    history.push("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Доставка</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Ваш адрес</Form.Label>
          <Form.Control
            required
            type={"text"}
            placeholder={"Введите адрес"}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Ваш город</Form.Label>
          <Form.Control
            required
            type={"text"}
            placeholder={"Введите город"}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Ваш почтовый индекс</Form.Label>
          <Form.Control
            required
            type={"text"}
            placeholder={"Введите почтовый индекс"}
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Страна</Form.Label>
          <Form.Control
            required
            type={"text"}
            placeholder={"Введите страну"}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Продолжить
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
