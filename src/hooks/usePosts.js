import { useState, useEffect } from "react";
import { getAllPostsService } from "../services";
import { useUser } from "../context/UserContext";

const usePosts = () => {
  // Obtiene el usuario actual del contexto
  const [user] = useUser();
  // Estado para almacenar la lista de posts
  const [posts, setPosts] = useState([]);
  // Estados para indicar si se está cargando y si hay un error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para forzar la actualización de la lista de posts
  const refresh = async () => {
    try {
      // Indica que se están cargando los datos
      setLoading(true);
      // Hace la petición para obtener todos los posts
      const data = await getAllPostsService(user ? user.userId : 0);
      // Actualiza la lista de posts
      setPosts(data);
    } catch (error) {
      // Si hay un error, muestra el mensaje de error
      setError(error.message);
    } finally {
      // Al final, tanto si hay error como si no, termina de cargar
      setLoading(false);
    }
  };

  // Efecto secundario que se ejecuta al montar el componente o cuando cambia el usuario
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Indica que se están cargando los datos
        setLoading(true);
        // Hace la petición para obtener todos los posts
        const data = await getAllPostsService(user ? user.userId : 0);
        // Si no hay un error, actualiza la lista de posts
        setPosts(data);
      } catch (error) {
        // Si hay un error, muestra el mensaje de error
        setError(error.message);
      } finally {
        // Al final, tanto si hay error como si no, termina de cargar
        setLoading(false);
      }
    };
    // Llama a la función para cargar los posts al montar el componente o cuando cambia el usuario
    loadPosts();
  }, [user]);

  // Devuelve los datos y la función de actualización
  return { posts, loading, error, refresh };
};

export default usePosts;