import React, { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { History } from "history"
import { PaymentMethod, savePaymentMethod } from "../Cart/cartSlice"
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"

type ShippingScreenProps = {
  history: History
}

const PaymentScreen = ({ history }: ShippingScreenProps) => {
  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress)

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.PayPal
  )

  const dispatch = useAppDispatch()

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Способ оплаты</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Выберите способо оплаты</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal или дебетовая карта"
              id="PayPal"
              name="Способ оплаты"
              value="PayPal"
              checked
              onChange={(e: any) => setPaymentMethod(e.target.value)}
            />
            {/*<Form.Check*/}
            {/*  type="radio"*/}
            {/*  label="Google pay"*/}
            {/*  id="GooglePay"*/}
            {/*  name="Способ оплаты"*/}
            {/*  value="GooglePay"*/}
            {/*  onChange={(e: any) => setPaymentMethod(e.target.value)}*/}
            {/*/>*/}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Продолжить
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
