import {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

const API_URL = 'http://localhost:3000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (rut, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
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
        throw new Error(data.message || 'Invalid rut or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (rut, nombre, email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, nombre, email, password, role: 'paciente' }),
      });
      console.log('Register request:', { rut, nombre, email, password });

      const data = await response.json();
      if (response.ok) {
        setUser({
          token: data.token,
          rut: data.rut,
          name: data.nombre,
          email: data.email,
          role:  data.role || 'paciente' // Asumimos que los nuevos registros son usuarios normales
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
export const useAuth = () => useContext(AuthContext);