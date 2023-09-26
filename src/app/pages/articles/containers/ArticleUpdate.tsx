import { useEffect, useState } from 'react';

import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { ApiService } from '../../../core/services/api.service';
import { useLocation } from 'react-router-dom';
import { ENDPOINT } from '../../../../config/endpoint';
import JwtHelper from '../../../core/helpers/jwtHelper';

const apiService = new ApiService();
const jwt = new JwtHelper();

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
      try {
        apiService.setHeaders(jwt.getAuthHeader());
        const response: any = await apiService.get([
          ENDPOINT.users.index,
          '/me/posts',
        ]);
        const currentPostId = location.pathname.split('/').pop();

        const filterPost = response.Posts.filter(
          (post: any) => post.id.toString() === currentPostId
        )[0];

        setPostData({
          cover: filterPost.cover,
          title: filterPost.title,
          description: filterPost.description,
          tags: filterPost.tags,
          status: filterPost.status,
          content: filterPost.content,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        try {
          const currentPostId = location.pathname.split('/').pop();
          apiService.setHeaders(jwt.getAuthHeader());
          const response: any = await apiService.get([
            ENDPOINT.posts.index,
            `${currentPostId}`,
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
        } catch (error) {
          console.log(error);
        }
      }
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
