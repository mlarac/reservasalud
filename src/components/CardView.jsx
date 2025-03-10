import '../assets/styles/cardView.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Cambiado aquí

const CardView = () => {
  const { type, id } = useParams();
  const navigate = useNavigate(); // Cambiado aquí
  const [filteredMedicos, setFilteredMedicos] = useState([]);

  useEffect(() => {
    const cargarProfesionales = async () => {
      try {
        const response = await fetch('/profesionales.json'); // Carga el JSON desde la carpeta public
        const data = await response.json();

        let medicos = [];
        if (type === "especialidad") {
          medicos = data.filter(medico => medico.especialidad === id);
        } else if (type === "nombre") {
          medicos = data.filter(medico => medico.nombre === id);
        } else if (type === "region") {
          medicos = data.filter(medico => medico.region === id);
        }

        setFilteredMedicos(medicos);
      } catch (error) {
        console.error("Error al cargar los profesionales:", error);
      }
    };

    cargarProfesionales();
  }, [type, id]);

  const title = type === "especialidad" ? id : type === "nombre" ? id : id;

  const handleReservarCita = (medico) => {
    navigate(`/reservar-cita?medicoId=${medico.id}`); // Cambiado aquí
  };

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
              <button onClick={() => handleReservarCita(medico)}>
                Reservar Cita
              </button>
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