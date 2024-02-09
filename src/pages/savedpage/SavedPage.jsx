// SavedPage.jsx
import { useEffect, useState } from 'react';
//import SavedPosts from '../../components/savedpost/SavedPosts';

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await fetch("/posts/saved");
        if (!response.ok) {
          throw new Error("Error al obtener los posts guardados");
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setSavedPosts(data.data);
        } else {
          throw new Error('La respuesta no es de tipo JSON');
        }
      } catch (error) {
        console.error("Error al obtener los posts guardados:", error);
        setError(error.message);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div>
      <h2>Tus Posts Guardados</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : savedPosts.length === 0 ? (
        <p>No tienes posts guardados por el momento.</p>
      ) : (
        <ul>
          {savedPosts.map((post) => (
            <li key={post.postId}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedPage;
