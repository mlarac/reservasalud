import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/img/logo.svg';

const CustomNavbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

    return (
        <Navbar
            bg="custom"
            expand="lg"
            fixed="top"
            className="custom-navbar"
        >
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <div className="logo-container bg-white p-2 rounded">
                        <img
                            src={logo}
                            alt="Logo"
                            className="custom-logo"
                            style={{ width: '100px', borderRadius: '15px' }}
                        />
                    </div>
                </Navbar.Brand>

                {/* Botón Hamburguesa para móviles */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Contenido del Navbar */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto gap-lg-4"> {/* Separación entre links */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            Registrate
                        </NavLink>
                        <NavLink
                            to="/intranet"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            Intranet
                        </NavLink>
                        <NavLink
                            to="/nosotros"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            Nosotros
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;