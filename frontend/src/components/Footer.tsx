import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type FooterProps = {};

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; DShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
