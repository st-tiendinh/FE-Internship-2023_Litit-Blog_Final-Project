export const PopularPostSkeleton = () => {
  return (
    <li className="popular-post-item">
      <div className="popular-post">
        <div className="popular-post-image-wrapper skeleton">
          <div className="popular-post-image"></div>
        </div>
        <div className="popular-post-content">
          <div className="popular-post-title text-truncate skeleton"></div>
          <div className="popular-post-timestamp skeleton"></div>
        </div>
      </div>
    </li>
  );
};
