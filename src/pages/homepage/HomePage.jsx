import "./HomePage.css";
import usePosts from "../../hooks/usePosts";
import ListaDePosts from "../../components/listaPosts/ListaDePosts";

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
        {/*  <div className="description">
          <h2>Elevate your web development journey </h2>
          <h3>Share, learn, and collaborate seamlessly</h3>
        </div> */}
        <ListaDePosts posts={posts} />
      </div>
      {/* <aside className="asidederecho">
        <p>esto es una barra lateral</p>
      </aside> */}
    </section>
  );
};

export default HomePage;
