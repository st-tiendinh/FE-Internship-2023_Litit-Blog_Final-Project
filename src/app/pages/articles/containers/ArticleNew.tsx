import { ArticleEditor, PostAction } from './components/ArticleEditor';

const ArticleNew = () => {
  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9">
            <ArticleEditor type={PostAction.CREATE} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleNew;
