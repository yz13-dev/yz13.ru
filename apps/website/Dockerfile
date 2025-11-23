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
# Assuming "website" is the name entered in the project's package.json: { name: "website" }
RUN turbo prune website --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update
RUN apt-get install -y --no-install-recommends libc6
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN bun install -g turbo@2.6.0
RUN bun install

# Build the project
COPY --from=builder /app/out/full/ .
RUN turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/public ./apps/website/public

ENV NODE_ENV="production"
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD bun apps/website/server.js -p 3000 -H 0.0.0.0
