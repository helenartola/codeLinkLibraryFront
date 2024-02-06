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

function App() {
  const location = useLocation();

  // Verificar si la ruta actual es la página de login o registro
  const isLoginPageOrRegistro =
    location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {!isLoginPageOrRegistro && <Header />}
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<PaginaRegistro />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta para mostrar los detalles del post */}
          <Route path="/post/:postId" element={<PostPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          {/* Ruta para ir a page Ajustes de usuario */}
          <Route path="/settings" element={<UserSettingsPage />} />
          {/* Ruta para ir a page Search */}
          <Route path="/search/:searchTerm" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
