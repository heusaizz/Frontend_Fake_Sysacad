import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/professor">Professor</Link></li>
        <li><Link to="/client">Client</Link></li>
        <li><Link to="/logout">Cerrar Sesion</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;