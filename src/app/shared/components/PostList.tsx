import Post from './Post';

const PostList = () => {
  return (
    <div className="container ">
      <h3 className="post-list-title">Latest Post</h3>
      <ul className="post-list row">
        <li className="post-item col col-4">
          <Post />
        </li>
      </ul>
    </div>
  );
};

export default PostList;
