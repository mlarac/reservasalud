import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

    return (
        <nav style={styles.nav}>
            <div style={styles.logoContainer}> {/* Contenedor para el logo */}
                <img src={logo} alt="Logo" style={styles.logo} />
            </div>
            <div style={styles.linksContainer}> {/* Contenedor para los enlaces */}
                <NavLink className={setActiveClass} to="/">Home</NavLink>
                <NavLink className={setActiveClass} to="/login">Ingresar</NavLink>                
                <NavLink className={setActiveClass} to="/admin">Login</NavLink>
                <NavLink className={setActiveClass} to="/admin">Registrate</NavLink>
                <NavLink className={setActiveClass} to="/admin">Intranet</NavLink>
                <NavLink className={setActiveClass} to="/nosotros">Nosotros</NavLink>

            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        alignItems: 'center', // Centra verticalmente
        padding: '10px',
        backgroundColor: '#67E0C8', // Color de fondo del navbar
        justifyContent: 'flex-start', // Alinea el logo a la izquierda
    },
    logoContainer: {
        backgroundColor: '#ffffff', // Color de fondo del contenedor del logo
        padding: '0px', // Espaciado interno
        borderRadius: '5px', // Bordes redondeados (opcional)
    },
    logo: {
        width: '100%', // Ajusta el tamaño del logo
        height: 'auto',
        borderRadius: '20px',
    },
    linksContainer: {
        display: 'flex', // Asegura que los enlaces estén en línea
        gap: '15px', // Espacio entre los enlaces
        flexGrow: 1, // Permite que el contenedor ocupe el espacio disponible
        justifyContent: 'center', // Centra los enlaces en el contenedor
    },
};

export default Navbar;

