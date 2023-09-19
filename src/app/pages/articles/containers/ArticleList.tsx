import PublicPost, {
  PostListType,
} from '../../home/containers/components/PublicPost';

const ArticleList = () => {
  return (
    <section className="section section-wrapper">
      <div className="container">
        <PublicPost type={PostListType.GRID} sectionTitle="Latest post" />
      </div>
    </section>
  );
};

export default ArticleList;
