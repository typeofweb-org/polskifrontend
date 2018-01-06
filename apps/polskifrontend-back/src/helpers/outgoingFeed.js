import RSS from 'rss';
import { Articles } from '../models';

export default async function getOngoingFeed() {
  try {
    const feed = new RSS({
      title: 'Polski Front-End',
      description: 'Serwis skupiający strony, blogi i serwisy na temat Front-Endu. Tylko w języku polskim!',
      feed_url: 'https://www.polskifrontend.pl/feed',
      site_url: 'https://www.polskifrontend.pl/',
      image_url: 'https://www.polskifrontend.pl/polskifrontend_icon.png',
      webMaster: 'kontakt@nafrontendzie.pl',
      language: 'pl_PL'
    });
    const articles = await Articles.getAllArticles(30);

    articles.forEach((article) => {
      feed.item({
        title: article.title,
        description: article.description,
        url: `https://www.polskifrontend.pl/artykuly/${article.slug}`,
        guid: article.id,
        author: article._blog.name,
        date: article.date
      });
    });

    return feed;
  } catch (error) {
    throw error;
  }
}
