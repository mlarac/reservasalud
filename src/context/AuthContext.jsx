import {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (rut, password) => {
    // Simulacion login API call
    if (rut === '12345678-9' && password === 'password') {
      setUser({
        token: 'abc123',
        rut: '12345678-9',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'paciente'
      });
      return true;
    } else {
      try {
        const response = await fetch('api_url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rut, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            token: data.token,
            rut: data.rut,
            name: data.name,
            email: data.email,
            role: data.role
          });
          return true;
        } else {
          throw new Error('Invalid rut or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        return false;
      }
    }
  };

  const register = async (rut, nombre, email, password) => {
    // Aquí iría tu lógica de registro
    try {
      // Simula una llamada a la API
      const response = await fetch('api_url/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, nombre, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          token: data.token,
          rut: data.rut,
          name: data.nombre,
          email: data.email,
          role: data.role || 'paciente' // Asumimos que los nuevos registros son usuarios normales
        });
        return true;
      } else {
        throw new Error(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      return false;
    }
  };

  // Método para logout, que cambia el user a null
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// Hook para consumir el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);