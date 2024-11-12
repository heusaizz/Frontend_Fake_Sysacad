const API_URL = "https://localhost:7251/api"; // Cambia esto según la URL de tu API

export const authenticateUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/Authentication/Authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName: username, Password: password }),
    });

    if (!response.ok) {
      throw new Error("Error de autenticación");
    }

    const token = await response.text(); 
    console.log("Token JWT:", token);
    return token; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Admin/GetAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllEnrollments = async () => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Enrollment/GetAllEnrollment`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener inscripciones");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllSubjects = async () => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Subject/GetAllSubjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener asignaturas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (userData) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Admin/CreateUser`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username,
        password: userData.password,
        email: userData.email,
        role: userData.role, 
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Admin/UpdateUser/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username,
        password: userData.password,
        email: userData.email,
        role: userData.role, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error al actualizar el usuario: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Admin/DeleteUser/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    return true; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createEnrollment = async (enrollmentData) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Enrollment/CreateEnrollment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollmentData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la inscripción");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEnrollment = async (id) => {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(`${API_URL}/Enrollment/DeleteEnrollment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la inscripción");
    }

    return true; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  const token = localStorage.getItem("jwtToken"); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Subject/CreateSubject`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: subjectData.title,
        description: subjectData.description,
        professorId: subjectData.professorId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtén la respuesta de error del servidor
      throw new Error(`Error al crear la asignatura: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve los datos de la nueva asignatura
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
    const response = await fetch(`${API_URL}/Subject/DeleteSubject/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la asignatura");
    }

    return true; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchStudentsAndSubjects = async (professorId) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
      const response = await fetch(`${API_URL}/Professor/${professorId}/clients`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("Error al obtener los alumnos inscriptos");
      }
      
      const data = await response.json();
      return data; 
  } catch (error) {
      console.error(error);
      throw error;
  }
};

export const fetchEnrollmentsByClientId = async (clientId) => {
  const token = localStorage.getItem("jwtToken"); 

  try {
      const response = await fetch(`${API_URL}/Client/${clientId}/GetAllSubjectsEnrollments`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("Error al obtener inscripciones");
      }

      const data = await response.json();
      return data; 
  } catch (error) {
      console.error(error);
      throw error;
  }
};

export const updateSubject = async (id, subjectData) => {
  const token = localStorage.getItem("jwtToken"); 
  try {
    const response = await fetch(`${API_URL}/Subject/UpdateSubject/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la asignatura");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

