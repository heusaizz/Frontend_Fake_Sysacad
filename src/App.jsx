import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AdminView from './components/AdminView'; // Importa AdminView
import ClientView from './components/ClientView'; // Importa ClientView
import ProfessorView from './components/ProfessorView'; // Importa ProfessorView
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './routes/PrivateRoute';
import NoAccess from './routes/NoAccess';

const App = () => {
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/admin-view">Administrador</Link></li>
                            <li><Link to="/client-view">Estudiante</Link></li>
                            <li><Link to="/professor-view">Profesor</Link></li>
                            <LogoutButton /> {/* Incluye el botón de cerrar sesión */}
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/admin-view" 
                    element={
                        <PrivateRoute>
                            <AdminView />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/client-view" 
                    element={
                        <PrivateRoute>
                            <ClientView />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/professor-view" 
                    element={
                        <PrivateRoute>
                            <ProfessorView />
                        </PrivateRoute>
                    } 
                />
                <Route path="/no-access" element={<NoAccess />} />
            </Routes>
        </Router>
    );
};

export default App;