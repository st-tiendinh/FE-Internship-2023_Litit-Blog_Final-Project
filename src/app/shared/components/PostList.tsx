import { EmptyData } from './EmptyData';
import { Post } from './post/Post';
import { PostSkeleton } from './post/PostSkeleton';

interface IPost {
  id: number;
  title: string;
  description: string;
  content: string;
  cover: string;
  tags: string[];
  likes: number;
  comments: number;
  recommend: boolean;
  status: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    dob: string;
    picture: string;
    isActive: boolean;
    isAdmin: boolean;
    followers: number;
    followings: number;
    createdAt: string;
    updatedAt: string;
    verifyAt: string;
  };
}

interface PostListProps {
  posts: Array<IPost>; // Assign a type to the posts prop
  loading: boolean;
}

const PostList = ({ posts, loading }: PostListProps) => {
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <ul className="post-list row">
      {loading ? (
        skeletonArray.map((item) => <PostSkeleton key={item} />)
      ) : !posts.length ? (
        <EmptyData />
      ) : (
        posts.map((post) => (
          <li key={post.id} className="col col-4">
            <div className="post-item">
              <Post
                title={post.title}
                desc={post.description}
                cover={post.cover}
                tags={post.tags}
                authorImg={post.user.picture}
                authorName={post.user.displayName}
                postedDate={post.createdAt}
                comments={post.comments}
                likes={post.likes}
              />
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default PostList;
