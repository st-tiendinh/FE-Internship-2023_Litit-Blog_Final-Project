import { useState, useEffect } from 'react';

import { ApiService } from '../../core/services/api.service';
import JwtHelper from '../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../config/endpoint';

const Bookmark = ({ tooltip }: any) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const postId = location.pathname.split('/').pop();

  const apiService = new ApiService();
  const jwt = new JwtHelper();

  const handleBookmark = async () => {
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
