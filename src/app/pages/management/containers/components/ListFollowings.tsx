import { useEffect, useState } from 'react';

import { FollowUser } from './FollowUser';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { UserFollow } from '../../../../core/models/user';
import { useLocation } from 'react-router-dom';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const ListFollowings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFollowings, setListFollowings] = useState<UserFollow[]>([]);
  const location = useLocation();
  const userId = location.pathname.split('/').pop();
  const isSettingPath =
    location.pathname.split('/').pop() === 'list-followings';

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    setTimeout(() => {
      (async () => {
        try {
          setIsLoading(true);
          if (location.pathname.split('/').pop() === 'list-followings') {
            const response: any = await apiService.get([
              ENDPOINT.friends.followings,
            ]);
            setListFollowings(response);
            setIsLoading(false);
          } else {
            const response: any = await apiService.get([
              ENDPOINT.friends.index,
              `/${userId}/followings`,
            ]);
            setListFollowings(response);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })();
    }, 500);
  }, []);

  return (
    <div className="section followings-section">
      {isSettingPath && (
        <h4 className="followings-section-title">Followings</h4>
      )}
      <div className="row">
        {isLoading ? (
          [1, 2].map((item: number) => (
            <div
              key={item}
              className={`col col-${
                isSettingPath ? '6' : '12'
              } col-md-12 col-sm-12`}
            >
              <div className="skeleton follow-user-skeleton"></div>
            </div>
          ))
        ) : listFollowings.length ? (
          listFollowings.map((item: any) => (
            <div
              key={item.id}
              className={`col col-${
                isSettingPath ? '6' : '12'
              } col-md-12 col-sm-12`}
            >
              <FollowUser {...item} isFollowed={true} />
            </div>
          ))
        ) : (
          <p className="follow-user-message">You're not following anyone.</p>
        )}
      </div>
    </div>
  );
};

export default ListFollowings;
