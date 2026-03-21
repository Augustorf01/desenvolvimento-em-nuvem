# Checklist de Deploy

## Backend

- Definir `DATABASE_URL`
- Definir `JWT_SECRET`
- Definir `PORT`
- Garantir `DB_SYNCHRONIZE=false`
- Configurar origem do frontend em `CORS_ORIGIN`
- Executar `npm run db:migrate --workspace backend`

## Frontend

- Definir `VITE_API_URL`
- Configurar deploy na Vercel

## Pipeline

- Instalar dependencias na raiz
- Executar `npm run lint`
- Executar `npm run build`

## Publicacao

- Backend em Railway ou Render
- Frontend em Vercel
- Revisar Swagger apos deploy
