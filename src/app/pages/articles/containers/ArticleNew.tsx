import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

import { ArticleContent } from './components/ArticleContent';
import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import { ScrollToTopButton, TogglePreview } from '../../../shared/components';

const ArticleNew = () => {
  const [articleData, setArticleData] = useState<any>();
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [isValidCover, setIsValidCover] = useState(false);
  const clean = DOMPurify.sanitize(articleData?.content);
  const postDesc = DOMPurify.sanitize(articleData?.description);

  useEffect(() => {
    isImageUrlValid(articleData?.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, articleData?.cover]);

  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9 col-md-12">
            <div className="editor-header">
              <TogglePreview
                isShowPreview={isShowPreview}
                setIsShowPreview={setIsShowPreview}
              />
            </div>
            <div className={`${!isShowPreview ? '' : 'd-none'}`}>
              <ArticleEditor
                type={PostAction.CREATE}
                setArticleData={setArticleData}
              />
            </div>
          </div>
          <div className="col col-7 col-md-12">
            <div className={`${isShowPreview ? '' : 'd-none'}`}>
              <ArticleContent
                postItem={articleData}
                isValidCover={isValidCover}
                cleanContent={clean}
                cleanDescription={postDesc}
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ArticleNew;
