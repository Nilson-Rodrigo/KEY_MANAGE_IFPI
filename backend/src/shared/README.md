Este diretório contém utilitários e tipos compartilhados pelo backend.

No scaffold inicial incluímos exemplos de `entities`, `ports`, `usecases`, adapters em memória e um ViewModel de referência.

Use estes arquivos como ponto de partida para migrar a lógica atual para a nova organização por features.

Documentação e artefatos relevantes
- Arquitetura e aderência: [docs/ARCHITECTURE_ADHERENCE.md](../../docs/ARCHITECTURE_ADHERENCE.md)
- Integrantes e responsabilidades: [docs/CONTRIBUTORS.md](../../docs/CONTRIBUTORS.md)
- Licitação / Aquisições e registros: [docs/PROCUREMENT.md](../../docs/PROCUREMENT.md)

Próximos passos sugeridos
- Substituir uso direto de `pool` por adapters (veja `adapters/db/postgresAdapter.ts`).
- Garantir que os `controllers` sejam thin layers que delegam às camadas de `features` / `core`.
- Adicionar testes unitários para os `usecases` usando mocks dos `ports`.
