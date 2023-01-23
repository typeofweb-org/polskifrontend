import { memo } from 'react';

import { createExcerpt } from '../../utils/excerpt-utils';
import { ArticleTile } from '../ArticleTile/ArticleTile';

import type { Article, BlogFromArticle } from '../../types';

export type Hit = {
  readonly objectID: string;
  readonly href: string;
  readonly publishedAt: string;
  readonly slug: string;
  readonly description: string | null;
  readonly title: string;
  readonly blog: {
    readonly name: string;
    readonly href: string;
    readonly favicon?: string;
  };
};

type HitProps = {
  readonly hit: Hit;
};

const hitToArticle = (hit: Hit) => {
  return {
    id: hit.objectID,
    href: hit.href,
    slug: hit.slug,
    title: hit.title,
    description: hit.description,
    publishedAt: new Date(hit.publishedAt),
    excerpt: createExcerpt(hit.description || ''),
    blog: {
      ...hit.blog,
      favicon: hit.blog.favicon ?? null,
    },
  } satisfies Article;
};
const hitToBlog = (hit: Hit) => {
  return {
    name: hit.blog.name,
    href: hit.blog.href,
    favicon: hit.blog.favicon ?? null,
  } satisfies BlogFromArticle;
};

export const AlgoliaHit = memo(
  ({ hit }: HitProps) => (
    <ArticleTile article={hitToArticle(hit)} blog={hitToBlog(hit)} isInGrid={false} />
  ),
  ({ hit: prev }, { hit: next }) => prev.objectID === next.objectID,
);
AlgoliaHit.displayName = 'AlgoliaHit';
