import { useState, useEffect } from 'react';
import { fetchStudentsAndSubjects, fetchSubjectsByProfessorId } from '../services/api'; 
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth
import "./ProfessorDashboard.css";

const ProfessorDashboard = () => {
    const { userId } = useAuth(); // Obtén el ID de usuario desde el contexto
    const [students, setStudents] = useState([]); 
    const [subjects, setSubjects] = useState([]); 
    const [error, setError] = useState(null); 

    // Llama a la función para obtener estudiantes y materias al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            setError(null); 
            try {
                const studentsData = await fetchStudentsAndSubjects(userId); // Usa userId aquí
                console.log(studentsData); 
                setStudents(studentsData || []); 

                const subjectsData = await fetchSubjectsByProfessorId(userId); // Usa userId aquí
                console.log(subjectsData); 
                setSubjects(subjectsData || []); 
            } catch (error) {
                console.error('Error fetching students or subjects:', error);
                setError('Error al obtener los alumnos inscriptos o las materias.'); 
            }
        };

        fetchData();
    }, [userId]); // Dependencia de userId para volver a ejecutar si cambia

    return (
        <div className="professor-dashboard">
            <h1>Dashboard del Profesor</h1>
            {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error si existe */}
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