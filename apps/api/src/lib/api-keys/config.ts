// Конфигурация
export const config = {
  apiKeySalt: process.env.API_KEY_SALT || 'default-salt',
  defaultRateLimit: 1000,
  defaultWindow: 3600,
  logRetentionDays: 30
};
