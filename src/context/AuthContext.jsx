import  { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validación de las propiedades
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea requerido y sea un nodo React
};

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};