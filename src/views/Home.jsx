import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';

import '../assets/styles/home.css';
import medicosData from '../assets/medicosData';

import bannerImage1 from '../assets/img/banner-home-medicina-general-desktop.webp';
import bannerImage2 from '../assets/img/banners-home-medicina-general-desktop2.webp';
import bannerImage3 from '../assets/img/ImagenBanner3.webp';

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

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
  };

  // Datos de especialidades, nombres y regiones
  const especialidades = [...new Set(medicosData.map(m => m.especialidad))];
  const nombres = medicosData.map(m => m.nombre);
  const regiones = [...new Set(medicosData.map(m => m.region))];

  return (
    <main className="container mt-5 pt-5">
      <div className="row">
        {/* Columna de selección */}
        <div className="col-md-4 d-flex flex-column align-items-center">
          <div className="card p-4 w-100 shadow">
            <h1 className="text-center text-success">Consultas Médicas</h1>

            <select
              className="form-select mb-3 border-danger"
              value={especialidadId}
              onChange={({ target }) => setEspecialidadId(target.value)}
            >
              <option value="">Busca por especialidad</option>
              {especialidades.map((especialidad, index) => (
                <option key={index} value={especialidad}>{especialidad}</option>
              ))}
            </select>
            <button className="btn btn-custom-green w-100 mb-3" onClick={buscarPorEspecialidad}>
              Buscar
            </button>

            <select
              className="form-select mb-3 border-danger"
              value={nombreId}
              onChange={({ target }) => setNombreId(target.value)}
            >
              <option value="">Busca por Nombre de especialista</option>
              {nombres.map((nombre, index) => (
                <option key={index} value={nombre}>{nombre}</option>
              ))}
            </select>
            <button className="btn btn-custom-green w-100 mb-3" onClick={buscarPorNombre}>
              Buscar
            </button>

            <select
              className="form-select mb-3 border-danger"
              value={regionId}
              onChange={({ target }) => setRegionId(target.value)}
            >
              <option value="">Busca por Región</option>
              {regiones.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
            <button className="btn btn-custom-green w-100" onClick={buscarPorRegion}>
              Buscar
            </button>
          </div>
        </div>

        {/* Columna del carrusel */}
        <div className="col-md-8">
          <Slider {...settings}>
            <div>
              <img src={bannerImage1} alt="Carrusel 1" className="img-fluid rounded" />
            </div>
            <div>
              <img src={bannerImage2} alt="Carrusel 2" className="img-fluid rounded" />
            </div>
            <div>
              <img src={bannerImage3} alt="Carrusel 3" className="img-fluid rounded" />
            </div>
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
