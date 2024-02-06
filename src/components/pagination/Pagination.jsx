import "./Pagination.css";

const Pagination = ({ totalPosts, totalPages, currentPage, onPageChange }) => {
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

      {/* Muestra el número de la página actual */}
      <div className="current-page-box">{currentPage}</div>

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
