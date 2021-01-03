import Crypto from 'crypto';

import Boom from '@hapi/boom';
import Algoliasearch from 'algoliasearch';
import { string, object } from 'yup';

import { withAsync, withValidation } from '../../api-helpers/api-hofs';
import { getConfig } from '../../api-helpers/config';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { logger } from '../../api-helpers/logger';

const client = Algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_SECRET!);
const algoliaIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);

export default withAsync(
  withValidation({
    body: object({ secret: string().required() }).required(),
  })(async (req) => {
    if (req.method !== 'PATCH') {
      throw Boom.notFound();
    }

    try {
      const isSecretValid = Crypto.timingSafeEqual(
        Buffer.from(req.body.secret),
        Buffer.from(getConfig('FEED_UPDATE_SECRET')),
      );

      if (!isSecretValid) {
        throw Boom.unauthorized();
      }
    } catch (err) {
      throw Boom.isBoom(err) ? err : Boom.unauthorized();
    }

    const DAY_BEFORE = new Date();
    DAY_BEFORE.setHours(-24);

    try {
      const prisma = await openConnection();
      const articles = await prisma.article.findMany({
        where: {
          OR: [
            {
              createdAt: {
                gte: DAY_BEFORE,
              },
            },
            {
              updatedAt: {
                gte: DAY_BEFORE,
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
          href: true,
          description: true,
          publishedAt: true,
          slug: true,
        },
      });

      const indices = articles.map((article) => {
        const { id: objectID, ...data } = article;
        return { ...data, objectID };
      });

      const result = await algoliaIndex.saveObjects(indices);
      return result;
    } catch (err) {
      logger.error(err);
    } finally {
      await closeConnection();
    }
    return null;
  }),
);
