import { Link } from 'react-router-dom';

import { ArticleTagList } from './ArticleTagList';

import { PostItemWithIdProps } from '../../../../core/models/post';
import { UserDetailProps } from '../../../../core/models/user';
import { formatDate } from '../../../../shared/utils/formatDate';
import BlankPostImg from '../../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../../assets/images/blank-user.webp';

export interface ArticleContentProps {
  postItem: PostItemWithIdProps;
  cleanDescription: any;
  cleanContent: any;
  isValidCover: boolean;
  isShowButtonEdit?: boolean;
  isValidUserImg?: boolean;
  isLoading?: boolean;
  user?: UserDetailProps;
}

export const ArticleContent = ({
  postItem,
  user,
  isShowButtonEdit,
  isValidUserImg,
  isLoading,
  isValidCover,
  cleanContent,
  cleanDescription,
}: ArticleContentProps) => {
  return (
    <article className="article article-detail">
      {postItem?.tags && <ArticleTagList tags={postItem?.tags} />}
      <h2 className="article-detail-title">{postItem?.title}</h2>
      <div className="article-detail-content">
        <div className="article-detail-header">
          {user && (
            <div className="short-info">
              <div className="short-info-author">
                {user && (
                  <Link className="d-flex author-link" to={'/users/' + user.id}>
                    <div className="post-author">
                      <img
                        src={isValidUserImg ? user.picture : BlankUserImg}
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                      <span className="short-info-author-name">
                        {user.displayName}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              <span className="short-info-dot-symbol">&#x2022;</span>
              <span className="short-info-timestamp">
                {formatDate(postItem.updatedAt)}
              </span>
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
        <div
          className="article-detail-desc"
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        ></div>
        {isLoading ? (
          <div className="article-detail-cover-wrapper skeleton"></div>
        ) : (
          <div className="article-detail-cover-wrapper">
            <img
              src={isValidCover ? postItem.cover : BlankPostImg}
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
