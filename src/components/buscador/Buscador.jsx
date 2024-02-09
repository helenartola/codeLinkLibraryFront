import "./Buscador.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchService } from "../../services";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

// Define el componente Buscador
const Buscador = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda
  const navigate = useNavigate(); // Utiliza useNavigate para navegación programática
  const searchRef = useRef(null); // Referencia al elemento de búsqueda

  // Función de búsqueda asincrónica utilizando useCallback
  const search = useCallback(async () => {
    if (searchTerm.trim() !== "") {
      // Ejecutar la función de búsqueda cuando el término de búsqueda no está vacío
      try {
        const data = await searchService(searchTerm); // Llamar al servicio de búsqueda y obtener los resultados
        setSearchResults(data); // Actualizar el estado con los resultados de la búsqueda
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    } else {
      setSearchResults([]); // Si el término de búsqueda está vacío, limpiar los resultados
    }
  }, [searchTerm]); // Dependencia incluida en el useCallback

  // Efecto que se ejecuta cuando el término de búsqueda cambia
  useEffect(() => {
    // Función interna para llamar a la función de búsqueda
    const performSearch = async () => {
      await search();
    };

    performSearch(); // Llamar a la función de búsqueda
  }, [search, searchTerm]); // Dependencia del efecto: se ejecutará cada vez que searchTerm cambie

  // Limpiar la búsqueda
  const clearSearchTerm = () => {
    setSearchTerm("");
    setSearchResults([]); // Limpiar los resultados cuando se borra el término de búsqueda
  };

  // Función para realizar la búsqueda cuando se hace clic en el botón (lupa)
  const handleSearchClick = () => {
    search(); // Llama a la función de búsqueda
    redirectToSearchPage();
  };

  // Función para redirigir a la página de búsqueda
  const redirectToSearchPage = () => {
    const searchPath = `/search?q=${searchTerm}`;
    console.log("Redirigiendo a:", searchPath);
    navigate(searchPath);
  };

  // Manejar el envío del formulario (pulsar Enter)
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    search();
    redirectToSearchPage();
  };

  // Manejar clics fuera del área de búsqueda para limpiar el término de búsqueda
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      clearSearchTerm();
    }
  };

  // Agregar evento de clic al documento cuando el componente se monta
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Renderiza el componente Buscador
  return (
    <div ref={searchRef} className="barra-buscador">
      {/* Formulario para manejar el envío (pulsar Enter) */}
      <form onSubmit={handleFormSubmit}>
        {/* Input para que el usuario escriba el término de búsqueda */}
        <div className="search-bar">
          <input
            className="input-buscador"
            type="text"
            placeholder="Search"
            alt="Search Icon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botón con el icono de la lupa */}
          <button
            className={`boton-lupa ${isDarkMode ? "dark-mode" : ""}`}
            type="submit" // Utiliza type="submit" en lugar de onClick
            onClick={handleSearchClick}
          >
            <img
              src={isDarkMode ? "lupa-blanca.png" : "lupa.png"}
              alt="Search Icon"
            />
          </button>
        </div>
      </form>

      {/* Mostrar los resultados solo si hay resultados */}
      {searchResults.length > 0 && (
        <div className="container-lista-enlaces-encontrados">
          {/* Lista de resultados de la búsqueda */}
          <ul className="lista-enlaces-buscador">
            {/* Mapear los resultados y generar enlaces */}
            {searchResults.map((result) => (
              <li className="busqueda" key={result.postId}>
                {/* Enlace a la página del post utilizando Link */}
                <Link to={`/post/${result.postId}`} onClick={clearSearchTerm}>
                  {/* Mostrar la información del post */}
                  <p className="titulo-resultados-busqueda">{result.title}</p>
                  <p className="descripcion-resultados-busqueda">
                    {result.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Buscador;
