import { useEffect, useState } from 'react';

import { formatDate } from '../utils/formatDate';
import { isImageUrlValid } from '../utils/checkValidImage';
import BlankPostImg from '../../../assets/images/blank-post.png';
import BlankUserImg from '../../../assets/images/blank-user.webp';
import { Link, useLocation } from 'react-router-dom';
import { PostListType } from '../../pages/home/containers/components/PublicPost';
import { useDispatch } from 'react-redux';
import { setConfirmModalId, setShowModal } from '../../../redux/actions/modal';
import JwtHelper from '../../core/helpers/jwtHelper';
import { ApiService } from '../../core/services/api.service';
import { ENDPOINT } from '../../../config/endpoint';

interface PostProps {
  id: number;
  userId: number;
  title: string;
  desc: string;
  tags: string[];
  cover: string;
  authorImg: string; // Add a type to the authorImg prop
  authorName: string;
  postedDate: string;
  likes: number;
  comments: number;
  listType: PostListType;
  isHasAction?: boolean;
  isCanRestore?: boolean;
}

export const Post = ({
  id,
  userId,
  title,
  desc,
  tags,
  cover,
  authorImg,
  authorName,
  postedDate,
  likes,
  comments,
  listType,
  isHasAction,
  isCanRestore,
}: PostProps) => {
  const apiService = new ApiService();
  const jwtHelper = new JwtHelper();
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postedDate);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUserId = location.pathname.split('/').pop();

  const handleDelete = (id: number) => {
    dispatch(setConfirmModalId(id));
    dispatch(setShowModal());
  };

  const handleRestore = (id: number) => {
    apiService.setHeaders(jwtHelper.getAuthHeader());
    const res: any =  apiService.put([ENDPOINT.posts.index, `${id}/restore`]);
    console.log(res)
  };

  useEffect(() => {
    isImageUrlValid(cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, cover]);

  useEffect(() => {
    isImageUrlValid(authorImg).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidCover, cover, authorImg]);

  return (
    <>
      {listType === PostListType.GRID && (
        <div className="post">
          <Link to={`/articles/${id.toString()}`} className="post-image-wrapper">
            <img className="post-image" src={isValidCover ? cover : BlankPostImg} alt={title} />
          </Link>

          <div className="post-content">
            <div className="post-header">
              <div className="post-action">
                <span className="post-action-group">
                  <i className="icon icon-unlike"></i>
                  {likes}
                </span>

                <span className="post-action-group">
                  <i className="icon icon-comment"></i>
                  {comments}
                </span>
              </div>
              <div className="post-tags">
                {tags.slice(0, 2).map((tag: any, index: number) => (
                  <Link
                    to={`/articles/tag/${tag}`}
                    key={index}
                    className="badge badge-primary text-truncate"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="post-body">
              <div className="post-info">
                <Link to={`/articles/${id.toString()}`}>
                  <h4 className="post-title text-truncate">{title}</h4>
                </Link>
              </div>

              <div className="post-footer">
                <div className="post-about">
                  <Link className="author-link" to={'/users/' + userId}>
                    <div className="post-author">
                      <img
                        className="post-author-avatar"
                        src={isValidUserImg ? authorImg : BlankUserImg}
                        alt="author image"
                      />
                      <span className="post-author-name text-truncate">{authorName}</span>
                    </div>
                  </Link>
                  <span className="post-dot-symbol">&#x2022;</span>
                  <span className="post-date">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {listType === PostListType.LIST && (
        <div className="personal-post">
          <Link to={`/articles/${id.toString()}`} className="personal-post-image-link">
            <div className="personal-post-image-wrapper">
              <img
                src={isValidCover ? cover : BlankPostImg}
                alt={authorName}
                className="personal-post-image"
              />
            </div>
          </Link>

          <div className="d-flex flex-column personal-post-content">
            <div className="personal-post-card-header">
              <ul className="personal-post-tag-list">
                {tags.slice(0, 2).map((tag: any, index: number) => (
                  <li key={index} className="personal-post-tag-item">
                    <Link to={`/articles/tag/${tag}`} className="personal-post-tag-link">
                      <span className="badge badge-primary text-truncate">{tag}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* button 3dots, edit, delete, recycle */}
              {isHasAction && jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                <div className="personal-post-action">
                  <span className="btn btn-three-dots">
                    <i className="icon icon-three-dots"></i>
                    <div className="personal-post-action-popper">
                      <span className="btn btn-delete" onClick={() => handleDelete(id)}>
                        <i className="icon icon-bin"></i>
                        Delete
                      </span>
                      <Link to={`/articles/update/${id}`} className="btn btn-edit">
                        <i className="icon icon-pen"></i>
                        Edit
                      </Link>
                    </div>
                  </span>
                </div>
              )}
              {/* button restore */}
              {isCanRestore && jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                <div className="personal-post-action">
                  <span className="btn btn-three-dots">
                    <i className="icon icon-three-dots"></i>
                    <div className="personal-post-action-popper">
                      <span className="btn btn-restore" onClick={() => handleRestore(id)}>
                        <i className="icon icon-restore"></i>
                        Restore
                      </span>
                    </div>
                  </span>
                </div>
              )}
            </div>
            <div className="personal-post-title-wrapper">
              <Link to={`/articles/${id.toString()}`}>
                <h4 className="personal-post-title text-truncate">{title}</h4>
              </Link>
            </div>
            <div className="personal-post-action">
              <span className="personal-post-action-group">
                <i className="icon icon-unlike"></i>
                {likes}
              </span>

              <span className="personal-post-action-group">
                <i className="icon icon-comment"></i>
                {comments}
              </span>
            </div>
            <div className="short-info">
              <Link to={`/users/${userId}`} className="author-link">
                <div className="short-info-author">
                  <img
                    src={isValidUserImg ? authorImg : BlankUserImg}
                    alt="author avatar"
                    className="short-info-author-avatar"
                  />
                  <span className="short-info-author-name text-truncate">{authorName}</span>
                </div>
              </Link>
              <span className="short-info-dot-symbol">&#x2022;</span>
              <span className="short-info-timestamp">{formattedDate}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
