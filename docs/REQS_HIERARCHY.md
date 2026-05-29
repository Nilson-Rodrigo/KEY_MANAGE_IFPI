## Hierarquia de Requisitos e Modelagem

Modelo: Épico → História de Usuário → Tarefas

Exemplo prático

- Épico: Gerenciar chaves
  - História: Como operador, quero ver o quadro de chaves para saber quais estão disponíveis.
    - Tarefas:
      - Implementar endpoint `/keys` no backend.
      - Implementar tela de lista de chaves no app.
      - Criar testes unitários para a listagem.
  - História: Como operador, quero registrar retirada de chave.
    - Tarefas:
      - Implementar `GerenciaChaves.retirar` no `core`.
      - Salvar evento localmente (SQLite).
      - Enfileirar evento para sincronização.

Boas práticas

- Divida trabalho em tarefas pequenas e testáveis.
- Associe critérios de aceitação a cada história.
