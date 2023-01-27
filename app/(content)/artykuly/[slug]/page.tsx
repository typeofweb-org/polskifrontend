import { getArticlesSlugs } from '../../../../api-helpers/articles';
import { DEFAULT_ARTICLES } from '../../../../api-helpers/general-feed';
import { openConnection } from '../../../../api-helpers/prisma/db';
import { ArticleDate } from '../../../../components/ArticleDate/ArticleDate';
import { ButtonAsLink } from '../../../../components/ButtonAsLink/ButtonAsLink';
import { detectContentGenre } from '../../../../utils/creator-utils';
import { fetchArticleBySlug } from '../../../../utils/fetchArticleBySlug';
import { addTrackingToLink } from '../../../../utils/link-utils';

const linkLabels: Record<ReturnType<typeof detectContentGenre>, string> = {
  blog: 'Przejdź do artykułu',
  podcast: 'Przejdź do podcastu',
  youtube: 'Przejdź do filmu',
};

type ArticlePageProps = {
  readonly params: {
    readonly slug: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleBySlug(params.slug);
  const articleLinkLabel = linkLabels[detectContentGenre(article, article.blog)];

  return (
    <article>
      <div className="mb-4 leading-3">
        <h3 className="text-lg font-semibold">{article.title}</h3>
        <ArticleDate publishedAt={article.publishedAt} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: article.sanitizedDescription }}
        className="prose max-w-full"
      />
      <section className="mt-8 flex flex-col items-center gap-5 border-t-2 border-dashed border-primary-dark pt-5 text-center">
        <p className="text-center text-xl font-semibold">Chcesz więcej? Sprawdź w oryginale!</p>
        <ButtonAsLink
          href={addTrackingToLink(article.href, { utm_medium: 'article_page' })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {articleLinkLabel}
        </ButtonAsLink>
      </section>
    </article>
  );
}

export const generateStaticParams = async () => {
  const prisma = openConnection();

  const articleSlugs = await getArticlesSlugs(prisma, DEFAULT_ARTICLES);

  return articleSlugs;
};
