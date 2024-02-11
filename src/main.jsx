import React from "react"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App.jsx"; 
import "./index.css"; // Importamos los estilos CSS
import { ThemeProvider } from "./context/ThemeContext.jsx"; 
import { UserProvider } from "./context/UserContext.jsx"; 

// Renderizamos la aplicación en el elemento con id "root" utilizando ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/* Utilizamos StrictMode para detectar posibles problemas en la aplicación */}
    {/* Envoltura de ThemeProvider para proporcionar el tema a toda la aplicación */}
    <ThemeProvider>
      {/* Envoltura de UserProvider para proporcionar información del usuario a toda la aplicación */}
      <UserProvider>
        {/* Envoltura de BrowserRouter para envolver toda la aplicación con las rutas del navegador */}
        <BrowserRouter>
          {/* Renderizamos el componente principal de la aplicación */}
          <App />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

