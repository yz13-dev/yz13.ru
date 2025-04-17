# 1. Базовый образ
FROM oven/bun:latest AS base

WORKDIR /app

# 2. Копируем только package.json/lockfile/turbo.json для кеширования
COPY turbo.json bun.lock package.json ./
COPY apps/website/package.json ./apps/website/

# 3. Копируем весь проект
COPY . .

# 4. Установка зависимостей
RUN bun install

# 5. Сборка нужного приложения
RUN bun run build --filter=website

# 6. Финальный образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Копируем собранный код и зависимости
COPY --from=base /app/apps/website/.next .next
COPY --from=base /app/apps/website/public ./public
COPY --from=base /app/apps/website/next.config.mjs ./next.config.mjs
COPY --from=base /app/apps/website/package.json ./

# Установка прод-зависимостей только для website
RUN bun install --production

# Старт сервера
CMD ["bun", "start"]
