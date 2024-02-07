import { useState } from "react";
import "./UserSettingsPage.css";
import { usuarioAjustes } from "../../services";
import { Link } from "react-router-dom";

const UserSettingsPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await usuarioAjustes(
        name,
        lastName,
        birthDate,
        bio,
        token
      );

      if (userData.token) {
        // Lógica para manejar el token obtenido
      } else {
        setError("Error al obtener el token");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="caja-ajustes-usuario">
      <form className="formulario-ajustes-usuario" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

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
        <Link to="/">
          <button className="return">Volver</button>
        </Link>
      </form>
    </div>
  );
};

export default UserSettingsPage;
