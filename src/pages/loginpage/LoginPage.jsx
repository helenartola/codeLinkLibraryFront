import "./LoginPage.css";
import FormularioLogin from "../../components/login/LogIn";
import { useTheme } from "../../context/ThemeContext";

const PaginaLogin = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`contenedorFormularioLogin ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="cajaLogin">
        <FormularioLogin />
      </div>
    </section>
  );
};
export default PaginaLogin;
