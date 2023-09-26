import { Link, unstable_usePrompt } from 'react-router-dom';

export const ArticleTagItem = ({ tag }: any) => {
  return (
    <li className="article-detail-tag-item">
      <Link to={`/articles/tag/${tag}`}>
        <span className="badge badge-primary text-truncate">{tag}</span>
      </Link>
    </li>
  );
};
