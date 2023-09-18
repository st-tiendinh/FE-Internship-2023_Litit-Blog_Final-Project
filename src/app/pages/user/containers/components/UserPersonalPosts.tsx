import { Link } from 'react-router-dom';

export const UserPersonalPosts = () => {
  return (
    <section className="section section-personal-post">
      <ul className="personal-post-list">
        <li className="personal-post-item">
          <div className="personal-short-info">
            <img
              src="https://robohash.org/dolorummolestiaslaboriosam.png?size=50x50&set=set1"
              className="personal-author-avatar"
              alt=""
            />
            <div className="personal-author-info">
              <p className="personal-author-name">Tiendn</p>
              <span className="personal-post-timestamp">Sep 18</span>
            </div>
          </div>
          <div className="personal-post-detail">
            <h4 className="personal-post-title">Title</h4>
            <Link to="" className="personal-post-comment-link">
              <span className="btn btn-secondary">
                <i className="icon icon-comment-darker"></i>2 comment
              </span>
            </Link>
          </div>
        </li>

        <li className="personal-post-item">
          <div className="personal-short-info">
            <img
              src="https://robohash.org/dolorummolestiaslaboriosam.png?size=50x50&set=set1"
              className="personal-author-avatar"
              alt=""
            />
            <div className="personal-author-info">
              <p className="personal-author-name">Tiendn</p>
              <span className="personal-post-timestamp">Sep 18</span>
            </div>
          </div>
          <div className="personal-post-detail">
            <h4 className="personal-post-title">Title</h4>
            <Link to="" className="personal-post-comment-link">
              <span className="btn btn-secondary">
                <i className="icon icon-comment-darker"></i>2 comment
              </span>
            </Link>
          </div>
        </li>
      </ul>
    </section>
  );
};
