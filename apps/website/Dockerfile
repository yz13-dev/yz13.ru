# Stage 1: Build
FROM oven/bun:1.1 AS builder

WORKDIR /repo

# Сначала копируем root package.json, lock файл и turbo.json — ускоряет install
COPY package.json bun.lock turbo.json ./

# Затем копируем workspace конфиги и apps/packages
COPY apps ./apps
COPY packages ./packages

RUN bun install
RUN bun run turbo build --filter=website

# Stage 2: Runtime (минимальный)
FROM oven/bun:1.1

WORKDIR /app

# Копируем только output (из .output или .next, зависит от Next.js версии)
COPY --from=builder /repo/apps/website/.next ./.next
COPY --from=builder /repo/apps/website/package.json ./package.json
COPY --from=builder /repo/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "next", "start"]
