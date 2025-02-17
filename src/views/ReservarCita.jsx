import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row, Col, Modal } from "react-bootstrap"
import { toast } from 'react-toastify'
import ComponenteCalendario from '../components/calendario/Calendario'
import RUTInput from '../components/forms/RUTInput'
import { useAuth } from '../context/AuthContext'
import ToastLayout from '../layouts/ToastLayout'
import { RUTValidator } from '../utils/rutValidator'

const ReservarCita = () => {
    const [disponibilidad, setDisponibilidad] = useState([])
    const [bloqueSeleccionado, setBloqueSeleccionado] = useState(null)
    const [pacienteInfo, setPacienteInfo] = useState({
        rut: '',
        nombre: '',
        email: '',
        telefono: ''
    })
    const [showConfirmacion, setShowConfirmacion] = useState(false)
    const [profesionales, setProfesionales] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        const cargarProfesionales = async () => {
            try {
                const response = await fetch('/profesionales.json')
                const data = await response.json()
                setProfesionales(data)
            } catch (error) {
                toast.error("Error cargando profesionales")
            }
        }
        cargarProfesionales()
    }, [])

    useEffect(() => {
        const cargarDatos = () => {
            if (!user?.profesionalSeleccionado) {
                setDisponibilidad([])
                return
            }

            const disponibilidades = JSON.parse(localStorage.getItem('disponibilidades') || '[]')
                .filter(s =>
                    !s.reserved &&
                    s.profesionalId === user.profesionalSeleccionado.id
                )
                .map(s => ({
                    ...s,
                    start: new Date(s.start),
                    end: new Date(s.end),
                    title: `Disponible - ${s.tipo}`
                }))
            setDisponibilidad(disponibilidades)
        }

        cargarDatos()
        window.addEventListener('storage', cargarDatos)
        return () => window.removeEventListener('storage', cargarDatos)
    }, [user?.profesionalSeleccionado])

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const reservarCita = () => {
        if (!bloqueSeleccionado || !user?.profesionalSeleccionado) {
            toast.error('Seleccione un profesional y horario')
            return
        }

        if (!RUTValidator.validate(pacienteInfo.rut)) {
            toast.error('RUT inválido')
            return
        }

        if (!pacienteInfo.nombre.trim()) {
            toast.error('Nombre obligatorio')
            return
        }

        if (!validarEmail(pacienteInfo.email)) {
            toast.error('Email inválido')
            return
        }

        const nuevasDisponibilidades = JSON.parse(localStorage.getItem('disponibilidades') || '[]')
            .map(item => item.id === bloqueSeleccionado.id ? { ...item, reserved: true } : item)

        localStorage.setItem('disponibilidades', JSON.stringify(nuevasDisponibilidades))

        const nuevaCita = {
            id: Date.now(),
            ...bloqueSeleccionado,
            profesional: user.profesionalSeleccionado,
            paciente: {
                ...pacienteInfo,
                rut: RUTValidator.format(pacienteInfo.rut)
            }
        }

        const citas = JSON.parse(localStorage.getItem('citas') || '[]')
        localStorage.setItem('citas', JSON.stringify([...citas, nuevaCita]))

        toast.success('✅ Cita reservada!')
        setShowConfirmacion(false)
        setBloqueSeleccionado(null)
        setPacienteInfo({ rut: '', nombre: '', email: '', telefono: '' })
    }

    return (
        <ToastLayout>
            <div className="container mt-4">
                <h2 className="mb-4 text-primary">Reserva de Citas</h2>

                <Card className="mb-4 shadow">
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Seleccione profesional:</Form.Label>
                            <Form.Select
                                value={user?.profesionalSeleccionado ? JSON.stringify(user.profesionalSeleccionado) : ""}
                                onChange={(e) => {
                                    const profesional = e.target.value ? JSON.parse(e.target.value) : null
                                }}
                            >
                                <option value="">-- Seleccione --</option>
                                {profesionales.map(prof => (
                                    <option key={prof.id} value={JSON.stringify(prof)}>
                                        {prof.name} - {prof.especialidad}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Card className="shadow mb-4">
                    <Card.Body>
                        <ComponenteCalendario
                            eventos={disponibilidad}
                            seleccionable={!!user?.profesionalSeleccionado}
                            onSelectEvent={setBloqueSeleccionado}
                            eventPropGetter={(evento) => ({
                                style: {
                                    backgroundColor: evento.reserved ? "#dc3545" : "#0d6efd",
                                    color: "white"
                                }
                            })}
                        />
                    </Card.Body>
                </Card>

                {bloqueSeleccionado && (
                    <Card className="border-primary mb-4">
                        <Card.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <RUTInput
                                            value={pacienteInfo.rut}
                                            onChange={(value) => setPacienteInfo(prev => ({ ...prev, rut: value }))}
                                            onBlur={(formatted) => setPacienteInfo(prev => ({ ...prev, rut: formatted }))}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formNombre">
                                            <Form.Label>Nombre Completo</Form.Label>
                                            <Form.Control
                                                type="text"
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
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={pacienteInfo.email}
                                                onChange={(e) => setPacienteInfo({ ...pacienteInfo, email: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formTelefono">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                value={pacienteInfo.telefono}
                                                onChange={(e) => setPacienteInfo({ ...pacienteInfo, telefono: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button
                                    variant="success"
                                    onClick={() => setShowConfirmacion(true)}
                                    className="w-100"
                                >
                                    Verificar Reserva
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )}

                <Modal show={showConfirmacion} onHide={() => setShowConfirmacion(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Reserva</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Detalles de la Reserva</h5>
                        <div className="mt-3">
                            <p><strong>Profesional:</strong> {user?.profesionalSeleccionado?.name}</p>
                            <p><strong>Fecha:</strong> {bloqueSeleccionado?.start?.toLocaleDateString()}</p>
                            <p><strong>Horario:</strong> {bloqueSeleccionado?.start?.toLocaleTimeString()} - {bloqueSeleccionado?.end?.toLocaleTimeString()}</p>
                            <div className="mt-4">
                                <h6>Datos del Paciente:</h6>
                                <p>RUT: {RUTValidator.format(pacienteInfo.rut)}</p>
                                <p>Nombre: {pacienteInfo.nombre}</p>
                                <p>Email: {pacienteInfo.email}</p>
                                <p>Teléfono: {pacienteInfo.telefono || 'No especificado'}</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmacion(false)}>
                            Corregir
                        </Button>
                        <Button variant="success" onClick={reservarCita}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </ToastLayout>
    )
}

export default ReservarCita