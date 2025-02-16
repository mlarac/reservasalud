import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './views/LoginView';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        {/* ... OTRAS RUTAS */}
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;