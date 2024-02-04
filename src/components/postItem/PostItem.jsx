import { useState, useEffect } from "react";
import { getCommentsService, createCommentService } from "../../services/index";
import "./PostItem.css";
import { useUser } from "../../context/UserContext";

const PostItem = ({ post }) => {
  // Estado para almacenar el nuevo comentario
  const [comentario, setComentario] = useState("");
  // Estado para almacenar la lista de comentarios
  const [comments, setComments] = useState([]);
  // Estado para controlar la visibilidad del formulario de comentarios
  const [showCommentForm, setShowCommentForm] = useState(false);
  // Obtiene el usuario del contexto
  const [user] = useUser();
  // Obtiene el token del usuario o establece en null si no hay usuario
  const token = user ? user.token : null;

  // Efecto secundario para cargar comentarios cuando cambia el post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (post) {
          // Obtiene los comentarios asociados al post
          const comentarios = await getCommentsService(post.postId);
          setComments(comentarios);
        }
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    // Llama a la función para cargar comentarios
    fetchComments();
  }, [post]);

  // Función para manejar la creación de un nuevo comentario
  const handleAgregarComentario = async () => {
    try {
      if (!comentario) {
        // Verifica si el campo de comentario está vacío
        alert("Por favor, ingresa un comentario.");
        return;
      }

      // Registra el token antes de realizar la solicitud
      console.log('Authorization Token before createCommentService:', token);

      // Crea un nuevo comentario utilizando el servicio
      const nuevoComentario = await createCommentService(
        {
          postId: post.postId,
          comentario,
        },
        token 
      );

      // Actualiza la lista de comentarios con el nuevo comentario
      setComments([...comments, nuevoComentario]);
      // Reinicia el estado del comentario
      setComentario("");
      // Oculta el formulario de comentarios
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      alert("Error al agregar el comentario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="post-item-container">
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      <div>
        <h4>
          {comments.length === 1
            ? "1 Comentario"
            : `${comments.length} Comentarios`}
        </h4>
        <ul>
          {/* Mapea la lista de comentarios y muestra cada uno */}
          {comments.map((comment, index) => (
            <li key={`${comment.commentId}-${index}`}>{comment.text}</li>
          ))}
        </ul>
      </div>

      {/* Botón para mostrar/ocultar el formulario de comentarios */}
      <button className="boton-comentar" onClick={() => setShowCommentForm(!showCommentForm)}>
        Comentar
      </button>

      {showCommentForm && (
        <div>
          {/* Formulario para agregar comentarios */}
          <label>
            <input
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </label>
          <button className="boton-comentar" onClick={handleAgregarComentario}>
            Agregar Comentario
          </button>
        </div>
      )}
    </div>
  );
};

export default PostItem;
