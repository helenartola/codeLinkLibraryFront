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
      <div className="main-content">
        <h1>HOME | ÚLTIMOS POSTS</h1>
        <ListaDePosts posts={posts} />
      </div>
    </section>
  );
};

export default HomePage;
