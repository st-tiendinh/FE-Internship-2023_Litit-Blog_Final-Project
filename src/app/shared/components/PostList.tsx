import Post from "./Post";

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
  status: "public" | "private";
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
    gender: "male" | "female" | "other";
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
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="container ">
      <h3 className="post-list-title">Latest Post</h3>
      <ul className="post-list row">
        {posts?.map((post) => (
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
        ))}
      </ul>
    </div>
  );
};

export default PostList;
