import { useState } from "react";
import "./UserSettingsPage.css";
import { userSettingsService } from "../../services";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const UserSettingsPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState(""); //actualizar contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmar actualización de contraseña
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [user] = useUser("");

  const { isDarkMode } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = user ? user.token : null;

      // Verificar si las contraseñas coinciden
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      let userData;
      if (birthDate) {
        userData = await userSettingsService(
          name,
          lastName,
          birthDate,
          bio,
          password,
          token
        );
      } else {
        userData = await userSettingsService(
          name,
          lastName,
          null, //poder enviar formulario sin fecha (daba error)
          bio,
          password,
          token
        );
      }

      setSuccessMessage("¡Los campos se han actualizado correctamente!");
      setError(null);
      console.log("Datos del usuario actualizados:", userData);
    } catch (error) {
      setError("Error al actualizar los ajustes del usuario");
      console.error(
        "Error al actualizar los ajustes del usuario:",
        error.message
      );
    }
  };

  return (
    <div className={`caja-ajustes-usuario ${isDarkMode ? "dark" : "light"}`}>
      <form className="formulario-ajustes-usuario" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <label className="label-form-ajustes" htmlFor="name">
          Nombre:
        </label>
        <input
          className="input-form-ajustes"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label-form-ajustes" htmlFor="lastName">
          Apellido:
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label-form-ajustes" htmlFor="birthDate">
          Fecha de nacimiento:
        </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label className="label-form-ajustes" htmlFor="bio">
          Bio:
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="label-form-ajustes" htmlFor="password">
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="label-form-ajustes" htmlFor="confirmPassword">
          Confirmar Contraseña:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Aceptar</button>

        <Link to="/profile">
          <button className="return">Volver</button>
        </Link>
      </form>
    </div>
  );
};

export default UserSettingsPage;
