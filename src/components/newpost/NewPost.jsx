import { useState } from "react";
import { createPostService } from "../../services";
import { useUser } from "../../context/UserContext";
import './NewPost.css';

const NewPost = ({ onAddPost }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState(""); // Nuevo estado para la URL
  const [user] = useUser();

  // Función para manejar la creación de un nuevo post
  const handleAddPost = async () => {
    try {
      // Obtener el token del usuario
      const token = user ? user.token : null;

      // Imprimir el token en la consola
      console.log("Token:", token);

      // Verificar que el usuario esté autenticado
      if (!token) {
        alert("No estás autenticado. Inicia sesión para crear un nuevo post.");
        return;
      }

      // Validar que todos los campos estén completos
      if (!title || !description || !url) { // Asegúrate de validar el nuevo campo
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Objeto con los datos del post
      const postData = { title, description, url }; // Añade el campo "url" al objeto postData

      // Imprimir el objeto postData en la consola
      console.log("postData:", postData);

      // Llamada al servicio para crear un nuevo post
      const nuevoPost = await createPostService(postData, token);

      // Llamar a la función proporcionada para agregar el nuevo post a la lista
      if (onAddPost) {
        onAddPost(nuevoPost);
      }

      // Restablecer los campos después de la creación del post
      setTitle("");
      setDescription("");
      setUrl(""); // Restablece el estado del campo "url"

      alert("Nuevo post agregado con éxito!");
    } catch (error) {
      console.error("Error al agregar el nuevo post:", error);
      alert("Error al agregar el nuevo post. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="new-post-container">
      <h3>Agregar Nuevo Post</h3>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        URL: {/* Nuevo campo para la URL */}
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddPost}>Agregar Post</button>
    </div>
  );
};

export default NewPost;
