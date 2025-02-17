import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Nosotros.css'; 
import Slider from 'react-slick';
import carouselImage1 from '../assets/corporativo1.png'; // Cambia a tus imágenes
import carouselImage2 from '../assets/corporativo3.jpg'; // Cambia a tus imágenes
import carouselImage3 from '../assets/corporativo4.webp';
import carouselImage4 from '../assets/corporativo5.jpg';

const Nosotros = () => {




  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    centerMode: true, // Activa el modo de centrado
    centerPadding: '0px', // Ajusta el espaciado en los lados
  };

  return (
    <main className="nosotros-container">
      <div className="nosotros-card-container">
        <h1>Misión</h1>
        <p>
        Brindar a las personas un acceso ágil y eficiente a servicios de salud de calidad, facilitando la reserva de horas en clínicas, hospitales y centros de investigación. Nos comprometemos a ser un puente entre los pacientes y los profesionales de la salud, optimizando el proceso de atención y mejorando la experiencia del usuario, siempre con un enfoque en la innovación y la excelencia en el servicio.
        </p>
        <h1>Visión</h1>
        <p>
        Ser la plataforma líder en reservas de servicios de salud en Chile, reconocida por su compromiso con la calidad, la innovación y el bienestar de las personas. Aspiramos a expandir nuestras operaciones y servicios, convirtiéndonos en un referente en el sector salud, contribuyendo al desarrollo de un sistema de atención más accesible, eficiente y humano desde 1992.
        </p>
        <h1>Resumen</h1>
        <p>
        Esta misión y visión destacan el compromiso de la empresa con la calidad del servicio, la innovación y la mejora de la experiencia del paciente, al mismo tiempo que enfatizan su trayectoria y reconocimiento en el sector salud. Si necesitas más ajustes o detalles, ¡no dudes en preguntar!
        </p> 
      </div>

        <div className="carousel-container">
        
        <Slider {...settings}>
          <div>
            <img src={carouselImage1} alt="Descripción de la Imagen 1" className="nosotros-carousel-image" />
          </div>
          <div>
            <img src={carouselImage2} alt="Descripción de la Imagen 2" className="nosotros-carousel-image" />
          </div>
          <div>
          <img src={carouselImage3} alt="Descripción de la Imagen 3" className="nosotros-carousel-image" />
          </div>
            
          <div>
            <img src={carouselImage4} alt="Descripción de la Imagen 4" className="nosotros-carousel-image" />
          </div>
        </Slider>
      </div>


      {/* Carrusel de Imágenes */}

    </main>
  );
}

export default Nosotros;