import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ApiService } from '../../../../core/services/api.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import { formatDate } from '../../../../shared/utils/formatDate';
import { isImageUrlValid } from '../../../../shared/utils/checkValidImage';
import BlankPostImg from '../../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../../assets/images/blank-user.webp';

export const RecommendPosts = () => {
  const apiService = new ApiService();

  const [recommendPosts, setRecommendPosts] = useState<any[]>([]);
  const [isValidCovers, setIsValidCovers] = useState<boolean[]>([]);
  const [isValidAvatars, setIsValidAvatars] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const skeletonArray = Array.from({ length: 3 }, (_, index) => index + 1);

  useEffect(() => {
    setIsLoading(true);
    apiService
      .get([ENDPOINT.posts.recommend], { page: 4, size: 3 })
      .then((response: any) => {
        setRecommendPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    Promise.all(recommendPosts.map((post) => isImageUrlValid(post.cover)))
      .then((validities) => {
        setIsValidCovers(validities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recommendPosts]);

  useEffect(() => {
    Promise.all(
      recommendPosts.map((post) => isImageUrlValid(post.user.picture))
    )
      .then((validities) => {
        setIsValidAvatars(validities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recommendPosts]);

  return (
    <section className="section recommend-section">
      {!isLoading ? (
        skeletonArray.map((item) => (
          <div key={item} className="article skeleton"></div>
        ))
      ) : (
        <div className="row">
          <div className="col col-6">
            <div key={recommendPosts[1]?.id} className="article">
              <Link
                to={`/articles/${recommendPosts[0]?.id}`}
                className="article-image-wrapper"
              >
                <div className="overlay"></div>
                <img
                  src={
                    isValidCovers[0] ? recommendPosts[0]?.cover : BlankPostImg
                  }
                  alt={recommendPosts[0]?.description}
                  className="article-image"
                />
              </Link>
              <div className="article-content">
                <ul className="d-flex tag-list">
                  {recommendPosts[0]?.tags.map((tag: any) => {
                    return (
                      <li className="tag-item">
                        <Link to={`articles/tag/${tag}`} className="tag-link">
                          <div className="badge badge-primary tag">{tag}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="d-flex article-about">
                  <Link
                    to={`/users/${recommendPosts[0]?.user?.id}`}
                    className="d-flex article-author"
                  >
                    <div className="author-avatar-wrapper">
                      <img
                        src={
                          isValidAvatars[0]
                            ? recommendPosts[0]?.user?.picture
                            : BlankUserImg
                        }
                        alt={recommendPosts[0]?.user?.displayName + ' avatar'}
                        className="author-avatar"
                      />
                    </div>
                    <p className="author-name">
                      {recommendPosts[0]?.user?.displayName}
                    </p>
                  </Link>
                  <span className="dot-symbol">&#x2022;</span>
                  <p className="article-date">
                    {formatDate(recommendPosts[0]?.createdAt)}
                  </p>
                </div>
                <Link to={`/articles/${recommendPosts[0]?.id}`}>
                  <h3 className={`article-title title-0 text-truncate`}>
                    {recommendPosts[0]?.title}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div key={recommendPosts[1]?.id} className="article sm">
              <Link
                to={`/articles/${recommendPosts[1]?.id}`}
                className="article-image-wrapper"
              >
                <div className="overlay"></div>
                <img
                  src={
                    isValidCovers[1] ? recommendPosts[1]?.cover : BlankPostImg
                  }
                  alt={recommendPosts[1]?.description}
                  className="article-image"
                />
              </Link>
              <div className="article-content">
                <ul className="d-flex tag-list">
                  {recommendPosts[1]?.tags.map((tag: any) => {
                    return (
                      <li className="tag-item">
                        <Link to={`articles/tag/${tag}`} className="tag-link">
                          <div className="badge badge-primary tag">{tag}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="d-flex article-about">
                  <Link
                    to={`/users/${recommendPosts[1]?.user?.id}`}
                    className="d-flex article-author"
                  >
                    <div className="author-avatar-wrapper">
                      <img
                        src={
                          isValidAvatars[1]
                            ? recommendPosts[1]?.user?.picture
                            : BlankUserImg
                        }
                        alt={recommendPosts[1]?.user?.displayName + ' avatar'}
                        className="author-avatar"
                      />
                    </div>
                    <p className="author-name">
                      {recommendPosts[1]?.user?.displayName}
                    </p>
                  </Link>
                  <span className="dot-symbol">&#x2022;</span>
                  <p className="article-date">
                    {formatDate(recommendPosts[1]?.createdAt)}
                  </p>
                </div>
                <Link to={`/articles/${recommendPosts[1]?.id}`}>
                  <h3 className={`article-title text-truncate`}>
                    {recommendPosts[1]?.title}
                  </h3>
                </Link>
              </div>
            </div>
            <div key={recommendPosts[2]?.id} className="article sm">
              <Link
                to={`/articles/${recommendPosts[2]?.id}`}
                className="article-image-wrapper"
              >
                <div className="overlay"></div>
                <img
                  src={
                    isValidCovers[2] ? recommendPosts[2]?.cover : BlankPostImg
                  }
                  alt={recommendPosts[2]?.description}
                  className="article-image"
                />
              </Link>
              <div className="article-content">
                <ul className="d-flex tag-list">
                  {recommendPosts[2]?.tags.map((tag: any) => {
                    return (
                      <li className="tag-item">
                        <Link to={`articles/tag/${tag}`} className="tag-link">
                          <div className="badge badge-primary tag">{tag}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="d-flex article-about">
                  <Link
                    to={`/users/${recommendPosts[2]?.user?.id}`}
                    className="d-flex article-author"
                  >
                    <div className="author-avatar-wrapper">
                      <img
                        src={
                          isValidAvatars[2]
                            ? recommendPosts[2]?.user?.picture
                            : BlankUserImg
                        }
                        alt={recommendPosts[2]?.user?.displayName + ' avatar'}
                        className="author-avatar"
                      />
                    </div>
                    <p className="author-name">
                      {recommendPosts[2]?.user?.displayName}
                    </p>
                  </Link>
                  <span className="dot-symbol">&#x2022;</span>
                  <p className="article-date">
                    {formatDate(recommendPosts[2]?.createdAt)}
                  </p>
                </div>
                <Link to={`/articles/${recommendPosts[2]?.id}`}>
                  <h3 className={`article-title text-truncate`}>
                    {recommendPosts[2]?.title}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
