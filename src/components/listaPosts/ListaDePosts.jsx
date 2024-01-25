import Post from "./Post";

const ListaDePosts = ({ posts }) => {

  return posts.length ? (
    <ul>
      {posts.map((post) => (
        <li key={post.title}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay posts todavía</p>
  );
};
export default ListaDePosts;
