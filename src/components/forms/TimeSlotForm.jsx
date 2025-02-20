import { Form, Button } from "react-bootstrap"

const TimeSlotForm = ({
    tiposCita,
    selectedTipo,
    setSelectedTipo,
    horaInicio,
    setHoraInicio,
    horaFin,
    setHoraFin,
    generarSlots,
    selectedDate
}) => (
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
)

export default TimeSlotForm