import { useState } from "react";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";
import NewPost from "../../components/newpost/NewPost";
import "./HomePage.css";
import { useTheme } from "../../context/ThemeContext";

const HomePage = () => {
  // Obtiene el estado del tema oscuro/luminoso del contexto
  const { isDarkMode } = useTheme();
  // Obtiene los posts, el estado de carga y el error mediante el hook usePosts
  const { posts, loading, error, refresh } = usePosts();
  // Estado para controlar la visibilidad del formulario de nuevo post
  const [isFormOpen, setIsFormOpen] = useState(false); // Estado para controlar la apertura/cierre del formulario

  // Si se está cargando, muestra un mensaje de carga
  if (loading) return <p>Cargando posts...</p>;
  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;

  return (
    <section className={`inicio ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-content">
        <div className="sidebar-izq">
          <div className="contenedor-crear-post">
            {/* Botón para mostrar/ocultar el formulario del nuevo post */}
            <button
              className="boton-crear-post"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <img
                className="icono-nuevo-post"
                src="/edit.png"
                alt="Crear Nuevo Post"
              />
              <span className="escribe-tu-mejor-post">
                {isFormOpen ? "" : "Escribe tu mejor post!"}
              </span>
            </button>
            {/* Condición para mostrar el formulario del nuevo post */}
            {isFormOpen && (
              <NewPost
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                onAddPost={refresh}
              />
            )}
          </div>
        </div>
        <div className="sidebar-derecha">
          <ListaDePosts posts={posts} />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
