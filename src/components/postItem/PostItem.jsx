import { useState, useEffect } from "react";
import {
  getCommentsService,
  createCommentService,
  likePostService,
  savePostService,
  unsavePostService,
  deletePostService,
  deleteCommentService, // Importa el servicio para eliminar comentarios
} from "../../services/index";
import "./PostItem.css";
import { useUser } from "../../context/UserContext";

const PostItem = ({ post }) => {
  // Estado para almacenar el nuevo comentario
  const [comentario, setComentario] = useState("");
  // Estado para almacenar la lista de comentarios
  const [comments, setComments] = useState([]);
  // Estado para controlar la visibilidad del formulario de comentarios
  const [showCommentForm, setShowCommentForm] = useState(false);
  // Estado para controlar la visibilidad de los comentarios
  const [showComments, setShowComments] = useState(false);
  // Estado para almacenar el total de comentarios
  const [totalComments, setTotalComments] = useState(0);

  // Estado para almacenar el número de likes
  const [numLikes, setNumLikes] = useState(post.numLikes);
  // Estado para almacenar si el usuario ha dado like
  const [isLiked, setIsLiked] = useState(post.isLiked);

  // Estado para almacenar si el usuario ha guardado el post
  const [isSaved, setIsSaved] = useState(post.isSaved);

  // Obtiene el usuario del contexto
  const [user] = useUser();
  // Obtiene el token del usuario o establece en null si no hay usuario
  const token = user ? user.token : null;

  // Efecto secundario para cargar comentarios cuando cambia el post o el estado de mostrar comentarios
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Obtiene los comentarios asociados al post
        const comentarios = await getCommentsService(post.postId);
        // Actualiza el estado con los comentarios obtenidos
        setComments(comentarios);
        // Actualiza el total de comentarios
        setTotalComments(comentarios.length);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    // Llama a la función para cargar comentarios
    fetchComments();
  }, [post]); // Dependencia del efecto: post

  // Función para manejar la creación de un nuevo comentario
  const handleAgregarComentario = async () => {
    try {
      // Verifica si el campo de comentario está vacío
      if (!comentario) {
        alert("Por favor, ingresa un comentario.");
        return;
      }

      // Registra el token antes de realizar la solicitud
      console.log("Authorization Token before createCommentService:", token);

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
      // Imprime el token antes de realizar la solicitud
      console.log("Authorization Token before likePostService:", token);

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
      // Imprime el token antes de realizar la solicitud
      console.log("Authorization Token before save/unsave:", token);

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
      const updatedComments = comments.filter(
        (comment) => comment.commentId !== commentId
      );
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

      {/* Comentarios */}
      <div>
        {/* Botón para mostrar/ocultar los comentarios */}
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {/* Mostrar comentarios si showComments es true */}
        {showComments && (
          <ul>
            {/* Mapea la lista de comentarios y muestra cada uno */}
            {comments.map((comment) => (
              <li key={comment.commentId}>
                {/* Muestra el nombre del usuario que hizo el comentario */}
                <p>Comentado por: {comment.userName}</p>
                {/* Puedes agregar la lógica para mostrar el avatar del usuario aquí */}
                {/* Muestra el texto del comentario */}
                <p>{comment.text}</p>
                {/* Muestra la fecha de publicación del comentario */}
                <p>
                  Fecha de publicación:{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                {/* Agrega un botón para eliminar el comentario */}
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

      {/* Botones de like, guardado y comentario */}
      <div className="botones-post-complementos">
        {/* Botón para dar/quitar like */}
        {user && post.userId !== user.userId && (
          <button className="boton-icono-like" onClick={handleLikePost}>
            {isLiked ? (
              <img src="/corazon-relleno.png" alt="Corazón Relleno" />
            ) : (
              <img src="/corazon.png" alt="Corazón Vacío" />
            )}
          </button>
        )}

        {/* Mostrar el número total de likes */}
        <p className="likes-count">{numLikes}</p>

        {/* Botón para guardar/eliminar el post */}
        {user && post.userId !== user.userId && (
          <button className="botones-guardar" onClick={handleSavePost}>
            {isSaved ? (
              <>
                <img src="/guardar.png" alt="Eliminar Guardado" />
              </>
            ) : (
              <>
                <img src="/guardar-rell.png" alt="Guardar" />
              </>
            )}
          </button>
        )}

        {/* Botón para mostrar/ocultar el formulario de comentarios */}
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
        <h4>
          {totalComments === 1
            ? "1 Comentario"
            : `${totalComments} Comentarios`}
        </h4>
      </div>

      {/* Formulario para agregar comentarios */}
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

      {/* Botón para eliminar el post */}
      {user && post.userId === user.userId && (
        <button className="botones-eliminar" onClick={handleDeletePost}>
          Eliminar Post
        </button>
      )}
    </div>
  );
};

export default PostItem;
