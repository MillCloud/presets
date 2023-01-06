import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const pinoPrettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
  ignore: 'pid,hostname',
});

export const logger = pino(pinoPrettyStream);
