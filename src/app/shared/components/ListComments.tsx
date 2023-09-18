import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Comment } from './Comment';
import BlankUserImage from '../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../utils/checkValidImage';
import { RootState } from '../../app.reducers';
import { ApiService } from '../../core/services/api.service';
import JwtHelper from '../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../config/endpoint';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const ListComments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<any>([]);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  const getListComments = async () => {
    try {
      const response = await apiService.get([
        ENDPOINT.posts.index,
        postId + '/comments',
      ]);
      setComments(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListComments();
  }, [postId]);

  useEffect(() => {
    isImageUrlValid(userInfo.picture).then((isValid) => {
      setIsValidUserImg(isValid);
    });
  }, [userInfo.picture]);

  const handleComment = async () => {
    const content = textAreaRef.current?.value.trim();
    if (content && !isLoading) {
      setIsLoading(true);
      try {
        apiService.setHeaders(jwtHelper.getAuthHeader());
        await apiService.post([ENDPOINT.posts.index, postId + '/comments'], {
          content: content,
        });
        getListComments();
        textAreaRef.current!.value = '';
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleComment();
    }
  };

  return (
    <section className="section list-comments-section">
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
            <form
              onSubmit={(event: any) => event.preventDefault()}
              className="d-flex flex-column comment-form"
            >
              <textarea
                ref={textAreaRef}
                className="comment-input"
                placeholder="Enter Comment"
                name="comment"
                id="comment"
                rows={3}
                onKeyUp={(event) => handleKeyPress(event)}
              ></textarea>
              <button
                type="button"
                onClick={() => handleComment()}
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="btn-text">Send</span>
              </button>
            </form>
          </div>
        )}
        {comments.map((item: any) => (
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
    </section>
  );
};
