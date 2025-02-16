import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage'
import CardView from './views/CardView'
import LoginPage from './views/LoginPage'
import AdminPage from './views/AdminPage'
import Nosotros from './views/Nosotros'
import { UsuarioContext } from './context/UsuarioContext'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/Footer'


function App() {
  const { usuario } = useContext(UsuarioContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardview/:type/:id" element={<CardView />} />         
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/admin"
          element={usuario ? <AdminPage /> : <Navigate to="/login" />}
        />
      </Routes>      
      <Footer />
    </>
  )
}

export default App
