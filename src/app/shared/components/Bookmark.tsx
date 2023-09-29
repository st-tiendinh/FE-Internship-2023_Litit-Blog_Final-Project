import { useState, useEffect } from 'react';

import { ApiService } from '../../core/services/api.service';
import JwtHelper from '../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../config/endpoint';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app.reducers';

const Bookmark = ({ tooltip }: any) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const apiService = new ApiService();
  const jwt = new JwtHelper();
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/').pop();

  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);

  const handleBookmark = async () => {
    if (!isLogged) {
      navigate(`/auth/login?callback=${location.pathname}`);
    } else {
      try {
        apiService.setHeaders(jwt.getAuthHeader());
        const response: any = await apiService.post([ENDPOINT.bookmarks.index], { postId });
        if (response.isInBookmark) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        apiService.setHeaders(jwt.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.bookmarks.index]);

        const isHavePostId = response.filter((item: any) => item.postId.toString() === postId);
        if (isHavePostId.length > 0) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isBookmarked, location.pathname, postId]);

  return (
    <>
      <li onClick={handleBookmark} className="article-action-item">
        <span className={`tooltip tooltip-${tooltip ? 'bottom' : 'left'}`}>Bookmark</span>
        {isBookmarked ? (
          <i className="icon icon-bookmark-fulfill"></i>
        ) : (
          <i className="icon icon-bookmark"></i>
        )}
      </li>
    </>
  );
};

export default Bookmark;
