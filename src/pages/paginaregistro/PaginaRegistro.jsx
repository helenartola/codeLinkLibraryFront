import "./PaginaRegistro.css";
import FormularioRegistro from "../../components/registro/FormularioRegistro";

const PaginaRegistro = () => {
  return (
    <section className="contenedorFormularioRegistro">
      <div className="textoRegistro">
        <h1 className="tituloRegistro">CodeLinkLibrary</h1>
        <p className="parrafoRegistro">
          Registrate para poder acceder a todos los contenidos.
        </p>
      </div>
      <div className="cajaRegistro">
        <FormularioRegistro />
      </div>
    </section>
  );
};
export default PaginaRegistro;
