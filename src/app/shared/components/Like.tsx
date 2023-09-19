import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import JwtHelper from '../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from '../../core/services/api.service';
import { RootState } from '../../app.reducers';

const Like = ({ postId }: any) => {
  const apiService = new ApiService();
  const jwt = new JwtHelper();

  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeNumber, setLikeNumber] = useState<number>(0);

  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
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
          location.pathname.slice(10),
        ]);
        setLikeNumber(response.likes);
        return response;
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLiked]);

  useEffect(() => {
    (async () => {
      try {
        const response: any = await apiService.get([
          ENDPOINT.posts.index,
          location.pathname.slice(10).toString() + '/likes',
        ]);
        const isHaveUserId = response.filter(
          (item: any) => item.userId === userInfo.userId
        );
        if (isHaveUserId.length > 0) {
          setIsLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <li onClick={handleLike} className="article-action-item">
      <span className="tooltip tooltip-left">Likes</span>
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
