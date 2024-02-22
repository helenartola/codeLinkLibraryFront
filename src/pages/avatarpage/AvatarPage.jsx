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
    "/avatar-02.png",
    "/avatar-03.png",
    "/avatar-04.png",
    "/avatar-05.png",
    "/avatar-06.png",
    "/avatar-07.png",
    "/avatar-08.png",
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("selectedAvatar", avatar);
  };

  useEffect(() => {}, []);

  return (
    <div className={`avatar-page-container ${isDarkMode ? "dark" : "light"}`}>
      <h1>Selecciona tu avatar</h1>
      <div className="avatar-zone">
        {/* Primera fila */}
        <div className="avatar-row">
          {avatars.slice(0, 9).map((avatar, index) => (
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
        {/* Segunda fila */}
        <div className="avatar-row">
          {avatars.slice(9).map((avatar, index) => (
            <button
              key={index + 9}
              className={`avatar-button ${
                avatar === selectedAvatar ? "selected" : ""
              }`}
              onClick={() => handleAvatarClick(avatar)}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 10}`}
                className="avatar-image"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="selected-avatar-container">
        <p className="avatar-seleccionado-texto">Avatar seleccionado:</p>
        <img
          src={selectedAvatar}
          alt="Avatar Seleccionado"
          className="selected-avatar"
        />
      </div>
      <div className="back-to-profile">
        <Link to="/profile">
          <button className="volver-a-perfil-usuario"> Volver</button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default AvatarPage;
