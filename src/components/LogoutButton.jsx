import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Elimina el token
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    const isLoggedIn = !!localStorage.getItem('jwtToken');

    if (!isLoggedIn) {
        return null; // No renderiza el botón si no hay token
    }

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;