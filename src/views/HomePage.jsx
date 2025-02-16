import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/HomePage.css'; 
import Slider from 'react-slick';
import bannerImage1 from '../assets/banner-home-medicina-general-desktop.webp';
import bannerImage2 from '../assets/banners-home-medicina-general-desktop2.webp';
import bannerImage3 from '../assets/ImagenBanner3.webp';

// Datos de médicos
const medicosData = [
  {
    nombre: "Dr. Juan Pérez",
    especialidad: "Medicina General",
    region: "I Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Ana Gómez",
    especialidad: "Medicina General",
    region: "II Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Carlos López",
    especialidad: "Traumatología",
    region: "II Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Sofía Rojas",
    especialidad: "Traumatología",
    region: "III Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Luis Martínez",
    especialidad: "Cardiología",
    region: "IV Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Valentina Torres",
    especialidad: "Cardiología",
    region: "V Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Felipe Torres",
    especialidad: "Neurología",
    region: "VI Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Camila Fernández",
    especialidad: "Neurología",
    region: "VII Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Esteban González",
    especialidad: "Bronco Pulmonar",
    region: "VIII Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Isabel Rivas",
    especialidad: "Bronco Pulmonar",
    region: "IX Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Andrés Mena",
    especialidad: "Medicina General",
    region: "X Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Patricia Salazar",
    especialidad: "Traumatología",
    region: "XI Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Ricardo Castillo",
    especialidad: "Cardiología",
    region: "XII Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Mariana López",
    especialidad: "Neurología",
    region: "XIII Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Nicolás León",
    especialidad: "Bronco Pulmonar",
    region: "XIV Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Teresa Ruiz",
    especialidad: "Medicina General",
    region: "XV Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Javier Soto",
    especialidad: "Traumatología",
    region: "XVI Región",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Sandra Pizarro",
    especialidad: "Cardiología",
    region: "Región Metropolitana",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dr. Oscar Alvarado",
    especialidad: "Neurología",
    region: "Región Metropolitana",
    imagen: "https://via.placeholder.com/150",
  },
  {
    nombre: "Dra. Lucia Jara",
    especialidad: "Bronco Pulmonar",
    region: "Región Metropolitana",
    imagen: "https://via.placeholder.com/150",
  },
];

const HomePage = () => {
  const [especialidadId, setEspecialidadId] = useState("");
  const [nombreId, setNombreId] = useState("");
  const [regionId, setRegionId] = useState("");
  const navigate = useNavigate();

  const buscarPorEspecialidad = () => { 
    if (especialidadId === "") {
      alert("Debe seleccionar una especialidad");
    } else {
      navigate(`/cardview/especialidad/${especialidadId}`);
    }
  };

  const buscarPorNombre = () => { 
    if (nombreId === "") {
      alert("Debe seleccionar un especialista");
    } else {
      navigate(`/cardview/nombre/${nombreId}`);
    }
  };

  const buscarPorRegion = () => { 
    if (regionId === "") {
      alert("Debe seleccionar una región");
    } else {
      navigate(`/cardview/region/${regionId}`);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
  };

  // Obtener especialidades y nombres únicos
  const especialidades = [...new Set(medicosData.map(medico => medico.especialidad))];
  const nombres = medicosData.map(medico => medico.nombre);
  const regiones = [...new Set(medicosData.map(medico => medico.region))];

  return (
    <main className="home-container">
      <div className="select-column">
        <div className="home-card-container">
          <h1>Consultas Médicas</h1>
          
          <select value={especialidadId} onChange={({ target }) => setEspecialidadId(target.value)}>
            <option value="">Busca por especialidad</option>
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>{especialidad}</option>
            ))}
          </select>
          <div className="button-container">
            <button onClick={buscarPorEspecialidad}>Buscar</button>
          </div>

          <select value={nombreId} onChange={({ target }) => setNombreId(target.value)}>
            <option value="">Busca por Nombre de especialista</option>
            {nombres.map((nombre, index) => (
              <option key={index} value={nombre}>{nombre}</option>
            ))}
          </select>
          <div className="button-container">
            <button onClick={buscarPorNombre}>Buscar</button>
          </div>

          <select value={regionId} onChange={({ target }) => setRegionId(target.value)}>
            <option value="">Busca por Región</option>
            {regiones.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
          <div className="button-container">
            <button onClick={buscarPorRegion}>Buscar</button>
          </div>
        </div>
      </div>

      <div className="carousel-column">
        <Slider {...settings}>
          <div>
            <img src={bannerImage1} alt="Carrusel 1" className="carousel-image" />
          </div>
          <div>
            <img src={bannerImage2} alt="Carrusel 2" className="carousel-image" />
          </div>
          <div>
            <img src={bannerImage3} alt="Carrusel 3" className="carousel-image" />
          </div>
        </Slider>
      </div>
    </main>
  );
}

export default HomePage;