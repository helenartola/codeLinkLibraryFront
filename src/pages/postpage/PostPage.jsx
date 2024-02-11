import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom"; 
import { getPostByIdService } from "../../services"; 
import "./PostPage.css"; 
import PostItem from "../../components/postItem/PostItem.jsx"; 
import { useUser } from "../../context/UserContext"; 
import { useTheme } from "../../context/ThemeContext"; 

// Componente de la página del post
const PostPage = () => {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del contexto de tema

  // Obtenemos el postId de los parámetros de la URL
  const { postId } = useParams();

  // Estado para almacenar los detalles del post
  const [post, setPost] = useState(null);

  // Obtenemos información del usuario del contexto
  const [user] = useUser();

  // Efecto secundario para cargar los detalles del post al montar el componente
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Llamamos al servicio para obtener los detalles del post
        const postDetails = await getPostByIdService(postId, user ? user.userId : 0);

        // Actualizamos el estado con los detalles del post
        setPost(postDetails);
      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      }
    };

    // Llamamos a la función para cargar los detalles del post
    fetchPostDetails();
  }, [postId, user]); // Ejecutamos el efecto cuando cambie postId o user

  return (
    // Contenedor principal de la página del post con clase condicional para el modo oscuro
    <section className={`post-page-container ${isDarkMode ? "dark" : "light"}`}>
      {/* Contenedor del contenido del post */}
      <div className="post-content-container">
        {/* Verificamos si el post existe antes de renderizar el componente PostItem */}
        {post && <PostItem post={post} user={user} showLink={true}/>}
      </div>
    </section>
  );
};

export default PostPage;
