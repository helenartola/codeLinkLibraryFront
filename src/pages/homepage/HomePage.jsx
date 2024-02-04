import { useState } from "react";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";
import NewPost from "../../components/newpost/NewPost";
import "./HomePage.css";
import { useTheme } from "../../context/ThemeContext";

const HomePage = () => {
  const { isDarkMode } = useTheme();

  const { posts, loading, error } = usePosts();
  const [showNewPostForm, setShowNewPostForm] = useState(false); // Controla la visibilidad del formulario

  // Función para mostrar el formulario del nuevo post
  const handleShowNewPostForm = () => {
    setShowNewPostForm(true);
  };

  // Función para ocultar el formulario del nuevo post
  const handleHideNewPostForm = () => {
    setShowNewPostForm(false);
  };

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={`inicio ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-content">
        {/* Botón para mostrar el formulario del nuevo post */}
        <button className="boton-crear-post" onClick={handleShowNewPostForm}>
          Crear Nuevo Post
        </button>

        {/* Condición para mostrar el formulario del nuevo post */}
        {showNewPostForm && <NewPost onClose={handleHideNewPostForm} />}

        {/* Lista de posts */}
        <ListaDePosts posts={posts} />
      </div>
    </section>
  );
};

export default HomePage;
