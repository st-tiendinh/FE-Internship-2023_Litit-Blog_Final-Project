import { Comment } from './Comment';

const comments: CommentProps[] = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    comment:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt necessitatibus nostrum assumenda. Vel, laboriosam! Quidem commodi nobis earum sunt aliquid.',
    user: {
      id: 1,
      email: 'linh@gmail.com',
      firstName: 'linh',
      lastName: 'nguyen',
      phone: 909090900,
      gender: 'male',
      dob: '19/10/1995',
      displayName: 'Linh Nguyen',
      picture: 'null',
      isActive: true,
      isAdmin: false,
      followers: 0,
      followings: 1,
    },
  },
  {
    id: 1,
    userId: 1,
    postId: 1,
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, incidunt.',
    user: {
      id: 1,
      email: 'linh@gmail.com',
      firstName: 'linh',
      lastName: 'nguyen',
      phone: 909090900,
      gender: 'male',
      dob: '19/10/1995',
      displayName: 'Linh Nguyen',
      picture: 'null',
      isActive: true,
      isAdmin: false,
      followers: 0,
      followings: 1,
    },
  },
];

interface CommentProps {
  id: number;
  userId: number;
  postId: number;
  comment: string;
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

export const ListComments = () => {
  return (
    <section className="section list-comments-section">
      <div className="container">
        <div className="list-comments">
          <h4 className="list-comments-title">{comments.length} comments</h4>
          {comments.map((item) => (
            <Comment
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
