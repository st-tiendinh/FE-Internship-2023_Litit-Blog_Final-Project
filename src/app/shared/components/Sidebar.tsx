import { useState, useEffect } from 'react';
import { ApiService } from '../../core/services/api.service';
import { ENDPOINT } from '../../../config/endpoint';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [popularPost, setPopularPost] = useState<any>([]);
  const apiService = new ApiService();
  const tags = [
    { name: '#ReactJS', quantity: 50 },
    { name: '#VueJS', quantity: 46 },
    { name: '#Angular', quantity: 30 },
    { name: '#NodeJS', quantity: 20 },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response: any = await apiService.get([ENDPOINT.posts.public]);
        setPopularPost(
          response.data.sort((a: any, b: any) => b.likes - a.likes).slice(0, 6)
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <aside className="sidebar">
      <section className="section section-popular-post">
        <h3 className="section-title">Popular Post</h3>
        <ul className="popular-post-list">
          {popularPost.map((post: any) => {
            return (
              <li key={post.id} className="popular-post-item">
                <div className="popular-post">
                  <div className="popular-post-image-wrapper">
                    <img
                      src={post.cover}
                      alt=""
                      className="popular-post-image"
                    />
                  </div>
                  <div className="popular-post-content">
                    <Link to={`/articles/${post.id}`}>
                      <h4 className="popular-post-title text-truncate">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="popular-post-timestamp">26 Feb 2023</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section section-category">
        <h3 className="section-title">Tags</h3>
        <ul className="category-list">
          {tags.map((tag, index) => {
            return (
              <li key={index} className="category-item">
                <a href="" className="category-link">
                  <span className="badge badge-primary">{tag.name}</span>
                </a>
                <span className="badge badge-secondary">{tag.quantity}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
};
