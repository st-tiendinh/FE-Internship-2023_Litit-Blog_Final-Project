import { useState, useEffect } from "react";

import { Header } from "../../shared/components";
import PostList from "../../shared/components/PostList";
import Footer from "../../shared/components/Footer";
import { ApiService } from "../../core/services/api.service";
import { ENDPOINT } from "../../../config/endpoint";

const Home = () => {
  const apiService = new ApiService();
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    apiService
      .get(
        [ENDPOINT.posts.public],
        { page: 1, size: 12 }
      )
      .then((response: any) => {
        setLatestPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <PostList posts={latestPosts} />
      <Footer />
    </div>
  );
};

export default Home;
