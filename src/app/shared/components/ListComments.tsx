import { Comment } from './Comment';
export interface CommentProps {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    gender: string;
    dob: string;
    displayName: string;
    picture: string;
    isActive: boolean;
    isAdmin: boolean;
    followers: number;
    followings: number;
  };
}

export const ListComments = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <section className="section list-comments-section">
      <div className="container">
        <div className="list-comments">
          <h4 className="list-comments-title">{comments.length} comments</h4>
          {comments.map((item) => (
            <Comment
              key={item.id}
              createdAt={item.createdAt}
              id={item.id}
              userId={item.userId}
              userImage={item.user.picture}
              userName={item.user.displayName}
              comment={item.comment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
