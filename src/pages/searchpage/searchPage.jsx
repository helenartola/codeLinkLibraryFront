import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchService } from "../../services";
import { useTheme } from "../hooks/useTheme";
import PostItem from "../../components/postItem/PostItem.jsx"; 

const SearchPage = () => {
  const { isDarkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm) {
          const results = await searchService(searchTerm);
          setSearchResults(results);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className={`pagina-resultados ${isDarkMode ? "dark" : "light"}`}>
      <div className="caja-resultados-busqueda">
        <h2 className="titulo-busqueda-resultados">
          Search Results for: {searchTerm}
        </h2>
      </div>
      {searchResults.length > 0 ? (
        <ul className="lista-resultados-busqueda">
          {searchResults.map((result) => (
            <li className="lista-posts-resultados-busqueda" key={result.postId}>
              {/* Renderiza el componente PostItem con los detalles del post */}
              <PostItem post={result} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-resultados">No hemos encontrado resultados.</p>
      )}
    </div>
  );
};

export default SearchPage;
