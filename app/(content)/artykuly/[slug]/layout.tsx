import Link from 'next/link';

import { ButtonAsLink } from '../../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../../components/Content/Content';
import { ContentTitle } from '../../../../components/Content/ContentTitle';
import { fetchArticleBySlug } from '../../../../utils/fetchArticleBySlug';
import { addTrackingToLink } from '../../../../utils/link-utils';

import type { ReactNode } from 'react';

type AboutServiceLayoutProps = {
  readonly children: ReactNode;
  readonly params: {
    readonly slug: string;
  };
};

export default async function ArticleLayout({ children, params }: AboutServiceLayoutProps) {
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

      <ButtonAsLink href="/" icon="arrow-left2">
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
