import { useState } from 'react';
import "./Pagination.css";

const Pagination = ({ totalPosts, totalPages, currentPage, onPageChange }) => {
  // Estado para controlar el número de página editable
  const [editablePage, setEditablePage] = useState(currentPage);

  // Función para manejar el cambio de página
  const handlePageChange = (event) => {
    // Obtener el nuevo número de página ingresado por el usuario
    const newPage = parseInt(event.target.value);
    // Verificar si el número es válido y está dentro del rango de páginas
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      // Si es válido, llama a la función onPageChange para actualizar la página actual
      onPageChange(newPage);
    } else {
      // Si el número no es válido, restablece el contenido del input al valor original de currentPage
      setEditablePage(currentPage);
    }
  };

  return (
    <nav aria-label="Paginación" className="pagination">
      {/* Flecha para ir a la página anterior */}
      <button
        className="boton-pagination"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {/* Input para editar el número de página */}
      <input
        type="number"
        className="current-page-box"
        value={editablePage}
        onChange={(event) => setEditablePage(event.target.value)}
        onBlur={handlePageChange}
        min="1"
        max={totalPages}
      />

      {/* Flecha para ir a la página siguiente */}
      <button
        className="boton-pagination"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>

      {/* Muestra el total de resultados */}
      <div className="total-posts">{totalPosts}</div>
    </nav>
  );
};

export default Pagination;
