import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import "./PostItem.css";

const PostItem = ({ post, posts, setPosts, showLink = false }) => {
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
  const [editingComment, setEditingComment] = useState(null); // Comentario en edición
  const [lastCommentEditTime, setLastCommentEditTime] = useState({}); // Almacenar la hora de la última edición de cada comentario

  const [user] = useUser();
  const token = user ? user.token : null;

  // Estados para la edición de un post
  const [editingPost, setEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedURL, setEditedURL] = useState(post.url);
  const [lastPostEditTime, setLastPostEditTime] = useState(
    post.lastEditTime || null
  ); // Almacena la fecha de la última edición del post

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
          userId: user.userId,
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

      setPosts(posts.filter((postItem) => postItem.postId !== post.postId));
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
      alert("El comentario ha sido editado con éxito.");
    } catch (error) {
      console.error("Error al editar comentario:", error);
      alert("Error al editar comentario. Por favor, inténtalo de nuevo.");
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
    } catch (error) {
      console.error("Error al editar el post:", error);
      alert("Error al editar el post. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="post-item-container">
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
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="text"
            value={editedURL}
            onChange={(e) => setEditedURL(e.target.value)}
          />
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
            Cancelar
          </button>
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
            {/* Muestra el enlace si existe y showLink es true */}
            {showLink && post.url && (
              <a
                className="link-url-post"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.url}
              </a>
            )}
            <p className="descripcion-post-home">{post.description}</p>
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
                  src="/edit.png"
                  alt="Editar post"
                />
              </button>
            </div>
          )}

          {user && post.userId === user.userId && (
            <div className="eliminar-post-container">
              <button
                className="boton-eliminar-post-postitem"
                onClick={handleDeletePost}
              >
                <img
                  className="icono-eliminar"
                  src="/eliminar.png"
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
          {user && (
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
          )}
          <h4 className="numero-comentarios">
            {totalComments === 1
              ? "1 Comentario"
              : `${totalComments} Comentarios`}
          </h4>
        </div>

        {showCommentForm && (
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
              className="boton-comentar"
              onClick={handleAgregarComentario}
            >
              Agregar Comentario
            </button>
          </div>
        )}

        {/* CAJA CON EL BOTÓN DE MOSTRAR/OCULTAR COMENTARIOS */}
        <div className="caja-comentarios-dentro-post">
          {/* Botón para mostrar/ocultar los comentarios */}
          <button
            className="boton-mostrar-ocultar-comentarios"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
          </button>
          {showComments && (
            <ul className="lista-comentarios-post">
              {comments.map((comment) => (
                <li key={comment.commentId}>
                  <div className="caja-datos-edicion-comentario">
                    <p className="comentario-de">De: {comment.userName}</p>
                    <p className="comentario-publicado-por">
                      Publicado el{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="texto-comentario-editado">{comment.text}</p>
                  {/* Mostrar hora de la última edición y "editado" si corresponde */}
                  {comment.commentId === editingComment?.commentId ? (
                    <div className="caja-editar-comentario">
                      <input
                        type="text"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                      />
                      <button
                        className="guardar-edicion"
                        onClick={handleSaveEdit}
                      >
                        <img
                          className="icono-guardar-edicion-post"
                          src="/save.png"
                          alt="Guardar Post"
                        />
                        Guardar
                      </button>
                      <button
                        className="cerrar-edicion"
                        onClick={() => setEditingComment(null)}
                      >
                        Cerrar Edición
                      </button>
                    </div>
                  ) : (
                    <div className="caja-editar-post">
                      {lastCommentEditTime[comment.commentId] && (
                        <p className="post-editado">
                          Editado el {lastCommentEditTime[comment.commentId]}
                        </p>
                      )}
                      {user && comment.userId === user.userId && (
                        <button
                          className="boton-crear-post"
                          onClick={() => handleEditComment(comment.commentId)}
                        >
                          <img
                            className="icono-nuevo-post"
                            src="/edit.png"
                            alt="Crear Nuevo Post"
                          />
                        </button>
                      )}
                    </div>
                  )}
                  {user && comment.userId === user.userId && (
                    <button
                      className="boton-eliminar-comentario"
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
      </div>
    </div>
  );
};

export default PostItem;
