import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const logger = pino(
  pinoPretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  }),
);

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
