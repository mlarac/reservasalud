import { Form } from "react-bootstrap"
import { RUTValidator } from "../../utils/rutValidator"

const RUTInput = ({ value, onChange, onBlur }) => {
    const handleFormat = (e) => {
        const formatted = RUTValidator.format(e.target.value)
        onBlur(formatted)
    }

    return (
        <Form.Group controlId="formRUT">
            <Form.Label>RUT del Paciente <span className="text-danger">*</span></Form.Label>
            <Form.Control
                type="text"
                placeholder="Ej: 12.345.678-9"
                value={value}
                onChange={(e) => onChange(RUTValidator.clean(e.target.value))}
                onBlur={handleFormat}
                required
            />
            <Form.Text className="text-muted">
                Formato: 12.345.678-9
            </Form.Text>
        </Form.Group>
    )
}

export default RUTInput