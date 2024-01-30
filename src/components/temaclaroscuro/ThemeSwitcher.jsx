import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { toggleDarkMode } = useTheme();

  // Estado local para manejar el tema
  const [localDarkMode, setLocalDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Actualiza el tema en el local storage cuando cambia
  useEffect(() => {
    localStorage.setItem("darkMode", localDarkMode);
  }, [localDarkMode]);

  // Aplica el tema al cuerpo del documento
  useEffect(() => {
    document.body.classList.toggle("dark-mode", localDarkMode);
  }, [localDarkMode]);

  // Maneja el cambio de tema
  const handleToggleDarkMode = () => {
    setLocalDarkMode(!localDarkMode);
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggleDarkMode}
      className={`theme-switcher ${
        localDarkMode ? "dark" : "light"
      } small-icon`}
    >
      <img
        src={localDarkMode ? "/sol.png" : "/luna.png"}
        alt={localDarkMode ? "sol" : "luna"}
        className="small-icon"
      />
    </button>
  );
};

export default ThemeSwitcher;
