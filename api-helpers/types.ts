import type { Models } from './models';

export type Model<T extends Partial<Models[keyof Models]>> = T & {
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type DeepPartial<T> = {
  readonly [P in keyof T]?: T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;

export type Nil<T> = T | undefined | null;
