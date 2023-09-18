import { useSelector } from 'react-redux';
import { Comment } from './Comment';
import { RootState } from '../../app.reducers';
import { useEffect, useState } from 'react';
import { isImageUrlValid } from '../utils/checkValidImage';
import { Link } from 'react-router-dom';
import BlankUserImage from '../../../assets/images/blank-user.webp';

export interface CommentProps {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    gender: string;
    dob: string;
    displayName: string;
    picture: string;
    isActive: boolean;
    isAdmin: boolean;
    followers: number;
    followings: number;
  };
}

export const ListComments = ({ comments }: { comments: CommentProps[] }) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  useEffect(() => {
    isImageUrlValid(userInfo.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [userInfo.picture, isValidUserImg]);

  return (
    <section className="section list-comments-section">
      <div className="container">
        <div className="list-comments">
          <h4 className="list-comments-title">{comments.length} comments</h4>
          {isLogged && (
            <div className="d-flex comment">
              <Link className="user-link" to={''}>
                <div className="user-avatar-wrapper">
                  <img
                    className="user-avatar"
                    src={isValidUserImg ? userInfo.picture : BlankUserImage}
                    alt="User avatar"
                  />
                </div>
              </Link>
              <form className="d-flex flex-column comment-form">
                <textarea
                  className="comment-input"
                  placeholder="Enter Comment"
                  name="comment"
                  id="comment"
                  autoFocus
                  rows={3}
                ></textarea>
                <button className="btn btn-primary">Send</button>
              </form>
            </div>
          )}
          {comments.map((item) => (
            <Comment
              key={item.id}
              createdAt={item.createdAt}
              id={item.id}
              userId={item.userId}
              userImage={item.user.picture}
              userName={item.user.displayName}
              comment={item.comment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
