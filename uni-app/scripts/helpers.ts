import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const logger = pino(
  pinoPretty({
    levelFirst: true,
    colorize: true,
    translateTime: true,
  }),
);

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
