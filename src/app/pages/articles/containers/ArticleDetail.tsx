import { Sidebar } from '../../../shared/components';

const ArticleDetail = () => {
  return (
    <div className="article-detail-page">
      <div className="container">
        <section className="section section-article-detail">
          <div className="row">
            <div className="col col-1">
              <ul className="interaction-list">
                <li className="interaction-item">
                  <span className="tooltip tooltip-left">Like</span>
                  <i className="icon icon-like-normal"></i>
                </li>
                <li className="interaction-item">
                  <span className="tooltip tooltip-left">Comment</span>
                  <i className="icon icon-comment-normal"></i>
                </li>
                <li className="interaction-item">
                  <span className="tooltip tooltip-left">Bookmark</span>
                  <i className="icon icon-bookmark"></i>
                </li>
              </ul>
            </div>
            <div className="col col-7">
              <article className="article article-detail">
                <ul className="article-detail-tag-list">
                  <li className="article-detail-tag-item">
                    <span className="badge badge-primary">React</span>
                  </li>
                  <li className="article-detail-tag-item">
                    <span className="badge badge-primary">React</span>
                  </li>
                  <li className="article-detail-tag-item">
                    <span className="badge badge-primary">React</span>
                  </li>
                </ul>

                <h2 className="article-detail-title">
                  The Art of Traveling: Tips and Tricks for a Memorable Journey
                </h2>

                <div className="article-detail-content">
                  <div className="short-info">
                    <div className="short-info-author">
                      <img
                        src="https://robohash.org/dolorummolestiaslaboriosam.png?size=50x50&set=set1"
                        alt="author avatar"
                        className="short-info-author-avatar"
                      />
                      <span className="short-info-author-name">
                        Tracey Wilson
                      </span>
                    </div>
                    <span className="short-info-dot-symbol">&#x2022;</span>
                    <span className="short-info-timestamp">
                      August 20, 2022
                    </span>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1623243639777-a8e732d0d7ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                    alt="article cover"
                    className="article-detail-cover"
                  />

                  <p className="article-detail-paragraph">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam aliquid illo recusandae sapiente magnam eligendi
                    dolor distinctio labore ipsum, incidunt sit eos praesentium
                    minima asperiores adipisci ea, nobis mollitia repellat nihil
                    ratione tenetur saepe voluptas cum repellendus! Veniam, ex
                    rerum. Laudantium, voluptas. Quisquam ipsa nemo, aspernatur
                    doloremque nihil quos consequuntur.
                  </p>
                </div>
              </article>
            </div>

            <div className="col col-4">
              <Sidebar />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleDetail;
