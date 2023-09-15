import { useEffect, useState } from 'react';

import { formatDate } from '../utils/formatDate';
import { isImageUrlValid } from '../utils/checkValidImage';
import BlankPostImg from '../../../assets/images/blank-post.png';
import BlankUserImg from '../../../assets/images/blank-user.webp';

interface PostProps {
  title: string;
  desc: string;
  tags: string[];
  cover: string;
  authorImg: string; // Add a type to the authorImg prop
  authorName: string;
  postedDate: string;
  likes: number;
  comments: number;
}

export const Post = ({
  title,
  desc,
  tags,
  cover,
  authorImg,
  authorName,
  postedDate,
  likes,
  comments,
}: PostProps) => {
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postedDate);

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
    <div className="post">
      <div className="post-image-wrapper">
        {isValidCover ? (
          <img className="post-image" src={cover} alt={title} />
        ) : (
          <img className="post-image" src={BlankPostImg} alt={title} />
        )}
      </div>

      <div className="post-content">
        <div className="post-header">
          <div className="post-author">
            {isValidUserImg ? (
              <img className="post-author-avatar" src={authorImg} alt="author image" />
            ) : (
              <img className="post-author-avatar" src={BlankUserImg} alt={title} />
            )}

            <div className="post-about">
              <span className="post-author-name">{authorName}</span>
              <span className="post-date">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="post-body">
          <div className="post-info">
            <h4 className="post-title text-truncate">{title}</h4>
            <p className="post-desc text-truncate">{desc}</p>
          </div>
          
          <div className="post-footer">
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
              {tags.map((tag: any) => (
                <span key={tag} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
