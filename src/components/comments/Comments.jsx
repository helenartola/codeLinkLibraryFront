import { useUser } from "../../context/UserContext"; 
import { deleteCommentService } from "../../services"; 
import "./Comments.css"; 

// Componente para cada elemento de comentario individual
const CommentItem = ({ comment, onDeleteComment }) => {
  const [user] = useUser(); // Usamos el hook useUser para obtener el usuario actual

  // Función para manejar la eliminación de comentarios
  const handleDeleteComment = async () => {
    try {
      // Llama al servicio para eliminar el comentario
      await deleteCommentService(comment.postId, comment.commentId, user.token);
      console.log("Comentario eliminado exitosamente");
      // Llama a la función del padre para actualizar la lista de comentarios
      onDeleteComment(comment.commentId);
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <p className="comment-user">{comment.userName}</p> {/* Nombre de usuario */}
        <p className="comment-date">Publicado el {new Date(comment.createdAt).toLocaleString()}</p> {/* Fecha de publicación */}
      </div>
      <p className="comment-text">{comment.text}</p> {/* Texto del comentario */}

      {/* Muestra el botón de eliminar solo si es el usuario que creó el comentario */}
      {user && user.userId === comment.userId && (
        <button onClick={handleDeleteComment} className="delete-comment-button">
          Eliminar Comentario {/* Botón para eliminar el comentario */}
        </button>
      )}
    </div>
  );
};

// Componente para la sección de comentarios
const Comments = ({ comments, onDeleteComment }) => {
  return (
    <div className="comments-section">
      <h3>Comentarios</h3> {/* Título de la sección */}
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} onDeleteComment={onDeleteComment} /> 
      ))}
    </div>
  );
};

export { CommentItem, Comments }; 

