import Post from "./Post";

const Postlist = ({ posts }) => {
  if (!posts || !Array.isArray(posts)) {
    return <p>No hay posts todavía</p>;
  }

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
export default Postlist;
