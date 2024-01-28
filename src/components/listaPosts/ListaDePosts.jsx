import PostItem from "../postItem/PostItem"; 

const ListaDePosts = ({ posts }) => {
  return posts.length ? (
    <div className="lista-posts">
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </div>
  ) : (
    <p>No hay posts todavía</p>
  );
};

export default ListaDePosts;