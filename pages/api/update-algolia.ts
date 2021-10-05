// import Crypto from 'crypto';

// import type { Article } from '@prisma/client';
// import Algoliasearch from 'algoliasearch';
// import * as AllHtmlEntities from 'html-entities';
// import Xss from 'xss';
// import { object, string } from 'yup';

import { withAsync, withDb, withMethods } from '../../api-helpers/api-hofs';
// import { getConfig } from '../../api-helpers/config';

// const client = Algoliasearch(
//   getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
//   getConfig('ALGOLIA_API_SECRET'),
// );
// const algoliaIndex = client.initIndex(getConfig('NEXT_PUBLIC_ALGOLIA_INDEX_NAME'));

// interface Hit {
//   readonly objectID: string;
//   readonly href: string;
//   readonly publishedAt: string;
//   readonly slug?: string | null;
//   readonly description?: string | null;
//   readonly title: string;
//   readonly blog: {
//     readonly name: string;
//     readonly href: string;
//     readonly favicon?: string | null;
//   };
// }

// type InsertPayload = {
//   readonly type: 'INSERT';
//   readonly table: string;
//   readonly schema: string;
//   readonly record: Article;
//   readonly old_record: null;
// };

// type UpdatePayload = {
//   readonly type: 'UPDATE';
//   readonly table: string;
//   readonly schema: string;
//   readonly record: Article;
//   readonly old_record: Article;
// };

// type DeletePayload = {
//   readonly type: 'DELETE';
//   readonly table: string;
//   readonly schema: string;
//   readonly record: null;
//   readonly old_record: Article;
// };

// type Payload = InsertPayload | UpdatePayload | DeletePayload;

export default withAsync(
  withMethods({
    POST: withDb((req) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ok
      console.log((req as any).body);

      // const articleToSubmit = await req.db.article.findFirst({
      //   where: {
      //     id: req.body.id,
      //   },
      //   select: {
      //     id: true,
      //     title: true,
      //     href: true,
      //     description: true,
      //     publishedAt: true,
      //     slug: true,
      //     blog: {
      //       select: {
      //         name: true,
      //         href: true,
      //         favicon: true,
      //       },
      //     },
      //   },
      // });

      // if (!articleToSubmit) {
      //   return null;
      // }

      // const { id: objectID, description, title, publishedAt, ...rest } = articleToSubmit;

      // const hit: Hit = {
      //   ...rest,
      //   objectID,
      //   publishedAt: String(publishedAt),
      //   description: AllHtmlEntities.decode(
      //     Xss(description ?? '', { stripIgnoreTag: true, whiteList: {} }),
      //   ),
      //   title: AllHtmlEntities.decode(Xss(title, { stripIgnoreTag: true, whiteList: {} })),
      // };

      // return algoliaIndex.saveObject(hit, { autoGenerateObjectIDIfNotExist: false });
    }),
  }),
);
