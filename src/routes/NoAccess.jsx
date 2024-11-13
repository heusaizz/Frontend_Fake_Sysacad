import "./NoAccess.css";
import naonao from "../assets/naonao.jpg";


const NoAccess = () => {
    return (
        <div className="no-access-container">
            <h1>Acceso Denegado</h1>
            <img src={naonao} alt="naonao" style={{width: '200px', margin: '20px 0'}}/>
            <p>No tienes permiso para acceder a esta página. Por favor, inicia sesión o Verifica tus permisos.</p>
        </div>
    );
};

export default NoAccess;