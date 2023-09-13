import Post from './Post';

const PostList = () => {
  return (
    <div className="container ">
      <h3 className="post-list-title">Latest Post</h3>
      <ul className="post-list row">
        <li className="col col-4">
          <div className="post-item">
            <Post />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PostList;
