import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

function SavedPost() {
  const [user] = useUser();
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        // Obtener el token de autenticación 
        const token = user ? user.token : null;

        // Realizar una solicitud GET a la API para obtener los posts guardados
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/saved`,
          {
            method: 'GET',
            headers: {
              // Incluir el token de autenticación en el encabezado Authorization
              "Authorization": token,
            },
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          // Obtener los datos de la respuesta
          const data = await response.json();
  // Imprimir los datos en la consola
  console.log("Data:", data.data);
       
          // Actualizar el estado con los posts guardados obtenidos de la respuesta
          setSavedPosts(data.data);
        } else {
          // Manejar errores si la solicitud no fue exitosa
          const errorText = await response.text();
          setError(`Error al obtener los posts guardados: ${response.status} - ${errorText}`);
          console.error('Error al obtener los posts guardados:', response.statusText);
        }
      } catch (error) {
        setError(`Error al obtener los posts guardados: ${error.message}`);
        console.error('Error al obtener los posts guardados:', error.message);
      } finally {
        setLoading(false);
      }
    };

    // Llamar a la función para obtener los posts guardados cuando el componente se monta
    fetchSavedPosts();
  }, []); // El segundo parámetro del useEffect es un array vacío para asegurarse de que solo se ejecute una vez

  // Si todavía se están cargando los datos, muestra un indicador de carga
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Posts Guardados</h1>
      {/* Imprimir error si hay alguno */}
      {error && <p>Error: {error}</p>}
      {/* Verifica si no hay posts guardados */}
      {savedPosts.length === 0 && !error && <p>No hay posts guardados</p>}
      {/* Mapear sobre la lista de posts guardados y renderizar cada uno */}
      {savedPosts.map((post) => (
        <div key={post.postId}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            Ver más
          </a>
        </div>
      ))}
    </div>
  );
}

export default SavedPost;
