import { useEffect, useState } from 'react';

import { formatDate } from '../utils/formatDate';
import { isImageUrlValid } from '../utils/checkValidImage';
import BlankPostImg from '../../../assets/images/blank-post.png';
import BlankUserImg from '../../../assets/images/blank-user.webp';
import { Link, useLocation } from 'react-router-dom';
import { PostListType } from '../../pages/home/containers/components/PublicPost';

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
}: PostProps) => {
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const formattedDate = formatDate(postedDate);
  const location = useLocation();

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
          <div className="post-image-wrapper">
            <img
              className="post-image"
              src={isValidCover ? cover : BlankPostImg}
              alt={title}
            />
          </div>

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
                {tags.map((tag: any) => (
                  <span key={tag} className="badge badge-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="post-body">
              <div className="post-info">
                <Link
                  to={
                    location.pathname === '/'
                      ? `/articles/${id.toString()}`
                      : id.toString()
                  }
                >
                  <h4 className="post-title text-truncate">{title}</h4>
                </Link>
                <p className="post-desc text-truncate">{desc}</p>
              </div>

              <div className="post-footer">
                <div className="post-author">
                  <Link className="author-link" to={'/users/' + userId}>
                    <img
                      className="post-author-avatar"
                      src={isValidUserImg ? authorImg : BlankUserImg}
                      alt="author image"
                    />
                  </Link>
                  <div className="post-about">
                    <Link className="author-link" to={'/users/' + userId}>
                      <span className="post-author-name">{authorName}</span>
                    </Link>
                    <span className="post-dot-symbol">&#x2022;</span>
                    <span className="post-date">{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {listType === PostListType.LIST && (
        <div className="personal-post">
          <div className="personal-post-image-wrapper">
            <img
              src={isValidCover ? cover : BlankPostImg}
              alt={authorName}
              className="personal-post-image"
            />
          </div>

          <div className="personal-post-content">
            <ul className="personal-post-tag-list">
              {tags.map((tag: any) => (
                <li className="personal-post-tag-item">
                  <a href="" className="personal-post-tag-link">
                    <span className="badge badge-secondary"> {tag}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="personal-post-title text-truncate">{title}</h4>

            <p className="personal-post-desc text-truncate">{desc}</p>

            <div className="short-info">
              <div className="short-info-author">
                <img
                  src={isValidUserImg ? authorImg : BlankUserImg}
                  alt="author avatar"
                  className="short-info-author-avatar"
                />
                <span className="short-info-author-name">{authorName}</span>
              </div>
              <span className="short-info-dot-symbol">&#x2022;</span>
              <span className="short-info-timestamp">{postedDate}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
