import './NotFound.css'; 
import asd from "../assets/asd.png";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Página No Encontrada</h1>
            <img src={asd} alt="asd" style={{width: '200px', margin: '20px 0'}}/>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
        </div>
    );
};

export default NotFound;