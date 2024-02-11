import Auth from "../auth/Auth"; 
import { Link } from "react-router-dom"; 
import "./Header.css"; 
import ThemeSwitcher from "../temaclaroscuro/ThemeSwitcher"; 
import Buscador from "../buscador/Buscador"; 
import { useTheme } from "../../context/ThemeContext"; 

// Componente Header que representa el encabezado de la página
const Header = () => {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del tema

  return (
    <header className={`header ${isDarkMode ? "dark" : "light"}`}> {/* Clases de estilo condicionales basadas en el modo oscuro */}
      <nav className="navbar"> {/* Contenedor de navegación */}
        <Link to="/" className="logo-container"> {/* Enlace al inicio */}
          <img className="logo" src="/CodeLinkLibrary-Logo.png" alt="Logo" /> {/* Logo */}
        </Link>
        <div className="buscador"> {/* Contenedor del componente Buscador */}
          <Buscador /> {/* Componente Buscador para realizar búsquedas estáticas */}
        </div>
        <div className="auth-container"> {/* Contenedor del componente Auth */}
          <Auth /> {/* Componente Auth para la autenticación */}
        </div>
        <div className="theme-switcher-container"> {/* Contenedor del conmutador de temas */}
          <ThemeSwitcher /> {/* Componente ThemeSwitcher para cambiar entre modo claro y oscuro */}
        </div>
      </nav>
    </header>
  );
};

export default Header; 

