import { Link } from 'react-router-dom';

const ArticleList = () => {
  return (
    <div>
      This is article-list page
      <p>
        <Link to="/detail">See detail</Link>
      </p>
    </div>
  );
};

export default ArticleList;
