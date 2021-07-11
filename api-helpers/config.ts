type Nil<T> = T | null | undefined;

type NameToType = {
  readonly DATABASE_URL: string;
  readonly DATABASE_POOL_URL: string;
  readonly ENV: 'production' | 'staging' | 'development' | 'test';
  readonly FEED_UPDATE_SECRET: string;
  readonly NEXT_PUBLIC_URL: string;
  readonly NODE_ENV: 'production' | 'development';
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

  readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string;
  readonly ALGOLIA_API_SECRET: string;
  readonly NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string;
};

function getConfigForName<T extends keyof NameToType>(name: T): Nil<NameToType[T]>;
function getConfigForName(name: keyof NameToType): Nil<NameToType[keyof NameToType]> {
  const val = process.env[name];

  switch (name) {
    case 'NODE_ENV':
      return val || 'development';
    case 'ENV':
      return val || 'development';
    case 'DATABASE_POOL_URL':
      return val || getConfigForName('DATABASE_URL');
  }
  return val;
}

export function getConfig<T extends keyof NameToType>(name: T): NameToType[T];
export function getConfig(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = getConfigForName(name);

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}

export const isProd = () => getConfig('ENV') === 'production';
export const isStaging = () => getConfig('ENV') === 'staging';
