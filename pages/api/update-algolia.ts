import type { Article } from '@prisma/client';
import Algoliasearch from 'algoliasearch';
import * as AllHtmlEntities from 'html-entities';
import Xss from 'xss';
import { object, string, mixed } from 'yup';

import { withAsync, withDb, withMethods, withValidation } from '../../api-helpers/api-hofs';
import { getConfig } from '../../api-helpers/config';

const client = Algoliasearch(
  getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
  getConfig('ALGOLIA_API_SECRET'),
);
const algoliaIndex = client.initIndex(getConfig('NEXT_PUBLIC_ALGOLIA_INDEX_NAME'));

type ToJson<T> = T extends Date
  ? string
  : T extends object
  ? {
      readonly [K in keyof T]: ToJson<T[K]>;
    }
  : T;

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

type InsertPayload = {
  readonly type: 'INSERT';
  readonly table: 'Article';
  readonly schema: 'public';
  readonly record: ToJson<Article>;
  readonly old_record: null;
};

type UpdatePayload = {
  readonly type: 'UPDATE';
  readonly table: 'Article';
  readonly schema: 'public';
  readonly record: ToJson<Article>;
  readonly old_record: ToJson<Article>;
};

type DeletePayload = {
  readonly type: 'DELETE';
  readonly table: 'Article';
  readonly schema: 'public';
  readonly record: null;
  readonly old_record: ToJson<Article>;
};

type Payload = InsertPayload | UpdatePayload | DeletePayload;

const commonSchema = object({
  table: mixed<'Article'>().required().oneOf(['Article']),
  schema: string().required(),
}).required();

const articleSchema = object({});

const insertPayloadSchema = commonSchema.shape({
  type: mixed<InsertPayload['type']>().required().oneOf(['INSERT']),
  record: articleSchema.required(),
  old_record: mixed<null>().nullable(),
});
const updatePayloadSchema = commonSchema.shape({
  type: mixed<UpdatePayload['type']>().required().oneOf(['UPDATE']),
  record: articleSchema.required(),
  old_record: articleSchema.required(),
});
const deletePayloadSchema = commonSchema.shape({
  type: mixed<DeletePayload['type']>().required().oneOf(['DELETE']),
  record: mixed<null>().nullable(),
  old_record: articleSchema.required(),
});

export default withAsync(
  withMethods({
    POST: withValidation({
      body: mixed<Payload>()
        .required()
        .test('shape', 'value', (data) => {
          return (
            insertPayloadSchema.isValidSync(data) ||
            updatePayloadSchema.isValidSync(data) ||
            deletePayloadSchema.isValidSync(data)
          );
        }),
    })(
      withDb(async (req) => {
        console.log(req.body);

        if (req.body.type === 'DELETE') {
          return algoliaIndex.deleteObject(req.body.old_record.id);
        } else {
          const articleToSubmit = await req.db.article.findFirst({
            where: {
              id: req.body.record.id,
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
        }
      }),
    ),
  }),
);
