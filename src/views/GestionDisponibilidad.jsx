import { useEffect, useState } from "react"
import ComponenteCalendario from "../components/Calendario"
import { Button, Form, Card } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const GestionDisponibilidad = () => {
    const [disponibilidad, setDisponibilidad] = useState([])
    const [nuevoBloque, setNuevoBloque] = useState(null)
    const [tiposCita, setTiposCita] = useState([])
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [nuevosSlots, setNuevosSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [horaInicio, setHoraInicio] = useState("09:00")
    const [horaFin, setHoraFin] = useState("17:00")

    /* Estado para el profesional logueado */
    const [usuarioLogueado, setUsuarioLogueado] = useState(null)

    /* Cargar el usuario logueado desde /user.js (se asume que el primer usuario es el logueado) */
    useEffect(() => {
        fetch('/user.js')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUsuarioLogueado(data[0])
                }
            })
            .catch(error => {
                console.error("Error al cargar usuario:", error)
                toast.error("Error al cargar usuario logueado.")
            })
    }, [])

    /* Cargar configuraciones y disponibilidad del usuario logueado */
    useEffect(() => {
        const cargarDatos = () => {
            const config = JSON.parse(localStorage.getItem('configProfesional')) || { tiposCita: [] }
            setTiposCita(config.tiposCita)

            if (!usuarioLogueado) {
                setDisponibilidad([])
                return
            }

            const disponibilidades = JSON.parse(localStorage.getItem("disponibilidades") || "[]")
                .filter(bloque => !bloque.reserved && bloque.profesionalId === usuarioLogueado.id)
                .map(bloque => ({
                    ...bloque,
                    start: new Date(bloque.start),
                    end: new Date(bloque.end),
                    title: bloque.reserved ? "RESERVADO" : `Disponible - ${bloque.tipo}`
                }))
            setDisponibilidad(disponibilidades)
        }

        cargarDatos()
        window.addEventListener("storage", cargarDatos)
        return () => window.removeEventListener("storage", cargarDatos)
    }, [usuarioLogueado])

    const manejarSeleccionDia = ({ start }) => {
        if (!selectedTipo) {
            toast.error("¡Primero seleccione un tipo de cita!")
            return
        }
        setSelectedDate(start)
    }

    const generarSlots = () => {
        if (!selectedTipo || !selectedDate || !usuarioLogueado) return

        const fechaInicio = new Date(selectedDate)
        const [horaIni, minIni] = horaInicio.split(':').map(Number)
        fechaInicio.setHours(horaIni, minIni)

        const fechaFin = new Date(selectedDate)
        const [horaFinH, minFin] = horaFin.split(':').map(Number)
        fechaFin.setHours(horaFinH, minFin)

        if (fechaFin <= fechaInicio) {
            toast.error("La hora de fin debe ser posterior a la hora de inicio")
            return
        }

        const duracionMinutos = selectedTipo.duracion
        const slotsCalculados = []
        let slotStart = new Date(fechaInicio)

        while (slotStart < fechaFin) {
            const slotEnd = new Date(slotStart.getTime() + duracionMinutos * 60000)
            if (slotEnd > fechaFin) break

            slotsCalculados.push({
                id: Date.now() + Math.random(),
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
                tipo: selectedTipo.nombre,
                duracion: duracionMinutos,
                reserved: false,
                profesionalId: usuarioLogueado.id   /* Asignar el profesional logueado */
            })

            slotStart = slotEnd
        }

        if (slotsCalculados.length === 0) {
            toast.error("No hay espacio suficiente para crear citas con la duración seleccionada")
            return
        }

        setNuevosSlots(slotsCalculados)
        setNuevoBloque({ start: fechaInicio, end: fechaFin })
    }

    const agregarBloque = () => {
        const existentes = JSON.parse(localStorage.getItem("disponibilidades") || "[]")
        const nuevasDisponibilidades = [...existentes, ...nuevosSlots]

        localStorage.setItem("disponibilidades", JSON.stringify(nuevasDisponibilidades))
        window.dispatchEvent(new Event('storage'))

        setDisponibilidad(nuevasDisponibilidades.map(bloque => ({
            ...bloque,
            start: new Date(bloque.start),
            end: new Date(bloque.end)
        })))
        setNuevoBloque(null)
        setNuevosSlots([])
        setSelectedDate(null)
        toast.success("Disponibilidad agregada exitosamente")
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary">Gestión de Disponibilidad</h2>

            {/* Mostrar el profesional logueado */}
            <Card className="mb-4 shadow">
                <Card.Body>
                    <h5>Profesional: {usuarioLogueado ? usuarioLogueado.name : "Cargando..."}</h5>
                </Card.Body>
            </Card>

            <Card className="mb-4 shadow">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de cita:</Form.Label>
                            <Form.Select
                                value={selectedTipo ? JSON.stringify(selectedTipo) : ""}
                                onChange={(e) => setSelectedTipo(e.target.value ? JSON.parse(e.target.value) : null)}
                            >
                                <option value="">Seleccione tipo de cita</option>
                                {tiposCita.map(tipo => (
                                    <option key={tipo.id} value={JSON.stringify(tipo)}>
                                        {tipo.nombre} ({tipo.duracion} mins)
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {selectedDate && (
                            <div className="mb-4">
                                <p className="text-muted">
                                    Fecha seleccionada: {selectedDate.toLocaleDateString()}
                                </p>
                                <div className="row mb-3">
                                    <div className="col">
                                        <Form.Label>Hora inicio:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={horaInicio}
                                            onChange={(e) => setHoraInicio(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <Form.Label>Hora fin:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={horaFin}
                                            onChange={(e) => setHoraFin(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={generarSlots}
                                    disabled={!horaInicio || !horaFin}
                                >
                                    Generar Bloques
                                </Button>
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow mb-4">
                <Card.Body>
                    <ComponenteCalendario
                        eventos={disponibilidad}
                        seleccionable={!!selectedTipo}
                        onSelectSlot={manejarSeleccionDia}
                        eventPropGetter={(evento) => ({
                            style: {
                                backgroundColor: evento.reserved ? "#dc3545" : "#198754",
                                color: "white",
                            }
                        })}
                    />
                </Card.Body>
            </Card>

            {nuevoBloque && selectedTipo && (
                <Card className="border-primary mb-4">
                    <Card.Body>
                        <h5 className="card-title">Nuevos Horarios</h5>
                        <p className="card-text">
                            Fecha: {new Date(nuevoBloque.start).toLocaleDateString()}<br />
                            Horario: {new Date(nuevoBloque.start).toLocaleTimeString()} - {new Date(nuevoBloque.end).toLocaleTimeString()}<br />
                            Tipo: {selectedTipo.nombre} ({selectedTipo.duracion} mins)<br />
                            Cantidad de slots: {nuevosSlots.length}
                        </p>
                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={agregarBloque}>
                                <i className="bi bi-calendar-plus me-2"></i>
                                Confirmar Disponibilidad
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setNuevoBloque(null)
                                    setSelectedDate(null)
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
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

export default GestionDisponibilidad
