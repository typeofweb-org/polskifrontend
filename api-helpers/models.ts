/* eslint-disable -- can't add readonly here */
import * as Prisma from '@prisma/client';

type PrismaDelegates = Pick<Prisma.PrismaClient, ReadonlyKeys<Prisma.PrismaClient>>;
type Awaited<T> = T extends Promise<infer R> ? R : never;

export type Models = {
  readonly [K in keyof PrismaDelegates]: NonNullable<
    Awaited<ReturnType<PrismaDelegates[K]['findFirst']>>
  >;
};

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B;
type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

type EnumsKeys = {
  readonly [K in keyof typeof Prisma]: (typeof Prisma)[K] extends object
    ? (typeof Prisma)[K] extends Function
      ? never
      : K
    : never;
}[keyof typeof Prisma];

export type Enums = Pick<typeof Prisma, EnumsKeys>;
export const Enums = Prisma as Enums;
