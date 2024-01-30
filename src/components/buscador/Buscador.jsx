import "./Buscador.css";
import { useState, useEffect } from "react";
import { searchService } from "../../services";
import { Link } from "react-router-dom";

const Buscador = () => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Efecto que se ejecuta cuando el término de búsqueda cambia
  useEffect(() => {
    // Función de búsqueda asincrónica
    const search = async () => {
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
    };

    // Llamar a la función de búsqueda
    search();

    // Dependencia del efecto: se ejecutará cada vez que searchTerm cambie
  }, [searchTerm]);

  // Limpiar la búsqueda
  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <div>
      {/* Input para que el usuario escriba el término de búsqueda */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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

