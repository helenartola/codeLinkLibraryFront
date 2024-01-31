import "./LogIn.css";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { loginUsuarioService } from "../../services";
import { Link } from "react-router-dom";
import LogoCodeLinkLibrary from "../logo/logoCodeLinkLibrary";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [, betterSetUser] = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUsuarioService({ email, password });

      if (userData.token) {
        // Almacenar el token en localStorage
        //localStorage.setItem("token", token);
        betterSetUser(userData);
        navigate("/");
      } else {
        setError("Error al obtener el token");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <LogoCodeLinkLibrary />
      <section
        className={`cajaFormularioLogin ${isDarkMode ? "dark" : "light"}`}
      >
        <h1>INICIO DE SESIÓN</h1>
        <form onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="email">MAIL</label>
            <input
              value={email}
              type="text"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="password">CONTRASEÑA</label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <button className="botonLogin">INICIAR SESIÓN</button>
          {error && <p className="errorMensaje">{error}</p>}
          <div className="yaTienesCuenta">
            <p>¿Aún no tienes tu cuenta?</p>
            <Link to="/registro">
              <button className="accede-button">Regístrate</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormularioLogin;
