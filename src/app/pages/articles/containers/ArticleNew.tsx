import { ArticleEditor, PostAction } from './components/ArticleEditor';

const ArticleNew = () => {
  return (
    <div className="page-write-article">
      <div className="container">
        <div className="row">
          <div className="col col-9">
            <ArticleEditor type={PostAction.CREATE} />
          </div>

          <div className="col col-3">
            <div className="write-article-suggestion">
              <h3 className="write-article-help">Writing a Great Post Title</h3>
              <p className="write-article-help-text">
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence. Use keywords where appropriate to help ensure people
                can find your post by search.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleNew;
