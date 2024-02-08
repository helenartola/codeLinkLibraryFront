import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdService, getCommentsService, deleteCommentService } from "../../services";
import "./PostPage.css";
import PostItem from "../../components/postItem/PostItem.jsx"; 
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext"; 
import { Comments } from "../../components/comments/Comments.jsx";

const PostPage = () => {
  const { isDarkMode } = useTheme();

  // Obtener el postId de los parámetros de la URL
  const { postId } = useParams();

  // Estado para almacenar los detalles del post
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  // Obtener información del usuario del contexto
  const [user] = useUser();

  // Efecto secundario para cargar los detalles del post al montar el componente
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Llamar al servicio para obtener los detalles del post
        const postDetails = await getPostByIdService(postId);

        // Actualizar el estado con los detalles del post
        setPost(postDetails);

        // Obtener comentarios del post
        const postComments = await getCommentsService(postId);
        setComments(postComments);

      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      }
    };

    // Llamar a la función para cargar los detalles del post
    fetchPostDetails();
  }, [postId]);

  
  const handleDeleteComment = async (commentId) => {
    // Lógica para eliminar el comentario del estado local
    setComments((prevComments) => prevComments.filter((comment) => comment.commentId !== commentId));

    try {
      // Llama al servicio para eliminar el comentario
      await deleteCommentService(postId, commentId, user.token);
      console.log("Comentario eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  return (
    <section className={`post-page-container ${isDarkMode ? "dark" : "light"}`}>
      {/* Verificar si el post existe antes de renderizar el componente PostItem */}
      {post && <PostItem post={post} user={user} />}

      {/* Renderizar el componente Comments con la lista de comentarios y la función onDeleteComment */}
      <Comments comments={comments} onDeleteComment={handleDeleteComment} />
    </section>
  );
};

export default PostPage;
