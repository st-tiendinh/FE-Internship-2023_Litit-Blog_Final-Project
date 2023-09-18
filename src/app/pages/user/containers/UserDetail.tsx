import { UserProfile } from './components/UserProfile';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../../../config/endpoint';
import JwtHelper from '../../../core/helpers/jwtHelper';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = jwtHelper.isCurrentUser(+userId);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiService.get([ENDPOINT.users.index, userId]);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);

  return (
    <div className="page-user">
      <UserProfile isLoggedUser={isLoggedUser} user={user} />
    </div>
  );
};

export default UserDetail;
