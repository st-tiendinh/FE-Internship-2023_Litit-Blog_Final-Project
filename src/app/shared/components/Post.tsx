import React from 'react';
import PostImg from '../../assets/post-img.jpg';
import '../../../../src/stylesheet/style.scss';
import { formatDate } from '../utils/formatDate';

interface PostProps {
  title: string;
  tags: string[];
  cover: string;
  authorImg: string; // Add a type to the authorImg prop
  authorName: string;
  postedDate: string;
}

const Post = ({
  title,
  tags,
  cover,
  authorImg,
  authorName,
  postedDate,
}: PostProps) => {

  const formattedDate = formatDate(postedDate);
  
  return (
    <div className="post">
      <div className="post-image-wrapper">
        <img className="post-image" src={cover} alt="beautiful beach" />
      </div>
      <div className="post-content">
        {tags.map((tag: any) => (
          <span key={tag} className="badge badge-secondary">
            {tag}
          </span>
        ))}
        <h4 className="post-title">{title}</h4>
        <div className="post-desc">
          <div className="post-author">
            <img
              className="post-author-avatar"
              src={authorImg}
              alt="author image"
            />
            <span className="post-author-name">{authorName}</span>
          </div>

          <span className="post-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
