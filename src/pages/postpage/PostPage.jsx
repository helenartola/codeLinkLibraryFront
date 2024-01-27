import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdService} from "../../services"; 

const PostPage = () => {
  // Obtener el valor del parámetro postId de la URL
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Llamar al servicio para obtener los detalles del post
        const postDetails = await getPostByIdService(postId);
        setPost(postDetails);
      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      }
    };

    // Llamar a la función para cargar los detalles del post
    fetchPostDetails();
  }, [postId]);

  if (!post) {
    // Mostrar un indicador de carga mientras se obtienen los detalles del post
    return <p>Cargando...</p>;
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {/* Asumiendo que el contenido del post está en la propiedad 'content' */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>
  );
};

export default PostPage;