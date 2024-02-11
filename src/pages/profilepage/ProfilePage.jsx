import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";
import {
  getInfoUserService,
  getUserPostsService,
  deleteUserByIdService,
} from "../../services";
import { Link } from "react-router-dom";

// Componente de la página de perfil del usuario
const ProfilePage = () => {
  const [user] = useUser(); // Obtenemos el usuario del contexto de usuario
  const [userData, setUserData] = useState(null); // Estado para almacenar la información del usuario
  const [userPosts, setUserPosts] = useState([]); // Estado para almacenar los posts del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Estado para manejar la visualización del cuadro de diálogo de confirmación de eliminación
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Estado para almacenar el avatar seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await getInfoUserService(user);
          setUserData(data);

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

  useEffect(() => {
    const storedAvatar = localStorage.getItem("selectedAvatar");
    setSelectedAvatar(storedAvatar);
  }, []);

  const handleDeleteUser = () => {
    setShowConfirmationDialog(true);
  };

  const ConfirmationDialog = () => {
    const handleCancel = () => {
      setShowConfirmationDialog(false);
    };

    const handleConfirm = async () => {
      try {
        const token = user ? user.token : null;
        await deleteUserByIdService(user.userId, token);
        console.log("Usuario eliminado correctamente");
        window.location.href = "/registro";
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      } finally {
        setShowConfirmationDialog(false);
      }
    };

    return (
      <div className="caja-mensaje-eliminar-cuenta">
        <p>¿Estás seguro de que quieres eliminar tu cuenta?</p>
        <div>
          <button className="boton-cancelar-eliminacion" onClick={handleCancel}>
            Cancelar
          </button>
          <button
            className="boton-confirmar-eliminacion"
            onClick={handleConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="zonas-container">
      <div className="avatar-container">
        {/* Mostrar el avatar seleccionado */}
        <p className="texto-escoje-avatar">Escoje tu avatar:</p>
        <Link to="/avatar-page" className="boton-avatar-base">
          <img
            src={selectedAvatar}
            alt="Avatar"
            className="imagen-boton-avatar"
          />
        </Link>
        <nav className="botones-navegacion-post">
          <Link to="/saved-page" className="boton-guardados">
            Mis post Guardados
          </Link>
        </nav>
        {/* Enlace para ir a la página de selección de avatar */}
      </div>
      <section className="user-info">
        <h1 className="perfil-usuario-titulo"> Mi Perfil de Usuario</h1>
        {userData ? (
          <>
            <div className="user-details">
              <p>Nombre de usuario: {userData.userName}</p>
              <p>Email: {userData.email}</p>
              <p>Nombre: {userData.name}</p>
              <p>Apellidos: {userData.lastName}</p>
              <p>
                Fecha de nacimiento:{" "}
                {userData.birthDate
                  ? new Date(userData.birthDate).toLocaleDateString()
                  : ""}
              </p>
              <p>Biografía: {userData.bio}</p>
            </div>
          </>
        ) : (
          <p>Inicia sesión para ver el perfil.</p>
        )}
        <nav className="botones-navegacion-perfil">
          <Link to="/settings" className="boton-ajustes"></Link>
          <button className="boton-delete" onClick={handleDeleteUser}></button>
        </nav>
      </section>
      {showConfirmationDialog && <ConfirmationDialog />}
      {loading ? (
        <p>Cargando datos del perfil...</p>
      ) : (
        <>
          <div className="user-posts">
            <h2 className="mis-post-titulo">Mis Post Publicados</h2>
            <ul>
              {userPosts.map((post) => (
                <li key={post.postId}>{post.title}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
