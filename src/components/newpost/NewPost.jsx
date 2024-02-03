import { useState } from "react";
import { createPostService } from "../../services";
import { useUser } from "../../context/UserContext";
import './NewPost.css';

const NewPost = ({ onAddPost }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [user] = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false); // Estado para controlar la apertura/cierre del formulario

  // Función para manejar la creación de un nuevo post
  const handleAddPost = async () => {
    try {
      const token = user ? user.token : null;

      if (!token) {
        alert("No estás autenticado. Inicia sesión para crear un nuevo post.");
        return;
      }

      if (!title || !description || !url) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      const postData = { title, description, url };

      const nuevoPost = await createPostService(postData, token);

      if (onAddPost) {
        onAddPost(nuevoPost);
      }

      setTitle("");
      setDescription("");
      setUrl("");
      setIsFormOpen(false); // Cerrar el formulario después de agregar el post

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
    setIsFormOpen(false); // Cerrar el formulario sin agregar un post
  };

  return (
    <div className="new-post-container">
      {/* Botón para abrir/cerrar el formulario */}
      <h3 onClick={() => setIsFormOpen(!isFormOpen)}>Crear Nuevo Post</h3>
      {isFormOpen && (
        <>
          {/* Campo para el título */}
          <label>
            Título:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          {/* Campo para la descripción */}
          <label>
            Descripción:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          {/* Campo para la URL */}
          <label>
            URL:
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
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