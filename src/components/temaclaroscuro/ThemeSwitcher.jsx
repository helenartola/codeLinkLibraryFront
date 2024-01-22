import { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  // Estado para el modo claro/oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Función para alternar entre modos claro y oscuro
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Efecto para aplicar los estilos según el modo claro/oscuro
  useEffect(() => {
    // Modifica la clase del body para aplicar estilos a toda la página
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    // Botón para cambiar entre modos claro y oscuro
    <button
      onClick={toggleDarkMode}
      className={`theme-switcher ${isDarkMode ? 'dark' : 'light'} small-icon`}
    >
      {/* Sustituidos los emoji por imágenes con lógica invertida */}
      <img
        src={isDarkMode ? '/luna.png' : '/sol.png'}
        alt={isDarkMode ? 'luna' : 'sol'}
        className="small-icon"
      />
    </button>
  );
};

export default ThemeSwitcher;





