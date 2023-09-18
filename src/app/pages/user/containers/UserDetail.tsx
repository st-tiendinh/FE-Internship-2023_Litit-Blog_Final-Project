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

export enum PostStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

const UserDetail = () => {
  const [user, setUser] = useState<any>({});
  const [userStatistic, setUserStatistic] = useState<any>({});
  const [postAuthor, setPostAuthor] = useState<any>();
  const [userPost, setUserPost] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([
          ENDPOINT.users.index,
          `${userId}/posts`,
        ]);

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
      <UserProfile isLoggedUser={isLoggedUser} user={user} />
      <section className="section section-wrapper">
        <div className="container">
          <div className="row">
            <div className="col col-4">
              {!isLoading && <UserSideBar userStatistic={userStatistic} />}
            </div>
            <div className="col col-8">
              {!isLoading && (
                <UserPersonalPosts
                  userPost={userPost}
                  postAuthor={postAuthor}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetail;
