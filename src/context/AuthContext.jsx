import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // Nuevo estado para el ID de usuario

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const storedUserId = localStorage.getItem('userId'); 
        if (token) {
            setIsLoggedIn(true);
            setUserId(storedUserId); 
        }
    }, []);

    const login = (token, id) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id); 
        setIsLoggedIn(true);
        setUserId(id); 
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId'); 
        setIsLoggedIn(false);
        setUserId(null); 
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