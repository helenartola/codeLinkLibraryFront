const SearchResultItem = ({ result }) => {
    return (
      <div className="search-result-item">
        <h3>{result.title}</h3>
        <p>{result.description}</p>
        {/* Agrega más información según sea necesario */}
      </div>
    );
  };
  
  export default SearchResultItem;