export const PostListSkeleton = () => {
  return (
    <li className="col col-12">
      <div className="personal-post personal-post-skeleton">
        <div className="personal-post-image-wrapper skeleton"></div>
        <div className="personal-post-content">
          <div className="personal-post-tag-list skeleton"></div>
          <div className="personal-post-title skeleton"></div>
          <div className="personal-post-desc skeleton"></div>
          <div className="short-info skeleton"></div>
        </div>
      </div>
    </li>
  );
};
