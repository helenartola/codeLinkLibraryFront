import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdService } from "../../services";
import "./PostPage.css";
import PostItem from "../../components/postItem/PostItem.jsx"; 
import { useUser } from "../../context/UserContext";
import { useTheme } from "../hooks/useTheme";

const PostPage = () => {
  const { isDarkMode } = useTheme();

  // Obtener el postId de los parámetros de la URL
  const { postId } = useParams();

  // Estado para almacenar los detalles del post
  const [post, setPost] = useState(null);

  // Obtener información del usuario del contexto
  const [user] = useUser();

  // Efecto secundario para cargar los detalles del post al montar el componente
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Llamar al servicio para obtener los detalles del post
        const postDetails = await getPostByIdService(postId, user ? user.userId : 0);
        console.log("Usuario:", user);

        // Actualizar el estado con los detalles del post
        setPost(postDetails);

      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      }
    };

    // Llamar a la función para cargar los detalles del post
    fetchPostDetails();
  }, [postId, user]);

  return (
    <section className={`post-page-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="post-content-container">
        {/* Verificar si el post existe antes de renderizar el componente PostItem */}
        {post && <PostItem post={post} user={user} showLink={true}/>}
          {console.log("Post:", post)}
      </div>
    </section>
  );
};

export default PostPage;
