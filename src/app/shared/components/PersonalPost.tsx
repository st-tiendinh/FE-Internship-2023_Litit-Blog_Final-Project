export const PersonalPost = () => {
  return (
    <li className="personal-post-item">
      <div className="personal-post-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1623243639777-a8e732d0d7ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
          alt="personal post imag"
          className="personal-post-image"
        />
      </div>

      <div className="personal-post-content">
        <ul className="personal-post-tag-list">
          <li className="personal-post-tag-item">
            <a href="" className="personal-post-tag-link">
              <span className="badge badge-secondary">Technology</span>
            </a>
          </li>
          <li className="personal-post-tag-item">
            <a href="" className="personal-post-tag-link">
              <span className="badge badge-secondary">Technology</span>
            </a>
          </li>
          <li className="personal-post-tag-item">
            <a href="" className="personal-post-tag-link">
              <span className="badge badge-secondary">Technology</span>
            </a>
          </li>
        </ul>

        <h4 className="personal-post-title text-truncate">
          The Art of Traveling: Tips and Tricks for a Memorable Journey
        </h4>

        <p className="personal-post-desc text-truncate">
          Traveling can be a thrilling and enriching experience, but it also
          requires careful planning and preparation...
        </p>

        <div className="short-info">
          <div className="short-info-author">
            <img
              src="https://robohash.org/dolorummolestiaslaboriosam.png?size=50x50&set=set1"
              alt="author avatar"
              className="short-info-author-avatar"
            />
            <span className="short-info-author-name">Tracey Wilson</span>
          </div>
          <span className="short-info-dot-symbol">&#x2022;</span>
          <span className="short-info-timestamp">August 20, 2022</span>
        </div>
      </div>
    </li>
  );
};
