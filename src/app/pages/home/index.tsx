import { useState,useEffect } from 'react';

import { Header } from '../../shared/components';
import PostList from '../../shared/components/PostList';
import Footer from '../../shared/components/Footer';
import { ApiService } from '../../core/services/api.service';

const Home = () => {
  const apiService = new ApiService();
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    apiService
      .get(
        [
          'http://ec2-18-143-176-131.ap-southeast-1.compute.amazonaws.com:3000/api/v1/posts/public',
        ],
        { page: 1, size: 12 }
      )
      .then((response:any) => {
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
      <PostList posts={latestPosts}/>
      <Footer />
    </div>
  );
};

export default Home;
