import React from "react"
import { Col, Container, Row } from "react-bootstrap"

type FooterProps = {}

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">&copy; 2021 Выгода.ру</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
