export const UserSideBar = () => {
  return (
    <aside className="user-sidebar">
      <ul className="statistic-list">
        <li className="statistic-item">
          <i className="icon icon-post-number"></i>
          <p className="statistic-text">1 post published</p>
        </li>
        <li className="statistic-item">
          <i className="icon icon-comments-number"></i>
          <p className="statistic-text">0 comments written</p>
        </li>
        <li className="statistic-item">
          <i className="icon icon-followed-tag"></i>
          <p className="statistic-text">6 tags followed</p>
        </li>
      </ul>
    </aside>
  );
};
