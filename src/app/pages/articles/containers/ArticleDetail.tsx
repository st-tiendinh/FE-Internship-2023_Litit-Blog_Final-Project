import { useState, useEffect } from 'react';

import { Sidebar } from '../../../shared/components';
import { ArticleTagList } from './components/ArticleTagList';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../../shared/utils/formatDate';
import { ListComments } from '../../../shared/components/ListComments';

const ArticleDetail = () => {
  const tags = ['ReactJS', 'VueJS', 'Angular', 'NodeJS'];
  const apiService = new ApiService();
  const [post, setPost] = useState<any>({});
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

              <h2 className="article-detail-title">
                The Art of Traveling: Tips and Tricks for a Memorable Journey
              </h2>

              <div className="article-detail-content">
                <div className="short-info">
                  <div className="short-info-author">
                    <img
                      src={post.user?.picture}
                      alt="author avatar"
                      className="short-info-author-avatar"
                    />
                    <span className="short-info-author-name">
                      Tracey Wilson
                    </span>
                  </div>
                  <span className="short-info-dot-symbol">&#x2022;</span>
                  <span className="short-info-timestamp">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>

                <img
                  src={post.cover}
                  alt="article cover"
                  className="article-detail-cover"
                />

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
