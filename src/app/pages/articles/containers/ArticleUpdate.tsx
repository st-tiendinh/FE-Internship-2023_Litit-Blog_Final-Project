import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { ArticleContent } from './components/ArticleContent';
import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import { TogglePreview } from '../../../shared/components';

import { ApiService } from '../../../core/services/api.service';
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
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [isValidCover, setIsValidCover] = useState(false);
  const clean = DOMPurify.sanitize(postData.content);
  const postDesc = DOMPurify.sanitize(postData.description);
  const location = useLocation();

  useEffect(() => {
    isImageUrlValid(postData?.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, postData?.cover]);

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
          {!isLoading && (
            <>
              <div className="col col-9">
                <div className="editor-header">
                  <TogglePreview
                    isShowPreview={isShowPreview}
                    setIsShowPreview={setIsShowPreview}
                  />
                </div>
                <div className={`${!isShowPreview ? '' : 'd-none'}`}>
                  <ArticleEditor type={PostAction.UPDATE} data={postData} />
                </div>
              </div>
              <div className="col col-7">
                <div className={`${isShowPreview ? '' : 'd-none'}`}>
                  <ArticleContent
                    postItem={postData}
                    isValidCover={isValidCover}
                    cleanContent={clean}
                    cleanDescription={postDesc}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleUpdate;
