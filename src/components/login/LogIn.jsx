import "./LogIn.css";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { loginUsuarioService } from "../../services";
import { Link } from "react-router-dom";
import LogoCodeLinkLibrary from "../logo/logoCodeLinkLibrary";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

// Componente FormularioLogin
export const FormularioLogin = () => {
  // Estados locales
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para los errores
  const { isDarkMode } = useTheme(); // Estado del modo oscuro desde el contexto de tema
  const navigate = useNavigate(); // Función de navegación desde react-router-dom
  const [, betterSetUser] = useUser(); // Función de establecimiento de usuario desde el contexto de usuario

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del formulario
    setError(""); // Limpiar el estado de error

    try {
      // Intentar iniciar sesión con el servicio de inicio de sesión
      const userData = await loginUsuarioService({ email, password });

      if (userData.token) {
        // Si se obtiene un token válido
        betterSetUser(userData); // Establecer el usuario en el contexto
        navigate("/"); // Redirigir a la página principal
      } else {
        setError("Error al obtener el token");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Estructura del componente de inicio de sesión
  return (
    <div className="login-container">
      <LogoCodeLinkLibrary /> {/* Logo de la aplicación */}
      <section
        className={`cajaFormularioLogin ${isDarkMode ? "dark" : "light"}`}
      >
        {" "}
        {/* Contenedor del formulario con clases condicionales para el modo oscuro */}
        <h1>INICIO DE SESIÓN</h1> {/* Título del formulario */}
        <form onSubmit={handleLogin}>
          {" "}
          {/* Formulario de inicio de sesión */}
          <fieldset>
            <label htmlFor="email">MAIL</label>{" "}
            {/* Campo de entrada para el email */}
            <input
              className="input-login-form"
              value={email}
              type="text"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">CONTRASEÑA</label>{" "}
            {/* Campo de entrada para la contraseña */}
            <input
              className="input-login-form"
              value={password}
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button className="botonLogin">INICIAR SESIÓN</button>{" "}
          {/* Botón para enviar el formulario de inicio de sesión */}
          {error && <p className="errorMensaje">{error}</p>}{" "}
          {/* Mostrar mensaje de error si existe */}
          <div className="yaTienesCuenta">
            <p>¿Aún no tienes tu cuenta?</p>{" "}
            {/* Mensaje para registrarse si no tiene una cuenta */}
            <Link to="/registro">
              {" "}
              {/* Enlace para ir a la página de registro */}
              <button className="accede-button">Regístrate</button>{" "}
              {/* Botón para redirigir a la página de registro */}
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormularioLogin;
