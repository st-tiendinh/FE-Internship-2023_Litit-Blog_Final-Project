import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import EditorForm from './components/EditorForm';
import { PostAction } from './components/EditorForm';
import { ScrollToTopButton } from '../../../shared/components';
import { useApi } from '../../../shared/hooks/useApi';
import { ENDPOINT } from '../../../../config/endpoint';

export interface PostEdittDataProps {
  cover: string;
  title: string;
  description: '';
  tags: string[];
  status: string;
  content: string;
}

const ArticleUpdate = () => {
  const location = useLocation();
  const currentPostId = location.pathname.split('/').pop();
  const [postData, setPostData] = useState<any>({});
  const { response, getApi } = useApi();

  useEffect(() => {
    getApi({
      url: `${ENDPOINT.users.index}/me/posts`,
    });
  }, [location.pathname]);

  useEffect(() => {
    if (response && !response.status) {
      getApi({
        url: `${ENDPOINT.posts.index}/${currentPostId}`,
      });
    }
  }, [response]);

  const selectedPost = useMemo(() => {
    if (response && !response.status) {
      const filteredPost = response.Posts.find(
        (post: any) => post.id.toString() === currentPostId
      );
      return { ...filteredPost, ...postData };
    } else if (response && response.status) {
      return { ...response, ...postData };
    }
    return null;
  }, [response?.status, postData, location.pathname]);

  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9 col-md-12">
            {selectedPost && (
              <EditorForm
                type={PostAction.UPDATE}
                postData={selectedPost}
                setPostData={setPostData}
              />
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ArticleUpdate;
