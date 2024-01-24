import "./LoginPage.css";
import { useState } from "react";
import { loginUsuarioService } from "../../services";

export const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUsuarioService({ email, password }); 

      // Lógica adicional después de iniciar sesión, si es necesario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="cajaFormulario">
      <h1>INICIO DE SESIÓN</h1>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="email">Correo electrónico</label> 
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
          <label htmlFor="password">Contraseña</label>
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
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};

export default LoginPage;
