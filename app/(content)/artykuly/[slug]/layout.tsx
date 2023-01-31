import Link from 'next/link';

import { ButtonAsLink } from '../../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../../components/Content/Content';
import { ContentNavigation } from '../../../../components/Content/ContentNavigation';
import { ContentTitle } from '../../../../components/Content/ContentTitle';
import { fetchArticleBySlug } from '../../../../utils/fetchArticleBySlug';
import { addTrackingToLink } from '../../../../utils/link-utils';

import type { ReactNode } from 'react';

type ArticleLayoutProps = {
  readonly children: ReactNode;
  readonly params: {
    readonly slug: string;
  };
};

export default async function ArticleLayout({ children, params }: ArticleLayoutProps) {
  const article = await fetchArticleBySlug(params.slug);

  return (
    <>
      <ContentTitle>
        <Link
          href={addTrackingToLink(article.blog.href, { utm_medium: 'article_page' })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.blog.name}
        </Link>
      </ContentTitle>

      <ContentNavigation>
        <ButtonAsLink href="/" icon="arrow-left2">
          Strona Główna
        </ButtonAsLink>
      </ContentNavigation>

      <Content>{children}</Content>
    </>
  );
}
