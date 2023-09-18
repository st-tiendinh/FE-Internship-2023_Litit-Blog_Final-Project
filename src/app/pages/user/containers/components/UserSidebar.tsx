interface UserStatisticProps {
  postPublicQuantity: number;
  commentQuantity: number;
  tagQuantity: number;
  likeQuantity: number;
}

interface UserSideBarProps {
  userStatistic: UserStatisticProps;
}

export const UserSideBar = ({ userStatistic }: UserSideBarProps) => {
  return (
    <aside className="user-sidebar">
      <ul className="statistic-list">
        <li className="statistic-item">
          <i className="icon icon-post-number"></i>
          <p className="statistic-text">
            {userStatistic.postPublicQuantity} post published
          </p>
        </li>
        <li className="statistic-item">
          <i className="icon icon-comments-number"></i>
          <p className="statistic-text">
            {userStatistic.commentQuantity} comments
          </p>
        </li>
        <li className="statistic-item">
          <i className="icon icon-followed-tag"></i>
          <p className="statistic-text">{userStatistic.tagQuantity} tags</p>
        </li>
        <li className="statistic-item">
          <i className="icon icon-like-normal"></i>
          <p className="statistic-text">{userStatistic.likeQuantity} likes</p>
        </li>
      </ul>
    </aside>
  );
};
