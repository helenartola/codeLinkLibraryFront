import "./Auth.css";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <section>
      <Link to="/login">
        <button className="auth-button">Log in</button>
      </Link>

      <Link to="/registro">
        <button className="auth-button">Sign up</button>
      </Link>

      <Link to="/profile">
        <button className="profile-button"></button>
      </Link>
    </section>
  );
};

export default Auth;
