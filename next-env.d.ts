/// <reference types="next" />
/// <reference types="next/types/global" />

import 'jest-extended';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
  }
}

declare module 'next' {
  interface NextApiRequest {
    readonly body: never;
  }
}
