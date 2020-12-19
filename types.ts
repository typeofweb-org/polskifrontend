import type { HomePageProps } from './pages';

export type HomePageBlog = HomePageProps['blogs'][number];
export type HomePageArticle = HomePageBlog['articles'][number];
