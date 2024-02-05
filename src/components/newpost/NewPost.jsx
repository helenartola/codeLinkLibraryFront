import { useState } from "react";
import { createPostService } from "../../services";
import { useUser } from "../../context/UserContext";
import "./NewPost.css";
import { useTheme } from "../../context/ThemeContext";

const NewPost = ({ isFormOpen, setIsFormOpen, onAddPost }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [user] = useUser();
  //const [isFormOpen, setIsFormOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const handleAddPost = async () => {
    try {
      const token = user ? user.token : null;

      // Verifica si el usuario está autenticado
      if (!token) {
        alert("No estás autenticado. Inicia sesión para crear un nuevo post.");
        return;
      }

      // Verifica si se han completado todos los campos del formulario
      if (!title || !description || !url) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      const postData = { title, description, url };

      // Llama a la función para crear un nuevo post en el servicio
      const newPost = await createPostService(postData, token);

      // Si se proporciona la función onAddPost, llámala para actualizar la lista de posts
      if (onAddPost) {
        onAddPost(newPost);
      }

      // Limpia los campos del formulario y cierra el formulario después de agregar el post
      setTitle("");
      setDescription("");
      setUrl("");
      setIsFormOpen(false);

      alert("Nuevo post agregado con éxito!");
    } catch (error) {
      console.error("Error al agregar el nuevo post:", error);
      alert("Error al agregar el nuevo post. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para cerrar el formulario sin agregar un post
  const handleCloseForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setIsFormOpen(false);
  };

  return (
    <div className={`new-post-container ${isDarkMode ? "dark" : "light"}`}>
      {isFormOpen && (
        <>
          {/* Campo para el título */}
          <label>
            <input
              className="input-new-post"
              placeholder="Título"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          {/* Campo para la descripción */}
          <label>
            <textarea
              className="textarea-new-post"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          {/* Campo para la URL */}
          <label>
            <input
              className="input-new-post"
              placeholder="URL"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <br />
          {/* Botón para agregar el post */}
          <button onClick={handleAddPost}>Agregar Post</button>
          {/* Botón para cerrar el formulario */}
          <button onClick={handleCloseForm}>Cerrar</button>
        </>
      )}
    </div>
  );
};

export default NewPost;
