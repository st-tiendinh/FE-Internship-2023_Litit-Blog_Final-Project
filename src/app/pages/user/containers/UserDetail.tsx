import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserProfile } from './components/UserProfile';
import { UserSideBar } from './components/UserSidebar';
import PostList, { PostStatus } from '../../../shared/components/PostList';

import JwtHelper from '../../../core/helpers/jwtHelper';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';
import { PostListType } from '../../home/containers/components/PublicPost';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const [userStatistic, setUserStatistic] = useState<any>({});
  const [userPosts, setUserPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const isLoggedUser = isLogged ? jwtHelper.isCurrentUser(+userId) : false;

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

        setUserPost(isLoggedUser ? newPostsArr.reverse() : newPostsArr);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [location, isLoggedUser, userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-user">
      <div className="container">
        {isLoading ? (
          <div className="skeleton skeleton-user-profile"></div>
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
              {isLoading ? (
                <div className="skeleton skeleton-personal-list"></div>
              ) : (
                <PostList
                  posts={userPosts}
                  type={PostListType.LIST}
                  isHasAction={true}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetail;
