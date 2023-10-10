import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { ArticleTagList } from './ArticleTagList';

import { PostItemWithIdProps } from '../../../../core/models/post';
import { UserDetailProps } from '../../../../core/models/user';
import { formatDate } from '../../../../shared/utils/formatDate';
import BlankPostImg from '../../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../../assets/images/blank-user.webp';
import { PostStatus } from '../../../../shared/components/PostList';
import { RootState } from '../../../../app.reducers';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';

export interface ArticleContentProps {
  postData: PostItemWithIdProps;
  cleanContent: any;
  isShowButtonEdit?: boolean;
  isValidUserImg?: boolean;
  isLoading?: boolean;
  user?: UserDetailProps;
}

const ArticleContent = ({
  postData,
  user,
  isShowButtonEdit,
  isValidUserImg,
  isLoading,
  cleanContent,
}: ArticleContentProps) => {
  const location = useLocation();
  const [isValidCover, setIsValidCover] = useState(false);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    isImageUrlValid(postData?.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, postData?.cover]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <article className="article article-detail">
      <h2 className="article-detail-title">{postData?.title}</h2>
      {postData?.tags?.length ? <ArticleTagList tags={postData?.tags} /> : null}
      <div className="article-detail-content">
        <div className="article-detail-header">
          {user && (
            <div className="short-info">
              <div className="short-info-author">
                {user && (
                  <div className="post-author">
                    <Link
                      className="d-flex author-link"
                      to={
                        isLogged
                          ? '/users/' + user.id
                          : '/auth/login?callback=' + '/users/' + user.id
                      }
                    >
                      <img
                        src={isValidUserImg ? user.picture : BlankUserImg}
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                    </Link>
                    <div className="d-flex flex-column">
                      <Link
                        className="d-flex author-link"
                        to={
                          isLogged
                            ? '/users/' + user.id
                            : '/auth/login?callback=' + '/users/' + user.id
                        }
                      >
                        <span className="short-info-author-name">
                          {user.displayName}
                        </span>
                      </Link>
                      <span className="short-info-timestamp">
                        {formatDate(postData?.updatedAt)}
                        {postData?.status === PostStatus.PRIVATE ? (
                          <i className="icon icon-lock"></i>
                        ) : (
                          <i className="icon icon-earth"></i>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isShowButtonEdit && (
            <Link
              to={`/articles/update/${location.pathname.split('/').pop()}`}
              className="btn btn-edit"
            >
              <i className="icon icon-pen"></i>
              Edit
            </Link>
          )}
        </div>
        <div className="article-detail-desc">{postData?.description}</div>
        {isLoading ? (
          <div className="article-detail-cover-wrapper skeleton"></div>
        ) : (
          <div className="article-detail-cover-wrapper">
            <img
              src={isValidCover ? postData.cover : BlankPostImg}
              alt="article cover"
              className="article-detail-cover"
            />
          </div>
        )}
        <div
          className="article-detail-paragraph"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        ></div>
      </div>
    </article>
  );
};

export default React.memo(ArticleContent);
