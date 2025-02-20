import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(rut, password);
    if (success) {
      navigate('/');
    } else {
      setError('Login Fallo, revisa los datos ingresados. Por favor, intente nuevamente. :)');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-4" controlId="formRut">
        <Form.Label>RUT</Form.Label>
        <Form.Control
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="Ingresa tu RUT"
          required
          className="py-2"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          className="py-2"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 py-2 mt-3">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default Login;