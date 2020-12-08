export type InferGetStaticPathsType<T> = T extends () => Promise<infer R>
  ? R extends { readonly paths: ReadonlyArray<infer P> }
    ? P
    : never
  : never;
