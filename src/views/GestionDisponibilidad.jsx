import { useEffect, useState } from "react"
import { Button, Card, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import ComponenteCalendario from "../components/calendario/Calendario"
import TimeSlotForm from "../components/forms/TimeSlotForm"
import ToastLayout from "../layouts/ToastLayout"

/**
 * NOTAS:
 * - Se define un "user" local para simular el ID del profesional.
 * - Se añade un "beforeunload" para borrar localStorage al recargar/cerrar pestaña.
 */
const GestionDisponibilidad = () => {
    // Simulamos un "usuario" profesional con ID=1
    const user = { id: 1, name: "John Doe" }

    const [disponibilidad, setDisponibilidad] = useState([])
    const [nuevoBloque, setNuevoBloque] = useState(null)
    const [tiposCita, setTiposCita] = useState([])
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [nuevosSlots, setNuevosSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [horaInicio, setHoraInicio] = useState("09:00")
    const [horaFin, setHoraFin] = useState("17:00")
    const [showModal, setShowModal] = useState(false)

    // Borra la data de localStorage al recargar/cerrar
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('disponibilidades')
            localStorage.removeItem('configProfesional')
            localStorage.removeItem('citas')
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    // Cargar datos desde localStorage
    useEffect(() => {
        const cargarDatos = () => {
            // Cargamos tipos de cita de "configProfesional"
            const config = JSON.parse(localStorage.getItem('configProfesional')) || { tiposCita: [] }
            setTiposCita(config.tiposCita)

            // Cargamos disponibilidades filtradas por user.id y que NO estén reservadas
            const disponibilidades = JSON.parse(localStorage.getItem("disponibilidades") || "[]")
                .filter(bloque => !bloque.reserved && bloque.profesionalId === user.id)
                .map(bloque => ({
                    ...bloque,
                    start: new Date(bloque.start),
                    end: new Date(bloque.end),
                    title: `Disponible - ${bloque.tipo}`
                }))

            setDisponibilidad(disponibilidades)
        }

        cargarDatos()
        // Permite actualizar la disponibilidad si se cambia en otra pestaña
        window.addEventListener("storage", cargarDatos)
        return () => window.removeEventListener("storage", cargarDatos)
    }, [user.id])

    // Al hacer clic en un día del calendario
    const manejarSeleccionDia = ({ start }) => {
        if (!selectedTipo) {
            toast.error("¡Primero seleccione un tipo de cita!")
            return
        }
        setSelectedDate(start)
    }

    // Generar "slots" de disponibilidad
    const generarSlots = () => {
        if (!selectedTipo || !selectedDate) return

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

    // Confirmar y guardar en localStorage
    const agregarBloque = () => {
        const existentes = JSON.parse(localStorage.getItem("disponibilidades") || "[]")
        const nuevasDisponibilidades = [...existentes, ...nuevosSlots]

        localStorage.setItem("disponibilidades", JSON.stringify(nuevasDisponibilidades))
        window.dispatchEvent(new Event('storage')) // Sincroniza con otras pestañas

        // Actualizar state local
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
            <div className="container mt-5">
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
                            seleccionable={!!selectedTipo} // solo seleccionable si hay un tipo de cita seleccionado
                            onSelectSlot={manejarSeleccionDia}
                            eventPropGetter={(evento) => ({
                                style: {
                                    backgroundColor: evento.reserved ? "#dc3545" : "#0d6efd",
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
