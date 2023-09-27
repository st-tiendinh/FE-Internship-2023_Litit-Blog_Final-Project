import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const FollowUser = (user: any) => {
  const [isFollowed, setIsFollowed] = useState(user.isFollowed);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = () => {
    (async () => {
      try {
        setIsLoading(true);
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.post([ENDPOINT.friends.follow], {
          followingId: user.id,
        });
        setIsFollowed(!isFollowed);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="d-flex follow-user">
      <Link className="follow-user-link" to={`/users/${user.id}`}>
        <div className="d-flex follow-user-about">
          <div className="follow-user-avatar-wrapper">
            <img
              className="follow-user-avatar"
              src={user.picture}
              alt="Avatar"
            />
          </div>
          <div className="follow-user-info">
            <p className="follow-user-name text-truncate">
              {user.firstName + ' ' + user.lastName}
            </p>
            <p className="follow-user-display-name text-truncate">
              @{user.displayName}
            </p>
          </div>
        </div>
      </Link>
      <div className="follow-user-action">
        <button
          className={`btn btn-primary ${isLoading ? 'loading' : null}`}
          onClick={handleFollow}
        >
          <span className="btn-text">{isFollowed ? 'Followed' : 'Follow'}</span>
        </button>
      </div>
    </div>
  );
};
