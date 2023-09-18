import { ArticleTagItem } from './ArticleTagItem';

export const ArticleTagList = ({ tags }: any) => {
  return (
    <ul className="article-detail-tag-list">
      {tags.map((tag: any, index: number) => {
        return <ArticleTagItem tag={tag} key={index} />;
      })}
    </ul>
  );
};
