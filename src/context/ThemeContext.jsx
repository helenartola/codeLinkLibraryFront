import { createContext, useState, useEffect } from "react";

// Crea el contexto ThemeContext
export const ThemeContext = createContext();

// Define el proveedor de contexto para el tema
export const ThemeProvider = ({ children }) => {
  // Define el estado del modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Efecto para actualizar el almacenamiento local cuando cambia el modo oscuro
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Retorna el proveedor de contexto con el valor del modo oscuro y la función para alternarlo
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

