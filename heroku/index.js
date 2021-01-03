// @ts-check
import Http from 'http';

import Algoliasearch from 'algoliasearch';
import pg from 'pg';
import createSubscriber from 'pg-listen';
const { Pool } = pg;

const subscriber = createSubscriber({ connectionString: process.env.DATABASE_URL });

const client = Algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_SECRET);
const algoliaIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

const x = { id: 'adsada' };

/**
 * @typedef {{
    id: string,
    title: string,
    href: string,
    description: string | null,
    publishedAt: Date,
    slug: string,
    blogId: string,
    createdAt: Date,
    updatedAt: Date,
  }} Article
 */

/**
 * @param {{channel: string, payload?: string}} args
 */
function handleNotification({ channel, payload }) {
  // eslint-disable-next-line default-case
  switch (channel) {
    case 'INSERT.Article':
    case 'UPDATE.Article':
      pool
        .query('SELECT * FROM "Article" WHERE id=$1;', [payload])
        .then((result) => {
          const indices = result.rows.map(
            /**
             * @param {Article} article
             */
            (article) => {
              const { id: objectID, createdAt, updatedAt, ...data } = article;
              return { ...data, objectID };
            },
          );
          return algoliaIndex.saveObjects(indices, { autoGenerateObjectIDIfNotExist: false });
        })
        .catch(console.error);
      break;
    case 'DELETE.Article':
      algoliaIndex.deleteObject(payload).catch(console.error);
      break;
  }
}

subscriber.events.on('notification', handleNotification);

subscriber.events.on('error', (error) => {
  console.error('Fatal database connection error:', error);
  process.exit(1);
});

process.on('exit', () => {
  void subscriber.close();
});

export async function connect() {
  await subscriber.connect();
  await Promise.all([
    subscriber.listenTo('INSERT.Article'),
    subscriber.listenTo('UPDATE.Article'),
    subscriber.listenTo('DELETE.Article'),
  ]);
}

connect().catch(console.error);

const server = Http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Działa!');
});

server.listen(Number(process.env.PORT), 'localhost', () => {
  console.log('Server running');
});
