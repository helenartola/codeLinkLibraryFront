import { useUser } from "../../context/UserContext";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth = () => {
  const [user, betterSetUser] = useUser();

  const handleLogout = () => {//nos redirije a la página de inicio una vez hacemos logout
    betterSetUser(null);
    window.location.href = "/login";
  };

  return (
    <section className="seccion-botones-acceso">
      {user ? (
        <>
          <span className="usuario">{user.userName}</span>
          <Link to="/profile">
            <button className="profile-button"></button>
          </Link>
          <a
            className="logout-boton"
            href="#"
            onClick={handleLogout} // Utilizamos la función handleLogout para manejar el logout
          >
            <img className="icono-logout" src="/Logout.png" alt="Log out" />
          </a>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="auth-button">Log in</button>
          </Link>

          <Link to="/registro">
            <button className="auth-button">Sign up</button>
          </Link>
        </>
      )}
    </section>
  );
};

export default Auth;