import { parse } from 'url';

type Nil<T> = T | null | undefined;

type NameToType = {
  readonly DATABASE_URL: string;
  readonly DB_HOSTNAME: string;
  readonly DB_NAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_USERNAME: string;
  readonly ENV: 'production' | 'staging' | 'development' | 'test';
  readonly FEED_UPDATE_SECRET: string;
  readonly NEXT_PUBLIC_URL: string;
  readonly NODE_ENV: 'production' | 'development';
};

function getConfigForName<T extends keyof NameToType>(name: T): Nil<NameToType[T]>;
function getConfigForName(name: keyof NameToType): Nil<NameToType[keyof NameToType]> {
  const val = process.env[name];
  const parsed = parse(process.env.DATABASE_URL || '');

  switch (name) {
    case 'NODE_ENV':
      return val || 'development';
    case 'ENV':
      return val || 'development';
    case 'DB_USERNAME':
      return val || parsed.auth?.split(':')[0];
    case 'DB_PASSWORD':
      return val || parsed.auth?.split(':')[1];
    case 'DB_NAME':
      return val || parsed.pathname?.slice(1);
    case 'DB_HOSTNAME':
      return val || parsed.hostname;
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
