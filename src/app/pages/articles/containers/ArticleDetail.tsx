import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

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
import JwtHelper from '../../../core/helpers/jwtHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app.reducers';
import Bookmark from '../../../shared/components/Bookmark';

const ArticleDetail = () => {
  const apiService = new ApiService();
  const jwtHelper = new JwtHelper();
  const [post, setPost] = useState<any>({});
  const [userShortInfo, setUserShortInfo] = useState<any>({});
  const [isValidCover, setIsValidCover] = useState(false);
  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowButtonEdit, setIsShowButtonEdit] = useState<boolean>(false);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  const navigate = useNavigate();
  const location = useLocation();
  const commentRef = useRef<HTMLDivElement>(null);
  const clean = DOMPurify.sanitize(post.content);
  const postDesc = DOMPurify.sanitize(post.description);

  const [isEnoughSpaceForToolTip, setIsEnoughSpaceForToolTip] = useState(
    window.innerWidth <= 1250
  );

  const handleCommentClick = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response: any = await apiService.get([
          ENDPOINT.posts.index,
          `${location.pathname.split('/').pop()}`,
        ]);
        setPost(response);
        setUserShortInfo(response.user);
        isLogged &&
          setIsShowButtonEdit(jwtHelper.isCurrentUser(response.userId));
        setIsLoading(false);
      } catch (error: any) {
        try {
          apiService.setHeaders(jwtHelper.getAuthHeader());
          const res: any = await apiService.get([
            ENDPOINT.users.index,
            'me/posts',
          ]);
          const filterPost = res.Posts.find(
            (item: any) =>
              item.id.toString() === location.pathname.split('/').pop()
          );
          setPost(filterPost);
          setUserShortInfo(res);
          isLogged && setIsShowButtonEdit(jwtHelper.isCurrentUser(res.id));
          setIsLoading(false);
        } catch (error) {
          navigate('/404');
          console.log(error);
        }
      }
    })();
  }, [location]);

  useEffect(() => {
    isImageUrlValid(post.cover).then((isValid) => {
      isValid ? setIsValidCover(true) : setIsValidCover(false);
    });
  }, [isValidCover, post.cover]);

  useEffect(() => {
    isImageUrlValid(userShortInfo.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isValidCover, userShortInfo.picture]);

  return (
    <section className="section section-article-detail">
      <div className="container">
        <div className="row">
          <div className="col col-1">
            <ul className="article-action-list position-sticky">
              <Like
                postId={location.pathname.slice(10).toString()}
                tooltip={isEnoughSpaceForToolTip}
                userId={userShortInfo.id}
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
              <Bookmark tooltip={isEnoughSpaceForToolTip} />
            </ul>
          </div>

          <div className="col col-7">
            <article className="article article-detail">
              {post.tags && <ArticleTagList tags={post.tags} />}
              <h2 className="article-detail-title">{post.title}</h2>
              <div className="article-detail-content">
                <div className="article-detail-header">
                  <div className="short-info">
                    <div className="short-info-author">
                      <Link
                        className="d-flex author-link"
                        to={'/users/' + post.user?.id}
                      >
                        <div className="post-author">
                          <img
                            src={
                              isValidUserImg
                                ? userShortInfo.picture
                                : BlankUserImg
                            }
                            alt="author avatar"
                            className="short-info-author-avatar"
                          />
                          <span className="short-info-author-name">
                            {userShortInfo.displayName}
                          </span>
                        </div>
                      </Link>
                    </div>
                    <span className="short-info-dot-symbol">&#x2022;</span>
                    <span className="short-info-timestamp">
                      {formatDate(post.updatedAt)}
                    </span>
                  </div>
                  {isShowButtonEdit && (
                    <Link
                      to={`/articles/update/${location.pathname
                        .split('/')
                        .pop()}`}
                      className="btn btn-edit"
                    >
                      <i className="icon icon-pen"></i>
                      Edit
                    </Link>
                  )}
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
                <div
                  className="article-detail-desc"
                  dangerouslySetInnerHTML={{ __html: postDesc }}
                ></div>
                <div
                  className="article-detail-paragraph"
                  dangerouslySetInnerHTML={{ __html: clean }}
                ></div>
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
