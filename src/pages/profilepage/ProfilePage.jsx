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

  // Efecto secundario para cargar la información del usuario y sus posts al montar el componente o cuando cambia el usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Obtener y mostrar datos del usuario utilizando el servicio
          const data = await getInfoUserService(user);
          setUserData(data);

          // Obtener y mostrar los posts del usuario utilizando el servicio
          const posts = await getUserPostsService(user.userId);
          setUserPosts(posts);

          setLoading(false); // Cambiar el estado de carga a falso cuando se completan las solicitudes
        }
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
        setLoading(false); // Cambiar el estado de carga a falso en caso de error
      }
    };

    fetchData(); // Llamar a la función fetchData para cargar los datos del perfil
  }, [user]); // Ejecutar el efecto cuando cambie el usuario

  // Manejador de evento para eliminar al usuario
  const handleDeleteUser = () => {
    setShowConfirmationDialog(true); // Mostrar el cuadro de diálogo de confirmación de eliminación
  };

  // Componente del cuadro de diálogo de confirmación de eliminación
  const ConfirmationDialog = () => {
    // Manejador de evento para cancelar la eliminación
    const handleCancel = () => {
      setShowConfirmationDialog(false); // Ocultar el cuadro de diálogo de confirmación
    };

    // Manejador de evento para confirmar la eliminación
    const handleConfirm = async () => {
      try {
        const token = user ? user.token : null; // Obtener el token del usuario
        await deleteUserByIdService(user.userId, token); // Llamar al servicio para eliminar al usuario
        console.log("Usuario eliminado correctamente");
        window.location.href = "/registro"; // Redireccionar a la página de registro después de eliminar al usuario
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      } finally {
        setShowConfirmationDialog(false); // Ocultar el cuadro de diálogo de confirmación
      }
    };

    // Renderizar el cuadro de diálogo de confirmación
    return (
      <div className="caja-mensaje-eliminar-cuenta">
        <p>¿Estás seguro de que quieres eliminar tu cuenta?</p>
        <div>
          {/* Botón para cancelar la eliminación */}
          <button className="boton-cancelar-eliminacion" onClick={handleCancel}>
            Cancelar
          </button>
          {/* Botón para confirmar la eliminación */}
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

  // Renderizar el componente ProfilePage
  return (
    <div className="zonas-container">
      {/* Contenedor del avatar */}
      <div className="avatar-container">
        <Link to="/avatar-page" className="boton-avatar-base">
          <img
            src="/AvatarBase.png"
            alt="Avatar"
            className="imagen-boton-avatar"
          />
        </Link>
      </div>
      {/* Información del perfil */}
      <section className="user-info">
        <h1 className="perfil-usuario-titulo"> Mi Perfil de Usuario</h1>
        {/* Verificar si hay datos del usuario */}
        {userData ? (
          <>
            {/* Detalles del usuario */}
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
        {/* Navegación en el perfil */}
        <nav className="botones-navegacion-perfil">
          {/* Enlace para ir a la página de ajustes */}
          <Link to="/settings" className="boton-ajustes"></Link>
          {/* Botón para eliminar al usuario */}
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
              {/* Mapeo de los posts del usuario */}
              {userPosts.map((post) => (
                <li key={post.postId}>{post.title}</li>
              ))}
            </ul>
            {/* Navegación en los posts */}
            <nav className="botones-navegacion-post">
              {/* Enlace para ir a la página de posts guardados */}
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
