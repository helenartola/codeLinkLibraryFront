import { useState } from "react";
import "./UserSettingsPage.css";
import { usuarioAjustes } from "../../services";
import { Link } from "react-router-dom";

const UserSettingsPage = ({ token }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    try {
    
      const userData = await usuarioAjustes(name, lastName, birthDate, bio, token);
      
      
      console.log('Datos del usuario actualizados:', userData);
    } catch (error) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
      setError("Error al actualizar los ajustes del usuario");
      console.error('Error al actualizar los ajustes del usuario:', error.message);
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
          type="text"
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
