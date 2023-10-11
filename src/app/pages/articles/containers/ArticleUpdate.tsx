import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import EditorForm from './components/EditorForm';
import NotFound from '../../../shared/components/NotFound';
import { ScrollToTopButton } from '../../../shared/components';
import { PostAction } from './components/EditorForm';

import { useApi } from '../../../shared/hooks/useApi';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';

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
  const { response, error, getApi } = useApi();
  const currentUserId = useSelector(
    (state: RootState) => state.authReducer.userInfo?.id
  );

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
        {selectedPost && selectedPost.userId === currentUserId && (
          <EditorForm
            type={PostAction.UPDATE}
            postData={selectedPost}
            setPostData={setPostData}
          />
        )}
        {(selectedPost && selectedPost?.userId !== currentUserId) ||
          (error && (
            <NotFound
              typeError="Post"
              message="The post you are looking for does not exist."
            />
          ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ArticleUpdate;
