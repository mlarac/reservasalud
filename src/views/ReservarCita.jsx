import React, { useEffect, useState } from 'react'
import ComponenteCalendario from '../components/Calendario'
import { Button, Card, Form, Row, Col } from "react-bootstrap"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RUTValidator } from '../utils/rutValidator'

const ReservarCita = () => {
    const [disponibilidad, setDisponibilidad] = useState([])
    const [bloqueSeleccionado, setBloqueSeleccionado] = useState(null)
    /* Estados para usuarios (profesionales) */
    const [usuarios, setUsuarios] = useState([])
    const [usuarioLogueado, setUsuarioLogueado] = useState(null)
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null)
    const [pacienteInfo, setPacienteInfo] = useState({
        rut: '',
        nombre: '',
        email: '',
        telefono: ''
    })

    /* Cargar usuarios desde /user.js y usar el primero como logueado */
    useEffect(() => {
        fetch('/user.js')
            .then(response => response.json())
            .then(data => {
                setUsuarios(data)
                if (data.length > 0) {
                    setUsuarioLogueado(data[0])
                }
            })
            .catch(error => {
                console.error('Error al cargar usuarios:', error)
                toast.error("Error al cargar usuarios.")
            })
    }, [])

    /* Cargar disponibilidad en el calendario según el profesional seleccionado */
    useEffect(() => {
        const cargarDatos = () => {
            if (!profesionalSeleccionado || !usuarioLogueado) {
                setDisponibilidad([])
                return
            }
            /* Sólo si el profesional seleccionado es el usuario logueado se muestran bloques */
            if (profesionalSeleccionado.id === usuarioLogueado.id) {
                const disponibilidades = JSON.parse(localStorage.getItem('disponibilidades') || '[]')
                    .filter(s => !s.reserved && s.profesionalId === profesionalSeleccionado.id)
                    .map(s => ({
                        ...s,
                        start: new Date(s.start),
                        end: new Date(s.end),
                        title: `Disponible - ${s.tipo}`
                    }))
                setDisponibilidad(disponibilidades)
            } else {
                /* Para profesionales que no están logueados se muestra el calendario en blanco */
                setDisponibilidad([])
            }
        }

        cargarDatos()
        window.addEventListener('storage', cargarDatos)
        return () => window.removeEventListener('storage', cargarDatos)
    }, [profesionalSeleccionado, usuarioLogueado])

    const manejarSeleccionEvento = (evento) => {
        setBloqueSeleccionado(evento)
    }

    const handleRUTChange = (e) => {
        const rawValue = e.target.value
        const cleanedValue = RUTValidator.clean(rawValue)
        setPacienteInfo({ ...pacienteInfo, rut: cleanedValue })
    }

    const handleRUTBlur = (e) => {
        const formatted = RUTValidator.format(e.target.value)
        setPacienteInfo({ ...pacienteInfo, rut: formatted })
    }

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const reservarCita = () => {
        if (!bloqueSeleccionado || !profesionalSeleccionado) {
            toast.error('Seleccione un profesional y un horario')
            return
        }

        if (!RUTValidator.validate(pacienteInfo.rut)) {
            toast.error('RUT inválido. Verifique el número y dígito verificador')
            return
        }

        if (!pacienteInfo.nombre.trim()) {
            toast.error('El nombre del paciente es obligatorio')
            return
        }

        if (!validarEmail(pacienteInfo.email)) {
            toast.error('Formato de email inválido')
            return
        }

        /* Marcar el bloque como reservado */
        const nuevasDisponibilidades = JSON.parse(localStorage.getItem('disponibilidades') || '[]')
            .map(item =>
                item.id === bloqueSeleccionado.id ? { ...item, reserved: true } : item
            )

        localStorage.setItem('disponibilidades', JSON.stringify(nuevasDisponibilidades))
        setDisponibilidad(prev => prev.filter(bloque => bloque.id !== bloqueSeleccionado.id))

        const nuevaCita = {
            id: Date.now(),
            ...bloqueSeleccionado,
            profesional: profesionalSeleccionado,
            reserved: true,
            paciente: {
                ...pacienteInfo,
                rut: RUTValidator.format(pacienteInfo.rut)
            }
        }

        const citas = JSON.parse(localStorage.getItem('citas') || '[]')
        localStorage.setItem('citas', JSON.stringify([...citas, nuevaCita]))

        toast.success('✅ Cita reservada exitosamente!')
        setBloqueSeleccionado(null)
        setPacienteInfo({
            rut: '',
            nombre: '',
            email: '',
            telefono: ''
        })
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary">📅 Reserva de Citas</h2>

            {/* Selección de profesional */}
            <Card className="mb-4 shadow">
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Seleccione profesional:</Form.Label>
                        <Form.Select
                            value={profesionalSeleccionado ? JSON.stringify(profesionalSeleccionado) : ""}
                            onChange={(e) =>
                                setProfesionalSeleccionado(e.target.value ? JSON.parse(e.target.value) : null)
                            }
                        >
                            <option value="">-- Seleccione --</option>
                            {usuarios.map(user => (
                                <option key={user.id} value={JSON.stringify(user)}>
                                    {user.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Card.Body>
            </Card>

            {/* Calendario de disponibilidad */}
            <Card className="shadow mb-4">
                <Card.Body>
                    <ComponenteCalendario
                        eventos={disponibilidad}
                        seleccionable={!!profesionalSeleccionado}
                        onSelectEvent={manejarSeleccionEvento}
                        eventPropGetter={(evento) => ({
                            style: {
                                backgroundColor: evento.reserved ? "#dc3545" : "#0d6efd",
                                color: "white",
                                borderRadius: "5px",
                                border: "none"
                            }
                        })}
                    />
                </Card.Body>
            </Card>

            {/* Confirmar Reserva */}
            {bloqueSeleccionado && (
                <Card className="border-primary mb-4">
                    <Card.Body>
                        <h5 className="card-title">Confirmar Reserva</h5>
                        <div className="mb-4">
                            <p className="card-text">
                                Profesional: {profesionalSeleccionado && profesionalSeleccionado.name}<br />
                                Fecha: {bloqueSeleccionado.start.toLocaleDateString()}<br />
                                Hora: {bloqueSeleccionado.start.toLocaleTimeString()} - {bloqueSeleccionado.end.toLocaleTimeString()}<br />
                                {bloqueSeleccionado.tipo && <>Tipo: {bloqueSeleccionado.tipo}</>}
                            </p>
                        </div>
                        <Form>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="formRUT">
                                        <Form.Label>RUT del Paciente <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ej: 12.345.678-9"
                                            value={pacienteInfo.rut}
                                            onChange={handleRUTChange}
                                            onBlur={handleRUTBlur}
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Formato: 12.345.678-9
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formNombre">
                                        <Form.Label>Nombre Completo <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ej: Juan Pérez González"
                                            value={pacienteInfo.nombre}
                                            onChange={(e) => setPacienteInfo({ ...pacienteInfo, nombre: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ej: juan.perez@email.com"
                                            value={pacienteInfo.email}
                                            onChange={(e) => setPacienteInfo({ ...pacienteInfo, email: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formTelefono">
                                        <Form.Label>Teléfono/Celular</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Ej: +569 1234 5678"
                                            value={pacienteInfo.telefono}
                                            onChange={(e) => setPacienteInfo({ ...pacienteInfo, telefono: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Button
                            variant="success"
                            onClick={reservarCita}
                            className="w-100 mt-3"
                        >
                            <i className="bi bi-check-circle me-2"></i>
                            Confirmar Reserva
                        </Button>
                    </Card.Body>
                </Card>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default ReservarCita
