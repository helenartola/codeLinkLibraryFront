

import { useEffect, useState } from 'react';
import { getSavedPosts } from '../api'; // Reemplaza 'getSavedPosts' con la función real para obtener posts guardados

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    // Llama a la función para obtener posts guardados al cargar la página
    const fetchSavedPosts = async () => {
      try {
        const response = await getSavedPosts(); // Reemplaza con la función real
        setSavedPosts(response.data); // Asume que la respuesta contiene la lista de posts guardados
      } catch (error) {
        console.error('Error fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <div>
      <h2>Your Saved Posts</h2>
      <ul>
        {savedPosts.map(post => (
          <li key={post.id}>
            <a href={`/post/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedPostsPage;