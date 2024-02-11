import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import PostItem from "../../components/postItem/PostItem";
import { useTheme } from "../../context/ThemeContext";
import "./SavedPage.css";
import "../../components/postItem/PostItem.css";

function SavedPage() {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del contexto de tema
  const [user] = useUser(); // Obtenemos el usuario del contexto de usuario
  const [savedPosts, setSavedPosts] = useState([]); // Estado para almacenar los posts guardados
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        // Obtener el token de autenticación
        const token = user ? user.token : null;

        // Realizar una solicitud GET a la API para obtener los posts guardados
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/saved`, {
          method: "GET",
          headers: {
            // Incluir el token de autenticación en el encabezado Authorization
            Authorization: token,
          },
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          // Obtener los datos de la respuesta
          const data = await response.json();
          // Actualizar el estado con los posts guardados obtenidos de la respuesta
          setSavedPosts(data.data);
        } else {
          // Manejar errores si la solicitud no fue exitosa
          const errorText = await response.text();
          setError(
            `Error al obtener los posts guardados: ${response.status} - ${errorText}`
          );
          console.error(
            "Error al obtener los posts guardados:",
            response.statusText
          );
        }
      } catch (error) {
        setError(`Error al obtener los posts guardados: ${error.message}`);
        console.error("Error al obtener los posts guardados:", error.message);
      } finally {
        setLoading(false); // Cambiar el estado de carga a falso cuando se completa la solicitud
      }
    };

    // Llamar a la función para obtener los posts guardados cuando el componente se monta
    fetchSavedPosts();
  }, [user]); // Ejecutar el efecto cuando cambie el usuario

  // Si todavía se están cargando los datos, muestra un indicador de carga
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Renderizar el componente SavedPage
  return (
    <div className={`caja-posts-guardados ${isDarkMode ? "dark" : "light"}`}>
      <h1 className="titulo-post-guardados">Tus Posts Guardados</h1>
      {/* Imprimir error si hay alguno */}
      {error && <p>Error: {error}</p>}
      {/* Verificar si no hay posts guardados */}
      {savedPosts && savedPosts.length === 0 && !error && (
        <p className="no-hay-posts-guardados">No hay posts guardados</p>
      )}
      {/* Mapear sobre la lista de posts guardados y renderizar cada uno */}
      <div className="posts-container">
        {savedPosts &&
          savedPosts.map((post) => <PostItem key={post.postId} post={post} />)}
      </div>
    </div>
  );
}

export default SavedPage;
