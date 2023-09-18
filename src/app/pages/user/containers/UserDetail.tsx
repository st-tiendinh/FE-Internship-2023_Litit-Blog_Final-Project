import { UserPersonalPosts } from './components/UserPersonalPosts';
import { UserProfile } from './components/UserProfile';
import { UserSideBar } from './components/UserSidebar';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../../../config/endpoint';
import JwtHelper from '../../../core/helpers/jwtHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app.reducers';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;

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
      <section className="section section-wrapper">
        <div className="container">
          <div className="row">
            <div className="col col-4">
              <UserSideBar />
            </div>
            <div className="col col-8">
              <UserPersonalPosts />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetail;
