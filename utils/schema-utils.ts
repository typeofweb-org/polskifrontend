import type { AnySchema, InferType, BaseSchema } from 'yup';

type CheckOptional<S extends AnySchema, T extends InferType<S>> = undefined extends InferType<S>
  ? T | undefined
  : T;

export const oneOfValues = <S extends AnySchema, T extends InferType<S>>(
  schema: S,
  values: readonly T[],
) => {
  return schema.oneOf([...values]) as BaseSchema<
    CheckOptional<S, T>,
    Record<string, any>,
    CheckOptional<S, T>
  >;
};
