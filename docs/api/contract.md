# Contrato Inicial da API

## Entidades

### User

- `id: string`
- `name: string`
- `email: string`
- `createdAt: string`
- `updatedAt: string`

### Item

- `id: string`
- `type: "book" | "movie"`
- `title: string`
- `description: string`
- `authorOrDirector: string`
- `releaseYear: number`
- `genre?: string`
- `coverUrl?: string`
- `createdAt: string`
- `updatedAt: string`

### Review

- `id: string`
- `rating: number`
- `comment: string`
- `itemId: string`
- `userId: string`
- `createdAt: string`
- `updatedAt: string`

## Endpoints

### Publicos

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /items`
- `GET /items/:id`
- `GET /reviews/item/:itemId`

### Protegidos

- `POST /items`
- `PATCH /items/:id`
- `DELETE /items/:id`
- `POST /reviews`
- `GET /reviews/me`

## Regras de negocio

- `email` deve ser unico.
- `rating` deve ficar entre `1` e `5`.
- Um usuario pode ter no maximo uma review por item.
- `passwordHash` e interno e nunca deve sair nas responses publicas.
- O catalogo do MVP e colaborativo: qualquer usuario autenticado pode criar, editar ou remover itens.
- Historico de reviews retorna somente reviews do usuario autenticado.
