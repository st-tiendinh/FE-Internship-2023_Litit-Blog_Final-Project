export const PopularPostSkeleton = () => {
  return (
    <li className="popular-post-item">
      <div className="d-flex popular-post">
        <div className="popular-post-image-wrapper skeleton"></div>
        <div className="d-flex flex-column popular-post-content">
          <div className="popular-post-timestamp skeleton"></div>
          <div className="popular-post-title skeleton"></div>
        </div>
      </div>
    </li>
  );
};
