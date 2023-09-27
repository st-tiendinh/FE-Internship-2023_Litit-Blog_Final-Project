import { useEffect, useState } from 'react';

import { FollowUser } from './FollowUser';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const ListFollowings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFollowings, setListFollowings] = useState<any>([]);

  useEffect(() => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    (async () => {
      try {
        setIsLoading(true);
        const response: any = await apiService.get([
          ENDPOINT.friends.followings,
        ]);
        setListFollowings(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="section followings-section">
      <h4 className="followings-section-title">List Followings</h4>
      <div className="row">
        {isLoading ? (
          [1, 2].map((item: number) => (
            <div key={item} className="col col-6 col-md-12 col-sm-12">
              <div className="skeleton follow-user-skeleton"></div>
            </div>
          ))
        ) : listFollowings.length ? (
          listFollowings.map((item: any) => (
            <div key={item.id} className="col col-6 col-md-12 col-sm-12">
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
