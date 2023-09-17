import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Sidebar } from '../../../shared/components';
import { ListComments } from '../../../shared/components/ListComments';
import { ArticleTagList } from './components/ArticleTagList';

import BlankPostImg from '../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../assets/images/blank-user.webp';
import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import { formatDate } from '../../../shared/utils/formatDate';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';

const ArticleDetail = () => {
  const tags = ['ReactJS', 'VueJS', 'Angular', 'NodeJS'];
  const apiService = new ApiService();
  const [post, setPost] = useState<any>({});
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await apiService.get([
          ENDPOINT.posts.index,
          location.pathname.slice(10),
        ]);
        setPost(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);

  useEffect(() => {
    isImageUrlValid(post.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, post.cover]);

  useEffect(() => {
    isImageUrlValid(post.user?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidCover, post.user?.picture]);

  return (
    <section className="section section-article-detail">
      <div className="container">
        <div className="row">
          <div className="col col-1">
            <ul className="article-action-list position-sticky">
              <li className="article-action-item">
                <span className="tooltip tooltip-left">Likes</span>
                <i className="icon icon-like-normal"></i>
                {post.likes}
              </li>
              <li className="article-action-item">
                <span className="tooltip tooltip-left">Comments</span>
                <i className="icon icon-comment-normal"></i>
                {post.comments}
              </li>
              <li className="article-action-item">
                <span className="tooltip tooltip-left">Bookmark</span>
                <i className="icon icon-bookmark"></i>
              </li>
            </ul>
          </div>

          <div className="col col-7">
            <article className="article article-detail">
              <ArticleTagList tags={tags} />

              <h2 className="article-detail-title">{post.title}</h2>

              <div className="article-detail-content">
                <div className="short-info">
                  <div className="short-info-author">
                    {isValidUserImg ? (
                      <img
                        src={post.user?.picture}
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                    ) : (
                      <img
                        src={BlankUserImg}
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                    )}
                    <span className="short-info-author-name">
                      {post.user?.displayName}
                    </span>
                  </div>
                  <span className="short-info-dot-symbol">&#x2022;</span>
                  <span className="short-info-timestamp">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>

                {isValidCover ? (
                  <img
                    src={post.cover}
                    alt="article cover"
                    className="article-detail-cover"
                  />
                ) : (
                  <img
                    src={BlankPostImg}
                    alt="article cover"
                    className="article-detail-cover"
                  />
                )}

                <p className="article-detail-paragraph">{post.content}</p>
              </div>
            </article>
          </div>

          <div className="col col-4">
            <Sidebar />
          </div>
        </div>

        <ListComments />
      </div>
    </section>
  );
};

export default ArticleDetail;
