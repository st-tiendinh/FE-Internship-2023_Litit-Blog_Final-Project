import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import JwtHelper from '../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from '../../core/services/api.service';
import { RootState } from '../../app.reducers';

const Like = ({ postId, tooltip }: any) => {
  const apiService = new ApiService();
  const jwt = new JwtHelper();

  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeNumber, setLikeNumber] = useState<number>(0);

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  const handleLike = async () => {
    try {
      apiService.setHeaders(jwt.getAuthHeader());
      const response: any = await apiService.put([
        ENDPOINT.posts.index,
        postId + '/likes',
      ]);
      if (response.liked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response: any = await apiService.get([
          ENDPOINT.posts.index,
          postId,
        ]);
        setLikeNumber(response?.likes);
        return response;
      } catch (error) {
        apiService.setHeaders(jwt.getAuthHeader());
        const response: any = await apiService.get([
          ENDPOINT.users.index,
          'me/posts',
        ]);
        const filterPost = response.Posts.find(
          (item: any) =>
            item.id.toString() === location.pathname.split('/').pop()
        );
        setLikeNumber(filterPost?.likes);
        console.log(error);
      }
    })();
  }, [isLiked, isLogged, location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const response: any = await apiService.get([
          ENDPOINT.posts.index,
          postId + '/likes',
        ]);
        const isHaveUserId = response.filter(
          (item: any) => item.userId === jwt.getUserInfo().userId
        );
        if (isHaveUserId.length > 0) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLogged]);

  return (
    <li onClick={handleLike} className="article-action-item">
      <span className={`tooltip tooltip-${tooltip ? 'bottom' : 'left'}`}>
        Likes
      </span>
      {isLiked ? (
        <i className="icon icon-like-fulfill"></i>
      ) : (
        <i className="icon icon-like-normal"></i>
      )}
      {likeNumber}
    </li>
  );
};

export default Like;
