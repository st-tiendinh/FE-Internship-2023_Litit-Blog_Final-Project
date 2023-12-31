import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import BlankUserImage from '../../../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { formatDate } from '../../../../shared/utils/formatDate';
import { UserDetailProps } from '../../../../core/models/user';
import { setShowModal } from '../../../../../redux/actions/modal';
import ListFollowers from '../../../management/containers/components/ListFollowers';
import ListFollowings from '../../../management/containers/components/ListFollowings';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

interface UserProfileProps {
  isLoggedUser: boolean;
  user: UserDetailProps;
  followingNum: number;
}

export const UserProfile = ({
  isLoggedUser,
  user,
  followingNum,
}: UserProfileProps) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followerNum, setFollowerNum] = useState<number>(user?.followers);
  const dispatch = useDispatch();

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    (async () => {
      try {
        const response: any = await apiService.get([
          ENDPOINT.friends.followings,
        ]);
        setIsFollowed(
          response.filter((item: any) => item.id === user.id).length
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location.pathname]);

  useEffect(() => {
    isImageUrlValid(user?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg, user?.picture]);

  const handleFollow = () => {
    (async () => {
      try {
        setIsLoading(true);
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.post([ENDPOINT.friends.follow], {
          followingId: user.id,
        });
        if (isFollowed) {
          setFollowerNum((prev) => prev - 1);
        } else {
          setFollowerNum((prev) => prev + 1);
        }
        setIsLoading(false);
        setIsFollowed(!isFollowed);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  };

  const handleShowListFollowers = () => {
    dispatch(
      setShowModal({ content: <ListFollowers />, message: 'followers' })
    );
  };

  const handleShowListFollowings = () => {
    dispatch(
      setShowModal({ content: <ListFollowings />, message: 'following' })
    );
  };

  return (
    <section className="section profile-section">
      <div className="profile">
        <div className="row">
          <div className="col col-4 col-sm-4">
            <p className="user-name-sm">
              {user.displayName === null
                ? `${user?.firstName} ${user?.lastName}`
                : user.displayName}
            </p>
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
          <div className="col col-8 col-sm-8">
            <div className="d-flex flex-column profile-content">
              <p className="user-name">
                {user.displayName === null
                  ? `${user?.firstName} ${user?.lastName}`
                  : user.displayName}
              </p>
              <ul className="d-flex user-follow-list">
                <li
                  className="user-follow-item"
                  onClick={handleShowListFollowers}
                >
                  <div className="user-follow">
                    <span className="user-follow-title">Followers </span>
                    <span className="user-follow-amount">{followerNum}</span>
                  </div>
                </li>
                <li
                  className="user-follow-item"
                  onClick={handleShowListFollowings}
                >
                  <div className="user-follow">
                    <span className="user-follow-title">Followings </span>
                    <span className="user-follow-amount">{followingNum}</span>
                  </div>
                </li>
              </ul>
              <ul className="d-flex user-about-list">
                <li className="d-flex user-about-item">
                  <i className="icon icon-person"></i>
                  <p className="user-firstname">{`${user?.firstName} ${user?.lastName}`}</p>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-mail"></i>
                  <a href={`mailto:${user.email}`}>
                    <p className="user-email">{user.email}</p>
                  </a>
                </li>
                <li className="d-flex user-about-item">
                  <i className="icon icon-dob"></i>
                  <p className="user-dob">{formatDate(user?.dob)}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-button">
          {isLoggedUser ? (
            <>
              <Link
                to="/settings/my-profile"
                className="btn btn-primary edit-profile-button"
              >
                Update Profile
              </Link>
              <Link
                to="/settings/my-profile"
                className="edit-profile-button-sm"
              >
                <i className="icon icon-screw"></i>
              </Link>
            </>
          ) : (
            <button
              onClick={handleFollow}
              disabled={isLoading}
              className={`btn btn-primary ${isLoading ? 'loading' : null}`}
            >
              <span className="btn-text">
                {isFollowed ? 'Unfollow' : 'Follow'}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
