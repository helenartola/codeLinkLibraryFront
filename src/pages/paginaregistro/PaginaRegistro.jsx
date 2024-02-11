import "./PaginaRegistro.css"; 
import FormularioRegistro from "../../components/registro/FormularioRegistro"; 
import { useTheme } from "../../context/ThemeContext"; 

// Componente de la página de registro
const PaginaRegistro = () => {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del contexto de tema

  return (
    // Contenedor principal de la página de registro
    <section
      // Aplicamos clases condicionales en función del modo oscuro
      className={`contenedorFormularioRegistro ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Contenido de texto de la página de registro */}
      <div className="textoRegistro">
        {/* Título de la página de registro */}
        <h1 className="tituloRegistro">Elevate your web development journey</h1>
        {/* Descripción de la página de registro */}
        <p className="parrafoRegistro">
          Share, learn, and collaborate seamlessly
        </p>
      </div>
      {/* Renderizamos el componente de formulario de registro */}
      <div className="cajaRegistro">
        <FormularioRegistro />
      </div>
    </section>
  );
};

export default PaginaRegistro; 

