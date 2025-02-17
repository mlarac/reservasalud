import { useEffect, useState } from "react"
import { Button, Card, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import ComponenteCalendario from "../components/calendario/Calendario"
import TimeSlotForm from "../components/forms/TimeSlotForm"
import { useAuth } from "../context/AuthContext"
import ToastLayout from "../layouts/ToastLayout"

const GestionDisponibilidad = () => {
    const [disponibilidad, setDisponibilidad] = useState([])
    const [nuevoBloque, setNuevoBloque] = useState(null)
    const [tiposCita, setTiposCita] = useState([])
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [nuevosSlots, setNuevosSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [horaInicio, setHoraInicio] = useState("09:00")
    const [horaFin, setHoraFin] = useState("17:00")
    const [showModal, setShowModal] = useState(false)

    const { user } = useAuth()

    useEffect(() => {
        const cargarDatos = () => {
            const config = JSON.parse(localStorage.getItem('configProfesional')) || { tiposCita: [] }
            setTiposCita(config.tiposCita)

            const disponibilidades = JSON.parse(localStorage.getItem("disponibilidades") || "[]")
                .filter(bloque =>
                    !bloque.reserved &&
                    bloque.profesionalId === user?.id
                )
                .map(bloque => ({
                    ...bloque,
                    start: new Date(bloque.start),
                    end: new Date(bloque.end),
                    title: `Disponible - ${bloque.tipo}`
                }))
            setDisponibilidad(disponibilidades)
        }

        cargarDatos()
        window.addEventListener("storage", cargarDatos)
        return () => window.removeEventListener("storage", cargarDatos)
    }, [user])

    const manejarSeleccionDia = ({ start }) => {
        if (!selectedTipo) {
            toast.error("¡Primero seleccione un tipo de cita!")
            return
        }
        setSelectedDate(start)
    }

    const generarSlots = () => {
        if (!selectedTipo || !selectedDate || !user) return

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
                profesionalId: user.id
            })

            slotStart = slotEnd
        }

        if (slotsCalculados.length === 0) {
            toast.error("No hay espacio suficiente para crear citas")
            return
        }

        setNuevosSlots(slotsCalculados)
        setNuevoBloque({ start: fechaInicio, end: fechaFin })
        setShowModal(true)
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
        setShowModal(false)
        setNuevosSlots([])
        setSelectedDate(null)
        toast.success("Disponibilidad agregada exitosamente")
    }

    return (
        <ToastLayout>
            <div className="container mt-4">
                <h2 className="mb-4 text-primary">Gestión de Disponibilidad</h2>

                <Card className="mb-4 shadow">
                    <Card.Body>
                        <TimeSlotForm
                            tiposCita={tiposCita}
                            selectedTipo={selectedTipo}
                            setSelectedTipo={setSelectedTipo}
                            horaInicio={horaInicio}
                            setHoraInicio={setHoraInicio}
                            horaFin={horaFin}
                            setHoraFin={setHoraFin}
                            generarSlots={generarSlots}
                            selectedDate={selectedDate}
                        />
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

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Disponibilidad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Nuevos Horarios Programados</h5>
                        {nuevoBloque && selectedTipo && (
                            <>
                                <p>Fecha: {new Date(nuevoBloque.start).toLocaleDateString()}</p>
                                <p>Horario: {new Date(nuevoBloque.start).toLocaleTimeString()} - {new Date(nuevoBloque.end).toLocaleTimeString()}</p>
                                <p>Tipo: {selectedTipo.nombre} ({selectedTipo.duracion} mins)</p>
                                <p>Slots creados: {nuevosSlots.length}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={agregarBloque}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </ToastLayout>
    )
}

export default GestionDisponibilidad