import "./LoginPage.css";
import FormularioLogin from "../../components/login/LogIn"; 
import { useTheme } from "../../context/ThemeContext"; 
const PaginaLogin = () => {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del contexto de tema

  return (
    <section
      // Aplicamos clases condicionales en función del modo oscuro
      className={`contenedorFormularioLogin ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="cajaLogin">
        <FormularioLogin /> {/* Renderizamos el componente de formulario de inicio de sesión */}
      </div>
    </section>
  );
};

export default PaginaLogin;

