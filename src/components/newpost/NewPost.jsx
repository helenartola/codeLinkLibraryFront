import { useState } from "react";
import { createPostService } from "../../services";
import { useUser } from "../../context/UserContext";
import "./NewPost.css";
import { useTheme } from "../../context/ThemeContext";

const NewPost = ({ isFormOpen, setIsFormOpen, onAddPost }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Modificación aquí para agregar un valor predeterminado y hacer el campo obligatorio
  const [url, setUrl] = useState("https://");
  const [user] = useUser();
  //const [isFormOpen, setIsFormOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleAddPost = async () => {
    try {
      const token = user ? user.token : null;
  
      // Verifica si el usuario está autenticado
      if (!token) {
        setErrorMessage(
          "No estás autenticado. Inicia sesión para crear un nuevo post."
        );
  
        // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
  
        return;
      }
  
      // Verifica si se han completado todos los campos del formulario
      if (!title || !description || !url) {
        setErrorMessage("Por favor, completa todos los campos.");
  
        // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
  
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
  
      setMessage("Nuevo post agregado con éxito!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error al agregar el nuevo post:", error);
      setMessage("");
      setErrorMessage(
        "Error al agregar el nuevo post. Por favor, inténtalo de nuevo."
      );
  
      // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  

  // Función para cerrar el formulario sin agregar un post
  const handleCloseForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setIsFormOpen(false);
    setErrorMessage("");
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
              type="url" // Cambiado a type "url" para validar la URL automáticamente
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required // Hace que el campo sea obligatorio
            />
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {message && <p className="success-message">{message}</p>}
          {/* Botón para agregar el post */}
          <br />
          <button className="agregar-post" onClick={handleAddPost}>
            <img
              className="agregar-post-icono"
              src="/agregar-post.png"
              alt="Agregar post"
            />
          </button>
          {/* Botón para cerrar el formulario */}
          <button className="cerrar-post" onClick={handleCloseForm}>
            <img
              className="cancelar-crear-post-icono"
              src="/cancelar.png"
              alt="Cancelar crear post"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default NewPost;
