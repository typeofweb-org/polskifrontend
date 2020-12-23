/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

import 'jest-extended';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
  }
}
