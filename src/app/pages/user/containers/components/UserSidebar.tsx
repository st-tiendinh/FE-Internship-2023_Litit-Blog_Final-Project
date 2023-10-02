import { useEffect, useState } from 'react';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { PostStatus } from '../../../../shared/components/PostList';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../../app.reducers';
import { useSelector } from 'react-redux';
import { UserStatistic } from '../../../../core/models/user';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const UserSideBar = () => {
  const location = useLocation();
  const userId = location.pathname.slice(7);
  const [isFetchDataLoading, setIsFetchDataLoading] = useState<boolean>(false);
  const [userStatistic, setUserStatistic] = useState<UserStatistic>({
    postPublicQuantity: 0,
    commentQuantity: 0,
    tagQuantity: 0,
    likeQuantity: 0,
  });
  const isModalLoading = useSelector(
    (state: RootState) => state.modalReducer.isLoading
  );

  useEffect(() => {
    (async () => {
      try {
        setIsFetchDataLoading(true);
        const isCurrentUser = jwtHelper.isCurrentUser(
          +`${location.pathname.split('/').pop()}`
        );
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = isCurrentUser
          ? await apiService.get([ENDPOINT.users.index, 'me/posts'])
          : await apiService.get([ENDPOINT.users.index, `${userId}/posts`]);
        const postPublicQuantity = await response.Posts.filter(
          (post: any) => post.status === PostStatus.PUBLIC
        ).length;
        const commentQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr.comments,
          0
        );
        const likeQuantity = await response.Posts.reduce(
          (acc: any, curr: any) => acc + curr?.likes,
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
        setIsFetchDataLoading(false);
      } catch (error) {
        console.log(error);
        setIsFetchDataLoading(false);
      }
    })();
  }, [isModalLoading, location.pathname]);

  return (
    <aside className="user-sidebar">
      {isFetchDataLoading ? (
        <div className="skeleton skeleton-user-sidebar"></div>
      ) : (
        <ul className="statistic-list">
          <div className="row">
            <div className="col col-12 col-md-3 col-sm-6">
              <li className="statistic-item">
                <i className="icon icon-post-number"></i>
                <p className="statistic-text">
                  {userStatistic.postPublicQuantity} post published
                </p>
              </li>
            </div>
            <div className="col col-12 col-md-3 col-sm-6">
              <li className="statistic-item">
                <i className="icon icon-comments-number"></i>
                <p className="statistic-text">
                  {userStatistic.commentQuantity} comments
                </p>
              </li>
            </div>
            <div className="col col-12 col-md-3 col-sm-6">
              <li className="statistic-item">
                <i className="icon icon-followed-tag"></i>
                <p className="statistic-text">
                  {userStatistic.tagQuantity} tags
                </p>
              </li>
            </div>
            <div className="col col-12 col-md-3 col-sm-6">
              <li className="statistic-item">
                <i className="icon icon-like-normal"></i>
                <p className="statistic-text">
                  {userStatistic.likeQuantity} likes
                </p>
              </li>
            </div>
          </div>
        </ul>
      )}
    </aside>
  );
};
