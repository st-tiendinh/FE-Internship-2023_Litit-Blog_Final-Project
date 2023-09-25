import React, { useEffect, useState } from 'react';

import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import PostList from '../../../../shared/components/PostList';
import { PostListType } from '../../../home/containers/components/PublicPost';

const apiService = new ApiService();
const jwtHelper = new JwtHelper();

export const Bookmarks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articlesBookmark, setArticlesBookmark] = useState<any>([]);

  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        setIsLoading(true);
        apiService.setHeaders(jwtHelper.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.bookmarks.index]);
        const filterPost = response.filter((item: any) => item.post !== null);
        const newArr = filterPost.map((item: any) => item.post);
        const publicPosts = newArr.filter((item: any) => item.status !== 'private');

        if (publicPosts) {
          setArticlesBookmark(publicPosts);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (articlesBookmark.length > 0) {
      setVisiblePosts(articlesBookmark.slice(0, 5));
    }
  }, [articlesBookmark]);

  const handleLoadMore = () => {
    const startIndex = page * 5;
    let endIndex = startIndex + 5;
    if (endIndex > articlesBookmark.length) {
      endIndex = startIndex + (Number(articlesBookmark.length) - Number(startIndex));
    }
    const newPosts = articlesBookmark.slice(startIndex, endIndex);
    setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="section section-bookmarks">
      {isLoading ? (
        <div className="skeleton skeleton-personal-list"></div>
      ) : (
        <PostList posts={visiblePosts} type={PostListType.LIST} />
      )}

      {visiblePosts.length < articlesBookmark.length && (
        <div className="d-flex load-more-btn-wrap">
          <button className="btn btn-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
