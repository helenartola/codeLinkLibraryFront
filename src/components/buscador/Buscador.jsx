import "./Buscador.css";
import { useState, useEffect, useCallback } from "react";
import { searchService } from "../../services";
import { Link } from "react-router-dom";

// Define el componente Buscador
const Buscador = () => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Función de búsqueda asincrónica utilizando useCallback
  const search = useCallback(async () => {
    // Ejecutar la función de búsqueda cuando el término de búsqueda no está vacío
    if (searchTerm.trim() !== "") {
      // Llamar al servicio de búsqueda y obtener los resultados
      const data = await searchService(searchTerm);

      // Actualizar el estado con los resultados de la búsqueda
      setSearchResults(data);
    } else {
      // Si el término de búsqueda está vacío, limpiar los resultados
      setSearchResults([]);
    }
  }, [searchTerm]); // Dependencia incluida en el useCallback

  // Efecto que se ejecuta cuando el término de búsqueda cambia
  useEffect(() => {
    // Función interna para llamar a la función de búsqueda
    const performSearch = async () => {
      await search();
    };

    // Llamar a la función de búsqueda
    performSearch();

    // Dependencia del efecto: se ejecutará cada vez que searchTerm cambie
  }, [search, searchTerm]);

  // Limpiar la búsqueda
  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  // Función para realizar la búsqueda cuando se hace clic en el botón (lupa)
  const handleSearchClick = () => {
    // Llama a la función de búsqueda
    search();
  };

  // Renderiza el componente Buscador
  return (
    <div className="buscador-container">
      {/* Input para que el usuario escriba el término de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Botón con el icono de la lupa */}
        <button className="search-button" onClick={handleSearchClick}>
          <img src="lupa-gris.png" alt="Search Icon" />
        </button>
      </div>
      
      <div className="container-buscador">
        {/* Lista de resultados de la búsqueda */}
        <ul className="lista-enlaces-buscador">
          {/* Mapear los resultados y generar enlaces */}
          {searchResults.map((result) => (
            <li key={result.postId}>
              {/* Enlace a la página del post utilizando Link */}
              <Link to={`/post/${result.postId}`} onClick={clearSearchTerm}>
                {/* Mostrar la información del post */}
                <p>{result.title}</p>
                <p>{result.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Buscador;



