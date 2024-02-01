import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";

// Función ficticia para simular la obtención de datos del perfil del usuario desde una API
const fetchUserData = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "Ejemplo",
        email: "ejemplo@mail.com",
        // Otras propiedades del perfil del usuario
      });
    }, 1000); // Simulamos un tiempo de carga de 1 segundo
  });
};

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
  const [additionalUserData, setAdditionalUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Obtener datos del perfil del usuario
          const userData = await fetchUserData(user.id);
          setAdditionalUserData(userData);

          // Obtener posts del usuario
          const posts = await fetchUserPosts(user.id);
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
        {user ? (
          <div className="user-info">
            <p>Nombre de usuario: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Inicia sesión para ver el perfil.</p>
        )}

        {loading ? (
          <p>Cargando datos del perfil...</p>
        ) : (
          <>
            <div className="additional-info">
              {/* Muestra información adicional del perfil */}
              <p>Otra información: {additionalUserData.otraPropiedad}</p>
            </div>
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