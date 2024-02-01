import PostItem from "../postItem/PostItem";

const ListaDePosts = ({ posts }) => {
  return posts.length ? (
    <div className="lista-posts">
      {posts.map((post) => (
        <PostItem key={post.postId} post={post} />
      ))}
    </div>
  ) : (
    <p className="no-hay-posts-mesaje">No hay posts todavía</p>
  );
};

export default ListaDePosts;