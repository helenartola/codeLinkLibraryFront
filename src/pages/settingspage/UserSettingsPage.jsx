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
  const [successMessage, setSuccessMessage] = useState(""); // mensaje con el OK actualización de campos
  const [error, setError] = useState(null); //mensaje de error
  const [user] = useUser("");

 const { isDarkMode } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el envío automático del formulario

    try {
      const token = user ? user.token : null;//revisa token

      const userData = await userSettingsService(name, lastName, birthDate, bio, token);
      setSuccessMessage("¡Los campos de han actualizado correctamente!");//mensaje de OK
      setError(null); // Limpiar cualquier error previo
      console.log('Datos del usuario actualizados:', userData);

    } catch (error) {
      setError("Error al actualizar los ajustes del usuario");//mensaje de error
      console.error('Error al actualizar los ajustes del usuario:', error.message);
    }
  };

  return (
    <div className={`caja-ajustes-usuario ${isDarkMode ? "dark" : "light"}`}>
      <form className="formulario-ajustes-usuario" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}{/* Mostrar mensaje de error */}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Mostrar mensaje de éxito */}

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="birthDate">Fecha de nacimiento:</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
