import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ApiService } from '../../core/services/api.service';
import { ENDPOINT } from '../../../config/endpoint';
import { formatDate } from '../utils/formatDate';
import { PopularPostSkeleton } from '.';

export const Sidebar = () => {
  const [popularPost, setPopularPost] = useState<any>([]);
  const apiService = new ApiService();
  const tags = [
    { name: '#ReactJS', quantity: 50 },
    { name: '#VueJS', quantity: 46 },
    { name: '#Angular', quantity: 30 },
    { name: '#NodeJS', quantity: 20 },
  ];

  const [allPost, setAllPost] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

  useEffect(() => {
    setIsLoading(true);
    const fetchPostOfPage = async (page: number) => {
      const response: any = await apiService.get([ENDPOINT.posts.public], {
        page: page,
      });

      setAllPost([...allPost, ...response.data]);
      setIsLastPage(response.loadMore);
      setCurrentPage(currentPage + 1);
    };

    if (isLastPage) {
      fetchPostOfPage(currentPage);
    } else {
      setIsLoading(false);
      setPopularPost(
        allPost.sort((a: any, b: any) => b.likes - a.likes).slice(0, 6)
      );
    }
  }, [allPost]);

  return (
    <aside className="sidebar">
      <section className="section section-popular-post">
        <h3 className="section-title">Popular Post</h3>
        <ul className="popular-post-list">
          {isLoading
            ? skeletonArray.map((item) => {
                return <PopularPostSkeleton key={item} />;
              })
            : popularPost.map((post: any) => {
                return (
                  <li key={post.id} className="popular-post-item">
                    <Link to={`/articles/${post.id}`}>
                      <div className="popular-post">
                        <div className="popular-post-image-wrapper">
                          <img
                            src={post.cover}
                            alt=""
                            className="popular-post-image"
                          />
                        </div>
                        <div className="popular-post-content">
                          <h4 className="popular-post-title text-truncate">
                            {post.title}
                          </h4>

                          <p className="popular-post-timestamp">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
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
                <span className="badge badge-primary">{tag.quantity}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
};
