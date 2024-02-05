import { useState/* , useEffect */ } from "react";
//import { useUser } from "../../context/UserContext";
//import { Link } from "react-router-dom";
import "./UserSettingsPage.css";
//import { getInfoUserService, getUserPostsService } from "../../services";

const UserSettingsPage = () => {
  //const [user] = useUser();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);

  const clearForm = () => {
    setName('');
    setLastName('');
    setBirthDate('');
    setBio('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          name,
          lastName,
          birthDate,
          bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      // Limpia el formulario después de enviar la información
      clearForm();
      setError(null); // Restablece cualquier error previo


    } catch (error) {

      console.error("Error al enviar la información:", error);
      setError('Error al enviar la información. Por favor, inténtalo de nuevo.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="lastName">Apellido:</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

      <label htmlFor="birthDate">Fecha de nacimiento:</label>
      <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

      <label htmlFor="bio">Bio:</label>
      <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />

      <button type="submit">Aceptar</button>
    </form>
  );
};

export default UserSettingsPage;
