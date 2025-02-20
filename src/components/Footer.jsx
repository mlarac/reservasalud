import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="footer-custom w-100"> {/* Añade w-100 */}
            <div className="container-fluid px-0"> {/* Contenedor fluido */}
                <div className="row mx-0"> {/* Row sin márgenes */}
                    {/* Columna 1 - Logo/Marca */}
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <p className="brand-text mb-0">
                            Reserva Salud
                        </p>
                    </div>

                    {/* Columna 2 - Derechos */}
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <p className="rights-text mb-0">
                            &copy; Todos los derechos reservados
                        </p>
                    </div>

                    {/* Columna 3 - Redes Sociales */}
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <nav aria-label="Redes sociales">
                            {[
                                { url: "https://spotify.com/", icon: "fa-spotify", label: "Spotify" },
                                { url: "https://www.linkedin.com", icon: "fa-linkedin", label: "LinkedIn" },
                                { url: "https://www.x.com", icon: "fa-x", label: "X" },
                                { url: "https://www.facebook.com", icon: "fa-facebook", label: "Facebook" },
                                { url: "https://www.instagram.com", icon: "fa-instagram", label: "Instagram" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                >
                                    <i className={`fab ${social.icon}`} />
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;