import { useState, useEffect } from "react";
import {
  getCommentsService,
  createCommentService,
  likePostService,
  savePostService,
  unsavePostService,
  deletePostService,
  deleteCommentService,
  editCommentService
} from "../../services/index";
import "./PostItem.css";
import { useUser } from "../../context/UserContext";

const PostItem = ({ post }) => {
  // Estados para el manejo de comentarios
  const [comentario, setComentario] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  
  // Estados para el manejo de likes y guardado
  const [numLikes, setNumLikes] = useState(post.numLikes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  
  // Estados para la edición de comentarios
  const [editingComment, setEditingComment] = useState(null); // Nuevo estado para el comentario en edición
  const [lastEditTime, setLastEditTime] = useState({}); // Nuevo estado para almacenar la hora de la última edición de cada comentario

  const [user] = useUser();
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comentarios = await getCommentsService(post.postId);
        setComments(comentarios);
        setTotalComments(comentarios.length);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchComments();
  }, [post]);

  // Función para agregar un nuevo comentario
  const handleAgregarComentario = async () => {
    try {
      if (!comentario) {
        alert("Por favor, ingresa un comentario.");
        return;
      }

      // Crea un nuevo comentario utilizando el servicio
      const newCommentId = await createCommentService(
        {
          postId: post.postId,
          comentario,
        },
        token
      );

      // Actualiza la lista de comentarios con el nuevo comentario
      setComments([
        ...comments,
        {
          commentId: newCommentId,
          text: comentario,
          userName: user.userName,
          createdAt: new Date().toISOString(),
        },
      ]);
      // Incrementa el total de comentarios
      setTotalComments(totalComments + 1);
      // Reinicia el estado del comentario
      setComentario("");
      // Oculta el formulario de comentarios
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      alert("Error al agregar el comentario. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el botón de like
  const handleLikePost = async () => {
    try {
      // Llama al servicio para dar/quitar like
      const likeResponse = await likePostService(post.postId, token);
      // Actualiza el estado con la nueva información de likes
      setNumLikes(likeResponse.numLikes);
      setIsLiked(likeResponse.isLiked);
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
      alert("Error al dar/quitar like. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el botón de eliminar post
  const handleDeletePost = async () => {
    try {
      // Llama al servicio para eliminar el post
      await deletePostService(post.postId, token);
      // Actualiza la lista de posts para que el post eliminado ya no se muestre
      // Esto podría implicar recargar la página o actualizar el estado del componente
      // dependiendo de cómo esté estructurada tu aplicación
      alert("El post ha sido eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar post:", error);
      alert("Error al eliminar post. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el botón de guardar/eliminar post
  const handleSavePost = async () => {
    try {
      // Verifica si el post pertenece al propio usuario
      if (user && post.userId === user.userId) {
        alert("No puedes guardar tus propios posts.");
        return;
      }

      // Llama al servicio para guardar o eliminar el post según su estado actual
      if (isSaved) {
        // Si está guardado, entonces llamamos al servicio para desguardar
        await unsavePostService(post.postId, token);
      } else {
        // Si no está guardado, llamamos al servicio para guardar
        await savePostService(post.postId, token);
      }

      // Actualiza el estado con el nuevo estado de guardado
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error al guardar/eliminar post:", error);
      alert("Error al guardar/eliminar post. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el botón de eliminar comentario
  const handleDeleteComment = async (commentId) => {
    try {
      // Llama al servicio para eliminar el comentario
      await deleteCommentService(post.postId, commentId, token); 
      // Filtra los comentarios para excluir el comentario eliminado
      const updatedComments = comments.filter(comment => comment.commentId !== commentId);
      // Actualiza la lista de comentarios
      setComments(updatedComments);
      // Decrementa el total de comentarios
      setTotalComments(totalComments - 1);
      alert("El comentario ha sido eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      alert("Error al eliminar comentario. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el botón de editar comentario
  const handleEditComment = (commentId) => {
    // Encuentra el comentario a editar
    const commentToEdit = comments.find(comment => comment.commentId === commentId);
    // Establece el comentario en edición
    setEditingComment(commentToEdit);
    setComentario (commentToEdit.text);
  };

  // Función para guardar la edición del comentario
  const handleSaveEdit = async () => {
    try {
      // Copia el comentario editado con el nuevo texto
      const editedComment = { ...editingComment, text: comentario };
      // Llama al servicio para editar el comentario
      await editCommentService(editingComment.commentId, editedComment, token);
      // Actualiza la lista de comentarios con el comentario editado
      const updatedComments = comments.map(comment => {
        if (comment.commentId === editingComment.commentId) {
          return {
            ...comment,
            text: comentario,
          };
        }
        return comment;
      });
      // Actualiza los comentarios, oculta el formulario de edición y restablece el estado de edición
      setComments(updatedComments);
      setEditingComment(null);
      // Actualiza la hora de la última edición del comentario
      setLastEditTime({
        ...lastEditTime,
        [editingComment.commentId]: new Date().toLocaleString(),
      });
      alert("El comentario ha sido editado con éxito.");
    } catch (error) {
      console.error("Error al editar comentario:", error);
      alert("Error al editar comentario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="post-item-container">
      <div className="datos-publicacion">
        <p className="publicado-por">
          Publicado por:{" "}
          <span className="nombre-usuario">{post.userName} · </span>
        </p>
        <p className="fecha"> {new Date(post.createdAt).toLocaleString()}</p>
      </div>
      {/* Título y descripción del post */}
      <h2 className="titulo-post-home">{post.title}</h2>
      <p className="descripcion-post-home">{post.description}</p>

      <div>
        {/* Botón para mostrar/ocultar los comentarios */}
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>
        {showComments && (
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId}>
                <p>Comentado por: {comment.userName}</p>
                <p>{comment.text}</p>
                <p>Fecha de publicación: {new Date(comment.createdAt).toLocaleString()}</p>
                {/* Mostrar hora de la última edición y "editado" si corresponde */}
                {comment.commentId === editingComment?.commentId ? (
                  <div>
                    <input
                      type="text"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Guardar</button>
                    <button onClick={() => setEditingComment(null)}>Cerrar Edición</button>
                  </div>
                ) : (
                  <div>
                    {lastEditTime[comment.commentId] && (
                      <p>Editado: {lastEditTime[comment.commentId]}</p>
                    )}
                    <button onClick={() => handleEditComment(comment.commentId)}>
                      Editar Comentario
                    </button>
                  </div>
                )}
                {user && comment.userId === user.userId && (
                  <button
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    Eliminar Comentario
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="botones-post-complementos">
        {user && post.userId !== user.userId && (
          <button className="boton-icono-like" onClick={handleLikePost}>
            {isLiked ? (
              <img src="/corazon-relleno.png" alt="Corazón Relleno" />
            ) : (
              <img src="/corazon.png" alt="Corazón Vacío" />
            )}
          </button>
        )}
        <p className="likes-count">{numLikes}</p>
        {user && post.userId !== user.userId && (
          <button className="botones-guardar" onClick={handleSavePost}>
            {isSaved ? (
              <img src="/guardar.png" alt="Eliminar Guardado" />
            ) : (
              <>
                <img src="/guardar-rell.png" alt="Guardar" />
              </>
            )}
          </button>
        )}
        <button
          className="boton-comentar"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <img
            className="icono-comentario"
            src="/comentario.png"
            alt="Escribir comentario"
          />
        </button>
        <h4>{totalComments === 1 ? "1 Comentario" : `${totalComments} Comentarios`}</h4>
      </div>

      {showCommentForm && (
        <div>
          <label>
            <input
              className="comment-input"
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

      {user && post.userId === user.userId && (
        <button className="botones-eliminar" onClick={handleDeletePost}>
          Eliminar Post
        </button>
      )}
    </div>
  );
};

export default PostItem;
