import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Sidebar } from '../../../shared/components';
import { ListComments } from '../../../shared/components/ListComments';
import { ArticleTagList } from './components/ArticleTagList';

import BlankPostImg from '../../../../assets/images/blank-post.png';
import BlankUserImg from '../../../../assets/images/blank-user.webp';

import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import { formatDate } from '../../../shared/utils/formatDate';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import Like from '../../../shared/components/Like';
import { ScrollToTopButton } from '../../home/containers/components/ScrollToTopButton';

const ArticleDetail = () => {
  const tags = ['ReactJS', 'VueJS', 'Angular', 'NodeJS'];
  const apiService = new ApiService();
  const [post, setPost] = useState<any>({});
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  const [isEnoughSpaceForToolTip, setIsEnoughSpaceForToolTip] = useState(
    window.innerWidth <= 1250
  );

  useEffect(() => {
    const handleResize = () => {
      setIsEnoughSpaceForToolTip(window.innerWidth <= 1250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commentRef = useRef<HTMLDivElement>(null);

  const handleCommentClick = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get([
          ENDPOINT.posts.index,
          location.pathname.slice(10),
        ]);
        setPost(response);
        setIsLoading(false);
        return response;
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
              <Like
                postId={location.pathname.slice(10).toString()}
                tooltip={isEnoughSpaceForToolTip}
              />
              <li onClick={handleCommentClick} className="article-action-item">
                <span
                  className={`tooltip tooltip-${
                    isEnoughSpaceForToolTip ? 'bottom' : 'left'
                  }`}
                >
                  Comments
                </span>
                <i className="icon icon-comment-normal"></i>
                {post.comments}
              </li>
              <li className="article-action-item">
                <span
                  className={`tooltip tooltip-${
                    isEnoughSpaceForToolTip ? 'bottom' : 'left'
                  }`}
                >
                  Bookmark
                </span>
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
                    <Link
                      className="d-flex author-link"
                      to={'/users/' + post.user?.id}
                    >
                      <img
                        src={isValidUserImg ? post.user?.picture : BlankUserImg}
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                      <span className="short-info-author-name">
                        {post.user?.displayName}
                      </span>
                    </Link>
                  </div>
                  <span className="short-info-dot-symbol">&#x2022;</span>
                  <span className="short-info-timestamp">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>
                {isLoading ? (
                  <div className="article-detail-cover-wrapper skeleton"></div>
                ) : (
                  <div className="article-detail-cover-wrapper">
                    <img
                      src={isValidCover ? post.cover : BlankPostImg}
                      alt="article cover"
                      className="article-detail-cover"
                    />
                  </div>
                )}
                <p className="article-detail-paragraph">{post.content}</p>
              </div>
            </article>
            <div ref={commentRef}>
              {post.id && <ListComments postId={post.id} />}
            </div>
          </div>
          <div className="col col-4">
            <Sidebar />
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </section>
  );
};

export default ArticleDetail;
