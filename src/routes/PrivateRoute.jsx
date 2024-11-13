import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('jwtToken'); 

    return isLoggedIn ? children : <Navigate to="/no-access" />; // Redirige a /no-access si no está autenticado
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;