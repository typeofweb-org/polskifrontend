import type { AnySchema, Schema, InferType } from 'yup';

type CheckOptional<S extends AnySchema, T extends InferType<S>> = undefined extends InferType<S>
  ? T | undefined
  : T;

export const oneOfValues = <S extends Schema, T extends InferType<S>>(
  schema: S,
  values: readonly T[],
) => {
  return schema.oneOf(values) as Schema<
    CheckOptional<S, T>,
    Record<string, unknown>,
    CheckOptional<S, T>
  >;
};
