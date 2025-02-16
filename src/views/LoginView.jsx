import React from 'react';
import Login from '../components/Login';
import { Container, Row, Col, Card } from 'react-bootstrap';

const LoginView = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h2" className="text-center">Login</Card.Header>
            <Card.Body>
              <Login />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;