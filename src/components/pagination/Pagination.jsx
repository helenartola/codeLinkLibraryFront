import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ totalPosts, totalPages, currentPage, onPageChange }) => {

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    // Verificar si el nuevo número de página está dentro del rango válido
    if (newPage >= 1 && newPage <= totalPages) {
      // Llama a la función onPageChange para actualizar la página actual
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Paginación" className="pagination">
      {/* Botón para ir a la página anterior */}
      <button
        className="boton-pagination"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1} // Desactiva el botón si estamos en la primera página
      >
        &laquo; Anterior
      </button>

      {/* Muestra la página actual y el total de páginas */}
      <div className="current-page">
        Página {currentPage} de {totalPages}
      </div>

      {/* Botón para ir a la página siguiente */}
      <button
        className="boton-pagination"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Desactiva el botón si estamos en la última página
      >
        Siguiente &raquo;
      </button>

      {/* Muestra el total de resultados */}
      <div className="total-posts">
        Total: {totalPosts}
      </div>
    </nav>
  );
};

// Especifica los tipos de las props esperadas
Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

