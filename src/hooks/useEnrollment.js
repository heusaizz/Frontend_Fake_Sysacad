// src/hooks/useEnrollment.js
import { useState } from 'react';
import { fetchEnrollmentsByClientId, fetchAllEnrollments } from '../services/api';

const useEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);

    const getEnrollments = async (clientId) => {
        setError(null);
        try {
            const data = await fetchEnrollmentsByClientId(clientId);
            setEnrollments(data || []);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            setError('Error al obtener las inscripciones.');
        }
    };

    const getAllEnrollments = async () => {
        setError(null);
        try {
            const data = await fetchAllEnrollments(); // Asegúrate de que esta función esté definida en tu API
            setEnrollments(data || []);
        } catch (error) {
            console.error('Error fetching all enrollments:', error);
            setError('Error al obtener todas las inscripciones.');
        }
    };

    return { enrollments, error, getEnrollments, getAllEnrollments };
};

export default useEnrollments;