FROM oven/bun:1.3 AS base

FROM base AS builder

RUN apt-get update
RUN apt-get install -y --no-install-recommends libc6
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN bun install -g turbo@^2
RUN bun install -g turbo@2.6.0
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "api" is the name entered in the project's package.json: { name: "api" }
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update
RUN apt-get install -y --no-install-recommends libc6
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN bun install -g turbo@2.6.0
RUN bun install

# Copy the full source code
COPY --from=builder /app/out/full/ .

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunjs
USER bunjs

# Copy installed dependencies and source code
COPY --from=installer --chown=bunjs:nodejs /app .

# Change to the api directory and run the server
WORKDIR /app/apps/api
CMD ["bun", "run", "server.ts"]
