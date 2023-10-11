import { useEffect, useState } from 'react';

import { FollowUser } from './FollowUser';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { UserFollow } from '../../../../core/models/user';
import { useLocation } from 'react-router-dom';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const ListFollowers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFollowers, setListFollowers] = useState<UserFollow[]>([]);
  const [listFollowings, setListFollowings] = useState<UserFollow[]>([]);
  const location = useLocation();
  const userId = location.pathname.split('/').pop();
  const isSettingPath = location.pathname.split('/').pop() === 'list-followers';

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    (async () => {
      try {
        setIsLoading(true);
        if (location.pathname.split('/').pop() === 'list-followers') {
          const response: any = await apiService.get([
            ENDPOINT.friends.followers,
          ]);
          setListFollowers(response);
          const data: any = await apiService.get([ENDPOINT.friends.followings]);
          setListFollowings(data);
          setIsLoading(false);
        } else {
          const response: any = await apiService.get([
            ENDPOINT.friends.index,
            `/${userId}/followers`,
          ]);
          setListFollowers(response);
          const data: any = await apiService.get([
            ENDPOINT.friends.index,
            `/${userId}/followings`,
          ]);
          setListFollowings(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="section followers-section">
      {isSettingPath && <h4 className="followers-section-title">Followers</h4>}
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
        ) : listFollowers.length ? (
          listFollowers.map((item: any) => {
            const isFollowed = listFollowings.filter(
              (user: any) => user.id === item.id
            ).length;

            return (
              <div
                key={item.id}
                className={`col col-${
                  isSettingPath ? '6' : '12'
                } col-md-12 col-sm-12`}
              >
                <FollowUser {...item} isFollowed={isFollowed} />
              </div>
            );
          })
        ) : (
          <p className="follow-user-message">No one is following you.</p>
        )}
      </div>
    </div>
  );
};

export default ListFollowers;
