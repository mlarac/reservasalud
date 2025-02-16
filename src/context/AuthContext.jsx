import {createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rut, setRut] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (rut, password) => {
    // Simulated login API call
    if (rut === '12345678-9' && password === 'password') {
      setToken('abc123');
      setRut('12345678-9');
      setName('John Doe');
      setEmail('john.doe@example.com');
      setRole('admin');
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
          setToken(data.token);
          setRut(data.rut);
          setName(data.name);
          setEmail(data.email);
          setRole(data.role);
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

  return (
    <AuthContext.Provider value={{ token, email, rut, name, role, login }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;
    