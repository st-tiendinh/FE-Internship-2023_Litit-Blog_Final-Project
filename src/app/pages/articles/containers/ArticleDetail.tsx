import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

import Like from '../../../shared/components/Like';
import Bookmark from '../../../shared/components/Bookmark';
import { Sidebar } from '../../../shared/components';
import { ListComments } from '../../../shared/components/ListComments';
import { isImageUrlValid } from '../../../shared/utils/checkValidImage';
import { ScrollToTopButton } from '../../home/containers/components/ScrollToTopButton';
import { ArticleContent } from './components/ArticleContent';

import JwtHelper from '../../../core/helpers/jwtHelper';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { RootState } from '../../../app.reducers';

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
    const pTags = document.querySelectorAll('.article-detail-paragraph p');
    pTags.forEach((pTag) => {
      if (pTag.textContent === '\u00a0') {
        (pTag as HTMLElement).style.marginBottom = '0';
      }
    });
  }, [isLoading]);

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
          <div className="col col-1 col-md-1 col-sm-12">
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

          <div className="col col-7 col-md-12 col-sm-12">
            <ArticleContent
              postItem={post}
              user={userShortInfo}
              isShowButtonEdit={isShowButtonEdit}
              isValidUserImg={isValidUserImg}
              isLoading={isLoading}
              isValidCover={isValidCover}
              cleanContent={clean}
              cleanDescription={postDesc}
            />
            <div ref={commentRef}>
              {post.id && <ListComments postId={post.id} />}
            </div>
          </div>
          <div className="col col-4 col-md-12">
            <Sidebar />
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </section>
  );
};

export default ArticleDetail;
