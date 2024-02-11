import PostItem from './PostItem'; 
// Componente Post que muestra un único post
const Post = ({ post }) => {
  // Verificamos si hay un post disponible
  if (!post) {
    return <p>No hay posts disponibles</p>; 
  }

  return <PostItem post={post} />;
};

export default Post; 
