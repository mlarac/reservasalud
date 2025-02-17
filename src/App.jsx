import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import HomePage from './views/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardView from './views/CardView';
import Nosotros from './views/Nosotros';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// ... otras importaciones

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardview/:type/:id" element={<CardView />} />  
        <Route path="/nosotros" element={<Nosotros />} />
          {/* ... otras rutas */}
          <Route path="/login" element={<LoginView />} />          
          <Route path="/register" element={<RegisterView />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;