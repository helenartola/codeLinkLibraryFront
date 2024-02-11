import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PostItem.css";
import { useUser } from "../../context/UserContext";
import {
  getCommentsService,
  createCommentService,
  likePostService,
  savePostService,
  unsavePostService,
  deletePostService,
  deleteCommentService,
  editCommentService,
  editPostService,
} from "../../services/index";

const PostItem = ({ post, posts, setPosts, showLink = false }) => {
  // Estados para el manejo de comentarios
  const [comentario, setComentario] = useState(""); // Estado para el texto del comentario
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
  const [showCommentForm, setShowCommentForm] = useState(false); // Estado para mostrar u ocultar el formulario de comentario
  const [showComments, setShowComments] = useState(false); // Estado para mostrar u ocultar los comentarios
  const [totalComments, setTotalComments] = useState(0); // Estado para almacenar el total de comentarios

  // Estados para el manejo de likes y guardado
  const [numLikes, setNumLikes] = useState(post.numLikes); // Estado para el número de likes
  const [isLiked, setIsLiked] = useState(post.isLiked); // Estado para indicar si el post ha sido gustado
  const [isSaved, setIsSaved] = useState(post.isSaved); // Estado para indicar si el post ha sido guardado

  // Estados para la edición de comentarios
  const [editingComment, setEditingComment] = useState(null); // Estado para el comentario en edición
  const [lastCommentEditTime, setLastCommentEditTime] = useState({}); // Estado para almacenar la hora de la última edición de cada comentario

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [user] = useUser(); // Extrae el usuario del contexto
  const token = user ? user.token : null; // Obtiene el token del usuario, si existe

  // Estados para la edición de un post
  const [editingPost, setEditingPost] = useState(false); // Estado para indicar si se está editando un post
  const [editedTitle, setEditedTitle] = useState(post.title); // Estado para el título editado del post
  const [editedDescription, setEditedDescription] = useState(post.description); // Estado para la descripción editada del post
  const [editedURL, setEditedURL] = useState(post.url); // Estado para la URL editada del post
  const [lastPostEditTime, setLastPostEditTime] = useState(
    post.lastEditTime || null
  ); // Estado para almacenar la fecha de la última edición del post

  // Efecto para obtener los comentarios del post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comentarios = await getCommentsService(post.postId); // Obtiene los comentarios del post
        setComments(comentarios); // Actualiza el estado con los comentarios obtenidos
        setTotalComments(comentarios.length); // Actualiza el total de comentarios
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
         setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    };

    fetchComments(); // Ejecuta la función para obtener los comentarios
  }, [post]); // Se ejecuta cuando cambia el post

  // Función para agregar un nuevo comentario
const handleAgregarComentario = async () => {
  try {
    if (!comentario) {
      setMessage("Por favor, ingresa un comentario.");
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
        userId: user.userId,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      },
    ]);

    setMessage("El comentario ha sido agregado con éxito.");

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    setErrorMessage(
      "Error al agregar comentario. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
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
    setErrorMessage(
      "Error al dar/quitar like. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  // Función para manejar el clic en el botón de eliminar post
const handleDeletePost = async () => {
  try {
    // Llama al servicio para eliminar el post
    await deletePostService(post.postId, token);

    // Filtra los posts para excluir el post eliminado
    setPosts(posts.filter((postItem) => postItem.postId !== post.postId));
    setMessage("El post ha sido eliminado con éxito.");

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al eliminar post:", error);
    setErrorMessage("Error al eliminar post. Por favor, inténtalo de nuevo.");

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  // Función para manejar el clic en el botón de guardar/eliminar post
const handleSavePost = async () => {
  try {
    // Verifica si el post pertenece al propio usuario
    if (user && post.userId === user.userId) {
      setErrorMessage("No puedes guardar tus propios posts.");
      return;
    }

    // Llama al servicio para guardar o eliminar el post según su estado actual
    if (isSaved) {
      // Si está guardado, entonces llamamos al servicio para desguardar
      await unsavePostService(post.postId, token);
      // Actualiza el estado con el nuevo estado de guardado
      setIsSaved(false);
      setMessage("El post ha sido eliminado de tus guardados con éxito.");
    } else {
      // Si no está guardado, llamamos al servicio para guardar
      await savePostService(post.postId, token);
      // Actualiza el estado con el nuevo estado de guardado
      setIsSaved(true);
      setMessage("El post ha sido guardado con éxito.");
    }

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al guardar/eliminar post:", error);
    setErrorMessage(
      "Error al guardar/eliminar post. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
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
    setMessage("El comentario ha sido eliminado con éxito.");

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    setErrorMessage(
      "Error al eliminar comentario. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  // Función para manejar el clic en el botón de editar comentario
  const handleEditComment = (commentId) => {
    // Encuentra el comentario a editar
    const commentToEdit = comments.find(
      (comment) => comment.commentId === commentId
    );
    // Establece el comentario en edición
    setEditingComment(commentToEdit);
    setComentario(commentToEdit.text);
  };

  // Función para guardar la edición del comentario
const handleSaveEdit = async () => {
  try {
    // Copia el comentario editado con el nuevo texto
    const editedComment = { ...editingComment, text: comentario };
    // Llama al servicio para editar el comentario
    await editCommentService(editingComment.commentId, editedComment, token);
    // Actualiza la lista de comentarios con el comentario editado
    const updatedComments = comments.map((comment) => {
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
    setLastCommentEditTime({
      ...lastCommentEditTime,
      [editingComment.commentId]: new Date().toLocaleString(),
    });
    setMessage("El comentario ha sido editado con éxito.");

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al editar comentario:", error);
    setErrorMessage(
      "Error al editar comentario. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  // Función para manejar la edición del post
const handleEditPost = () => {
  setEditingPost(true);
};

// Función para guardar la edición del post
const handleSaveEditPost = async () => {
  try {
    const editedPostData = {
      title: editedTitle,
      description: editedDescription,
      url: editedURL,
    };

    await editPostService(post.postId, editedPostData, token);

    // Actualiza el estado del post con los nuevos datos
    post.title = editedTitle;
    post.description = editedDescription;
    post.url = editedURL;

    // Guarda la fecha de la última edición
    setLastPostEditTime(new Date().toLocaleString());

    // Finaliza la edición del post
    setEditingPost(false);

    setMessage("El post ha sido editado con éxito.");

    // Limpiar el mensaje después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error al editar el post:", error);
    setErrorMessage(
      "Error al editar el post. Por favor, inténtalo de nuevo."
    );

    // Limpiar el mensaje de error después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  return (
    <div className="post-item-container">
      <div className="mensajes-de-error-caja">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="mensajes-de-exito-caja">
        {message && <p className="success-message">{message}</p>}
      </div>
      {/* Contenido de los datos de publicación */}
      <div className="datos-publicacion">
        <p className="post-publicado-por">
          <span className="nombre-usuario">{post.userName} · </span>
        </p>
        <p className="fecha">
          Publicado el {new Date(post.createdAt).toLocaleString()}
        </p>
        {lastPostEditTime && (
          <p className="fecha">· Última edición: {lastPostEditTime}</p>
        )}
      </div>

      {/* Título y descripción del post */}
      {editingPost ? (
        <div className="caja-editar-post">
          {/* Formulario para editar el post */}
          <h3 className="edita-tu-post-titulo">Edita tu post:</h3>
          <input
            className="input-edita-tu-post"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            className="input-edita-tu-post"
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            className="input-edita-tu-post"
            type="text"
            value={editedURL}
            onChange={(e) => setEditedURL(e.target.value)}
          />
          {/* Botones para guardar o cancelar la edición del post */}
          <div className="botones-cancelar-guardar-edicion-post">
            <button
              className="boton-guardar-edicion"
              onClick={handleSaveEditPost}
            >
              <img
                className="icono-guardar-edicion-post"
                src="/save.png"
                alt="Guardar Post"
              />
            </button>
            <button
              className="boton-cancelar-edicion"
              onClick={() => setEditingPost(false)}
            >
              <img
                className="icono-cancelar-edicion-post"
                src="/cancelar.png"
                alt="Cancelar Edición"
              />
            </button>
          </div>
        </div>
      ) : (
        // Sección para mostrar el post
        <div className="post-content">
          <div className="post-info">
            {/* Título del post */}
            <h2 className="titulo-post-home">
              <Link className="link-url-post" to={`/post/${post.postId}`}>
                {post.title}
              </Link>
            </h2>
            <p className="descripcion-post-home">{post.description}</p>
            {/* Muestra el enlace si existe y showLink es true */}
            {showLink && post.url && (
              <a
                className="link-url-post estilo-unico"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.url}
              </a>
            )}
          </div>
          {/* Botón de editar post */}
          {user && post.userId === user.userId && (
            <div className="editar-post-container">
              <button
                className="boton-editar-post-postitem"
                onClick={handleEditPost}
              >
                <img
                  className="icono-editar-post"
                  src="/lapiz-editar.png"
                  alt="Editar post"
                />
              </button>
            </div>
          )}

          {user && post.userId === user.userId && (
            // Botón de eliminar post
            <div className="eliminar-post-container">
              <button
                className="boton-eliminar-post-postitem"
                onClick={handleDeletePost}
              >
                <img
                  className="icono-eliminar"
                  src="/basura-roja.png"
                  alt="Eliminar"
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* CAJA QUE INCLUYE TODOS LOS ICONOS DEBAJO DEL POST */}
      <div className="caja-iconitos-post">
        {/* CAJA QUE CONTIENE CORAZÓN, GUARDAR, COMENTARIO, NÚMERO DE COMENTARIO */}
        <div className="botones-post-complementos">
          {user && (
            // Botón de like
            <button
              className="boton-icono-like"
              onClick={handleLikePost}
              disabled={post.userId === user.userId}
            >
              {post.userId === user.userId ? (
                <img src="/corazon-gris.png" alt="Corazón Gris" />
              ) : isLiked ? (
                <img src="/corazon-relleno.png" alt="Corazón Relleno" />
              ) : (
                <img src="/corazon.png" alt="Corazón Vacío" />
              )}
            </button>
          )}
          <p className="likes-count">{numLikes}</p>
          {user && post.userId !== user.userId && (
            // Botón de guardar/eliminar post
            <button className="botones-guardar" onClick={handleSavePost}>
              {isSaved ? (
                <img src="/guardar-rell.png" alt="Eliminar Guardado" />
              ) : (
                <img src="/guardar.png" alt="Guardar" />
              )}
            </button>
          )}
          {user && (
            // Botón de comentario
            <button
              className="boton-comentar"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <img
                className="icono-comentario"
                src="/escribir-comentario.png"
                alt="Escribir comentario"
              />
            </button>
          )}
        </div>
        {showCommentForm && (
          // Formulario para agregar comentario
          <div className="caja-para-escribir-comentario">
            <label>
              <input
                className="comment-input"
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </label>
            <button
              className="boton-agregar-comentario"
              onClick={handleAgregarComentario}
            >
              Agregar Comentario
            </button>
          </div>
        )}
        {/* CAJA CON EL BOTÓN DE MOSTRAR/OCULTAR COMENTARIOS */}
        <div className="caja-comentarios-dentro-post">
          {/* Botón para mostrar/ocultar los comentarios */}
          <h4
            className="numero-comentarios"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? (
              totalComments === 1 ? (
                "1 Comentario "
              ) : (
                `${totalComments} Comentarios`
              )
            ) : showCommentForm ? (
              "Cancelar"
            ) : (
              <span className="mostrar-comentarios-texto">
                Mostrar comentarios
              </span>
            )}
            <img
              className="icono-flecha"
              src="/flecha.png"
              alt="Icono flecha"
            />
          </h4>

          {showComments && (
            // Lista de comentarios
            <ul
              className={`lista-comentarios-post ${
                showComments ? "mostrar" : ""
              }`}
            >
              {comments.map((comment) => (
                <li className="lista-comentarios" key={comment.commentId}>
                  <div className="comentario-contenedor">
                    {/* Muestra el nombre de usuario */}
                    <p className="nombre-usuario-comentario">
                      {comment.userName} <span className="dijo">dijo:</span>
                    </p>
                    {/* Muestra la fecha de creación del comentario */}
                    <p className="fecha-comentario">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {/* Muestra el texto del comentario */}
                    {editingComment &&
                    editingComment.commentId === comment.commentId ? (
                      <input
                        className="editar-comentario-input"
                        type="text"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                      />
                    ) : (
                      <p className="texto-comentario">{comment.text}</p>
                    )}
                  </div>

                  {/* Muestra la fecha de la última edición del comentario */}
                  {lastCommentEditTime[comment.commentId] && (
                    <p className="fecha-comentario">
                      Última edición: {lastCommentEditTime[comment.commentId]}
                    </p>
                  )}
                  {/* Botón para editar comentario */}
                  {user && user.userId === comment.userId && (
                    <button
                      className="boton-editar-comentario"
                      onClick={() => handleEditComment(comment.commentId)}
                    >
                      <img
                        className="icono-editar-comentario"
                        src="/edit.png"
                        alt="Editar comentario"
                      />
                    </button>
                  )}
                  {/* Botón para eliminar comentario */}
                  {user && user.userId === comment.userId && (
                    <button
                      className="boton-eliminar-comentario"
                      onClick={() => handleDeleteComment(comment.commentId)}
                    >
                      <img
                        className="icono-eliminar-comentario"
                        src="/basura-roja.png"
                        alt="Eliminar comentario"
                      />
                    </button>
                  )}
                  {/* Botón para guardar la edición del comentario */}
                  {editingComment &&
                  editingComment.commentId === comment.commentId ? (
                    <button
                      className="boton-guardar-edicion-comentario"
                      onClick={handleSaveEdit}
                    >
                      <img
                        className="icono-guardar-edicion-comentario"
                        src="/save.png"
                        alt="Guardar edición"
                      />
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
