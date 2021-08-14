import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import "./CheckoutSteps.scss"

type CheckoutStepsProps = {
  step1: boolean
  step2: boolean
  step3: boolean
  step4: boolean
}

const CheckoutSteps = ({
  step1,
  step2,
  step3,
  step4,
}: Partial<CheckoutStepsProps>) => {
  return (
    <Nav className={"justify-content-center, mb-4"}>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="link">Вход</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Вход</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="link">Адрес доставка</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Адрес доставка</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="link">Способ оплаты</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Способ оплаты</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="link">Заказ</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Заказ</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
