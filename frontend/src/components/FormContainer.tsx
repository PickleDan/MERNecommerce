import React from "react"
import { Col, Container, Row } from "react-bootstrap"

type FormContainerProps = {
  children: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={10} md={12} lg={10} xl={8}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
