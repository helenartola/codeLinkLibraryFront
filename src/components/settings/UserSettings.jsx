/*import "./UserSettings.css";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { actualizarDatosUsuarioService, actualizarContraseñaService, actualizarEmailService } from "../../services"; 


const UserSettings = () => {
  const { user, betterSetUser } = useUser();
  const [newName, setNewName] = useState(user.name || "");
  const [newLastName, setNewLastName] = useState(user.lastName || "");
  const [newBirthDate, setNewBirthDate] = useState(user.birthDate ? user.birthDate.split("T")[0] : "");
  const [newBio, setNewBio] = useState(user.bio || "");
  const [newEmail, setNewEmail] = useState(user.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedUserData = await actualizarDatosUsuarioService({
        userId: user.userId,
        name: newName,
        lastName: newLastName,
        birthDate: newBirthDate,
        bio: newBio,
      });

      betterSetUser(updatedUserData);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const updatedUserData = await actualizarEmailService({
        userId: user.userId,
        email: newEmail,
        currentPassword: currentPassword,
      });

      betterSetUser(updatedUserData);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await actualizarContraseñaService({
        userId: user.userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`user-settings-container ${isDarkMode ? "dark" : "light"}`}>
      <h1>Ajustes de Usuario</h1>

      <form onSubmit={handleUpdateUserProfile}>
        <button className="actualizarButton">ACTUALIZAR DATOS DEL PERFIL</button>
        {error && <p className="errorMensaje">{error}</p>}
      </form>

      <form onSubmit={handleUpdateEmail}>
        <fieldset>
          <label htmlFor="newEmail">Nuevo Correo Electrónico</label>
          <input
            value={newEmail}
            type="email"
            id="newEmail"
            name="newEmail"
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="currentPasswordEmail">Contraseña Actual</label>
          <input
            type="password"
            id="currentPasswordEmail"
            name="currentPasswordEmail"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </fieldset>

        <button className="actualizarButton">ACTUALIZAR CORREO ELECTRÓNICO</button>
        {error && <p className="errorMensaje">{error}</p>}
      </form>

      <form onSubmit={handleUpdatePassword}>
        <fieldset>
          <label htmlFor="currentPassword">Contraseña Actual</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </fieldset>

        <button className="actualizarButton">ACTUALIZAR CONTRASEÑA</button>
        {error && <p className="errorMensaje">{error}</p>}
      </form>

      <Link to="/">Ir a la página principal</Link>
    </div>
  );
};

export default UserSettings;*/