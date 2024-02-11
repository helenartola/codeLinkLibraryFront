import { createContext, useContext, useState } from "react";

// Creamos un contexto para manejar la información del usuario
const UserContext = createContext();

// Componente proveedor del usuario
export const UserProvider = ({ children }) => {
  // Definimos el estado para almacenar la información del usuario
  // Utilizamos localStorage para obtener la información del usuario si está disponible
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("session")));

  // Función para actualizar la información del usuario
  const betterSetUser = (user) => {
    setUser(user); // Actualizamos el estado del usuario

    // Si hay un usuario, lo almacenamos en el localStorage como "session"
    // Si no hay usuario, eliminamos la entrada "session" del localStorage
    if (user) {
      localStorage.setItem("session", JSON.stringify(user));
    } else {
      localStorage.removeItem("session");
    }
  };

  // Renderizamos el contexto UserContext.Provider con el valor proporcionado
  // Este valor incluye el estado del usuario y la función para actualizarlo
  return (
    <UserContext.Provider value={[user, betterSetUser]}>
      {children} {/* Renderizamos los componentes hijos */}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de usuario (warning pendiente)
export const useUser = () => {
  return useContext(UserContext); // Utilizamos el hook useContext para acceder al contexto
};

