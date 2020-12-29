import Link from 'next/link';
import { memo } from 'react';

import type { ArticlePageProps } from '../../pages/artykuly/[slug]';
import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';
import { Button } from '../Button/Button';

import styles from './articleSection.module.scss';

type ArticleSectionProps = ArticlePageProps;

export const ArticleSection = memo<ArticleSectionProps>(({ article }) => {
  const readableDate = formatDate(article.publishedAt);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <Link href={addTrackingToLink(article.blog.href, { utm_medium: 'article_page' })}>
          <a target="_blank" rel="noopener noreferrer">
            <img
              src={article.blog.favicon || undefined}
              alt=""
              className={styles.favicon}
              height={16}
              width={16}
            />
            {article.blog.name}
          </a>
        </Link>
      </h2>
      <div className={styles.buttons}>
        <Link href="/" passHref>
          <Button icon="icon-arrow-left2" as="a">
            Strona Główna
          </Button>
        </Link>
      </div>
      <article className={styles.article}>
        <h3 className={styles.title}>{article.title}</h3>
        <time className={styles.publishDate}>{readableDate}</time>
        <div dangerouslySetInnerHTML={{ __html: article.sanitizedDescription }} />
        <section className={styles.linkWrapper}>
          <p className={styles.linkHeader}>Chcesz więcej? Przeczytaj w oryginale!</p>
          <Link href={addTrackingToLink(article.href, { utm_medium: 'article_page' })} passHref>
            <Button icon="icon-new-tab" as="a" target="_blank" rel="noopener noreferrer">
              Przejdź do artykułu
            </Button>
          </Link>
        </section>
      </article>
    </section>
  );
});

ArticleSection.displayName = 'ArticleSection';
