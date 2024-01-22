// Importado useState desde 'react' para gestionar el estado del componente
import { useState } from 'react';

// Definir el componente funcional Buscador que toma un prop "data"
const Buscador = ({ data }) => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Función que se ejecuta cada vez que el usuario escribe en la caja de búsqueda
  const handleSearch = (e) => {
    // Obtener el término de búsqueda del evento
    const term = e.target.value;
    
    // Actualizar el estado con el nuevo término de búsqueda
    setSearchTerm(term);

    // Filtrar los resultados basados en el término de búsqueda
    const filteredResults = data.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    );

    // Actualizar el estado con los resultados filtrados
    setSearchResults(filteredResults);
  };

  // Renderizar la interfaz del componente
  return (
    <div>
      {/* Input para que el usuario escriba el término de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
      {/* Lista de resultados de la búsqueda */}
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

// Exportar el componente Buscador para que pueda ser utilizado en otros archivos
export default Buscador;