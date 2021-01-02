/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

import 'jest-extended';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
  }
}

type Role = 'USER' | 'ADMIN';

declare module 'next-auth' {
  interface User {
    readonly userId?: number;
    readonly role?: Role;
  }
}
