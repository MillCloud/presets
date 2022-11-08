import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const pinoPrettyStream = pinoPretty({
  colorize: true,
  levelFirst: true,
  translateTime: true,
});

export const logger = pino(pinoPrettyStream);
