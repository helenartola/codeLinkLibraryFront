import { useState, useEffect } from "react";
import {
  getCommentsService,
  createCommentService,
  likePostService,
  savePostService,
  unsavePostService,
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
  //const [showComments, setShowComments] = useState(false);
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
      setComments([...comments, { commentId: newCommentId, text: comentario }]);
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

  return (
    <div className="post-item-container">
      {/* Título y descripción del post */}
      <h2 className="titulo-post-home">{post.title}</h2>
      <p className="descripcion-post-home">{post.description}</p>

      {/* Comentarios */}
      <div>
        {/* Botón para mostrar/ocultar los comentarios */}
        {/*  <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {showComments && (
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId}>{comment.text}</li>
            ))}
          </ul>
        )} */}
      </div>

      {/* Botones de like, guardado y comentario */}
      <div className="botones-post-complementos">
        {/* Botón para dar/quitar like */}
        {user && post.userId !== user.userId && (
          <button className="boton-icono-like" onClick={handleLikePost}>
            {isLiked ? (
              <img src="/corazon-relleno-verde.png" alt="Corazón Relleno" />
            ) : (
              <img src="/corazon-verde.png" alt="Corazón Vacío" />
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
                <img src="/guardar-relleno.png" alt="Guardar" />
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
            src="/comentario-verde.png"
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
    </div>
  );
};

export default PostItem;
