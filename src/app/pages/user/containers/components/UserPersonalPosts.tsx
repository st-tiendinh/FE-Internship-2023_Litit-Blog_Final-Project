import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { formatDate } from '../../../../shared/utils/formatDate';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';
import {
  setConfirmModalId,
  setShowModal,
} from '../../../../../redux/actions/modal';
import JwtHelper from '../../../../core/helpers/jwtHelper';

export const UserPersonalPosts = ({ userPost, postAuthor }: any) => {
  const jwtHelper = new JwtHelper();
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postAuthor?.updatedAt);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUserId = location.pathname.split('/').pop();

  const handleDelete = (id: number) => {
    dispatch(setConfirmModalId(id));
    dispatch(setShowModal());
  };

  useEffect(() => {
    isImageUrlValid(userPost).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidUserImg]);

  return (
    <section className="section section-personal-post">
      <ul className="personal-post-list">
        {userPost.map((post: any) => {
          return (
            <li key={post.id} className="personal-post-item">
              <div className="personal-post-header">
                <div className="personal-short-info">
                  <img
                    src={isValidUserImg ? postAuthor.picture : BlankUserImage}
                    className="personal-author-avatar"
                    alt=""
                  />
                  <div className="personal-author-info">
                    <p className="personal-author-name">
                      {postAuthor.displayName}
                    </p>
                    <span className="personal-post-timestamp">
                      {formattedDate}
                    </span>
                  </div>
                </div>
                {jwtHelper.isCurrentUser(+`${currentUserId}`) && (
                  <div className="personal-post-action">
                    <span
                      className="btn btn-delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <i className="icon icon-bin"></i>
                      Delete
                    </span>
                    <Link
                      to={`/articles/update/${post.id}`}
                      className="btn btn-edit"
                    >
                      <i className="icon icon-pen"></i>
                      Edit
                    </Link>
                  </div>
                )}
              </div>
              <div className="personal-post-detail">
                <Link
                  to={`/articles/${post.id}`}
                  className="personal-post-link"
                >
                  <h4 className="personal-post-title">{post.title}</h4>
                </Link>
                <Link to="" className="personal-post-comment-link">
                  <span className="btn btn-secondary">
                    <i className="icon icon-comment-darker"></i>
                    {post.comments} comment
                  </span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
