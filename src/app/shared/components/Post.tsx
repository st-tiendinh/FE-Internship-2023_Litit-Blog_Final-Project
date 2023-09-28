import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { formatDate } from '../utils/formatDate';
import { isImageUrlValid } from '../utils/checkValidImage';
import BlankPostImg from '../../../assets/images/blank-post.png';
import BlankUserImg from '../../../assets/images/blank-user.webp';
import { PostListType } from '../../pages/home/containers/components/PublicPost';
import { setShowModal } from '../../../redux/actions/modal';
import JwtHelper from '../../core/helpers/jwtHelper';
import { PostStatus } from './PostList';
import { RootState } from '../../app.reducers';
import { ModalType } from './Modal';
import { ENDPOINT } from '../../../config/endpoint';
import { ApiService } from '../../core/services/api.service';
import { setShowToast } from '../../../redux/actions/toast';
import { ToastTypes } from './Toast';

interface PostProps {
  id: number;
  userId: number;
  title: string;
  desc: string;
  tags: string[];
  status: string;
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
  tags,
  status,
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
  const jwtHelper = new JwtHelper();
  const apiService = new ApiService();
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postedDate);
  const dispatch = useDispatch();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const currentUserId = useSelector(
    (state: RootState) => state.authReducer.userInfo?.id
  );

  const handleDelete = () => {
    dispatch(
      setShowModal({
        type: ModalType.DANGER,
        message: 'Are you sure you want to delete this post?',
        id: id,
        onConfirm: handleSoftDelete,
      })
    );
  };

  const handleSoftDelete = () => {
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.delete([ENDPOINT.posts.index, `${id}`]);

        dispatch(
          setShowToast({
            type: ToastTypes.SUCCESS,
            title: 'Delete successfully!',
            message: 'Your post have been deleted!',
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(
          setShowToast({
            type: ToastTypes.ERROR,
            title: 'Delete failed!!',
            message: 'Something went wrong!',
          })
        );
      }
    })();
  };

  const handleRestorePost = () => {
    (async () => {
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.put([ENDPOINT.posts.index, `${id}/restore`]);

        dispatch(
          setShowToast({
            type: ToastTypes.SUCCESS,
            title: 'Restore successfully!',
            message: 'Your post have been restored!',
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleRestore = () => {
    dispatch(
      setShowModal({
        type: ModalType.INFO,
        message: 'Are you sure you want to restore this post?',
        onConfirm: handleRestorePost,
        id: id,
      })
    );
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
          <Link
            to={`/articles/${id.toString()}`}
            className="post-image-wrapper"
          >
            <img
              className="post-image"
              src={isValidCover ? cover : BlankPostImg}
              alt={title}
            />
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
                    title={tag}
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
                      <span
                        title={authorName}
                        className="post-author-name text-truncate"
                      >
                        {authorName}
                      </span>
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
          <Link
            to={
              status === PostStatus.DRAFT
                ? `/articles/update/${id.toString()}`
                : `/articles/${id.toString()}`
            }
            className="personal-post-image-link"
          >
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
              <div className="personal-post-title-wrapper">
                <Link
                  to={
                    status === PostStatus.DRAFT
                      ? `/articles/update/${id.toString()}`
                      : `/articles/${id.toString()}`
                  }
                >
                  <h4 className="personal-post-title text-truncate">{title}</h4>
                </Link>
              </div>
              {isLogged &&
                isHasAction &&
                jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                  <div className="personal-post-options">
                    <span className="btn btn-three-dots">
                      <i className="icon icon-three-dots"></i>
                      <div className="personal-post-action-popper">
                        <Link
                          to={`/articles/update/${id}`}
                          className="btn btn-edit"
                        >
                          <i className="icon icon-pen"></i>
                          Edit
                        </Link>
                        <span
                          className="btn btn-delete"
                          onClick={() => handleDelete()}
                        >
                          <i className="icon icon-bin"></i>
                          Delete
                        </span>
                      </div>
                    </span>
                  </div>
                )}
              {isLogged &&
                isCanRestore &&
                jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                  <div className="personal-post-options">
                    <span className="btn btn-three-dots">
                      <i className="icon icon-three-dots"></i>
                      <div className="personal-post-action-popper">
                        <span
                          className="btn btn-restore"
                          onClick={() => handleRestore()}
                        >
                          <i className="icon icon-restore"></i>
                          Restore
                        </span>
                      </div>
                    </span>
                  </div>
                )}
            </div>
            <ul className="personal-post-tag-list">
              {tags.slice(0, 2).map((tag, index) => (
                <li key={index} className="personal-post-tag-item">
                  <Link
                    to={`/articles/tag/${tag}`}
                    className="personal-post-tag-link"
                    title={tag}
                  >
                    <span className="badge badge-primary text-truncate">
                      {tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
            <div className="short-info-wrapper">
              <div className="short-info">
                <Link to={`/users/${userId}`} className="author-link">
                  <div className="short-info-author">
                    <img
                      src={isValidUserImg ? authorImg : BlankUserImg}
                      alt="author avatar"
                      className="short-info-author-avatar"
                    />
                    <span
                      title={authorName}
                      className="short-info-author-name text-truncate"
                    >
                      {authorName}
                    </span>
                  </div>
                </Link>
                <span className="short-info-dot-symbol">&#x2022;</span>
                <span className="short-info-timestamp">{formattedDate}</span>
              </div>
              {isLogged &&
                isHasAction &&
                jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                  <div className="short-info-status">
                    <span className="badge badge-status">
                      {(status === PostStatus.PUBLIC && (
                        <i className="icon icon-earth"></i>
                      )) ||
                        (status === PostStatus.PRIVATE && (
                          <i className="icon icon-lock"></i>
                        )) ||
                        (status === PostStatus.DRAFT && (
                          <i className="icon icon-draft-small"></i>
                        ))}
                      {status}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
