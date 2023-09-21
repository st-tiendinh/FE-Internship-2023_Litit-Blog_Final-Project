import { PostListType } from '../../pages/home/containers/components/PublicPost';
import { EmptyData } from './EmptyData';
import { Post } from './Post';

export enum PostStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  description: string;
  content: string;
  cover: string;
  tags: string[];
  likes: number;
  comments: number;
  recommend: boolean;
  status: PostStatus;
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
  type: PostListType;
  isHasAction?: boolean;
}

const PostList = ({ posts, type, isHasAction }: PostListProps) => {
  return (
    <ul className="post-list row">
      {posts.length ? (
        posts.map((post) => (
          <li
            key={post.id}
            className={`col col-${
              type === PostListType.GRID ? '4' : '12'
            } col-md-6 col-sm-12`}
          >
            <div className="post-item">
              <Post
                id={post.id}
                userId={post.userId}
                title={post.title}
                desc={post.description}
                cover={post.cover}
                tags={post.tags}
                status={post.status}
                authorImg={post.user.picture}
                authorName={post.user.displayName}
                postedDate={post.createdAt}
                comments={post.comments}
                likes={post.likes}
                listType={type}
                isHasAction={isHasAction}
              />
            </div>
          </li>
        ))
      ) : (
        <EmptyData />
      )}
    </ul>
  );
};

export default PostList;
