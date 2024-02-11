import PostItem from "../postItem/PostItem"; 

// Componente ListaDePosts que muestra una lista de publicaciones
const ListaDePosts = ({ currentPosts, posts, setPosts }) => {
  return currentPosts.length ? ( // Si hay publicaciones actuales
    <div className="lista-posts"> {/* Contenedor de la lista de publicaciones */}
      {currentPosts.map((post) => ( // Mapeamos sobre las publicaciones actuales
        <PostItem 
          key={post.postId} 
          post={post} 
          posts={posts} 
          setPosts={setPosts} 
        />
      ))}
    </div>
  ) : ( // Si no hay publicaciones actuales
    <p className="no-hay-posts-mensaje">No hay posts todavía</p> 
  );
};

export default ListaDePosts; 

