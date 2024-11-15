import { useState } from 'react';
import { authenticateUser  } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth
import UTNPNG from "../assets/UTNPNG.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token, userId } = await authenticateUser(username, password);
            console.log('Token recibido:', token);
            console.log('ID de usuario recibido:', userId);
            login(token, userId); // Llama a la función login del contexto con el token y el ID de usuario
            setMessage('Inicio de sesión exitoso'); 
        } catch (error) {
            console.error('Error de autenticación:', error);
            setMessage('Usuario o contraseña incorrectos'); 
        }
    };

    return (
        <div className="login-container">
            <img src={UTNPNG} alt="Logo de la UTN" style={{width: '135px', margin: '20px 0'}}/>
            <h1>Iniciar Sesión</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            {message && (
                <p className={message === 'Inicio de sesión exitoso' ? 'success-message' : 'error-message'}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;