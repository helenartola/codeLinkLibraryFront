import { useState, useEffect } from "react";
import { getAllPostsService } from "../services";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //esta función no puede ser asíncrona
  useEffect(() => {
    const loadPosts = async () => {
      try {
        //indicamos que estan cargando los datos
        setLoading(true);
        //hacemos la petición para obtener todos los Posts
        const data = await getAllPostsService();
        //si no hay un error, devuelve los datos, la lista de posts
        setPosts(data);
      } catch (error) {
        //si hay un error, muestra el mensaje de error que tenemos en la base de datos
        setError(error.message);
      } finally {
        //al final, tanto si hay error como si no, acaba de cargar
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return { posts, loading, error };
};

export default usePosts;
