import Image from 'next/image';
import Link from 'next/link';

import { getArticlesSlugs } from '../../../api-helpers/articles';
import { DEFAULT_ARTICLES } from '../../../api-helpers/general-feed';
import { closeConnection, openConnection } from '../../../api-helpers/prisma/db';
import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { detectContentGenre } from '../../../utils/creator-utils';
import { formatDate } from '../../../utils/date-utils';
import { fetchArticleBySlug } from '../../../utils/fetchArticleBySlug';
import { addTrackingToLink } from '../../../utils/link-utils';

import Styles from './page.module.scss';

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

  const readableDate = formatDate(article.publishedAt);
  const articleLinkLabel = linkLabels[detectContentGenre(article)];

  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>
        <Link
          href={addTrackingToLink(article.blog.href, { utm_medium: 'article_page' })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.blog.favicon && (
            <Image
              src={article.blog.favicon}
              alt=""
              className={Styles.favicon}
              height={16}
              width={16}
            />
          )}
          {article.blog.name}
        </Link>
      </h2>

      <div className={Styles.buttons}>
        <ButtonAsLink href="/" icon="icon-arrow-left2">
          Strona Główna
        </ButtonAsLink>
      </div>

      <article className={Styles.article}>
        <h3 className={Styles.title}>{article.title}</h3>
        <time className={Styles.publishDate}>{readableDate}</time>
        <div dangerouslySetInnerHTML={{ __html: article.sanitizedDescription }} />
        <section className={Styles.linkWrapper}>
          <p className={Styles.linkHeader}>Chcesz więcej? Sprawdź w oryginale!</p>
          <ButtonAsLink
            href={addTrackingToLink(article.href, { utm_medium: 'article_page' })}
            icon="icon-new-tab"
            target="_blank"
            rel="noopener noreferrer"
          >
            {articleLinkLabel}
          </ButtonAsLink>
        </section>
      </article>
    </section>
  );
}

export const generateStaticParams = async () => {
  try {
    const prisma = openConnection();

    const articles = await getArticlesSlugs(prisma, DEFAULT_ARTICLES);

    return articles;
  } finally {
    await closeConnection();
  }
};
