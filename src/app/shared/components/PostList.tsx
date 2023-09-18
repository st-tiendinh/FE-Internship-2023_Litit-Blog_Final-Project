import { PersonalPost } from '.';
import { EmptyData } from './EmptyData';
import { Post } from './Post';

export enum ListType {
  GRID = 'grid',
  LIST = 'list',
}

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
  posts: Array<IPost>;
  type: ListType;
}

const PostList = ({ posts, type }: PostListProps) => {
  return (
    <ul className="post-list row">
      {posts.length ? (
        (type === ListType.GRID &&
          posts.map((post) => (
            <li key={post.id} className="col col-4 col-md-6 col-sm-12">
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
          ))) ||
        (type === ListType.GRID &&
          posts.map((post) => (
            <li key={post.id} className="col col-4 col-md-6 col-sm-12">
              <div className="post-item">
                <PersonalPost />
              </div>
            </li>
          )))
      ) : (
        <EmptyData />
      )}
    </ul>
  );
};

export default PostList;
