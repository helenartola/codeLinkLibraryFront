import { Routes, Route, useLocation } from "react-router-dom"; 
import Footer from "./components/footer/Footer"; 
import Header from "./components/header/Header"; 
import HomePage from "./pages/homepage/HomePage"; 
import LoginPage from "./pages/loginpage/LoginPage"; 
import PostPage from "./pages/postpage/PostPage"; 
import NotFoundPage from "./pages/notfoundpage/NotFoundPage"; 
import ProfilePage from "./pages/profilepage/ProfilePage"; 
import PaginaRegistro from "./pages/paginaregistro/PaginaRegistro";
import UserSettingsPage from "./pages/settingspage/UserSettingsPage"; 
import SearchPage from "./pages/searchpage/searchPage"; 
import SavedPage from "./pages/savedpage/SavedPage"; 
import AvatarPage from "./pages/avatarpage/AvatarPage";

function App() {
  const location = useLocation(); //Obtenemos la ubicación actual de la apliación.

  // Verificar si la ruta actual es la página de login o registro
  const isLoginPageOrRegistro =
    location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {/* Renderizamos el Header solo si no estamos en la página de login o registro */}
      {!isLoginPageOrRegistro && <Header />}
      {/* Contenedor principal de la aplicación */}
      <main className="main-container">
        <Routes>
          {/* Definimos las rutas y sus componentes correspondientes */}
          <Route path="/" element={<HomePage />} /> {/* Ruta para la página principal */}
          <Route path="/registro" element={<PaginaRegistro />} /> {/* Ruta para la página de registro */}
          <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de login */}
          <Route path="/post/:postId" element={<PostPage />} /> {/* Ruta para mostrar los detalles de un post */}
          <Route path="/profile" element={<ProfilePage />} /> {/* Ruta para la página de perfil del usuario */}
          <Route path="/settings" element={<UserSettingsPage />} /> {/* Ruta para la página de ajustes del usuario */}
          <Route path="/search" element={<SearchPage />} /> {/* Ruta para la página de búsqueda */}
          <Route path="/saved-page" element={<SavedPage />} /> {/* Ruta para la página de posts guardados */}
          <Route path="/avatar-page" element={<AvatarPage />} /> {/* Ruta para la página de selección de avatar */}
          <Route path="*" element={<NotFoundPage />} /> {/* Ruta para cualquier otra ruta no especificada */}
        </Routes>
      </main>
      <Footer /> {/* Renderizamos el Footer al final de la aplicación */}
    </>
  );
}

export default App; 

