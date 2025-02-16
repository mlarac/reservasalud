import React from 'react';
import 'font-awesome/css/font-awesome.min.css';


const Footer = () => {
  return (
    <footer className="bg-dark text-center text-light p-4">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-4 mb-2">
            <p className="footer-uno footer-text mb-0 fs-4 fs-sm-1 text-white">
              Reserva Salud
            </p>
          </div>
          <div className="col-12 col-sm-4 mb-2">
            <p className="footer-dos footer-text mb-0 fs-4 fs-sm-1 text-white">
              &copy; Todos los derechos reservados
            </p>
          </div>
          <div className="col-12 col-sm-4 text-end">
            <nav aria-label="Redes sociales">
              <a href="https://spotify.com/" className="me-2 fs-4 fs-sm-1" aria-label="Spotify">
                <i className="fa-brands fa-spotify"></i>
              </a>
              <a href="https://www.linkedin.com" className="me-2 fs-4 fs-sm-1" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://www.x.com" className="me-2 fs-4 fs-sm-1" aria-label="X">
                <i className="fa-brands fa-x"></i>
              </a>
              <a href="https://www.facebook.com" className="me-2 fs-4 fs-sm-1" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com" className="me-2 fs-4 fs-sm-1" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;