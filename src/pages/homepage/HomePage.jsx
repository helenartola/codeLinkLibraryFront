import "./HomePage.css";
import usePosts from "../../hooks/usePosts";
const HomePage = () => {
  const { posts, loading, error } = usePosts();

  //Si está cargando, hacemos un return cargando posts
  if (loading) return <p>Cargando posts...</p>;
  //Si hay un error, retorna error
  if (error) return <p>{error}</p>;

  console.log(posts);
  return (
    <section className="inicio">
      {/* <aside className="asideIzquierdo">
        <p>esto es una barra lateral</p>
      </aside> */}
      <div className="main-content">
        <h1>HOME | ÚLTIMOS POSTS</h1>
        <p>Aquí tiene que ir la lista de posts publicados</p>
      </div>
      {/* <aside className="asidederecho">
        <p>esto es una barra lateral</p>
      </aside> */}
    </section>
  );
};

export default HomePage;
