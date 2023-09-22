import { useEffect, useState } from 'react';

import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import JwtHelper from '../../../core/helpers/jwtHelper';

import PostList from '../../../shared/components/PostList';
import { PostSkeleton } from '../../../shared/components';
import { PostListType } from '../../home/containers/components/PublicPost';

const ArticleBookmark = () => {
  const [articlesBookmark, setArticlesBookmark] = useState<any>([]);
  const apiService = new ApiService();
  const jwt = new JwtHelper();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        setIsLoading(true);
        apiService.setHeaders(jwt.getAuthHeader());
        const response: any = await apiService.get([ENDPOINT.bookmarks.index]);

        const filterPost = response.filter((item: any) => item.post !== null);

        const newArr = filterPost.map((item: any) => item.post);

        if (newArr) {
          setArticlesBookmark(newArr);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [location.pathname]);

  return (
    <section className="section section-wrapper">
      <div className="container">
        <section className="section section-public-post">
          <div className="section-header">
            <h3 className="section-title">Your bookmark</h3>
          </div>
          {isLoading ? (
            skeletonArray.map((item) => {
              return PostListType.GRID && <PostSkeleton key={item} />;
            })
          ) : (
            <PostList posts={articlesBookmark} type={PostListType.GRID} />
          )}
        </section>
      </div>
    </section>
  );
};

export default ArticleBookmark;
