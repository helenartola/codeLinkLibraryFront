import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { toggleDarkMode, isDarkMode } = useTheme();

  // Aplica el tema al cuerpo del documento
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // Maneja el cambio de tema
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggleDarkMode}
      className={`theme-switcher ${isDarkMode ? "dark" : "light"} small-icon`}
    >
      <img
        src={isDarkMode ? "/sol.png" : "/luna.png"}
        alt={isDarkMode ? "sol" : "luna"}
        className="small-icon"
      />
    </button>
  );
};

export default ThemeSwitcher;
