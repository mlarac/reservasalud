import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ConfiguracionProfesional from './views/ConfiguracionProfesional';
import ReservarCita from './views/ReservarCita';
import GestionDisponibilidad from './views/GestionDisponibilidad';
// ... otras importaciones

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ... otras rutas */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/config" element={<ConfiguracionProfesional />} />
          <Route path="/reservar-cita" element={<ReservarCita />} />
          <Route path="/gestion-disponibilidad" element={<GestionDisponibilidad />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;