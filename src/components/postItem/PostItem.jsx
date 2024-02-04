import { useState, useEffect } from "react";
import { getCommentsService, createCommentService, likePostService } from "../../services/index";
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
      console.log('Authorization Token before createCommentService:', token);

      // Crea un nuevo comentario utilizando el servicio
      const newCommentId = await createCommentService(
        {
          postId: post.postId,
          comentario,
        },
        token
      );

      // Actualiza la lista de comentarios con el nuevo comentario
      setComments([...comments, {commentId : newCommentId, text: comentario}]);
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
      console.log('Authorization Token before likePostService:', token);

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

  return (
    <div className="post-item-container">
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      <div>
        <h4>
          {totalComments === 1
            ? "1 Comentario"
            : `${totalComments} Comentarios`}
        </h4>

        {/* Botón para mostrar/ocultar los comentarios */}
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {/* Mostrar comentarios si showComments es true */}
        {showComments && (
          <ul>
            {/* Mapea la lista de comentarios y muestra cada uno */}
            {comments.map((comment) => (
              <li key={comment.commentId}>{comment.text}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón para dar/quitar like */}
         {user && post.userId != user.userId && (
        <button onClick={handleLikePost}>
          {isLiked ? "Quitar Like" : "Dar Like"}
        </button>
      )}


      {/* Mostrar el número total de likes */}
      <p>Total de Likes: {numLikes}</p>

      {/* Botón para mostrar/ocultar el formulario de comentarios */}
      <button
        className="boton-comentar"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        Comentar
      </button>

      {showCommentForm && (
        <div>
          {/* Formulario para agregar comentarios */}
          <label>
            <input
              className="comment-input" 
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </label>
          <button
            className="boton-comentar"
            onClick={handleAgregarComentario}
          >
            Agregar Comentario
          </button>
        </div>
      )}
    </div>
  );
};

export default PostItem;