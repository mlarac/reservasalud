import '../assets/styles/cardView.css';
import { useParams } from 'react-router-dom';
import medicosData from '../assets/medicosData'; 
// Datos de médicos


const CardView = () => {
  const { type, id } = useParams();
  let filteredMedicos = [];
   console.log('llegue aca' , type,id);
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