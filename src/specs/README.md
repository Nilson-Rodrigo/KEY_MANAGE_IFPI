# Specs vigentes

Os contratos vigentes são os schemas Zod em `schemas/`, a especificação do frontend e as Firestore Security Rules.

O contrato HTTP histórico foi removido porque a ADR-0015 define acesso direto e autenticado ao Firestore, sem endpoints HTTP.

## Arquivos

- `FRONTEND_SPEC.md` — fluxos e modelo de dados remoto.
- `schemas/common.schema.ts` — pessoa e enums compartilhados.
- `schemas/identificacao.schema.ts` — identificação operacional.
- `schemas/chaves.schema.ts` — chaves e movimentações.
- `schemas/sync.schema.ts` — fila e resultados de sincronização local.

Mudanças de shape devem atualizar, na mesma entrega, schemas, `firestore.rules`, testes e documentação.
