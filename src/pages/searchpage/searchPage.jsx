/*import { useLocation } from "react-router-dom";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";
import { useTheme } from "../../context/ThemeContext";

// Define el componente SearchPage
const SearchPage = () => {
  // Obtiene la ubicación actual de la aplicación
  const location = useLocation();
  // Obtiene el tema actual
  const { isDarkMode } = useTheme();
  // Extrae el término de búsqueda de la URL
  const searchTerm = new URLSearchParams(location.search).get("q");

  // Manejo básico de error si el término de búsqueda no está presente
  if (!searchTerm) {
    console.error("Término de búsqueda no encontrado en la URL");
    // Puedes redirigir al usuario o manejar la situación de alguna otra manera
    return null;
  }

  // Renderiza la sección de resultados de búsqueda
  return (
    <section className={`search-results ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-content">
        <h2>Search Results for "{searchTerm}"</h2>
        <ListaDePosts searchTerm={searchTerm} />
      </div>
    </section>
  );
};*/

// Exporta el componente SearchPage
//export default SearchPage;
