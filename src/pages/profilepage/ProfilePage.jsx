import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";
import { getInfoUserService, getUserPostsService } from "../../services";
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

  return (
    <div className="profile-container">
      {/* Información del perfil */}
      <section>
        <div className="user-info">
          <h1>Perfil de Usuario</h1>
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
            <Link to="/settings">
              <button className="common-button">Ajustes</button>
            </Link>
          </nav>
        </div>

        {/* Mostrar durante la carga de datos */}
        {loading ? (
          <p>Cargando datos del perfil...</p>
        ) : (
          <>
            {/* Listado de posts del usuario */}
            <div className="user-posts">
              <h2>Listado de Posts</h2>
              <ul>
                {userPosts.map((post) => (
                  <li key={post.postId}>{post.title}</li>
                ))}
              </ul>
              <nav className="botones-navegacion-post">
                <button className="common-button">Guardados</button>
              </nav>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;