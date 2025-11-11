# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase. Follow the steps [here](https://supabase.com/docs/guides/hosting/docker) to get started.

## HTTPS and Dashboard at Root

This setup includes a `caddy` reverse proxy that:
- Terminates TLS (HTTPS) on ports 443/80
- Proxies all traffic to `kong:8000`
- Exposes the Supabase Studio dashboard at the root path `/`

### Required environment

Set these variables (e.g. in your shell or a `.env` loaded by Compose):

```
SUPABASE_DOMAIN=example.com          # required; domain to serve
SUPABASE_TLS_EMAIL=you@example.com   # optional; Let's Encrypt email
SUPABASE_TLS_ISSUER=letsencrypt      # or "internal" for self-signed (dev)
```

Recommended (so links rendered by Studio/API use HTTPS):
```
SUPABASE_PUBLIC_URL=https://$SUPABASE_DOMAIN
API_EXTERNAL_URL=https://$SUPABASE_DOMAIN
SITE_URL=https://$SUPABASE_DOMAIN
```

### Usage

- Start: `docker compose up -d`
- Stop: `docker compose down`

If you already had Kong exposed on 8000/8443, you can keep those for local access, but the public entrypoint should be via Caddy on 443/80.
