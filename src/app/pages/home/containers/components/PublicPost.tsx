import { useEffect, useState } from 'react';

import { ScrollToTopButton } from './ScrollToTopButton';

import { ApiService } from '../../../../core/services/api.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import PostList from '../../../../shared/components/PostList';

const PublicPost = () => {
  const apiService = new ApiService();
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      apiService
        .get([ENDPOINT.posts.public], { page: page, size: 12 })
        .then((response: any) => {
          setLatestPosts((pre) => [...pre, ...response.data]);
          setTotalPage(response.totalPage);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1000);
  }, [page]);

  return (
    <section className="section section-public-post">
      <div className="container">
        <h3 className="section-title">Latest Post</h3>
        <PostList loading={loading} posts={latestPosts} />
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
