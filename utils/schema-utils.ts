import { mixed } from 'yup';
import type { BaseSchema } from 'yup';

export const oneOfValues = <T extends readonly unknown[]>(values: T) =>
  mixed().oneOf([...values]) as BaseSchema<T[number], Record<string, any>, T[number]>;
