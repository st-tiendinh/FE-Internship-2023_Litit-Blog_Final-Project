import { useEffect, useState } from 'react';

import { FollowUser } from './FollowUser';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const ListFollowers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFollowers, setListFollowers] = useState<any>([]);

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    (async () => {
      try {
        setIsLoading(true);
        const response: any = await apiService.get([
          ENDPOINT.friends.followers,
        ]);
        setListFollowers(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="section followers-section">
      <h4 className="followers-section-title">List Followers</h4>
      <div className="row">
        {isLoading ? (
          [1, 2].map((item: number) => (
            <div key={item} className="col col-6 col-md-12 col-sm-12">
              <div className="skeleton follow-user-skeleton"></div>
            </div>
          ))
        ) : listFollowers.length ? (
          listFollowers.map((item: any) => (
            <div key={item.id} className="col col-6 col-md-12 col-sm-12">
              <FollowUser {...item} isFollowed={false} />
            </div>
          ))
        ) : (
          <p className="follow-user-message">No one is following you.</p>
        )}
      </div>
    </div>
  );
};

export default ListFollowers;
