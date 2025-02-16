import { useState, useEffect } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'

const ConfiguracionProfesional = () => {
    const [tiposCita, setTiposCita] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [nuevoTipo, setNuevoTipo] = useState({ nombre: '', duracion: 15 })

    useEffect(() => {
        const config = JSON.parse(localStorage.getItem('configProfesional')) || { tiposCita: [] }
        setTiposCita(config.tiposCita)
    }, [])

    useEffect(() => {
        if (tiposCita.length > 0 || localStorage.getItem('configProfesional')) {
            localStorage.setItem('configProfesional', JSON.stringify({ tiposCita }))
        }
    }, [tiposCita])

    const handleAgregarTipo = () => {
        if (!nuevoTipo.nombre.trim()) return

        setTiposCita(prev => [...prev, { ...nuevoTipo, id: Date.now() }])
        setShowModal(false)
        setNuevoTipo({ nombre: '', duracion: 15 })
    }

    const handleEliminarTipo = (id) => {
        setTiposCita(prev => prev.filter(tipo => tipo.id !== id))
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">⚙ Configuración Profesional</h2>

            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="mb-4"
            >
                + Agregar Tipo de Cita
            </Button>

            <ListGroup>
                {tiposCita.map((tipo) => (
                    <ListGroup.Item
                        key={tipo.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>{tipo.nombre}</strong> - {tipo.duracion} minutos
                        </div>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleEliminarTipo(tipo.id)}
                        >
                            Eliminar
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>➕ Nuevo Tipo de Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Servicio</Form.Label>
                            <Form.Control
                                type="text"
                                value={nuevoTipo.nombre}
                                onChange={(e) => setNuevoTipo(prev => ({ ...prev, nombre: e.target.value }))}
                                placeholder="Ej: Consulta general"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Select
                                value={nuevoTipo.duracion}
                                onChange={(e) => setNuevoTipo(prev => ({ ...prev, duracion: parseInt(e.target.value) }))}
                            >
                                <option value={15}>15 minutos</option>
                                <option value={30}>30 minutos</option>
                                <option value={45}>45 minutos</option>
                                <option value={60}>60 minutos</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleAgregarTipo}>
                        Guardar Tipo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfiguracionProfesional