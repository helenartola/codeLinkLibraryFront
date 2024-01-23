import Auth from "../auth/Auth";
import { Link } from "react-router-dom";
import "./Header.css";
import ThemeSwitcher from "../temaclaroscuro/ThemeSwitcher";
import Buscador from "../buscador/Buscador";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo-container">
          <img className="logo" src="/CodeLinkLibrary-verde.png" alt="Logo" />
        </Link>
        <div className="search-bar">
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
