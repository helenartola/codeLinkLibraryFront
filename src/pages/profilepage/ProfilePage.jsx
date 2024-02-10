import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./ProfilePage.css";
import {
  getInfoUserService,
  getUserPostsService,
  deleteUserByIdService,
} from "../../services";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user] = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); //maneja el pop up de confirmación de eliminación

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // mostrar datos del usuario
          const data = await getInfoUserService(user);
          setUserData(data);

          // mostrar posts del usuario utilizando el service
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

  const handleDeleteUser = () => {
    //handle para eliminación de usuario
    setShowConfirmationDialog(true);
  };

  const ConfirmationDialog = () => {
    //cuadro de dialogo para confirmación de eliminación de usuario
    const handleCancel = () => {
      setShowConfirmationDialog(false);
    };

    const handleConfirm = async () => {
      ///handle confirmación de eliminación de usuario
      try {
        const token = user ? user.token : null;
        await deleteUserByIdService(user.userId, token);
        console.log("Usuario eliminado correctamente");
        window.location.href = "/registro";// Redireccionar a la página de registro después de eliminar el usuario
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
      {/* Información del perfil */}
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
            <div className="avatar-container">
              <Link to="/avatar-page" className="boton-avatar-base">
                <img
                  src="/AvatarBase.png"
                  alt="Avatar"
                  className="imagen-boton-avatar"
                />
              </Link>
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

      {/* Cuadro de diálogo de confirmación */}
      {showConfirmationDialog && <ConfirmationDialog />}

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
              <Link to="/saved-page" className="boton-guardados">
                Mis post Guardados
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
