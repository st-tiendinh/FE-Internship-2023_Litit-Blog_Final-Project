import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserProfile } from './components/UserProfile';
import { UserPersonalPost } from './components/UserPersonalPost';
import NotFound from '../../../shared/components/NotFound';

import JwtHelper from '../../../core/helpers/jwtHelper';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';
import { UserSideBar } from './components/UserSidebar';

export enum FilterType {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
  MORE_POPULAR = 'More popular',
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const UserDetail = () => {
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;

  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const isCurrentUser = jwtHelper.isCurrentUser(
          +`${location.pathname.split('/').pop()}`
        );
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = isCurrentUser
          ? await apiService.get([ENDPOINT.users.index, 'me/posts'])
          : await apiService.get([ENDPOINT.users.index, `${userId}/posts`]);
        setUser(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isError ? (
        <NotFound
          typeError="User"
          message="The user you are looking for does not exist."
        />
      ) : (
        <div className="page-user">
          <div className="container">
            {isLoading ? (
              <div className="skeleton skeleton-user-profile"></div>
            ) : (
              <UserProfile isLoggedUser={isLoggedUser} user={user} />
            )}
            <section className="section section-wrapper">
              <div className="row">
                <div className="col col-4 col-md-12">
                  <UserSideBar />
                </div>
                <div className="col col-8 col-md-12">
                  <UserPersonalPost />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
