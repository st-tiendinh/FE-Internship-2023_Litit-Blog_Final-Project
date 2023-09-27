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
        <div className="row">
          <div className="col col-12 col-md-3 col-sm-6">
            <li className="statistic-item">
              <i className="icon icon-post-number"></i>
              <p className="statistic-text">
                {userStatistic.postPublicQuantity} post published
              </p>
            </li>
          </div>
          <div className="col col-12 col-md-3 col-sm-6">
            <li className="statistic-item">
              <i className="icon icon-comments-number"></i>
              <p className="statistic-text">
                {userStatistic.commentQuantity} comments
              </p>
            </li>
          </div>
          <div className="col col-12 col-md-3 col-sm-6">
            <li className="statistic-item">
              <i className="icon icon-followed-tag"></i>
              <p className="statistic-text">{userStatistic.tagQuantity} tags</p>
            </li>
          </div>
          <div className="col col-12 col-md-3 col-sm-6">
            <li className="statistic-item">
              <i className="icon icon-like-normal"></i>
              <p className="statistic-text">
                {userStatistic.likeQuantity} likes
              </p>
            </li>
          </div>
        </div>
      </ul>
    </aside>
  );
};
