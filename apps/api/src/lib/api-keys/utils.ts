import { createHash, randomBytes } from 'crypto';
import { config } from './config';


// Утилиты для работы с ключами
export const keyUtils = {
  generate: (prefix = 'ak') => {
    const env = process.env.NODE_ENV || 'dev';
    const randomPart = randomBytes(20).toString('hex');
    const timestamp = Date.now().toString(36);
    return `${prefix}_${env}_${timestamp}_${randomPart}`;
  },

  hash: (key: string) => {
    return createHash('sha256')
      .update(key + config.apiKeySalt)
      .digest('hex');
  }
};
