import { useEffect, useState } from 'react';

import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { ApiService } from '../../../core/services/api.service';
import { useLocation } from 'react-router-dom';
import { ENDPOINT } from '../../../../config/endpoint';

const apiService = new ApiService();

const ArticleUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState({
    title: '',
    status: '',
    content: '',
  });
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const response: any = await apiService.get([
        ENDPOINT.posts.index,
        `${location.pathname.split('/').pop()}`,
      ]);
      setPostData({
        title: response.title,
        status: response.status,
        content: response.content,
      });
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9">
            {!isLoading && (
              <ArticleEditor type={PostAction.UPDATE} data={postData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleUpdate;
