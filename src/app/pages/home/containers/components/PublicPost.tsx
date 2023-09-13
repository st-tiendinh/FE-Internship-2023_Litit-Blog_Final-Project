import { useEffect, useState } from "react";

import { ApiService } from '../../../../core/services/api.service';
import { ENDPOINT } from '../../../../../config/endpoint';
import PostList from '../../../../shared/components/PostList';

const PublicPost = () => {
  const apiService = new ApiService();
  const [latestPosts, setLatestPosts] = useState([]);
  console.log(ENDPOINT.posts.public);

  useEffect(() => {
    apiService
      .get([ENDPOINT.posts.public], { page: 1, size: 12 })
      .then((response: any) => {
        setLatestPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="section section-public-post">
      <div className="container">
        <h3 className="section-title">Latest Post</h3>
        <PostList posts={latestPosts} />
      </div>
    </section>
  );
};

export default PublicPost;
