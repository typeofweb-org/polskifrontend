import { HeadTags } from '../../../../components/HeadTags';
import { fetchArticleBySlug } from '../../../../utils/fetchArticleBySlug';

type HeadProps = {
  readonly params: {
    readonly slug: string;
  };
};

export default async function Head({ params }: HeadProps) {
  const article = await fetchArticleBySlug(params.slug);

  return <HeadTags title={article.title} />;
}
