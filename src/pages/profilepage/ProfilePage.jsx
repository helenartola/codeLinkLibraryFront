import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";
import { getInfoUserService, getUserPostsService, deleteUserByIdService } from "../../services";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user] = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Obtener datos del perfil del usuario
          const data = await getInfoUserService(user);
          setUserData(data);

          // Obtener posts del usuario utilizando el servicio
          const posts = await getUserPostsService(user.userId);
          setUserPosts(posts);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDeleteUser = async () => {
    try {
      // Llama al servicio para eliminar el usuario
      await deleteUserByIdService(user.userId);
      // Después de eliminar, podrías redirigir a una página de inicio de sesión o realizar alguna otra acción.
      console.log("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="zonas-container">
      {/* Información del perfil */}
      <section className="user-info">
        <h1 className="perfil-usuario-titulo"> Mi Perfil de Usuario</h1>
        {userData ? (
          <>
            <p>Nombre de usuario: {userData.userName}</p>
            <p>Email: {userData.email}</p>
            <p>Nombre: {userData.name}</p>
            <p>Apellidos: {userData.lastName}</p>
            <p>Fecha de nacimiento: {userData.birthDate}</p>
            <p>Biografía: {userData.bio}</p>
          </>
        ) : (
          <p>Inicia sesión para ver el perfil.</p>
        )}
        <nav className="botones-navegacion-perfil">
          <Link to="/settings" className="boton-ajustes">
            Ajustes usuario
          </Link>
          <button className="boton-delete" onClick={handleDeleteUser}>
          <img
                className="icono-boton-delete"
                src="/eliminar-usuario.png"
                alt="Eliminar usuario"
              />
          </button>
        </nav>
      </section>

      {/* Mostrar durante la carga de datos */}
      {loading ? (
        <p>Cargando datos del perfil...</p>
      ) : (
        <>
          {/* Listado de posts del usuario */}
          <div className="user-posts">
            <h2 className="mis-post-titulo">Mis Post Publicados</h2>
            <ul>
              {userPosts.map((post) => (
                <li key={post.postId}>{post.title}</li>
              ))}
            </ul>
            <nav className="botones-navegacion-post">
              <button className="boton-guardados">Mis post Guardados</button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
