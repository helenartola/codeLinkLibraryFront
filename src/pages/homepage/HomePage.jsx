import "./HomePage.css";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";

const HomePage = () => {
  // Utilizamos el hook usePosts para obtener los posts, loading y error
  const { posts, loading, error } = usePosts();

  // Si está cargando, mostramos un mensaje de carga
  if (loading) return <p>Cargando posts...</p>;

  // Si hay un error, mostramos el mensaje de error
  if (error) return <p>{error}</p>;

  // Renderizamos la sección de inicio
  return (
    <section className="inicio">
      {/* Eliminamos la clase "post-page-container" del contenedor principal, dejo comentado por si queremos añadirlo después */}
      <div className="main-content">
        {/* Pasamos los posts a ListaDePosts para su renderización */}
        <ListaDePosts posts={posts} />
      </div>
    </section>
  );
};

export default HomePage;
