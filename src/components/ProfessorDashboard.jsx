import { useState } from 'react';
import { fetchStudentsAndSubjects } from '../services/api'; // Importa la función de API
import "./ProfessorDashboard.css";

const ProfessorDashboard = () => {
    const [students, setStudents] = useState([]); // Estado para los estudiantes
    const [professorId, setProfessorId] = useState(''); // Estado para el ID del profesor
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleFetchStudents = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        setError(null); // Resetea el error antes de hacer la solicitud
        try {
            const data = await fetchStudentsAndSubjects(professorId); // Llama a la función con el ID del profesor
            console.log(data); // Verifica la estructura de los datos
            setStudents(data || []); // Asegúrate de que se establezca un arreglo vacío si no hay datos
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Error al obtener los alumnos inscriptos.'); // Manejo de errores
        }
    };

    return (
        <div className="professor-dashboard">
            <h1>Dashboard del Profesor</h1>
            <form onSubmit={handleFetchStudents}>
                <input 
                    type="number" 
                    placeholder="Ingrese ID del Profesor" 
                    value={professorId} 
                    onChange={(e) => setProfessorId(e.target.value)} 
                    required 
                />
                <button type="submit">Mostrar Alumnos y Asignaturas</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <h2>Alumnos Inscritos</h2>
            <ul>
                {students.map(student => (
                    <li key={student.clientId}>
                        {student.name} - Asignaturas: {student.subjects && Array.isArray(student.subjects) ? student.subjects.map(subject => subject.title).join(', ') : 'Sin asignaturas'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfessorDashboard;