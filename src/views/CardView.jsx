import React from 'react';
import { useParams } from 'react-router-dom';

// Datos de médicos
const medicosData = [
  {
    nombre: "Dr. Juan Pérez",
    especialidad: "Medicina General",
    region: "I Región",
    imagen: "https://ochsner-craft.s3.amazonaws.com/imager/wwwdoctors/4408779/perez-juan-1821106261-e006f118a4.jpg",
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

const CardView = () => {
  const { type, id } = useParams();
  let filteredMedicos = [];

  if (type === "especialidad") {
    filteredMedicos = medicosData.filter(medico => medico.especialidad === id);
  } else if (type === "nombre") {
    filteredMedicos = medicosData.filter(medico => medico.nombre === id);
  } else if (type === "region") {
    filteredMedicos = medicosData.filter(medico => medico.region === id);
  }

  const title = type === "especialidad" ? id : type === "nombre" ? id : id;

  return (
    <div>
      <h1>{title || "Sin resultados"}</h1>
      <div className="card-container">
        {filteredMedicos.length > 0 ? (
          filteredMedicos.map((medico, index) => (
            <div key={index} className="card">
              <img src={medico.imagen} alt={medico.nombre} />
              <h2>{medico.nombre}</h2>
              <p>Especialidad: {medico.especialidad}</p>
              <p>Región: {medico.region}</p>
            </div>
          ))
        ) : (
          <p>Sin especialista por el momento</p>
        )}
      </div>
    </div>
  );
};

export default CardView;