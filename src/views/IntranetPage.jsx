import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const IntranetPage = () => {
    const navigate = useNavigate();

    // Ejemplos de funciones para navegar a otras vistas
    const goToView1 = () => {
        navigate('/config');
    };
    const goToView2 = () => {
        navigate('/gestion-disponibilidad');
    };
    const goToView3 = () => {
        navigate('/reservar-cita');
    };

    return (
        <main className="container my-5 pt-5">
            <div className="row">
                <div className="col text-center">
                    <h1 className="text-success">Intranet</h1>
                    <p className="lead text-secondary">
                        Bienvenido a la sección de Intranet. Elige una de las opciones para continuar.
                    </p>
                </div>
            </div>

            {/* Botones */}
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-around">
                    <button
                        className="btn btn-custom-green mb-3 mb-md-0"
                        onClick={goToView1}
                        style={{ minWidth: '150px' }}
                    >
                        Configuración de citas
                    </button>

                    <button
                        className="btn btn-custom-green mb-3 mb-md-0"
                        onClick={goToView2}
                        style={{ minWidth: '150px' }}
                    >
                        Gestion disponibilidad
                    </button>

                    <button
                        className="btn btn-custom-green"
                        onClick={goToView3}
                        style={{ minWidth: '150px' }}
                    >
                        Reservar Cita
                    </button>
                </div>
            </div>
        </main>
    );
};

export default IntranetPage;
