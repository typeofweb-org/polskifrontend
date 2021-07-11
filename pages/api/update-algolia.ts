import Crypto from 'crypto';

import Algoliasearch from 'algoliasearch';
import * as AllHtmlEntities from 'html-entities';
import Xss from 'xss';
import { object, string } from 'yup';

import { withAsync, withDb, withMethods, withValidation } from '../../api-helpers/api-hofs';
import { getConfig } from '../../api-helpers/config';

const client = Algoliasearch(
  getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
  getConfig('ALGOLIA_API_SECRET'),
);
const algoliaIndex = client.initIndex(getConfig('NEXT_PUBLIC_ALGOLIA_INDEX_NAME'));

interface Hit {
  readonly objectID: string;
  readonly href: string;
  readonly publishedAt: string;
  readonly slug?: string | null;
  readonly description?: string | null;
  readonly title: string;
  readonly blog: {
    readonly name: string;
    readonly href: string;
    readonly favicon?: string | null;
  };
}

function safeCompare(a: string, b: string) {
  try {
    return Crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export default withAsync(
  withMethods({
    POST: withValidation({
      body: object({
        id: string().required(),
        event: string().required(),
      }).required(),
    })(
      withDb(async (req) => {
        if (!req.headers['x-signature'] || typeof req.headers['x-signature'] !== 'string') {
          return null;
        }

        const secret = await req.db.secret.findFirst({
          where: {
            name: 'notification_signature',
          },
        });

        if (!secret) {
          return null;
        }

        const signature = Crypto.createHmac('sha512', secret.id).update(req._rawBody).digest('hex');

        if (!safeCompare(signature, req.headers['x-signature'])) {
          return null;
        }

        const articleToSubmit = await req.db.article.findFirst({
          where: {
            id: req.body.id,
          },
          select: {
            id: true,
            title: true,
            href: true,
            description: true,
            publishedAt: true,
            slug: true,
            blog: {
              select: {
                name: true,
                href: true,
                favicon: true,
              },
            },
          },
        });

        if (!articleToSubmit) {
          return null;
        }

        const { id: objectID, description, title, publishedAt, ...rest } = articleToSubmit;

        const hit: Hit = {
          ...rest,
          objectID,
          publishedAt: String(publishedAt),
          description: AllHtmlEntities.decode(
            Xss(description ?? '', { stripIgnoreTag: true, whiteList: {} }),
          ),
          title: AllHtmlEntities.decode(Xss(title, { stripIgnoreTag: true, whiteList: {} })),
        };

        return algoliaIndex.saveObject(hit, { autoGenerateObjectIDIfNotExist: false });
      }),
    ),
  }),
);
