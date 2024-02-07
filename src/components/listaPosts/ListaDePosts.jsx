import PostItem from "../postItem/PostItem";

const ListaDePosts = ({ currentPosts,  posts, setPosts }) => {
  return currentPosts.length ? (
    <div className="lista-posts">
      {currentPosts.map((post) => (
        <PostItem key={post.postId} post={post} posts={posts} setPosts={setPosts} />
      ))}
    </div>
  ) : (
    <p className="no-hay-posts-mesaje">No hay posts todavía</p>
  );
};

export default ListaDePosts;