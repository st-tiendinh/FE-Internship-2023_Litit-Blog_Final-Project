export const ArticleTagItem = ({ tag }: any) => {
  return (
    <li className="article-detail-tag-item">
      <span className="badge badge-primary">{tag}</span>
    </li>
  );
};
