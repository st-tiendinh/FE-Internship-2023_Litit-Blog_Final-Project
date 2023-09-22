import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserProfile } from './components/UserProfile';
import { UserSideBar } from './components/UserSidebar';
import { ModalType } from '../../../shared/components/Modal';
import { Modal } from '../../../shared/components';
import { UserChangePassword } from './components/UserChangePassword';
import { UserUpdateProfile } from './components/UserUpdateProfile';

import JwtHelper from '../../../core/helpers/jwtHelper';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';
import PostList from '../../../shared/components/PostList';
import { PostListType } from '../../home/containers/components/PublicPost';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export enum PostStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

type FilterType =
  | 'public-post'
  | 'deleted-post'
  | 'change-password'
  | 'update-profile';

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const [userRecycleBin, setUserRecycleBin] = useState<any>([]);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [userStatistic, setUserStatistic] = useState<any>({});
  const [userPosts, setUserPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggleDeletedPost, setToggleDeletedPost] = useState<boolean>(false);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;
  const id = useSelector((state: RootState) => state.modalReducer.id);
  const [filter, setFilter] = useState<FilterType>('public-post');

  const handleSoftDelete = () => {
    (async () => {
      apiService.setHeaders(jwtHelper.getAuthHeader());
      await apiService.delete([ENDPOINT.posts.index, `${id}`]);
      setToggleDeletedPost(!toggleDeletedPost);
    })();
  };

  useEffect(() => {
    setIsUserLoading(true);
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.posts.recyclebin]);

        setUserRecycleBin(response.data);
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(false);
      }
    })();
  }, [location, toggleDeletedPost]);

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

        const { Posts, ...other } = response;

        const newPostsArr = response.Posts.map((item: any) => {
          const newPost = { ...item, user: other };
          return newPost;
        });

        setUserPost(newPostsArr);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [location, toggleDeletedPost]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-user">
      <div className="container">
        <Modal
          title="Do you want to delete?!!"
          type={ModalType.CONFIRM_DELETE}
          action={handleSoftDelete}
        />

        {isUserLoading ? (
          <div className="skeleton skeleton-user-profile">
            <div className="skeleton skeleton-user-avatar"></div>
          </div>
        ) : (
          <UserProfile
            isLoggedUser={isLoggedUser}
            user={user}
            setFilter={setFilter}
          />
        )}
        <section className="section section-wrapper">
          {jwtHelper.getUserInfo().userId.toString() === userId && (
            <ul className="filter">
              <li
                onClick={() => setFilter('public-post')}
                className={`filter-item ${
                  filter === 'public-post' ? 'active' : ''
                }`}
              >
                My posts
              </li>
              <li
                onClick={() => setFilter('deleted-post')}
                className={`filter-item ${
                  filter === 'deleted-post' ? 'active' : ''
                }`}
              >
                Deleted posts
              </li>
              <li
                onClick={() => setFilter('update-profile')}
                className={`filter-item ${
                  filter === 'update-profile' ? 'active' : ''
                }`}
              >
                My Profile
              </li>
              <li
                onClick={() => setFilter('change-password')}
                className={`filter-item ${
                  filter === 'change-password' ? 'active' : ''
                }`}
              >
                Change password
              </li>
            </ul>
          )}
          <div className="row">
            <div className="col col-4">
              {isLoading ? (
                <div className="skeleton skeleton-user-sidebar"></div>
              ) : (
                <UserSideBar userStatistic={userStatistic} />
              )}
            </div>
            <div className="col col-8">
              {filter === 'change-password' && (
                <UserChangePassword setFilter={setFilter} />
              )}
              {filter === 'deleted-post' &&
                (isLoading ? (
                  <div className="skeleton skeleton-personal-list"></div>
                ) : (
                  <PostList posts={userRecycleBin} type={PostListType.LIST} />
                ))}
              {filter === 'public-post' &&
                (isLoading ? (
                  <div className="skeleton skeleton-personal-list"></div>
                ) : (
                  <PostList
                    posts={userPosts}
                    type={PostListType.LIST}
                    isHasAction={true}
                  />
                ))}
              {filter === 'update-profile' && <UserUpdateProfile {...user} />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetail;
