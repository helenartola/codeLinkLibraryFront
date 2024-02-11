import { createContext, useContext, useState, useEffect } from "react";

// Creamos un contexto para manejar el tema de la aplicación
const ThemeContext = createContext();

// Componente proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Definimos el estado para almacenar si el modo oscuro está activado o no
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" // Comprobamos si hay un valor en el localStorage
  );

  // Función para cambiar el modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Invertimos el estado actual
  };

  // Efecto para guardar el estado del modo oscuro en el localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode); // Guardamos el estado actual en el localStorage
  }, [isDarkMode]); // Dependencia del efecto: se ejecutará cuando isDarkMode cambie

  // Renderizamos el contexto ThemeContext.Provider con el valor proporcionado
  // Este valor incluye el estado del modo oscuro y la función para cambiarlo
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children} {/* Renderizamos los componentes hijos */}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de tema (warning pendiente)
export const useTheme = () => {
  return useContext(ThemeContext); // Utilizamos el hook useContext para acceder al contexto
};
