import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <section className="not-found-container">
      <h1>No hemos podido encontrar la página que buscas...</h1>
      <Link to={"/"} className="home-link">
        Vuelve a la página de inicio
      </Link>
    </section>
  );
};

export default NotFoundPage;
