# Biblioteca em Nuvem

Monorepo para um MVP de biblioteca em nuvem com cadastro de itens (`book` e `movie`), autenticação JWT, reviews e interface web. O projeto permite explorar um catálogo colaborativo de livros e filmes, realizar avaliações e gerenciar itens após login.

## 1. Visão geral

- **`apps/backend`**: API NestJS com PostgreSQL, JWT e Swagger.
- **`apps/frontend`**: aplicação React + TypeScript + Tailwind.
- **`docs/architecture`**: decisões arquiteturais e convenções.
- **`docs/api`**: contrato inicial da API.
- **`docs/deploy`**: orientações operacionais e checklist de entrega.

### Convenções do projeto

- Monorepo com `npm workspaces`.
- Idioma do código em inglês.
- MVP com entidade unificada `Item` e campo `type` (`book` | `movie`).
- `GET /items`, `GET /items/:id` e `GET /reviews/item/:itemId` são públicos.
- Mutações de itens e reviews exigem JWT.
- O catálogo do MVP é colaborativo entre usuários autenticados.
- `DB_SYNCHRONIZE` deve permanecer `false` fora de ambiente local.

---

## 2. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Ferramenta | Versão recomendada | Verificação |
|------------|---------------------|-------------|
| **Node.js** | 20.x ou superior | `node --version` |
| **npm** | 10.x ou superior | `npm --version` |
| **Docker** | Mais recente | `docker --version` |
| **Docker Compose** | v2+ | `docker compose version` |
| **Git** | Mais recente | `git --version` |

> O projeto exige `node >= 20.0.0` e `npm >= 10.0.0` (definido em `package.json`).

---

## 3. Instalação do projeto

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd desenvolvimento-em-nuvem

# Instale as dependências (backend e frontend)
npm install
```

O `npm install` na raiz instala automaticamente as dependências de todos os workspaces do monorepo (`apps/backend` e `apps/frontend`).

---

## 4. Configuração de variáveis de ambiente

Cada aplicação possui seu próprio `.env`. Copie os exemplos e ajuste conforme necessário.

### 4.1 Backend (`apps/backend/.env`)

```bash
cp apps/backend/.env.example apps/backend/.env
```

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `PORT` | Não | Porta HTTP do backend (padrão: 3001) | `3001` |
| `DATABASE_URL` | Sim | URL de conexão PostgreSQL | `postgres://postgres:postgres@localhost:5433/library_cloud` |
| `JWT_SECRET` | Sim | Chave secreta para assinar tokens JWT (troque em produção) | `sua-chave-secreta-forte` |
| `JWT_EXPIRES_IN` | Não | Validade do token (padrão: 1d) | `1d` |
| `CORS_ORIGIN` | Sim | Origem permitida no CORS (URL do frontend) | `http://localhost:5173` |
| `DB_SYNCHRONIZE` | Não | Sincronizar schema automaticamente (manter `false` em produção) | `false` |

**Exemplo preenchido para desenvolvimento local:**

```env
PORT=3001
DATABASE_URL=postgres://postgres:postgres@localhost:5433/library_cloud
JWT_SECRET=minha-chave-secreta-local-desenvolvimento
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
DB_SYNCHRONIZE=false
```

### 4.2 Frontend (`apps/frontend/.env`)

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `VITE_API_URL` | Sim | URL base da API do backend | `http://localhost:3001` |

**Exemplo preenchido para desenvolvimento local:**

```env
VITE_API_URL=http://localhost:3001
```

> **Importante**: Em produção, configure `VITE_API_URL` com a URL do backend implantado (ex.: `https://api.biblioteca.exemplo.com`).

---

## 5. Banco de dados

### 5.1 Subir o banco

```bash
npm run db:up
```

**O que acontece:**
- O Docker Compose sobe um container PostgreSQL 16 Alpine na porta **5433** (host) → 5432 (container).
- O banco `library_cloud` é criado automaticamente.
- Dados persistem no volume `postgres_data`.

**Validar:**
```bash
docker ps
```
Deve aparecer um container `biblioteca-em-nuvem-postgres` em execução.

### 5.2 Acessar o banco

| Parâmetro | Valor |
|-----------|-------|
| **Host** | `localhost` |
| **Porta** | `5433` |
| **Usuário** | `postgres` |
| **Senha** | `postgres` |
| **Database** | `library_cloud` |

**String de conexão:** `postgres://postgres:postgres@localhost:5433/library_cloud`

**Ferramentas recomendadas:**
- [DBeaver](https://dbeaver.io/)
- [pgAdmin](https://www.pgadmin.org/)
- [TablePlus](https://tableplus.com/)
- CLI: `psql -h localhost -p 5433 -U postgres -d library_cloud`

### 5.3 Rodar migrations

```bash
npm run db:migrate
```

**O que acontece:**
- Executa as migrations do TypeORM no banco configurado em `DATABASE_URL`.
- Cria as tabelas `users`, `items` e `reviews` com as relações e constraints necessárias.
- É necessário rodar após subir o banco pela primeira vez ou após mudanças em migrations.

**Parar o banco:**
```bash
npm run db:down
```

---

## 6. Rodando o backend

```bash
npm run dev:backend
```

| Informação | Valor |
|------------|-------|
| **Porta** | `3001` |
| **URL base** | `http://localhost:3001` |
| **Swagger (documentação interativa)** | `http://localhost:3001/docs` |
| **Health check** | `http://localhost:3001/health` |

**Como validar o funcionamento:**
1. Abra `http://localhost:3001/health` no navegador ou via curl:
   ```bash
   curl http://localhost:3001/health
   ```
   Resposta esperada: `{"status":"ok","service":"backend"}`

2. Acesse `http://localhost:3001/docs` para testar os endpoints via Swagger.

---

## 7. Rodando o frontend

Em um **novo terminal**, mantenha o backend rodando e execute:

```bash
npm run dev:frontend
```

| Informação | Valor |
|------------|-------|
| **Porta** | `5173` (padrão Vite) |
| **URL** | `http://localhost:5173` |

**Integração com o backend:**
- O frontend usa `VITE_API_URL` para todas as requisições à API.
- Endpoints públicos (catálogo, detalhes, reviews por item) funcionam sem login.
- Criar/editar/remover itens e criar reviews exigem login; o token JWT é enviado no header `Authorization`.

---

## 8. Fluxo da aplicação

1. **Acesso inicial**  
   - Usuário acessa o catálogo em `/` (listagem pública).  
   - Pode filtrar por tipo (livro/filme) e buscar por título.  
   - Pode abrir detalhes de cada item e ver reviews públicas.

2. **Cadastro e login**  
   - Em `/register`, cria conta com nome, email e senha.  
   - Em `/login`, faz login e recebe um token JWT.  
   - O token é salvo em `localStorage` e usado em requisições autenticadas.

3. **Criação de item (autenticado)**  
   - Na página inicial, usuário logado vê o formulário "Add item".  
   - Preenche tipo, título, descrição, autor/diretor, ano, etc.  
   - O frontend envia `POST /items` com o token no header.  
   - O backend valida o payload e persiste no banco.

4. **Criação de review (autenticado)**  
   - Na página de detalhe do item (`/items/:id`), usuário logado pode publicar uma review.  
   - Informa nota (1–5) e comentário.  
   - O frontend envia `POST /reviews` com `itemId`, `rating` e `comment`.  
   - Regra: no máximo **uma review por usuário por item**.

5. **Comunicação geral**  
   ```
   Frontend (React)  →  Backend (NestJS)  →  PostgreSQL
        │                      │
   localStorage (JWT)    Validação JWT
   VITE_API_URL          DATABASE_URL
   ```

---

## 9. Problemas comuns e soluções

### Porta ocupada

| Erro | Solução |
|------|---------|
| `Port 3001 is already in use` | Encerre o processo na porta 3001: `lsof -ti:3001 \| xargs kill -9` (ou use outra porta em `PORT`). |
| `Port 5173 is already in use` | Encerre o processo: `lsof -ti:5173 \| xargs kill -9`. Ou o Vite usará outra porta automaticamente. |
| `Port 5433 is already in use` | Outro PostgreSQL está usando essa porta. Altere no `docker-compose.yml` (ex.: `5434:5432`) e ajuste `DATABASE_URL`. |

### Backend não conecta ao banco

| Sintoma | Possíveis causas e soluções |
|---------|-----------------------------|
| `ECONNREFUSED` ou erro de conexão | Banco não está rodando. Rode `npm run db:up` e aguarde o healthcheck. |
| `connection refused` em localhost:5433 | Confira se o container está ativo: `docker ps`. Se não estiver, rode `npm run db:up`. |
| `password authentication failed` | Confira usuário/senha em `DATABASE_URL` e no `docker-compose.yml` (postgres/postgres). |

### Docker não sobe

| Erro | Solução |
|------|---------|
| `Cannot connect to the Docker daemon` | Inicie o Docker Desktop ou o serviço Docker. |
| `port is already allocated` | Altere a porta no `docker-compose.yml` (ex.: `5434:5432`) e atualize `DATABASE_URL`. |
| `volume permission denied` | Em alguns sistemas, rode o terminal ou Docker com permissões adequadas. |

### Erro JWT

| Erro | Causa e solução |
|------|-----------------|
| `401 Unauthorized` em rotas protegidas | Token inválido ou expirado. Faça logout e login novamente. |
| `jwt malformed` | Token corrompido no `localStorage`. Limpe o `localStorage` e faça login de novo. |
| `invalid signature` | `JWT_SECRET` mudou após o login. Faça logout e login com o novo secret. |

### Variáveis de ambiente incorretas

| Sintoma | Solução |
|---------|---------|
| Frontend não alcança a API | Confira `VITE_API_URL` em `apps/frontend/.env` (ex.: `http://localhost:3001`). |
| Erro de CORS no navegador | Confira `CORS_ORIGIN` no backend. Deve ser a URL exata do frontend (ex.: `http://localhost:5173`). |
| Mudanças no `.env` não aparecem | Reinicie o processo (backend/frontend). O Vite recarrega variáveis `VITE_*` no início. |

### Migrations não rodam

| Erro | Solução |
|------|---------|
| `No migrations are pending` | Já foram aplicadas. Confira em `typeorm_migrations` no banco. |
| `relation "users" does not exist` | Rodar migrations antes de subir o backend: `npm run db:migrate`. |
| `database "library_cloud" does not exist` | O banco é criado pelo `docker-compose`. Use `npm run db:up` e aguarde o container subir. |

---

## 10. Checklist rápido

Use este checklist para garantir que tudo está configurado:

- [ ] Instalar pré-requisitos (Node.js 20+, Docker, Git)
- [ ] Clonar o repositório e entrar na pasta
- [ ] Executar `npm install` na raiz
- [ ] Copiar e configurar `apps/backend/.env`
- [ ] Copiar e configurar `apps/frontend/.env`
- [ ] Subir o banco com `npm run db:up`
- [ ] Rodar migrations com `npm run db:migrate`
- [ ] Iniciar o backend com `npm run dev:backend`
- [ ] Iniciar o frontend com `npm run dev:frontend`
- [ ] Validar health: `curl http://localhost:3001/health`
- [ ] Acessar a aplicação: `http://localhost:5173`
- [ ] Testar Swagger: `http://localhost:3001/docs`

---

## Scripts principais

| Script | Descrição |
|--------|-----------|
| `npm run dev:backend` | Inicia o backend em modo watch (reinicia ao alterar código) |
| `npm run dev:frontend` | Inicia o frontend com Vite |
| `npm run db:up` | Sobe o PostgreSQL via Docker Compose |
| `npm run db:down` | Para e remove os containers |
| `npm run db:logs` | Exibe logs do container PostgreSQL |
| `npm run db:migrate` | Executa as migrations do TypeORM |
| `npm run lint` | Executa o linter em todos os workspaces |
| `npm run build` | Compila backend e frontend |

## API

- **Swagger (documentação interativa):** `http://localhost:3001/docs`
- **Health check:** `GET /health`

## Deploy

- Backend: `apps/backend/Dockerfile`
- CI: `.github/workflows/ci.yml`
- Guias operacionais:
  - `docs/deploy/checklist.md`
  - `docs/deploy/platforms.md`

## Roadmap

1. Bootstrap do monorepo
2. Fundação do backend
3. Autenticação JWT
4. CRUD de itens
5. Reviews e histórico
6. Fundação do frontend
7. Integração frontend-backend
8. Docker, CI/CD e deploy
