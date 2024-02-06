import Auth from "../auth/Auth";
import { Link } from "react-router-dom";
import "./Header.css";
import ThemeSwitcher from "../temaclaroscuro/ThemeSwitcher";
import Buscador from "../buscador/Buscador";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { isDarkMode } = useTheme();
  return (
    <header className={`header ${isDarkMode ? "dark" : "light"}`}>
      <nav className="navbar">
        <Link to="/" className="logo-container">
          <img className="logo" src="/CodeLinkLibrary-Logo.png" alt="Logo" />
        </Link>
        <div className="buscador">
          {/* Componente Buscador para realizar búsquedas estáticas */}
          <Buscador />
        </div>
        <div className="auth-container">
          <Auth />
        </div>
        <div className="theme-switcher-container">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;
