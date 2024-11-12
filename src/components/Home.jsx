import UTNPNG from "../assets/UTNPNG.png";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido al Fake Sysacad</h1>
            <img src={UTNPNG} alt="Logo de la UTN" style={{width: '200px', margin: '20px 0'}}/>
            <p>UTN FRRO Facultad Regional Rosario</p>
        </div>
    );
};

export default Home;