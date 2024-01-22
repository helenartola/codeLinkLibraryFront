import Auth from "../auth/Auth";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo-container">
          <img
            className="logo"
            src="/CodeLinkLibrary-logotipo-blanco.png"
            alt="Logo"
          ></img>
        </Link>
        <div className="auth-container">
          <Auth />
        </div>
      </nav>
    </header>
  );
};

export default Header;
