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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Lógica para conectar con BACK


    // Limpiar el formulario después de enviar la información
    //useUser('');
    setName('');
    setLastName('');
    setBirthDate('');
    setBio('');
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>Nombre:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Apellido:</label>
      <input type="email" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

      <label>Fecha de nacimiento:</label>
      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

      <label>Bio:</label>
      <input type="date" value={bio} onChange={(e) => setBio(e.target.value)} />

      <button type="submit">Aceptar</button>
    </form>
  );
};

export default UserSettingsPage;
