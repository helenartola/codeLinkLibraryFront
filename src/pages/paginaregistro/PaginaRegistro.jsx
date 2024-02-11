import "./PaginaRegistro.css";
import FormularioRegistro from "../../components/registro/FormularioRegistro";
import { useTheme } from "../hooks/useTheme";

const PaginaRegistro = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`contenedorFormularioRegistro ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="textoRegistro">
        <h1 className="tituloRegistro">Elevate your web development journey</h1>
        <p className="parrafoRegistro">
          Share, learn, and collaborate seamlessly
        </p>
      </div>
      <div className="cajaRegistro">
        <FormularioRegistro />
      </div>
    </section>
  );
};
export default PaginaRegistro;
