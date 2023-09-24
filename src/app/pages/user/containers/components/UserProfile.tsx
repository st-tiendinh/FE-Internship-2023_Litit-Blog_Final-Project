import { useEffect, useState } from 'react';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';

export const UserProfile = ({ isLoggedUser, user }: any) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);

  useEffect(() => {
    isImageUrlValid(user.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg, user.picture]);

  return (
    <section className="section profile-section">
      <div className="profile">
        <div className="row">
          <div className="col col-4">
            <div className="d-flex profile-image">
              <div className="user-avatar-wrapper">
                <img
                  className="user-avatar"
                  src={isValidUserImg ? user.picture : BlankUserImage}
                  alt="Profile Image"
                />
              </div>
            </div>
          </div>
          <div className="col col-8">
            <div className="d-flex flex-column profile-content">
              <p className="user-name">{user.displayName}</p>
              <ul className="d-flex user-follow-list">
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Followers: </span>
                    <span className="user-follow-amount">{user.followers}</span>
                  </div>
                </li>
                <li className="user-follow-item">
                  <div className="user-follow">
                    <span className="user-follow-title">Followings: </span>
                    <span className="user-follow-amount">
                      {user.followings}
                    </span>
                  </div>
                </li>
              </ul>
              <ul className="d-flex user-about-list">
                <li className="d-flex user-about-item">
                  <i className="icon icon-person"></i>
                  <p>{user.firstName}</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-mail"></i>
                  <p>{user.email}</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-dob"></i>
                  <p>{user.dob?.split('/').reverse().join('-')}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-button">
          {isLoggedUser ? (
            <button className="btn btn-primary">Update Profile</button>
          ) : (
            <button className="btn btn-primary">Follow</button>
          )}
        </div>
      </div>
    </section>
  );
};
