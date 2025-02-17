import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/HomePage.css'; 
import medicosData from '../assets/medicosData';
import Slider from 'react-slick';
import bannerImage1 from '../assets/banner-home-medicina-general-desktop.webp';
import bannerImage2 from '../assets/banners-home-medicina-general-desktop2.webp';
import bannerImage3 from '../assets/ImagenBanner3.webp';




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