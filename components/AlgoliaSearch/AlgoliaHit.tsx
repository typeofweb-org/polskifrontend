import { memo } from 'react';

import { createExcerpt } from '../../utils/excerpt-utils';
import type { ArticleTileArticle, ArticleTileBlog } from '../ArticleTile/ArticleTile';
import { ArticleTile } from '../ArticleTile/ArticleTile';

export type Hit = {
  readonly objectID: string;
  readonly href: string;
  readonly publishedAt: string;
  readonly slug: string;
  readonly description?: string;
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

const hitToArticle = (hit: Hit): ArticleTileArticle => ({
  title: hit.title,
  publishedAt: new Date(hit.publishedAt),
  excerpt: createExcerpt(hit.description || ''),
  href: hit.href,
  slug: hit.slug,
});

const hitToBlog = (hit: Hit): ArticleTileBlog => ({
  name: hit.blog.name,
  favicon: hit.blog.favicon ?? null,
});

export const AlgoliaHit = memo(({ hit }: HitProps) => (
  <ArticleTile article={hitToArticle(hit)} blog={hitToBlog(hit)} />
));
AlgoliaHit.displayName = 'AlogliaHit';
