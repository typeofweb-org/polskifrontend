import type { PrismaClient } from '@prisma/client';

import {
  getArticlesPaginationForGrid,
  getArticlesPaginationForList,
  getArticlesSlugs,
} from './articles';

type Item = {
  readonly path: string;
  readonly changefreq: 'daily' | 'monthly' | 'always' | 'hourly' | 'weekly' | 'yearly' | 'never';
  readonly priority: number;
};

const staticItems: readonly Item[] = [
  { path: '/', changefreq: 'hourly', priority: 1 },
  { path: '/o-serwisie', changefreq: 'monthly', priority: 0.5 },
  { path: '/zglos-serwis', changefreq: 'monthly', priority: 0.5 },

  { path: '/list', changefreq: 'hourly', priority: 0.9 },
  { path: '/grid', changefreq: 'hourly', priority: 0.9 },
];

export async function getSitemap(prisma: PrismaClient) {
  const [gridCursors, listCursors, articleSlugs] = await Promise.all([
    getArticlesPaginationForGrid(prisma),
    getArticlesPaginationForList(prisma),
    getArticlesSlugs(prisma),
  ]);

  const dynamicItems: readonly Item[] = [
    ...articleSlugs.map(({ slug }) => ({
      path: `/artykuly/${slug}`,
      changefreq: 'monthly' as const,
      priority: 0.5,
    })),
    ...gridCursors.map((cursor) => ({
      path: `/grid/${cursor}`,
      changefreq: 'hourly' as const,
      priority: 0.4,
    })),
    ...listCursors.map((cursor) => ({
      path: `/list/${cursor}`,
      changefreq: 'hourly' as const,
      priority: 0.4,
    })),
  ];

  return sitemapXml([...staticItems, ...dynamicItems]);
}

function itemsToXml(items: ReadonlyArray<Item>) {
  return items
    .map((item) =>
      `
  <url>
    <loc>https://${process.env.NEXT_PUBLIC_URL!}${item.path}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
    `.trim(),
    )
    .join('\n');
}

function sitemapXml(items: ReadonlyArray<Item>) {
  const xml = itemsToXml(items);
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${xml}
</urlset>
  `.trim();
}
