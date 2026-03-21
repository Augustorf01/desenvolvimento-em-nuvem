FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY tsconfig.base.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/backend/tsconfig.json apps/backend/tsconfig.json
COPY apps/backend/tsconfig.build.json apps/backend/tsconfig.build.json
COPY apps/backend/nest-cli.json apps/backend/nest-cli.json

RUN npm install

COPY apps/backend/src apps/backend/src

RUN npm run build --workspace backend

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm install --omit=dev

COPY --from=builder /app/apps/backend/dist apps/backend/dist

EXPOSE 3001

CMD ["node", "apps/backend/dist/main.js"]
