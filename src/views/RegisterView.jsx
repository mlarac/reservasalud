import Register from '../components/Register';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RegisterView = () => {
  return (
    <Container fluid className="h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg">
            <Card.Header as="h2" className="text-center bg-primary text-white py-3">Registro</Card.Header>
            <Card.Body className="px-4 py-5">
              <Register />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterView;