import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth
import "./LogoutButton.css";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Desestructura la función logout del contexto

    const handleLogout = () => {
        logout(); // Llama a la función logout del contexto
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    const isLoggedIn = !!localStorage.getItem('jwtToken');

    if (!isLoggedIn) {
        return null; 
    }

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;