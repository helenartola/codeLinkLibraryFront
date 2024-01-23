import "./App.css";
import { Routes, Route } from "react-router-dom";
import Buscador from './components/buscador/Buscador';
import ThemeSwitcher from './components/temaclaroscuro/ThemeSwitcher';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import LoginPage from "./pages/loginpage/LoginPage";
import PostPage from "./pages/postpage/PostPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import ProfilePage from "./pages/profilepage/ProfilePage";

function App() {
  // Datos para la búsqueda
  const searchData = [];

  return (
    <>
      <main className="main-container">
        <Header />
        
        {/* Componente Buscador para realizar búsquedas estáticas */}
        <Buscador data={searchData} />
        
        {/* Componente ThemeSwitcher para cambiar entre modos claro y oscuro */}
        <ThemeSwitcher />
        
        <div className="description">
          <h2>Elevate your web development journey </h2>
          <h3>Share, learn, and collaborate seamlessly</h3>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;