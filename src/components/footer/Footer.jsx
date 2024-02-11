import { useTheme } from "../../context/ThemeContext"; 
import "./Footer.css"; 

// Componente Footer que muestra el pie de página
const Footer = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className={isDarkMode ? "dark" : "light"}> {/* Clases de estilo condicionales basadas en el modo oscuro */}
      <footer className="footer"> {/* Contenedor del pie de página */}
        <p>2024 © Code Link Library</p> {/* Texto del pie de página */}
      </footer>
    </div>
  );
};

export default Footer; 

