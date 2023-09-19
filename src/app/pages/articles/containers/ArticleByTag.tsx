import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import PostList, { IPost } from '../../../shared/components/PostList';
import { PostListType } from '../../home/containers/components/PublicPost';
import { Sidebar } from '../../../shared/components';

const ArticleByTag = () => {
  const apiService = new ApiService();
  const [allPost, setAllPost] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  const location = useLocation();


  const lastPart = location.pathname.split('/').pop();

  const encodedTag = lastPart ? decodeURI(lastPart) : '';
  console.log(encodedTag)

  useEffect(() => {
    const getPostByTag = async (articleTag: any) => {
      const response: any = await apiService.get([ENDPOINT.posts.public], { tags: articleTag });
      console.log(response.data);
      setAllPost(response.data);
      if (response.data.length === 0) {
        const postIncludesTag = allPost.filter((post) =>
          post.tags.map((tag) => tag.toString().toLowerCase()).includes(articleTag.toLowerCase())
        );
        setFilteredPosts(postIncludesTag);
      } else {
        const postIncludesTag = response.data.filter((post: IPost) =>
          post.tags.map((tag) => tag.toString().toLowerCase()).includes(articleTag.toLowerCase())
        );
        setFilteredPosts(postIncludesTag);
      }
    };
    if (lastPart !== undefined) {
      getPostByTag(encodedTag);
    }
  }, []);

  return (
    <section className="section section-article-list">
      <div className="container">
        <div className="article-list-header">
          <i className="icon icon-tag"></i>
          <h3 className="section-title">Tag: {encodedTag}</h3>
        </div>
        <div className="article-list-content">
          <div className="row">
            <div className="col col-8">
              <PostList posts={filteredPosts} type={PostListType.LIST} />
            </div>
            <div className="col col-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleByTag;
