# Biblioteca em Nuvem

Monorepo para um MVP de biblioteca em nuvem com cadastro de itens (`book` e `movie`), autenticacao JWT, reviews e interface web.

## Estrutura

- `apps/backend`: API NestJS com PostgreSQL, JWT e Swagger.
- `apps/frontend`: aplicacao React + TypeScript + Tailwind.
- `docs/architecture`: decisoes arquiteturais e convencoes.
- `docs/api`: contrato inicial da API.
- `docs/deploy`: orientacoes operacionais e checklist de entrega.

## Convencoes

- Monorepo com `npm workspaces`.
- Idioma do codigo em ingles.
- MVP com entidade unificada `Item` e campo `type`.
- `GET /items`, `GET /items/:id` e `GET /reviews/item/:itemId` sao publicos.
- Mutacoes de itens e reviews exigem JWT.
- O catalogo do MVP e colaborativo entre usuarios autenticados.
- `DB_SYNCHRONIZE` deve permanecer `false` fora de ambiente local.

## Variaveis de ambiente

Cada aplicacao possui seu proprio `.env.example`:

- `apps/backend/.env.example`
- `apps/frontend/.env.example`

## Fluxo sugerido

1. Instalar dependencias na raiz com `npm install`.
2. Configurar os arquivos `.env` a partir dos exemplos.
3. Subir o PostgreSQL local com `npm run db:up` na porta `5433`.
4. Executar migrations do backend com `npm run db:migrate --workspace backend`.
5. Subir backend e frontend por workspace.

## Scripts principais

- `npm run dev:backend`
- `npm run dev:frontend`
- `npm run db:up`
- `npm run db:down`
- `npm run db:migrate`
- `npm run lint`
- `npm run build`

## API

- Swagger: `http://localhost:3001/docs`
- Health: `GET /health`

## Deploy

- Backend: `apps/backend/Dockerfile`
- CI: `.github/workflows/ci.yml`
- Guias operacionais:
  - `docs/deploy/checklist.md`
  - `docs/deploy/platforms.md`

## Roadmap

1. Bootstrap do monorepo
2. Fundacao do backend
3. Autenticacao JWT
4. CRUD de itens
5. Reviews e historico
6. Fundacao do frontend
7. Integracao frontend-backend
8. Docker, CI/CD e deploy
