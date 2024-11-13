import { useState } from 'react';
import { fetchStudentsAndSubjects, fetchSubjectsByProfessorId } from '../services/api'; 
import "./ProfessorDashboard.css";

const ProfessorDashboard = () => {
    const [students, setStudents] = useState([]); 
    const [subjects, setSubjects] = useState([]); 
    const [professorId, setProfessorId] = useState(''); 
    const [error, setError] = useState(null); 

    const handleFetchStudents = async (e) => {
        e.preventDefault(); 
        setError(null); 
        try {
            const studentsData = await fetchStudentsAndSubjects(professorId); 
            console.log(studentsData); 
            setStudents(studentsData || []); 

            
            const subjectsData = await fetchSubjectsByProfessorId(professorId);
            console.log(subjectsData); 
            setSubjects(subjectsData || []); 
        } catch (error) {
            console.error('Error fetching students or subjects:', error);
            setError('Error al obtener los alumnos inscriptos o las materias.'); 
        }
    };

    return (
        <div className="professor-dashboard">
            <h1>Dashboard del Profesor</h1>
            <form onSubmit={handleFetchStudents}>
                <input 
                    type="number" 
                    placeholder="Ingrese su legajo de Profesor" 
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