import { useEffect, useState } from 'react';

import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { ApiService } from '../../../core/services/api.service';
import { useLocation } from 'react-router-dom';
import { ENDPOINT } from '../../../../config/endpoint';

const apiService = new ApiService();

export interface PostEdittDataProps {
  cover: string;
  title: string;
  description: '';
  tags: string[];
  status: string;
  content: string;
}

const ArticleUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<PostEdittDataProps>({
    cover: '',
    title: '',
    description: '',
    tags: [],
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
        cover: response.cover,
        title: response.title,
        description: response.description,
        tags: response.tags,
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
