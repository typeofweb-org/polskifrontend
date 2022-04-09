import Pino from 'pino';

export const logger = Pino({
  level: 'trace',
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: true },
    },
  }),
});
