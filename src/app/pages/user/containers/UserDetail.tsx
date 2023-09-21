import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { UserProfile } from './components/UserProfile';
import { UserPersonalPosts } from './components/UserPersonalPosts';
import { UserSideBar } from './components/UserSidebar';
import { UserChangePassword } from './components/UserChangePassword';

import { ApiService } from '../../../core/services/api.service';
import { RootState } from '../../../app.reducers';
import { ENDPOINT } from '../../../../config/endpoint';
import JwtHelper from '../../../core/helpers/jwtHelper';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export enum PostStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

type FilterType = 'public-post' | 'deleted-post' | 'change-password';

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const [userRecycleBin, setUserRecycleBin] = useState<any>([]);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [userStatistic, setUserStatistic] = useState<any>({});
  const [postAuthor, setPostAuthor] = useState<any>();
  const [userPost, setUserPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;

  const [filter, setFilter] = useState<FilterType>('public-post');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsUserLoading(true);
    (async () => {
      try {
        const response = await apiService.get([ENDPOINT.users.index, userId]);
        setUser(response);
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(false);
      }
    })();
  }, [location]);

  useEffect(() => {
    setIsUserLoading(true);
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.posts.recyclebin]);
        setUserRecycleBin(response.data);
      } catch (error) {
        console.log(error);
        setIsUserLoading(false);
      }
    })();
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.users.index, `${userId}/posts`]);

        const postPublicQuantity = await response.Posts.filter(
          (post: any) => post.status === PostStatus.PUBLIC
        ).length;

        const commentQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.comments,
          0
        );

        const likeQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.likes,
          0
        );

        const tagQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.tags.length,
          0
        );

        setUserStatistic({
          postPublicQuantity: postPublicQuantity,
          commentQuantity: commentQuantity,
          tagQuantity: tagQuantity,
          likeQuantity: likeQuantity,
        });

        setUserPost(response.Posts);
        setPostAuthor(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [location]);

  return (
    <div className="page-user">
      <div className="container">
        {isUserLoading ? (
          <div className="skeleton skeleton-user-profile">
            <div className="skeleton skeleton-user-avatar"></div>
          </div>
        ) : (
          <UserProfile isLoggedUser={isLoggedUser} user={user} />
        )}
        <section className="section section-wrapper">
          <div className="row">
            <div className="col col-4">
              {isLoading ? (
                <div className="skeleton skeleton-user-sidebar"></div>
              ) : (
                <UserSideBar userStatistic={userStatistic} />
              )}
            </div>
            <div className="col col-8">
              {jwtHelper.getUserInfo().userId.toString() === userId && (
                <ul className="filter">
                  <li
                    onClick={() => setFilter('public-post')}
                    className={`filter-item ${filter === 'public-post' ? 'active' : ''}`}
                  >
                    Public posts
                  </li>
                  <li
                    onClick={() => setFilter('deleted-post')}
                    className={`filter-item ${filter === 'deleted-post' ? 'active' : ''}`}
                  >
                    Deleted posts
                  </li>
                  <li
                    onClick={() => setFilter('change-password')}
                    className={`filter-item ${filter === 'change-password' ? 'active' : ''}`}
                  >
                    Change password
                  </li>
                </ul>
              )}
              {filter === 'change-password' && <UserChangePassword setFilter={setFilter} />}
              {filter === 'deleted-post' &&
                (isLoading ? (
                  <div className="skeleton skeleton-personal-list"></div>
                ) : (
                  <UserPersonalPosts userPost={userRecycleBin} postAuthor={postAuthor} />
                ))}
              {filter === 'public-post' &&
                (isLoading ? (
                  <div className="skeleton skeleton-personal-list"></div>
                ) : (
                  <UserPersonalPosts userPost={userPost} postAuthor={postAuthor} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetail;
