import { compileUrl, findMismatchingParams } from './fetcher';

describe('fetcher', () => {
  describe('compileUrl', () => {
    const validCases = [
      {
        input: {
          path: '/blabla/sss',
          params: undefined,
        },
        out: '/blabla/sss',
      },
      {
        input: {
          path: '/blabla/sss',
          params: {},
        },
        out: '/blabla/sss',
      },
      {
        input: {
          path: '/blabla/{id}',
          params: {
            id: 123,
          },
        },
        out: '/blabla/123',
      },
      {
        input: {
          path: '/blabla/{name}/{id}/costam/{arg}',
          params: {
            id: 123,
            name: 'Michal',
            arg: 'bbb',
          },
        },
        out: '/blabla/Michal/123/costam/bbb',
      },
    ];

    const invalidCases = [
      {
        input: {
          path: '/blabla/sss',
          params: { arg: 123 },
        },
      },
      {
        input: {
          path: '/blabla/{id}',
          params: { arg: 123 },
        },
      },
      {
        input: {
          path: '/blabla/{name}/{id}/costam/{arg}',
          params: {
            id: 123,
            arg: 'bbb',
          },
        },
      },
    ];

    validCases.forEach(({ input: { path, params }, out }) => {
      it(`validCases: ${path} -> ${JSON.stringify(params)}`, () => {
        expect(compileUrl(path as any, params as any)).toEqual(
          process.env.NEXT_PUBLIC_API_URL + out,
        );
      });
    });

    invalidCases.forEach(({ input: { path, params } }) => {
      it(`invalidCases: ${path} -> ${JSON.stringify(params)}`, () => {
        expect(() => compileUrl(path as any, params as any)).toThrow();
      });
    });
  });

  describe('findMismatchingParams', () => {
    const cases = [
      {
        input: {
          requiredParams: [],
          params: {},
        },
        out: {
          excessParams: [],
          missingParams: [],
        },
      },
      {
        input: {
          requiredParams: ['name'],
          params: {},
        },
        out: {
          excessParams: [],
          missingParams: ['name'],
        },
      },
      {
        input: {
          requiredParams: ['name'],
          params: { name: 'Michal' },
        },
        out: {
          excessParams: [],
          missingParams: [],
        },
      },
      {
        input: {
          requiredParams: ['name', 'id'],
          params: { name: 'Michal' },
        },
        out: {
          excessParams: [],
          missingParams: ['id'],
        },
      },
      {
        input: {
          requiredParams: ['name', 'id'],
          params: { name: 'Michal', ID: 123 },
        },
        out: {
          excessParams: ['ID'],
          missingParams: ['id'],
        },
      },
      {
        input: {
          requiredParams: ['id'],
          params: { arg: 123 },
        },
        out: {
          excessParams: ['arg'],
          missingParams: ['id'],
        },
      },
    ];

    cases.forEach(({ input: { requiredParams, params }, out }) => {
      it(`${requiredParams.join(',')} -> ${JSON.stringify(params)}`, () => {
        expect(findMismatchingParams(requiredParams, params)).toEqual(out);
      });
    });
  });
});
