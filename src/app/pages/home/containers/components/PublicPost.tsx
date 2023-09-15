import { useEffect, useState } from 'react';

import { ScrollToTopButton } from './ScrollToTopButton';

import { ApiService } from '../../../../core/services/api.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import PostList from '../../../../shared/components/PostList';
import { PostSkeleton } from '../../../../shared/components';

const PublicPost = () => {
  const apiService = new ApiService();
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

  useEffect(() => {
    setIsLoading(true);
    apiService
      .get([ENDPOINT.posts.public], { page: page, size: 12 })
      .then((response: any) => {
        setLatestPosts((pre) => [...pre, ...response.data]);
        setTotalPage(response.totalPage);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <section className="section section-public-post">
      <div className="container">
        <h3 className="section-title">Latest Post</h3>
        {isLoading && page === 1 ? (
          <ul className="post-list row">
            {skeletonArray.map((item) => (
              <PostSkeleton key={item} />
            ))}
          </ul>
        ) : (
          <PostList posts={latestPosts} />
        )}
        {isLoading && page >= 2 && (
          <ul className="post-list row">
            {skeletonArray.map((item) => (
              <PostSkeleton key={item} />
            ))}
          </ul>
        )}
        {page < totalPage && (
          <div className="d-flex load-more-btn-wrap">
            <button
              className="btn btn-primary"
              onClick={() => setPage(page + 1)}
            >
              LOAD MORE
            </button>
          </div>
        )}
        <ScrollToTopButton />
      </div>
    </section>
  );
};

export default PublicPost;
