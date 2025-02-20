import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ConfiguracionProfesional from './views/ConfiguracionProfesional';
import GestionDisponibilidad from './views/GestionDisponibilidad';
import ReservarCita from './views/ReservarCita';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './views/Home';
import Nosotros from './views/Nosotros';
import IntranetPage from './views/IntranetPage';
import CardView from './components/CardView'; 

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar /> {/* Navbar fijo */}

          {/* Contenedor principal con padding para evitar solapamiento */}
          <main className="flex-grow-1 content-wrapper">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />

              {/* Nueva ruta Intranet */}
              <Route path="/intranet" element={<IntranetPage />} />

              {/* Rutas ya existentes */}
              <Route path="/config" element={<ConfiguracionProfesional />} />
              <Route path="/gestion-disponibilidad" element={<GestionDisponibilidad />} />
              <Route path="/reservar-cita" element={<ReservarCita />} />
              <Route path='/nosotros' element={<Nosotros />} />
              <Route path="/cardview/:type/:id" element={<CardView />} />

            </Routes>
          </main>

          <Footer /> {/* Footer */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
