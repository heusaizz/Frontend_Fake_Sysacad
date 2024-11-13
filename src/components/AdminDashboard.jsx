import { useEffect, useState } from "react";
import {
  fetchAllUsers,
  fetchAllEnrollments,
  fetchAllSubjects,
  createUser,
  updateUser,
  deleteUser,
  createSubject,
  updateSubject,
  deleteSubject,
  createEnrollment,
  deleteEnrollment, // Asegúrate de importar la función deleteEnrollment
} from "../services/api"; // Asegúrate de que estas funciones están correctamente definidas en api.js
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false); // Estado para el formulario de inscripciones
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
    id: "",
  });

  const [subjectData, setSubjectData] = useState({
    SubjectId: "",
    title: "",
    description: "",
    professorId: "",
  });

  const [enrollmentData, setEnrollmentData] = useState({
    enrollmentId: "",
    subjectId: "",
    clientId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchAllUsers();
        const enrollmentsData = await fetchAllEnrollments();
        const subjectsData = await fetchAllSubjects();
        console.log("Datos de asignaturas:", subjectsData); // Verifica la estructura de los datos
        setUsers(usersData);
        setEnrollments(enrollmentsData);
        setSubjects(subjectsData); // Aquí se establece el estado de las asignaturas
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "role" ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubjectFormChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({ ...subjectData, [name]: value });
  };

  const handleEnrollmentFormChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData({ ...enrollmentData, [name]: value });
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role,
    });
    setShowForm(true); // Mostrar el formulario al editar
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

      console.log("Datos a enviar:", dataToSubmit); // Verifica los datos aquí

      if (formData.id) {
        await updateUser(formData.id, dataToSubmit);
      } else {
        await createUser(dataToSubmit);
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
      alert(`Error al crear el usuario: ${error.message}`); // Muestra el mensaje de error al usuario
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const usersData = await fetchAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    }
  };

  const handleEditSubject = (subject) => {
    setSubjectData({
      id: subject.subjectId,
      title: subject.title,
      description: subject.description,
      professorId: subject.professorId,
    });
    setShowSubjectForm(true); // Muestra el formulario para editar
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de la asignatura antes de enviar:", subjectData); // Para depuración
    try {
      if (subjectData.id) {
        console.log("Actualizando asignatura con ID:", subjectData.id); // Para depuración
        await updateSubject(subjectData.id, subjectData);
      } else {
        console.log("Creando nueva asignatura."); // Para depuración
        await createSubject(subjectData);
      }

      const subjectsData = await fetchAllSubjects();
      setSubjects(subjectsData);
      setShowSubjectForm(false);
      setSubjectData({ id: "", title: "", description: "", professorId: "" });
    } catch (error) {
      console.error("Error al enviar el formulario de asignatura:", error);
      alert(`Error al gestionar la asignatura: ${error.message}`);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    console.log("ID de la asignatura a eliminar:", subjectId); // Verifica el ID

    if (!subjectId) {
      console.error("El ID de la asignatura es inválido.");
      return; // Salir si el ID es inválido
    }

    try {
      await deleteSubject(subjectId);
      const subjectsData = await fetchAllSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error al eliminar la asignatura:", error);
      alert(`Error al eliminar la asignatura: ${error.message}`);
    }
  };

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de inscripción a enviar:", enrollmentData); // Agrega este log para verificar los datos
    try {
      
      await createEnrollment(enrollmentData);
  
      const enrollmentsData = await fetchAllEnrollments();
      setEnrollments(enrollmentsData);
      setShowEnrollmentForm(false);
      setEnrollmentData({ id: "", subjectId: "", clientId: "" });
    } catch (error) {
      console.error("Error al enviar el formulario de inscripción:", error);
      alert(`Error al gestionar la inscripción: ${error.message}`);
    }
  };
  

  const handleDeleteEnrollment = async (enrollmentId) => {
    console.log("ID de inscripción recibido para eliminación:", enrollmentId); // Verifica el ID
    if (!enrollmentId) {
      console.error("ID de inscripción no válido.");
      alert("No se puede eliminar la inscripción. ID no válido.");
      return; // Salir si el ID es inválido
    }

    try {
      console.log("Intentando eliminar la inscripción con ID:", enrollmentId);
      await deleteEnrollment(enrollmentId);
      const enrollmentsData = await fetchAllEnrollments();
      setEnrollments(enrollmentsData);
      alert("Inscripción eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la inscripción:", error);
      alert(`Error al eliminar la inscripción: ${error.message}`);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Vista Administrador</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar Formulario" : "Agregar/Editar Usuario"}
      </button>

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
            <option value={0}>Rol Admin</option>
            <option value={1}>Rol Alumno</option>
            <option value={2}>Rol Profesor</option>
          </select>
          <input type="hidden" name="id" value={formData.id} />
          <button type="submit">Enviar</button>
        </form>
      )}

      <section>
        <h2>Usuarios</h2>
        <ul>
            {users.map((user) => (
                <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                    <span>{user.name} - {user.role} - Legajo: {user.id}</span>
                    <div>
                        <button 
                            onClick={() => handleEdit(user)} 
                            style={{ marginLeft: '20px' }} // Espacio entre el texto y el primer botón
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => handleDelete(user.id)} 
                            style={{ marginLeft: '10px' }} // Espacio entre los botones
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
      </section>

      <section>
        <h2>Inscripciones</h2>
        <button onClick={() => setShowEnrollmentForm(!showEnrollmentForm)}>
          {showEnrollmentForm
            ? "Cerrar Formulario de Inscripción"
            : "Agregar Inscripción"}
        </button>

        {showEnrollmentForm && (
          <form onSubmit={handleEnrollmentSubmit}>
            <input
              type="text"
              name="subjectId"
              value={enrollmentData.subjectId}
              onChange={handleEnrollmentFormChange}
              placeholder="ID de la Asignatura"
              required
            />
            <input
              type="text"
              name="clientId"
              value={enrollmentData.clientId}
              onChange={handleEnrollmentFormChange}
              placeholder="Legajo del estudiante"
              required
            />
            <input type="hidden" name="id" value={enrollmentData.id} />
            <button type="submit">Enviar</button>
          </form>
        )}

      <ul>
          {enrollments.map((enrollment) => (
              <li key={enrollment.enrollmentId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                  <span>{enrollment.subjectTitle} <h3 style={{ display: 'inline', margin: '0' }}> - Legajo:</h3> {enrollment.clientId}</span>
                  <button 
                      onClick={() => handleDeleteEnrollment(enrollment.enrollmentId)} 
                      style={{ marginLeft: '20px' }} // Espacio entre el texto y el botón
                  >
                      Eliminar
                  </button>
              </li>
          ))}
      </ul>
      </section>

      <section>
        <h2>Asignaturas</h2>
        <button onClick={() => setShowSubjectForm(!showSubjectForm)}>
        {showSubjectForm
          ? "Cerrar Formulario de Asignatura"
          : "Agregar/Editar Asignatura"}
        </button>
        {showSubjectForm && (
        <form onSubmit={handleSubjectSubmit}>
          <input
            type="text"
            name="title"
            value={subjectData.title}
            onChange={handleSubjectFormChange}
            placeholder="Título de la Asignatura"
            required
          />
          <textarea
            name="description"
            value={subjectData.description}
            onChange={handleSubjectFormChange}
            placeholder="Descripción de la Asignatura"
            required
          />
          <input
            type="number"
            name="professorId"
            value={subjectData.professorId}
            onChange={handleSubjectFormChange}
            placeholder="ID del Profesor"
            required
          />
          <input type="hidden" name="SubjectId" value={subjectData.id} />
          <button type="submit">Enviar</button>
        </form>
      )}
      <ul>
          {subjects.map((subject) => (
              <li key={subject.subjectId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                  <span>{subject.title} - ID: {subject.subjectId}</span>
                  <div>
                      <button 
                          onClick={() => handleDeleteSubject(subject.subjectId)} 
                          style={{ marginLeft: '20px' }} // Espacio entre el texto y el botón
                      >
                          Eliminar
                      </button>
                      <button 
                          onClick={() => handleEditSubject(subject)} 
                          style={{ marginLeft: '10px' }} // Espacio entre los botones
                      >
                          Editar
                      </button>
                  </div>
              </li>
          ))}
      </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;