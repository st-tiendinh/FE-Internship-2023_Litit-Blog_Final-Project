import BlankUserImage from '../../../../../assets/images/blank-user.webp';

export const UserProfile = () => {
  return (
    <section className="section profile-section">
      <div className="container">
        <div className="profile">
          <div className="d-flex profile-header">
            <div className="user-avatar-wrapper">
              <img
                className="user-avatar"
                src={BlankUserImage}
                alt="Profile Image"
              />
            </div>
            <div className="d-flex profile-header-action">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
          <div className="d-flex flex-column profile-content">
            <p className="user-name">Linh2402</p>
            <div className="user-follow">
              <ul className="d-flex user-follow-list">
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Follower: </span>
                    <span className="user-follow-amount">123</span>
                  </div>
                </li>
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Following: </span>
                    <span className="user-follow-amount">20</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="user-about">
              <ul className="d-flex user-about-list">
                <li className="d-flex user-about-item">
                  <i className="icon icon-person"></i>
                  <p>Linh Nguyen</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-mail"></i>
                  <p>linh@gmail.com</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-dob"></i>
                  <p>24/02/2001</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
