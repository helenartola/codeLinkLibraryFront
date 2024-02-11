import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AvatarPage = () => {
  // Obtenemos el avatar seleccionado almacenado en el localStorage
  const storedAvatar = localStorage.getItem('selectedAvatar');

  // Definimos el estado para almacenar el avatar seleccionado
  const [selectedAvatar, setSelectedAvatar] = useState(storedAvatar || '/AvatarBase.png');

  // Lista de avatares disponibles
  const avatars = [
    '/Avatar1.png',
    '/Avatar2.png',
    '/Avatar3.png',
    '/Avatar4.png',
    '/Avatar5.png',
    '/Avatar6.png',
    '/Avatar7.png',
    '/Avatar8.png',
    '/Avatar9.png',
  ];

  // Función para manejar el clic en un avatar
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar); // Actualizamos el avatar seleccionado en el estado
    localStorage.setItem('selectedAvatar', avatar); // Guardamos el avatar seleccionado en el localStorage
  };

  useEffect(() => {
  
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Selecciona tu Avatar</h1>
      {/* Renderizamos la lista de avatares */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {avatars.map((avatar, index) => (
          <button
            key={index}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              outline: 'none',
              transition: 'transform 0.2s ease-in-out',
              padding: '5px',
            }}
            // Aplicamos la clase "selected" si el avatar actual es el seleccionado
            className={`avatar-button ${avatar === selectedAvatar ? 'selected' : ''}`}
            onClick={() => handleAvatarClick(avatar)} // Manejamos el clic en el avatar
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              style={{ maxWidth: '80px', maxHeight: '80px', marginTop: '10px' }}
            />
          </button>
        ))}
      </div>
      {/* Mostramos la imagen del avatar seleccionado */}
      <div>
        <p>Avatar Seleccionado:</p>
        <img src={selectedAvatar} alt="Avatar Seleccionado" style={{ maxWidth: '880px', maxHeight: '80px' }} />
      </div>
      {/* Botón para volver a ProfilePage */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/profile">
          <button style={{ padding: '10px', fontSize: '16px' }}>
            Volver a ProfilePage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvatarPage;