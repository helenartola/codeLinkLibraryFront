import React, { useState } from 'react';
import './ProfilePage.css';
//import { Routes, Route } from "react-router-dom";
//import ListaDePosts from "../../components/listaPosts/ListaDePosts";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: 'Ejemplo',
    email: 'ejmplo@mail.com',
  });

  return (
    <div className="profile-container">
      <nav className="navegacion-perfil">
          <button>Historico de Posts</button>
          <button>Guardado</button>
          <button>Ajustes</button>
      </nav>
      <h1>Perfil de Usuario</h1>
      <section>
      <div className="user-info">
        <p>Nombre de usuario: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
      </section>
      <section className='posts'>{/* LISTADO DE POSTS */}
      <div>LISTADO POSTS</div>
    </section>
      
    </div>
  );
};

export default ProfilePage;

