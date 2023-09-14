export const PostSkeleton = () => {
  return (
    <li className="col col-4">
      <div className="post-item">
        <div className="post post-skeleton">
          <div className="post-image skeleton"></div>
          <div className="post-content">
            <div className="post-header skeleton"></div>
            <div className="post-body">
              <div className="post-title skeleton"></div>
              <div className="post-desc skeleton"></div>
              <div className="post-author skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
