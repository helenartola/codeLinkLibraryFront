// SavedPosts.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './SavedPost.css'; // Ajusta la ruta según tu estructura de archivos

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await fetch("/posts/saved"); // Ajusta la ruta según tu API
        if (!response.ok) {
          throw new Error("Error al obtener los posts guardados");
        }

        const data = await response.json();
        setSavedPosts(data.data);
      } catch (error) {
        console.error("Error al obtener los posts guardados:", error);
      }
    };

    fetchSavedPosts();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <div className="saved-posts-container">
      <h2>Tus Posts Guardados</h2>
      {savedPosts.length === 0 ? (
        <p>No tienes posts guardados por el momento.</p>
      ) : (
        <ul className="saved-posts-list">
          {savedPosts.map((post) => (
            <li key={post.postId}>
              <Link to={`/post/${post.postId}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Enlace a la página SavedPage con la ruta correcta */}
      <Link to="/saved">Ir a SavedPage</Link>
    </div>
  );
};

export default SavedPosts;
