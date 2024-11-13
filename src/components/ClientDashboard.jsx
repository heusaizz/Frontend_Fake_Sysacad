import { useState, useEffect } from 'react';
import { fetchAllSubjects, createEnrollment, fetchEnrollmentsByClientId, deleteEnrollment, fetchAllUsers, updateUser} from '../services/api'; 
import "./ClientDashboard.css";

const ClientDashboard = () => {
    const [clientId, setClientId] = useState(''); 
    const [subjects, setSubjects] = useState([]); 
    const [enrollments, setEnrollments] = useState([]); 
    const [error, setError] = useState(null); 
    const [enrollmentError, setEnrollmentError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterId, setFilterId] = useState(''); // Estado para el ID a filtrar
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        role: "",
        id: "",
    });
    const [filteredUser , setFilteredUser ] = useState(null); // Estado para almacenar el usuario filtrado

    const fetchSubjects = async () => {
        try {
            const subjectsData = await fetchAllSubjects();
            const usersData = await fetchAllUsers();
            setUsers(usersData);
            setSubjects(subjectsData);
        } catch (err) {
            setError('Error al obtener las asignaturas.');
            console.error(err);
        }
    };

    const fetchEnrollments = async () => {
        setEnrollmentError(null); 
        try {
            const enrollmentsData = await fetchEnrollmentsByClientId(clientId); 
            setEnrollments(enrollmentsData); 
        } catch (error) {
            setEnrollmentError('Error al obtener las inscripciones.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSubjects(); 
    }, []);

    useEffect(() => {
        const handleFilterChange = async () => {
            if (filterId) {
                const userId = Number(filterId);
                const user = users.find(user => user.id === userId);
                if (user) {
                    setFilteredUser (user); // Almacena el usuario filtrado
                    setFormData({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        password: "",
                        role: user.role,
                    });
                    setShowForm(true);
                    await fetchEnrollmentsByClientId(user.id); // Obtiene inscripciones del usuario
                } else {
                    setFilteredUser (null); // No se encontró el usuario
                    setFormData({
                        name: "",
                        username: "",
                        password: "",
                        email: "",
                        role: "",
                        id: "",
                    });
                    setShowForm(false);
                }
            } else {
                setFilteredUser (null); // Reinicia el usuario filtrado
                setFormData({
                    name: "",
                    username: "",
                    password: "",
                    email: "",
                    role: "",
                    id: "",
                });
                setShowForm(false);
            }
        };

        handleFilterChange();
    }, [filterId, users]);

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

            if (formData.id ) {
                await updateUser (formData.id, dataToSubmit);
                console.log("Datos de usuario actualizados.");
            } else {
                console.log("Usuario No encontrado");
            }

            const usersData = await fetchAllUsers();
            setUsers(usersData);
            setShowForm(false);
            setFormData({
                name: "",
                username: "",
                password: "",
                email: "",
                role: "",
                id: "",
            });
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert(`Error al crear el usuario: ${error.message}`);
        }
    };

    const handleEnroll = async (subjectId) => {
        setEnrollmentError(null); 
        try {
            const enrollmentData = {
                subjectId: subjectId,
                clientId: clientId,
            };
            await createEnrollment(enrollmentData); 
            alert('Inscripción exitosa'); 
            fetchEnrollments(); 
        } catch (error) {
            setEnrollmentError('Error al inscribirse en la asignatura.');
            console.error(error);
        }
    };

    const handleDeleteEnrollment = async (enrollmentId) => {
        setEnrollmentError(null); 
        try {
            await deleteEnrollment(enrollmentId);
            alert('Inscripción eliminada exitosamente'); 
            fetchEnrollments(); 
        } catch (error) {
            setEnrollmentError('Error al eliminar la inscripción.');
            console.error(error);
        }
    };



    return (
        <div className="client-dashboard">
            <h1>Dashboard del Estudiante</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="number" 
                    placeholder="Ingrese ID del Estudiante" 
                    value={clientId} 
                    onChange={(e) => setClientId(e.target.value)} 
                    required 
                />
                <button type="button" onClick={fetchEnrollments}>Buscar</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {enrollmentError && <p className="error-message">{enrollmentError}</p>}
            <h2>Inscripciones</h2>
            <ul>
                {enrollments.length > 0 ? (
                    enrollments.map(enrollment => (
                        <li key={enrollment.enrollmentId}>
                            {enrollment.title} - {enrollment.description}
                            <button onClick={() => handleDeleteEnrollment(enrollment.enrollmentId)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay inscripciones disponibles.</p>
                )}
            </ul>
            <h2>Asignaturas Disponibles</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.subjectId}>
                        {subject.title} - {subject.description}
                        <button onClick={() => handleEnroll(subject.subjectId)}>Inscribirse </button>
                    </li>
                ))}
            </ul>

            <h2>Filtrar Usuarios</h2>
            <input 
                type="number" 
                placeholder="Filtrar por ID de Usuario" 
                value={filterId} 
                onChange={(e) => setFilterId(e.target.value)} 
            />

            {filteredUser  && (
                <div style={{ color: 'black' }}>
                    <h3>Usuario Filtrado</h3>
                    <p>ID: {filteredUser .id}</p>
                    <p>Nombre: {filteredUser .name}</p>
                    <p>Correo: {filteredUser .email}</p>
                    <p>Nombre de Usuario: {filteredUser .userName}</p>
                    <p>Rol: {filteredUser .role}</p>
                </div>
            )}

            <section>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cerrar Formulario" : "Editar Usuario"}
                </button>
                <ul>
                    
                </ul>
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
                        required
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
                        <option value={""}>Seleccione una opción</option>
                        <option value={1}>Rol Alumno</option>
                        <option value={""}></option>
                    </select>
                    <input type="hidden" name="id" value={formData.id} />
                    <button type="submit">Enviar</button>
                </form>
            )}
        </div>
    );
};

export default ClientDashboard;
