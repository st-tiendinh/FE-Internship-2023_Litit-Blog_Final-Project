import { useEffect, useState } from 'react';

import { ArticleContent } from './components/ArticleContent';
import { ArticleEditor, PostAction } from './components/ArticleEditor';
import { KEYS, getLS } from '../../../core/helpers/storageHelper';
import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import DOMPurify from 'dompurify';
import { TogglePreview } from '../../../shared/components';

const ArticleNew = () => {
  const [articleData, setArticleData] = useState<any>();
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [isValidCover, setIsValidCover] = useState(false);
  const clean = DOMPurify.sanitize(articleData?.content);
  const postDesc = DOMPurify.sanitize(articleData?.description);

  const handlePreview = () => {
    setArticleData(JSON.parse(getLS(KEYS.DRAFT_DATA) as string));
  };

  useEffect(() => {
    isImageUrlValid(articleData?.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, articleData?.cover]);

  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9">
            <div className="editor-header">
              <TogglePreview
                isShowPreview={isShowPreview}
                setIsShowPreview={setIsShowPreview}
                handlePreview={handlePreview}
              />
            </div>
            <div className={`${!isShowPreview ? '' : 'd-none'}`}>
              <ArticleEditor type={PostAction.CREATE} />
            </div>
          </div>
          <div className="col col-7">
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
    </div>
  );
};

export default ArticleNew;
