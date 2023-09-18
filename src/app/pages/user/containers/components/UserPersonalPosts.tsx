import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../shared/utils/formatDate';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import BlankUserImage from '../../../../../assets/images/blank-user.webp';

export const UserPersonalPosts = ({ userPost, postAuthor }: any) => {
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postAuthor?.updatedAt);

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
              <div className="personal-post-detail">
                <h4 className="personal-post-title">{post.title}</h4>
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
