import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AvatarPage.css";
import { useTheme } from "../../context/ThemeContext";

const AvatarPage = () => {
  const storedAvatar = localStorage.getItem("selectedAvatar");
  const { isDarkMode } = useTheme();

  const [selectedAvatar, setSelectedAvatar] = useState(
    storedAvatar || "/AvatarBase.png"
  );

  const avatars = [
    "/Avatar1.png",
    "/Avatar2.png",
    "/Avatar3.png",
    "/Avatar4.png",
    "/Avatar5.png",
    "/Avatar6.png",
    "/Avatar7.png",
    "/Avatar8.png",
    "/Avatar9.png",
    "/001-robot.png",
    "/002-robot.png",
    "/003-robot.png",
    "/004-robot.png",
    "/005-robot.png",
    "/006-robot.png",
    "/007-robot.png",
    "/008-robot.png",
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar); // Actualizamos el avatar seleccionado en el estado
    localStorage.setItem("selectedAvatar", avatar); // Guardamos el avatar seleccionado en el localStorage
  };

  useEffect(() => {}, []);

  return (
    <div className={`avatar-page-container ${isDarkMode ? "dark" : "light"}`}>
      <h1>Selecciona tu Avatar</h1>
      <div className="avatar-list">
        {avatars.map((avatar, index) => (
          <button
            key={index}
            className={`avatar-button ${
              avatar === selectedAvatar ? "selected" : ""
            }`}
            onClick={() => handleAvatarClick(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="avatar-image"
            />
          </button>
        ))}
      </div>
      {/* Mostramos la imagen del avatar seleccionado */}
      <div className="selected-avatar-container">
        {/* Aplica la clase del contenedor de avatar seleccionado del CSS */}
        <p className="avatar-seleccionado-texto">Avatar Seleccionado:</p>
        <img
          src={selectedAvatar}
          alt="Avatar Seleccionado"
          className="selected-avatar"
        />
        {/* Aplica la clase del avatar seleccionado del CSS */}
      </div>
      {/* Botón para volver a ProfilePage */}
      <div className="back-to-profile">
        {/* Aplica la clase del botón de regreso del CSS */}
        <Link to="/profile">
          <button className="volver-a-perfil-usuario">Volver</button>{" "}
          {/* Aplica la clase del botón de regreso del CSS */}
        </Link>
      </div>
    </div>
  );
};

export default AvatarPage;
