import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdService } from "../../services";
import './PostPage.css';  // Importa el archivo de estilos

// Componente principal
const PostPage = () => {
  // Obtener el valor del parámetro postId de la URL
  const { postId } = useParams();
  // Estado para almacenar los detalles del post
  const [post, setPost] = useState(null);

  // Efecto secundario para cargar los detalles del post al montar el componente
  useEffect(() => {
    // Función asincrónica para obtener detalles del post
    const fetchPostDetails = async () => {
      try {
        // Llamar al servicio para obtener los detalles del post
        const postDetails = await getPostByIdService(postId);
        // Actualizar el estado con los detalles del post
        setPost(postDetails);
      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      }
    };

    // Llamar a la función para cargar los detalles del post
    fetchPostDetails();
  }, [postId]);

  // Renderizar un indicador de carga si los detalles del post aún se están cargando
  if (!post) {
    return <p>Cargando...</p>;
  }

  // Renderizar la sección principal con los detalles del post
  return (
    <section className="post-page-container">
      {/* Título del post */}
      <h1>{post.title}</h1>
      {/* Descripción del post */}
      <p>{post.description}</p>
      {/* Contenido del post (asumiendo que está en la propiedad 'content') */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>
  );
};

// Exportar el componente
export default PostPage;
