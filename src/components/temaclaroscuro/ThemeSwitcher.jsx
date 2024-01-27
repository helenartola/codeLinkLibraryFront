import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`theme-switcher ${isDarkMode ? "dark" : "light"} small-icon`}
    >
      <img
        src={isDarkMode ? "/luna.png" : "/sol.png"}
        alt={isDarkMode ? "luna" : "sol"}
        className="small-icon"
      />
    </button>
  );
};

export default ThemeSwitcher;
