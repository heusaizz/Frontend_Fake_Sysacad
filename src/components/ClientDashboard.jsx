import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
//import { useNavigate } from 'react-router';
import { fetchAllSubjects, createEnrollment, deleteEnrollment, fetchAllUsers, updateUser  } from '../services/api'; 
import useEnrollments from '../hooks/useEnrollment'; 
import "./ClientDashboard.css";

const ClientDashboard = () => {
    //const navigate = useNavigate();
    const { userId } = useAuth(); 
    const [subjects, setSubjects] = useState([]); 
    const [error, setError] = useState(null); 
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        role: "",
        id: userId,
    });
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        role: "",
        id: userId,
    });
    const [successMessage1, setSuccessMessage1] = useState('');
    const { enrollments, error: enrollmentError, getEnrollments } = useEnrollments(); 

    const fetchSubjects = async () => {
        try {
            const subjectsData = await fetchAllSubjects();
            setSubjects(subjectsData);
        } catch (err) {
            setError('Error al obtener las asignaturas.');
            console.error(err);
        }
    };

    const fetchUserData = async () => {
        try {
            const usersData = await fetchAllUsers();
            const currentUser  = usersData.find(user => user.id === userId);
            console.log(currentUser );
            if (currentUser ) {
                setFormData({
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    username: currentUser.userName, // Asegúrate de que este campo sea correcto
                    password: "",
                    role: currentUser.role,
                });
                // Establece los datos del usuario para mostrar en la interfaz
                setUserData({
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    username: currentUser.userName,
                    role: currentUser.role,
                });
            }
            await getEnrollments(userId);
        } catch (err) {
            setError('Error al obtener los datos del usuario.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSubjects(); 
        fetchUserData(); 

    }, [userId]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "role" ? Number(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
                ...(formData.password && { password: formData.password }),
                username: formData.username,
                role: formData.role,
            };

            console.log("Datos a enviar:", dataToSubmit);

            await updateUser (formData.id, dataToSubmit); 
            console.log("Datos de usuario actualizados.");

            // Actualiza userData solo después de una actualización exitosa
            setUserData({
                id: formData.id,
                name: formData.name,
                email: formData.email,
                username: formData.username,
                role: formData.role,
            });

            setShowForm(false);
            setFormData({
                name: "",
                username: "",
                password: "",
                email: "",
                role: "",
                id: userId,
            });
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert(`Error al actualizar el usuario: ${error.message}`);
        }
    };

    const handleEnroll = async (subjectId) => {
        try {
            const enrollmentData = {
                subjectId: subjectId,
                clientId: userId,
            };
            await createEnrollment(enrollmentData); 
            setSuccessMessage1('¡Inscripción realizada!');
            setTimeout(() => {
                setSuccessMessage1('');
            }, 3000);
            getEnrollments(userId);
        } catch (error) {
            console.error('Error al inscribirse en la asignatura:', error);
        }
    };

    const handleDeleteEnrollment = async (enrollmentId) => {
        try {
            await deleteEnrollment(enrollmentId); 
            getEnrollments(userId);
 } catch (error) {
            console.error('Error al eliminar la inscripción:', error);
        }
    };

    return (
        <div className="client-dashboard">
            <h1>Dashboard del Estudiante</h1>
            {error && <p className="error-message">{error}</p>}
            {enrollmentError && <p className="error-message">{enrollmentError}</p>}
            <h2>Inscripciones</h2>
            <ul>
                {enrollments.length > 0 ? (
                    enrollments.map(enrollment => (
                        <li key={enrollment.enrollmentId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                            <span>{enrollment.title} - {enrollment.description}</span>
                            <button 
                                onClick={() => handleDeleteEnrollment(enrollment.enrollmentId)} 
                                style={{ marginLeft: '20px' }}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No hay inscripciones disponibles.</p>
                )}
            </ul>
            <h2>Asignaturas Disponibles</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.subjectId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                        <span>{subject.title} - {subject.description}</span>
                        <button 
                            onClick={() => handleEnroll(subject.subjectId)} 
                            style={{ marginLeft: '20px' }}
                        >
                            Inscribirse
                        </button>
                        {successMessage1 && <span className="success-message1">{successMessage1}</span>}
                    </li>
                ))}
            </ul>

            <h2>Mis Datos de Usuario</h2>
            <div style={{ color: 'black' }}>
                <p>ID: {userData.id}</p>
                <p>Nombre: {userData.name}</p>
                <p>Correo: {userData.email}</p>
                <p>Nombre de Usuario: {userData.username}</p>
            </div>

            <section>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cerrar Formulario" : "Editar Usuario"}
                </button>
            </section>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nombre de la persona"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        placeholder="Nombre de usuario"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="Contraseña"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleFormChange}
                        required
                    >
                        <option value="" disabled>
                            Seleccione un rol
                        </option>
                        <option value={''}>Seleccione un rol</option>
                        <option value={1}>Rol Alumno</option>
                        <option value={''}></option>
                    </select>
                    <input type="hidden" name="id" value={formData.id} />
                    <button type="submit">Enviar</button>
                </form>
            )}
        </div>
    );
};

export default ClientDashboard;