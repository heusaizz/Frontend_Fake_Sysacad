import { useState } from 'react';
import { fetchStudentsAndSubjects, fetchSubjectsByProfessorId } from '../services/api'; // Asegúrate de que la nueva función esté importada
import "./ProfessorDashboard.css";

const ProfessorDashboard = () => {
    const [students, setStudents] = useState([]); // Estado para los estudiantes
    const [subjects, setSubjects] = useState([]); // Estado para las materias
    const [professorId, setProfessorId] = useState(''); // Estado para el ID del profesor
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleFetchStudents = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        setError(null); // Resetea el error antes de hacer la solicitud
        try {
            const studentsData = await fetchStudentsAndSubjects(professorId); // Llama a la función con el ID del profesor
            console.log(studentsData); // Verifica la estructura de los datos
            setStudents(studentsData || []); // Asegúrate de que se establezca un arreglo vacío si no hay datos

            // Obtén las materias del profesor
            const subjectsData = await fetchSubjectsByProfessorId(professorId);
            console.log(subjectsData); // Verifica la estructura de los datos
            setSubjects(subjectsData || []); // Asegúrate de que se establezca un arreglo vacío si no hay datos
        } catch (error) {
            console.error('Error fetching students or subjects:', error);
            setError('Error al obtener los alumnos inscriptos o las materias.'); // Manejo de errores
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
                        {student.name}
                    </li>
                ))}
            </ul>
            <h2>Materias Asignadas</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.subjectId}>
                        {subject.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfessorDashboard;