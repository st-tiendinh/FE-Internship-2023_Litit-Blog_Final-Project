import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import PostList, { IPost } from '../../../shared/components/PostList';

const ArticleByTag = () => {
  const apiService = new ApiService();
  const [allPost, setAllPost] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);

  const location = useLocation();
  const pathname = location.pathname;

  const parts = pathname.split('/');
  const lastPart = parts.pop();

  useEffect(() => {
    const fetchPostOfPage = async (page: number) => {
      const response: any = await apiService.get([ENDPOINT.posts.public], {
        page: page,
        size: 12,
      });
      setAllPost([...allPost, ...response.data]);
      setIsLastPage(response.loadMore);
      setCurrentPage(currentPage + 1);
    };

    if (isLastPage) {
      fetchPostOfPage(currentPage);
    }
  }, [allPost]);

  if (lastPart !== undefined) {
    console.log(lastPart);
    const filteredPosts = allPost.filter((post) =>
      post.tags.map((tag) => tag.toLowerCase()).includes(lastPart.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
  }
  console.log(filteredPosts);

  return (
    <section className="section section-article-list">
      <div className="container">
        <div className="article-list-header">
          <i className="icon icon-tag"></i>
          <h2 className="section-title">Tag: {lastPart}</h2>
        </div>
        <div className="article-list-content"></div>
        <PostList posts={filteredPosts} />
      </div>
    </section>
  );
};

export default ArticleByTag;
