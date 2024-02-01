import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";
import { getInfoUserService } from "../../services";

// Función ficticia para simular la obtención de posts asociados a un usuario
const fetchUserPosts = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
        // Otros posts del usuario
      ]);
    }, 1000); // Simulamos un tiempo de carga de 1 segundo
  });
};

const ProfilePage = () => {
  const [user] = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Obtener datos del perfil del
          const data  = await getInfoUserService(user.userId);
          setUserData(data);

          // Obtener posts del usuario
          const posts = await fetchUserPosts(user.userId);
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
      <nav className="botones-navegacion-perfil">
        <button>Historico de Posts</button>
        <button>Guardado</button>
        <button>Ajustes</button>
      </nav>
      <h1>Perfil de Usuario</h1>
      <section>
        {userData ? (
          <div className="user-info">
            <p>Nombre de usuario: {userData.userName}</p>
            <p>Email: {userData.email}</p>
            <p>Nombre: {userData.name}</p>
            <p>Apellidos: {userData.lastName}</p>
          </div>
        ) : (
          <p>Inicia sesión para ver el perfil.</p>
        )}

        {loading ? (
          <p>Cargando datos del perfil...</p>
        ) : (
          <>
           
            <div className="user-posts">
              <h2>Listado de Posts</h2>
              <ul>
                {userPosts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
      <section className="posts">
        {/* LISTADO DE POSTS */}
        <div>LISTADO POSTS</div>
      </section>
    </div>
  );
};

export default ProfilePage;