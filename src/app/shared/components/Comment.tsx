import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BlankUserImage from '../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../utils/checkValidImage';
import { formatDate } from '../utils/formatDate';
import { useSelector } from 'react-redux';
import { RootState } from '../../app.reducers';

interface CommentProps {
  id: number;
  userId: number;
  createdAt: string;
  userImage: string;
  userName: string;
  comment: string;
}

export const Comment = ({
  id,
  userId,
  createdAt,
  userImage,
  userName,
  comment,
}: CommentProps) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    isImageUrlValid(userImage).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [userImage, isImageUrlValid]);

  return (
    <div className="d-flex comment">
      <Link className="user-link" to={`/users/${userId}`}>
        <div className="user-avatar-wrapper">
          <img
            className="user-avatar"
            src={isValidUserImg ? userImage : BlankUserImage}
            alt="User avatar"
          />
        </div>
      </Link>
      <div className="comment-content">
        <div className="comment-about">
          <Link className="user-link" to={`/users/${userId}`}>
            <p className="user-name">{userName}</p>
          </Link>
          <span className="comment-dot-symbol">&#x2022;</span>
          <span className="comment-date">{formatDate(createdAt)}</span>
        </div>
        <p className="comment-text">{comment}</p>
      </div>
    </div>
  );
};
