/*import "./SearchPage.css";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";
import { useTheme } from "../../context/ThemeContext";
/*import { useLocation } from "react-router-dom";


const SearchPage = () => {
  const { isDarkMode } = useTheme();                      // Obtiene el estado del tema del contexto
  const { posts, loading, error, refresh } = usePosts();  // Obtiene posts, estado de carga y errores, mediante el hook usePosts
  if (loading) return <p>Cargando posts...</p>;           // Muestra mensaje de carga temporal
  if (error) return <p>{error}</p>;                       // Manejo del mensaje de error


  // Obtiene la ubicación actual de la aplicación
  const location = useLocation();
 
  // Extrae el término de búsqueda de la URL
  const searchTerm = new URLSearchParams(location.search).get("q");

  // Manejo básico de error si el término de búsqueda no está presente
  if (!searchTerm) {
    console.error("Término de búsqueda no encontrado en la URL");
    // Puedes redirigir al usuario o manejar la situación de alguna otra manera
    return null;
  }

  // Renderiza la sección búsqueda
  return (
    <section className={`search-results ${isDarkMode ? "dark" : "light"}`}>
      <div className="search-content">
        <h2>Search Results for "{searchTerm}"</h2>
        <ListaDePosts searchTerm={searchTerm} />
      </div>
    </section>
  );
};*/

// Exporta el componente SearchPage
//export default SearchPage;
