import PostItem from './PostItem'; 

const Post = ({ post }) => {
  if (!post) {
    return <p>No hay posts disponibles</p>;
  }

  return <PostItem post={post} />;
};

export default Post;