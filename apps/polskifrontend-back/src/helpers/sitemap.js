import sitemap from 'sitemap';
import { Articles } from '../models';

export default async function getSitemap() {
  try {
    const result = sitemap.createSitemap({
      hostname: 'https://www.polskifrontend.pl',
      cacheTime: 60000,
      urls: [
        { url: '/', changefreq: 'daily', priority: 1 },
        { url: '/zglos-serwis', changefreq: 'monthly', priority: 0.5 },
        { url: '/o-serwisie', changefreq: 'monthly', priority: 0.8 },
        { url: '/zglos-uwagi', changefreq: 'monthly', priority: 0.5 },
        { url: '/aktualnosci', changefreq: 'weekly', priority: 0.8 }
      ]
    });
    const articles = await Articles.getAllArticles();

    articles.forEach(article => {
      result.urls.push({
        url: `/artykuly/${article.slug}`,
        changefreq: 'monthly',
        priority: 0.7
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
}
