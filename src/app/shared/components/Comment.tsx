import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BlankUserImage from '../../../assets/images/blank-user.webp';
import { isImageUrlValid } from '../utils/checkValidImage';

interface CommentProps {
  id: number;
  userId: number;
  userImage: string;
  userName: string;
  comment: string;
}

export const Comment = ({
  id,
  userId,
  userImage,
  userName,
  comment,
}: CommentProps) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);

  useEffect(() => {
    isImageUrlValid(userImage).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [userImage, isImageUrlValid]);

  return (
    <div className="d-flex comment">
      <Link className="user-link" to={''}>
        <div className="user-avatar-wrapper">
          <img
            className="user-avatar"
            src={isValidUserImg ? userImage : BlankUserImage}
            alt="User avatar"
          />
        </div>
      </Link>
      <div className="comment-content">
        <Link className="user-link" to={''}>
          <p className="user-name">{userName}</p>
        </Link>
        <p className="comment-text">{comment}</p>
      </div>
    </div>
  );
};
