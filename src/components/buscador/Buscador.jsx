import "./Buscador.css";
import { useState, useEffect } from "react";

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

  // Función que realiza la búsqueda en el backend
  const handleSearch = async (term) => {
    try {
      // Codificar el término de búsqueda antes de incluirlo en la URL
      const encodedTerm = encodeURIComponent(term);

      // Realizar la solicitud GET al backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/search?filter=${encodedTerm}`, {
        method: "GET", // Método de la solicitud
      });

      // Verificar si la respuesta es exitosa 
      if (!response.ok) {
        throw new Error(`Error al buscar. Código ${response.status}`);
      }

      // Convertir la respuesta a formato JSON
      const data = await response.json();

      // Actualizar el estado con los resultados de la búsqueda
      setSearchResults(data.data); // Ajusta según la estructura de la respuesta
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  // Efecto que se ejecuta cuando el término de búsqueda cambia
  useEffect(() => {
    // Ejecutar la función de búsqueda cuando el término de búsqueda no está vacío
    if (searchTerm.trim() !== "") {
      handleSearch(searchTerm);
    } else {
      // Si el término de búsqueda está vacío, limpiar los resultados
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      {/* Input para que el usuario escriba el término de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de resultados de la búsqueda */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.postId}>
            <p>{result.title}</p>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buscador;