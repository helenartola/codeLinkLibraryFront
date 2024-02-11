import { Link } from "react-router-dom";

// Componente LogoCodeLinkLibrary para el logo de la aplicación
const LogoCodeLinkLibrary = () => {
  return (
    <section className="logoCodeLinkLibrary">
      <Link to="/" className="logo-container">
        <img className="logo" src="/CodeLinkLibrary-Logo.png" alt="Logo" />
      </Link>
    </section>
  );
};

export default LogoCodeLinkLibrary;
