import React from 'react';
import { Link } from 'react-router-dom';

export const RecommendPosts = () => {
  return (
    <section className="section recommend-section">
      <div className="row">
        <div className="col col-6">
          <div className="article vertical">
            <div className="article-image-wrapper">
              <div className="overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1503518599251-c246ec502dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                alt=""
                className="article-image"
              />
            </div>
            <div className="article-content">
              <ul className="d-flex tag-list">
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
              </ul>
              <h3 className="article-title text-truncate">
                The Impact of Technology on the Workplace: How Technology is
                Changing
              </h3>
              <div className="d-flex article-about">
                <div className="d-flex article-author">
                  <div className="author-avatar-wrapper">
                    <img
                      src="https://robohash.org/cumomnisdolore.png?size=50x50&set=set1"
                      alt=""
                      className="author-avatar"
                    />
                  </div>
                  <p className="author-name">Tracey Wilson</p>
                </div>
                <span className="dot-symbol">&#x2022;</span>
                <p className="article-date">August 20, 2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-6">
          <div className="article horizontal">
            <div className="article-image-wrapper">
              <div className="overlay"></div>

              <img
                src="https://images.unsplash.com/photo-1503518599251-c246ec502dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                alt=""
                className="article-image"
              />
            </div>
            <div className="article-content">
              <ul className="d-flex tag-list">
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
              </ul>
              <h3 className="article-title text-truncate">
                The Impact of Technology Technology on the Workplace: How
                Technology is Changing
              </h3>
              <div className="d-flex article-about">
                <div className="d-flex article-author">
                  <div className="author-avatar-wrapper">
                    <img
                      src="https://robohash.org/cumomnisdolore.png?size=50x50&set=set1"
                      alt=""
                      className="author-avatar"
                    />
                  </div>
                  <p className="author-name">Tracey Wilson</p>
                </div>
                <span className="dot-symbol">&#x2022;</span>
                <p className="article-date">August 20, 2022</p>
              </div>
            </div>
          </div>
          <div className="article horizontal">
            <div className="article-image-wrapper">
              <div className="overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1503518599251-c246ec502dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                alt=""
                className="article-image"
              />
            </div>
            <div className="article-content">
              <ul className="d-flex tag-list">
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
                <li className="tag-item">
                  <Link to={`articles/tag/`} className="tag-link">
                    <div className="badge badge-primary tag">React</div>
                  </Link>
                </li>
              </ul>
              <h3 className="article-title text-truncate">
                The Impact of Technology on the Workplace: How Technology is
                Changing
              </h3>
              <div className="d-flex article-about">
                <div className="d-flex article-author">
                  <div className="author-avatar-wrapper">
                    <img
                      src="https://robohash.org/cumomnisdolore.png?size=50x50&set=set1"
                      alt=""
                      className="author-avatar"
                    />
                  </div>
                  <p className="author-name">Tracey Wilson</p>
                </div>
                <span className="dot-symbol">&#x2022;</span>
                <p className="article-date">August 20, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
