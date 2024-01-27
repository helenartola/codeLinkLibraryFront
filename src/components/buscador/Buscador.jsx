import "./Buscador.css";
import { useState, useEffect } from "react";
import { searchService } from "../../services";

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

  // Efecto que se ejecuta cuando el término de búsqueda cambia
  useEffect(() => {
    const search = async () => {
      // Ejecutar la función de búsqueda cuando el término de búsqueda no está vacío
      if (searchTerm.trim() !== "") {
        
        const data = await searchService(searchTerm);
        // Actualizar el estado con los resultados de la búsqueda
        setSearchResults(data); // Ajusta según la estructura de la respuesta
      } else {
        // Si el término de búsqueda está vacío, limpiar los resultados
        setSearchResults([]);
      }
    }
    search();

  }, [searchTerm]);

  return (
    <div>
      {/* Input para que el usuario escriba el término de búsqueda */}
      <input
        type="text"
        placeholder="Search..."
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