import { Link } from "react-router-dom"; 
import "./NotFoundPage.css"; 

// Componente de la página de error 404
const NotFoundPage = () => {
  return (
    // Contenedor principal de la página de error 404
    <section className="not-found-container">
      {/* Título de la página de error */}
      <h1>No hemos podido encontrar la página que buscas...</h1>
      {/* Enlace para volver a la página de inicio */}
      <Link to={"/"} className="home-link"> 
        Vuelve a la página de inicio
      </Link>
    </section>
  );
};

export default NotFoundPage; 

