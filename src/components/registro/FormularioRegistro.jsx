import "./FormularioRegistro.css";
import { useState } from "react";
import { registroUsuarioService } from "../../services";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import LogoCodeLinkLibrary from "../logo/logoCodeLinkLibrary";

export const FormularioRegistro = () => {
  //Hacemos que todos los campos esten controlados por un estado
  //Creamos un estado para cada uno de los campos del formulario
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isDarkMode } = useTheme();

  const handleForm = async (e) => {
    //Cancelamos el evento de envio con preventDefault
    e.preventDefault();
    setError("");
    //Comprobamos que las password sean iguales
    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    //Hacemos un try catch porque nos vamos a comunicar con la base de datos y así controlamos nosotros los errores que puedan surgir
    try {
      await registroUsuarioService({ userName, email, password: pass1 });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="caja-formulario-registro">
      <LogoCodeLinkLibrary />
      <section className={`cajaFormulario ${isDarkMode ? "dark" : "light"}`}>
        {/* Gestionamos el envio con el evento handleForm */}

        <form onSubmit={handleForm}>
          <h1>FORMULARIO DE REGISTRO</h1>
          <fieldset>
            <label htmlFor="Nombre de usuario">NOMBRE DE USUARIO</label>
            {/* Creamos un evento dentro de cada uno de los inputs para que cuando se actualicen los campos, actualice el estado */}
            <input
              value={userName}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email">MAIL</label>
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="pass1">CONTRASEÑA</label>
            <input
              value={pass1}
              type="password"
              id="pass1"
              name="pass1"
              required
              onChange={(e) => setPass1(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="pass2">REPITE LA CONTRASEÑA</label>
            <input
              value={pass2}
              type="password"
              id="pass2"
              name="pass2"
              required
              onChange={(e) => setPass2(e.target.value)}
            />
          </fieldset>

          <button className="botonRegistro">REGISTRAR</button>
          {error ? <p className="errorMensaje">{error}</p> : null}

          <div className="yaTienesCuenta">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login">
              <button className="accede-button">Accede</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormularioRegistro;
