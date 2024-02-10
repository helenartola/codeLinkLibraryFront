import { useEffect, useState } from 'react';
import "./Categorias.css"

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a tu endpoint de categorías en el backend
    fetch('http://localhost:8000/categorias')
      .then(response => response.json())
      .then(data => {
        // Al recibir la respuesta, actualiza el estado con las categorías
        setCategorias(data.data);
      })
      .catch(error => {
        // Manejar errores si es necesario
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <div>
      <h2>Listado de Categorías</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>{categoria.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasList;
