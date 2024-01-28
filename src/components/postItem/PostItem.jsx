import './PostItem.css';

// Componente funcional PostItem que representa un solo post
const PostItem = ({ post }) => {
  return (
    <div className="post-item-container">
      <h2>{post.title}</h2>     {/* Título del post */}
      <p>{post.description}</p> {/* Descripción del post */}
      {/* Otros detalles del post */}
    </div>
  );
};

export default PostItem; 