import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // Nuevo estado para el ID de usuario

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const storedUserId = localStorage.getItem('userId'); // Obtener el ID de usuario del localStorage
        if (token) {
            setIsLoggedIn(true);
            setUserId(storedUserId); // Establecer el ID de usuario si existe
        }
    }, []);

    const login = (token, id) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id); // Almacenar el ID de usuario
        setIsLoggedIn(true);
        setUserId(id); // Establecer el ID de usuario en el estado
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId'); // Eliminar el ID de usuario del localStorage
        setIsLoggedIn(false);
        setUserId(null); // Restablecer el ID de usuario en el estado
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export const useAuth = () => {
    return useContext(AuthContext);
};