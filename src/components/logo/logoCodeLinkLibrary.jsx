import { Link } from "react-router-dom";

const LogoCodeLinkLibrary = () => {
  return (
    <section className="logoCodeLinkLibrary">
      <Link to="/" className="logo-container">
        <img className="logo" src="/CodeLinkLibrary-verde.png" alt="Logo" />
      </Link>
    </section>
  );
};

export default LogoCodeLinkLibrary;