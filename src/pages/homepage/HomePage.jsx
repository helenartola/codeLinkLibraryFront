import { useState, useEffect } from "react";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";
import NewPost from "../../components/newpost/NewPost";
import Pagination from "../../components/pagination/Pagination"; 
import "./HomePage.css";
import { useTheme } from "../../context/ThemeContext";
import { fetchTopLikedPosts } from "../../services";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Obtiene el estado del tema
  const { isDarkMode } = useTheme();

  // Obtiene la lista de posts, estado de carga, error y función de actualización
  const { posts, setPosts, loading, error, refresh } = usePosts();

  // Estado para controlar la apertura del formulario de nuevo post
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Estado para almacenar los posts más votados
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  // Estado para controlar la página actual de la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Número máximo de resultados por página
  const resultsPerPage = 5;

  // Calcula el índice inicial y final de los posts a mostrar en la página actual
  const indexOfLastPost = currentPage * resultsPerPage;
  const indexOfFirstPost = indexOfLastPost - resultsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(posts.length / resultsPerPage);

  // Efecto para cargar los posts más votados cuando el componente se monta
  useEffect(() => {
    const loadTopLikedPosts = async () => {
      try {
        const data = await fetchTopLikedPosts();
        setTopLikedPosts(data);
      } catch (error) {
        // Maneja el error aquí si es necesario
      }
    };

    loadTopLikedPosts();
  }, []);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Si se está cargando, muestra un mensaje de carga
  if (loading) return <p className="texto-cargando-posts">Cargando posts...</p>;
  
  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;

  // Renderiza el componente
  return (
    <section className={`inicio ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-content">
        <div className="sidebar-izq">
          <div className="contenedor-crear-post">
            {/* Botón para mostrar/ocultar el formulario del nuevo post */}
            <button
              className="boton-crear-post"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <img
                className="icono-nuevo-post"
                src="/edit.png"
                alt="Crear Nuevo Post"
              />
              <span className="escribe-tu-mejor-post">
                {isFormOpen ? "" : "Escribe tu mejor post!"}
              </span>
            </button>
            {/* Condición para mostrar el formulario del nuevo post */}
            {isFormOpen && (
              <NewPost
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                onAddPost={refresh}
              />
            )}
          </div>
        </div>
        <div className="columna-centro">
          {/* Lista de posts correspondientes a la página actual */}
          <ListaDePosts
            currentPosts={currentPosts}
            posts={posts}
            setPosts={setPosts}
            showLink={true}
          />
          {/* Componente de paginación */}
          <Pagination
            totalPosts={posts.length} // Pasa el número total de posts como prop
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        {/* Columna derecha (solo para dispositivos de escritorio) */}
        <div className="sidebar-derecha">
          <div className="caja-trending">
            <h1 className="trending-topics-titulo">
              TRENDING TOPICS
              <img
                className="emoticono-fuego"
                src="fuegito.png"
                alt="Emoticono fuego"
              />
            </h1>
            <ul className="lista-trending-topics">
              {/* Mapea y muestra los posts más votados */}
              {topLikedPosts.map((post) => (
                <li className="lista-posts-trending" key={post.postId}>
                  <Link to={`/post/${post.postId}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
