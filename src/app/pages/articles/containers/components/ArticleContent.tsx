import { Link } from 'react-router-dom';

import { ArticleTagList } from './ArticleTagList';

import { PostItemWithIdProps } from '../../../../core/models/post';
import { UserDetailProps } from '../../../../core/models/user';
import { formatDate } from '../../../../shared/utils/formatDate';
import BlankPostImg from '../../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../../assets/images/blank-user.webp';
import { PostStatus } from '../../../../shared/components/PostList';

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
                  <div className="post-author">
                    <Link
                      className="d-flex author-link"
                      to={'/users/' + user.id}
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
                        to={'/users/' + user.id}
                      >
                        <span className="short-info-author-name">
                          {user.displayName}
                        </span>
                      </Link>
                      <span className="short-info-timestamp">
                        {formatDate(postItem?.updatedAt)}
                        {postItem?.status === PostStatus.PRIVATE ? (
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
