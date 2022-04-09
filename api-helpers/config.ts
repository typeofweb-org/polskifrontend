import { logger } from './logger';

type Nil<T> = T | null | undefined;

type NameToType = {
  readonly DATABASE_URL: string;
  readonly DATABASE_POOL_URL: string;
  readonly ENV: 'production' | 'staging' | 'development' | 'test';
  readonly FEED_UPDATE_SECRET: string;
  readonly NODE_ENV: 'production' | 'development';
  readonly YOUTUBE_API_KEY: string;
  readonly CAPTCHA_SECRET_KEY: string;
  readonly ALGOLIA_API_SECRET: string;

  readonly NEXT_PUBLIC_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string;
  readonly NEXT_PUBLIC_ALGOLIA_API_KEY: string;
  readonly NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string;
  readonly NEXT_PUBLIC_CAPTCHA_SITE_KEY: string;
};

function getConfigForName<T extends keyof NameToType>(name: T): Nil<NameToType[T]>;
function getConfigForName(name: keyof NameToType): Nil<NameToType[keyof NameToType]> {
  switch (name) {
    case 'NODE_ENV':
      return process.env.NODE_ENV || 'development';
    case 'ENV':
      return process.env.ENV || 'development';
    case 'DATABASE_POOL_URL':
      return process.env.DATABASE_POOL_URL || getConfigForName('DATABASE_URL');

    case 'DATABASE_URL':
      return process.env.DATABASE_URL;
    case 'FEED_UPDATE_SECRET':
      return process.env.FEED_UPDATE_SECRET;
    case 'YOUTUBE_API_KEY':
      return process.env.YOUTUBE_API_KEY;
    case 'CAPTCHA_SECRET_KEY':
      return process.env.CAPTCHA_SECRET_KEY;
    case 'ALGOLIA_API_SECRET':
      return process.env.ALGOLIA_API_SECRET;

    case 'NEXT_PUBLIC_URL':
      return process.env.NEXT_PUBLIC_URL;
    case 'NEXT_PUBLIC_SUPABASE_URL':
      return process.env.NEXT_PUBLIC_SUPABASE_URL;
    case 'NEXT_PUBLIC_SUPABASE_ANON_KEY':
      return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    case 'NEXT_PUBLIC_ALGOLIA_APP_ID':
      return process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    case 'NEXT_PUBLIC_ALGOLIA_API_KEY':
      return process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
    case 'NEXT_PUBLIC_ALGOLIA_INDEX_NAME':
      return process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
    case 'NEXT_PUBLIC_CAPTCHA_SITE_KEY':
      return process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
    default:
      return undefined;
  }
}

export function getConfig<T extends keyof NameToType>(name: T): NameToType[T];
export function getConfig(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = getConfigForName(name);

  if (val == null) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  if (!val) {
    logger.warn(`Environmental variable ${name} is falsy: ${val === '' ? '(empty string)' : val}.`);
  }

  return val;
}

export const isProd = () => getConfig('ENV') === 'production';
export const isStaging = () => getConfig('ENV') === 'staging';
