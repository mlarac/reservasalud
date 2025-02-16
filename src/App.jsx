import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginView from './views/LoginView';
// ... otras importaciones

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ... otras rutas */}
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;