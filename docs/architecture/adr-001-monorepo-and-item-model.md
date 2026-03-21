# ADR 001 - Monorepo e modelo unificado de item

## Contexto

O projeto nasce como greenfield e precisa entregar backend, frontend e documentacao em etapas curtas, com baixo atrito operacional.

## Decisao

- O workspace sera organizado como monorepo com `npm workspaces`.
- O MVP usara uma entidade unica `Item` com `type` (`book` | `movie`).
- Frontend e backend terao variaveis de ambiente separadas.
- A autenticacao usara JWT com expiracao curta e segredo externo por ambiente.

## Consequencias

- A estrutura inicial fica simples e previsivel.
- O catalogo pode evoluir depois para especializacoes sem quebrar o contrato atual.
- O backend concentra validacao de regras e integridade.
- O frontend consome um contrato unico para catalogo e reviews.
