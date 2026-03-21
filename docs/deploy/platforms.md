# Deploy por plataforma

## Frontend na Vercel

- Root directory: `apps/frontend`
- Build command: `npm run build --workspace frontend`
- Output directory: `apps/frontend/dist`
- Environment variable: `VITE_API_URL`

## Backend na Railway

- Root directory: repositorio raiz
- Docker build command: `docker build -f apps/backend/Dockerfile .`
- Start command apos provisionamento: `npm run db:migrate --workspace backend && node apps/backend/dist/main.js`
- Porta esperada: `3001`
- Environment variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `CORS_ORIGIN`
  - `DB_SYNCHRONIZE=false`

## Backend no Render

- Tipo: Web Service
- Runtime: Docker
- Dockerfile path: `apps/backend/Dockerfile`
- Start command apos provisionamento: `npm run db:migrate --workspace backend && node apps/backend/dist/main.js`
- Health check path: `/health`
- Environment variables iguais as da Railway
