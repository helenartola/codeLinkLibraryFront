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
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Función para mostrar el formulario del nuevo post
  const handleShowNewPostForm = () => {
    setShowNewPostForm(true);
  };

  // Función para ocultar el formulario del nuevo post
  const handleHideNewPostForm = () => {
    setShowNewPostForm(false);
  };

  // Si se está cargando, muestra un mensaje de carga
  if (loading) return <p>Cargando posts...</p>;
  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;

  return (
    <section className={`inicio ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-content">
        {/* Botón para mostrar el formulario del nuevo post */}
        <button className="boton-crear-post" onClick={handleShowNewPostForm}>
          Crear Nuevo Post
        </button>

        {/* Condición para mostrar el formulario del nuevo post */}
        {showNewPostForm && <NewPost onClose={handleHideNewPostForm} onAddPost={refresh} />}

        {/* Lista de posts */}
        <ListaDePosts posts={posts} />
      </div>
    </section>
  );
};

export default HomePage;

