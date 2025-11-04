import { apiKeys } from "../lib/api-keys/keys";

// Middleware с функциональным подходом
export const createApiKeyMiddleware = (requiredPermissions: string[] = []) => {
  return async (c, next) => {
    const startTime = Date.now();

    try {
      const authHeader = c.req.header('Authorization');
      const apiKeyHeader = c.req.header('X-API-Key');
      const apiKeyQueryParam = c.req.query('token');

      // console.log("authHeader", authHeader)
      // console.log("apiKeyHeader", apiKeyHeader)
      // console.log("apiKeyQueryParam", apiKeyQueryParam)

      let apiKey = null;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        apiKey = authHeader.substring(7);
      }
      if (apiKeyHeader) {
        apiKey = apiKeyHeader;
      }
      if (apiKeyQueryParam) {
        apiKey = apiKeyQueryParam;
      }

      if (!apiKey) {
        return c.json({
          error: 'API key required',
          message: 'Provide API key in Authorization header or X-API-Key header or query parameter'
        }, 401);
      }

      // Валидируем ключ
      const keyData = await apiKeys(c).validate(apiKey);
      if (!keyData) {
        return c.json({
          error: 'Invalid API key',
          message: 'The provided API key is not valid or has expired'
        }, 401);
      }

      // Проверяем права доступа
      if (requiredPermissions.length > 0) {
        const hasPermission = requiredPermissions.every(
          permission => (keyData.permissions ?? []).includes(permission)
        );

        if (!hasPermission) {
          return c.json({
            error: 'Insufficient permissions',
            message: `Required permissions: ${requiredPermissions.join(', ')}`
          }, 403);
        }
      }

      // Добавляем данные в контекст
      c.set('keyData', keyData);
      c.set('requestStartTime', startTime);

      await next();

    } catch (err) {
      const error = err as Error;
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        return c.json({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.'
        }, 429);
      }

      console.error('API Key middleware error:', error);
      return c.json({
        error: 'Authentication error',
        message: 'An error occurred during authentication'
      }, 500);
    }
  };
};
