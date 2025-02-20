import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

export const Register = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
          return;
        }
    
        try {
          const success = await register(rut, nombre, email, password);
          if (success) {
            navigate('/');
          } else {
            setError('El registro falló. Por favor, intente nuevamente.');
          }
        } catch (err) {
          setError('Ocurrió un error durante el registro. Por favor, intente más tarde.');
        }
      };

      return (
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="formRut">
            <Form.Label>RUT</Form.Label>
            <Form.Control
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="Ingresa tu RUT"
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              required
            />
          </Form.Group>
    
          <Button variant="primary" type="submit" className="w-100">
            Registrarse
          </Button>
        </Form>
      );
    };
    
    export default Register;