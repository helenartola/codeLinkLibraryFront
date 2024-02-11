import { useState, useEffect } from "react"; 
import { useSearchParams } from "react-router-dom"; 
import { searchService } from "../../services"; 
import { useTheme } from "../../context/ThemeContext"; 
import PostItem from "../../components/postItem/PostItem.jsx"; 

// Componente de la página de resultados de búsqueda
const SearchPage = () => {
  const { isDarkMode } = useTheme(); // Obtenemos el estado del modo oscuro del contexto de tema
  const [searchParams] = useSearchParams(); // Obtenemos los parámetros de búsqueda de la URL
  const searchTerm = searchParams.get("q"); // Obtenemos el término de búsqueda de los parámetros de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda

  // Efecto secundario para realizar la búsqueda cuando cambia el término de búsqueda
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Verificar si hay un término de búsqueda
        if (searchTerm) {
          // Llamar al servicio para realizar la búsqueda
          const results = await searchService(searchTerm);
          // Actualizar el estado con los resultados de búsqueda
          setSearchResults(results);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults(); // Llamar a la función para realizar la búsqueda
  }, [searchTerm]); // Ejecutar el efecto cuando cambie el término de búsqueda

  // Renderizar el componente SearchPage
  return (
    <div className={`pagina-resultados ${isDarkMode ? "dark" : "light"}`}>
      <div className="caja-resultados-busqueda">
        {/* Mostrar el término de búsqueda */}
        <h2 className="titulo-busqueda-resultados">
          Search Results for: {searchTerm}
        </h2>
      </div>
      {/* Verificar si hay resultados de búsqueda */}
      {searchResults.length > 0 ? (
        // Renderizar la lista de resultados de búsqueda si hay resultados
        <ul className="lista-resultados-busqueda">
          {searchResults.map((result) => (
            <li className="lista-posts-resultados-busqueda" key={result.postId}>
              {/* Renderizar el componente PostItem con los detalles del post */}
              <PostItem post={result} />
            </li>
          ))}
        </ul>
      ) : (
        // Mostrar un mensaje si no hay resultados de búsqueda
        <p className="no-resultados">No hemos encontrado resultados.</p>
      )}
    </div>
  );
};

export default SearchPage; 

