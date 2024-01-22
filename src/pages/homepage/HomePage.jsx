import "./HomePage.css";
const HomePage = () => {
  return (
    <section className="inicio">
      <aside className="asideIzquierdo">
        <p>esto es una barra lateral</p>
      </aside>
      <div className="main-content">
        <h1>HOME | ÚLTIMOS POSTS</h1>
        <p>Aquí tiene que ir la lista de posts publicados</p>
      </div>
      <aside className="asidederecho">
        <p>esto es una barra lateral</p>
      </aside>
    </section>
  );
};

export default HomePage;
