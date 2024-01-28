// Importar las librerías necesarias
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import LoginPage from "./pages/loginpage/LoginPage";
import PostPage from "./pages/postpage/PostPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import PaginaRegistro from "./pages/paginaregistro/PaginaRegistro";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
       
        {/* Configurar las rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<PaginaRegistro />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta para mostrar los detalles del post */}
          <Route path="/post/:postId" element={<PostPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;