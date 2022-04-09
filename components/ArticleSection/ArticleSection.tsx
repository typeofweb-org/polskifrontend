import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { detectContentGenre } from '../../utils/creator-utils';
import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';
import { Button } from '../Button/Button';

import Styles from './articleSection.module.scss';

import type { ArticlePageProps } from '../../pages/artykuly/[slug]';

const linkLabels: Record<ReturnType<typeof detectContentGenre>, string> = {
  blog: 'Przejdź do artykułu',
  podcast: 'Przejdź do podcastu',
  youtube: 'Przejdź do filmu',
};

type ArticleSectionProps = Pick<ArticlePageProps, 'article'>;
export const ArticleSection = memo<ArticleSectionProps>(({ article }) => {
  const readableDate = formatDate(article.publishedAt);

  const articleLinkLabel = linkLabels[detectContentGenre(article)];

  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>
        <Link href={addTrackingToLink(article.blog.href, { utm_medium: 'article_page' })}>
          <a target="_blank" rel="noopener noreferrer">
            {article.blog.favicon && (
              <Image
                loading="lazy"
                src={article.blog.favicon}
                alt=""
                className={Styles.favicon}
                height={16}
                width={16}
              />
            )}
            {article.blog.name}
          </a>
        </Link>
      </h2>
      <div className={Styles.buttons}>
        <Link href="/" passHref>
          <Button icon="icon-arrow-left2" as="a">
            Strona Główna
          </Button>
        </Link>
      </div>
      <article className={Styles.article}>
        <h3 className={Styles.title}>{article.title}</h3>
        <time className={Styles.publishDate}>{readableDate}</time>
        <div dangerouslySetInnerHTML={{ __html: article.sanitizedDescription }} />
        <section className={Styles.linkWrapper}>
          <p className={Styles.linkHeader}>Chcesz więcej? Sprawdź w oryginale!</p>
          <Link href={addTrackingToLink(article.href, { utm_medium: 'article_page' })} passHref>
            <Button icon="icon-new-tab" as="a" target="_blank" rel="noopener noreferrer">
              {articleLinkLabel}
            </Button>
          </Link>
        </section>
      </article>
    </section>
  );
});

ArticleSection.displayName = 'ArticleSection';
