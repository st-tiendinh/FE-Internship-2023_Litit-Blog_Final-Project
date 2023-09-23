import { useEffect, useState } from 'react';

import { ScrollToTopButton } from './ScrollToTopButton';

import { ApiService } from '../../../../core/services/api.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import PostList from '../../../../shared/components/PostList';
import { PostSkeleton } from '../../../../shared/components';
import { PostListSkeleton } from '../../../../shared/components/PostListSkeleton';
import { Link } from 'react-router-dom';

export enum PostListType {
  GRID = 'grid',
  LIST = 'list',
}

interface PublicPostProps {
  type: PostListType;
  sectionTitle?: string;
}

const PublicPost = ({ type, sectionTitle }: PublicPostProps) => {
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
      {type === PostListType.LIST && sectionTitle ? (
        <div className="section-header">
          <h3 className="section-title">{sectionTitle}</h3>
          <Link to={'/articles'} className="btn btn-outline">
            Show more
          </Link>
        </div>
      ) : sectionTitle ? (
        <h3 className="section-title">{sectionTitle}</h3>
      ) : null}
      {isLoading && page === 1 ? (
        <ul className="post-list row">
          {skeletonArray.map((item) => {
            return (
              (type === PostListType.GRID && <PostSkeleton key={item} />) ||
              (type === PostListType.LIST && <PostListSkeleton key={item} />)
            );
          })}
        </ul>
      ) : (
        <PostList posts={latestPosts} type={type} />
      )}
      {isLoading && page >= 2 && (
        <ul className="post-list row">
          {skeletonArray.map((item) => {
            return (
              (type === PostListType.GRID && <PostSkeleton key={item} />) ||
              (type === PostListType.LIST && <PostListSkeleton key={item} />)
            );
          })}
        </ul>
      )}
      {type === PostListType.GRID && page < totalPage && (
        <div className="d-flex load-more-btn-wrap">
          <button className="btn btn-outline" onClick={() => setPage(page + 1)}>
            LOAD MORE
          </button>
        </div>
      )}
      <ScrollToTopButton />
    </section>
  );
};

export default PublicPost;
