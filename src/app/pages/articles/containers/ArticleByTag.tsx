import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import PostList, { IPost } from '../../../shared/components/PostList';

const ArticleByTag = () => {
  const apiService = new ApiService();
  const [allPost, setAllPost] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  const location = useLocation();

  const lastPart = location.pathname.split('/').pop();

  useEffect(() => {
    const getPostByTag = async () => {
      const response: any = await apiService.get([ENDPOINT.posts.public], {tags : lastPart});
      setAllPost(response.data);
    };

    getPostByTag();
    if (lastPart) {
      const postIncludesTag = allPost.filter((post) =>
        post.tags.map((tag) => tag.toLowerCase()).includes(lastPart.toLowerCase())
      );
      setFilteredPosts(postIncludesTag);
    }
  }, []);


  return (
    <section className="section section-article-list">
      <div className="container">
        <div className="article-list-header">
          <i className="icon icon-tag"></i>
          <h3 className="section-title">Tag: {lastPart}</h3>
        </div>
        <div className="article-list-content"></div>
        <PostList posts={filteredPosts} />
      </div>
    </section>
  );
};

export default ArticleByTag;
