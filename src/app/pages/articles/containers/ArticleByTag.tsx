import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import PostList, { IPost } from '../../../shared/components/PostList';
import { PostListType } from '../../home/containers/components/PublicPost';
import { PostSkeleton, Sidebar } from '../../../shared/components';

const ArticleByTag = () => {
  const apiService = new ApiService();
  const [allPost, setAllPost] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  const lastPart = location.pathname.split('/').pop();

  const encodedTag = lastPart ? decodeURI(lastPart) : '';

  useEffect(() => {
    window.scroll(0, 0);
    const getPostByTag = async (articleTag: any) => {
      const response: any = await apiService.get([ENDPOINT.posts.public], {
        tags: articleTag,
      });
      setAllPost(response.data);
      setIsLoading(false);
    };

    if (lastPart !== undefined) {
      getPostByTag(encodedTag);
    }
  }, [lastPart]);

  return (
    <section className="section section-article-list">
      <div className="container">
        <div className="article-list-content">
          <div className="row">
            <div className="col col-8 col-md-12">
              <div className="article-list-header">
                <h3 className="section-tags-title">Tag: {encodedTag}</h3>
              </div>
              {isLoading ? (
                <PostSkeleton />
              ) : (
                <PostList posts={allPost} type={PostListType.LIST} />
              )}
            </div>
            <div className="col col-4 col-md-12">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleByTag;
