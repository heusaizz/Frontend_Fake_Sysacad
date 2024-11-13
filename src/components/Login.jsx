import { useState } from 'react';
import { authenticateUser  } from '../services/api';
import UTNPNG from "../assets/UTNPNG.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await authenticateUser (username, password);
            localStorage.setItem('jwtToken', token); // Guarda el token en el localStorage
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