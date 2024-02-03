import { useUser } from "../../context/UserContext";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth = () => {
  const [user, betterSetUser] = useUser();
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
            onClick={(e) => {
              e.preventDefault();
              betterSetUser(null);
            }}
          >
            Logout
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
