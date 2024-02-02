import { useState } from "react";
import { createPostService } from "../../services";
import './NewPost.css';

const NewPost = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPost = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!title || !description) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Llamada al servicio para crear un nuevo post
      const nuevoPost = await createPostService({ title, description });

      // Llamar a la función proporcionada para agregar el nuevo post a la lista (o hacer cualquier acción necesaria)
      if (onAddPost) {
        onAddPost(nuevoPost);
      }

      // Restablecer los campos después de la creación del post
      setTitle("");
      setDescription("");

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
      <button onClick={handleAddPost}>Agregar Post</button>
    </div>
  );
};

export default NewPost;

