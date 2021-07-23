import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"

type ShippingScreenProps = {
  history?: any
}

const ShippingScreen = () => {

  const [adress, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    console.log('submit');
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="adress">
          <Form.Label>Ваш адрес</Form.Label>
          <Form.Control
            required
            type={"text"}
            placeholder={"Введите ваше имя"}
            onChange={(e) => setAddress(e.target.value)}
            value={adress}
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

        <Button type='submit' variant='primary'>
          Продолжить
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
