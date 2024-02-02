import { useState, useEffect } from "react";
import { getCommentsService, createCommentService } from "../../services/index";

import './PostItem.css';

const PostItem = ({ post }) => {
  // Estado para el nuevo comentario
  const [comentario, setComentario] = useState("");

  // Estado para almacenar la lista de comentarios asociados al post
  const [comments, setComments] = useState([]);

  // Efecto para cargar los comentarios al cargar el componente o cuando cambia el ID del post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Verificar si el postId es válido
        if (post) {
          // Obtener los comentarios asociados al post
          const comentarios = await getCommentsService(post.postId);
          
          // Actualizar el estado con la lista de comentarios
          setComments(comentarios);
        }
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    // Llamar a la función para obtener comentarios
    fetchComments();
  }, [post]); // Desestructurar directamente el post y añadirlo como dependencia

  // Función para manejar la creación de un nuevo comentario
  const handleAgregarComentario = async () => {
    try {
      if (!comentario) {
        alert("Por favor, ingresa un comentario.");
        return;
      }

      // Crear el nuevo comentario
      const nuevoComentario = await createCommentService({ postId: post.id, comentario });
      console.log("Nuevo comentario creado:", nuevoComentario);

      // Actualizar la lista de comentarios después de la creación
      setComments([...comments, nuevoComentario]);

      // Restablecer el campo de comentario después de la creación
      setComentario("");

      // Puedes realizar otras acciones después de crear el comentario
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      alert("Error al agregar el comentario. Por favor, inténtalo de nuevo.");
    }
  };

  // Renderizar el componente
  return (
    <div className="post-item-container">
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      <div>
        <h4>{comments.length === 1 ? '1 Comentario' : `${comments.length} Comentarios`}</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>{comment.text}</li>
          ))}
        </ul>
      </div>

      {/* Formulario para agregar un comentario */}
      <div>
        <label>
          <input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </label>
        <button onClick={handleAgregarComentario}>Comentar</button>
      </div>
    </div>
  );
};

export default PostItem;