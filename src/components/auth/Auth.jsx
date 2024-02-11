import { useUser } from "../../context/UserContext"; 
import "./Auth.css"; 
import { Link } from "react-router-dom"; 

// Utilizamos el hook useUser para obtener el estado del usuario y la función para actualizarlo
const Auth = () => {
  const [user, betterSetUser] = useUser(); 

  const handleLogout = () => {//Redirije a la página de inicio una vez hacemos logout
    betterSetUser(null); // Establecemos el usuario como null, lo que efectivamente le desconecta
    window.location.href = "/login"; // Redirigimos a la página de inicio de sesión después del logout
  };

  return (
    <section className="seccion-botones-acceso"> {/* Sección contenedora de botones de acceso */}
      {user ? ( // Verificamos si hay un usuario autenticado
        <> {/* Fragmento de React para agrupar elementos */}
          <span className="usuario">{user.userName}</span> {/* Mostramos el nombre de usuario */}
          <Link to="/profile"> {/* Redirigimos al perfil del usuario */}
            <button className="profile-button"></button> {/* Botón para acceder al perfil */}
          </Link>
          <a
            className="logout-boton"
            href="#"
            onClick={handleLogout} // Utilizamos la función handleLogout para manejar el logout
          >
            <img className="icono-logout" src="/Logout.png" alt="Log out" /> {/* Icono de logout */}
          </a>
        </>
      ) : (
        <> {/* Si no hay usuario autenticado, mostramos los botones de inicio de sesión y registro */}
          <Link to="/login"> {/* Redirigimos a la página de inicio de sesión */}
            <button className="auth-button">Log in</button> {/* Botón de inicio de sesión */}
          </Link>

          <Link to="/registro"> {/* Redirigimos a la página de registro */}
            <button className="auth-button">Sign up</button> {/* Botón de registro */}
          </Link>
        </>
      )}
    </section>
  );
};

export default Auth; 
