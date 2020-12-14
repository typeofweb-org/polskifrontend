import Pino from 'pino';

export const logger = Pino({
  prettyPrint: { colorize: true, translateTime: true },
  level: 'trace',
});
