const Post = ({ post }) => {
  if (!post) {
    return <p>No hay posts disponibles</p>;
  }

  return (
    <article>
      <p>{post.title}</p>
      <p>{post.description}</p>
    </article>
  );
};

export default Post;
