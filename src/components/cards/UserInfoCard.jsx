import { Card } from "react-bootstrap"

const UserInfoCard = ({ usuario }) => (
    <Card className="mb-4 shadow">
        <Card.Body>
            <h5>Profesional: {usuario ? usuario.name : "Cargando..."}</h5>
        </Card.Body>
    </Card>
)

export default UserInfoCard