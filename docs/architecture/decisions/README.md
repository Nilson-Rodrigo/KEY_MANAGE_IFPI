# ADRs — Como contribuir e template

Este diretório contém as Architecture Decision Records (ADRs) do projeto. Siga o processo abaixo para criar ou alterar ADRs:

Checklist para criar/alterar uma ADR
----------------------------------

- Crie um arquivo com nome numerado: `000X-titulo-da-decisao.md`.
- Preencha as seções obrigatórias: `ID / Título`, `Status`, `Contexto`, `Decisão`, `Consequências`.
- Adicione metadados: `Autor`, `Data`, `ID` (ex.: ADR 0004) e `Critérios de aceitação`.
- Abra um Pull Request direcionado à branch `main` com pelo menos um reviewer técnico.
- Use o PR como RFC: descreva impacto, teste/rollback e dependências.

Template mínimo (copie para novo arquivo):

```
# ADR 000X — Título da Decisão

- **Status:** Proposed | Accepted | Superseded
- **Data:** YYYY-MM-DD
- **Autor:** Seu Nome
- **ID:** ADR 000X

Contexto
-------
Descreva fatos, restrições e alternativas consideradas.

Decisão
--------
Explique a decisão tomada de forma direta.

Consequências
------------
- Liste impactos positivos e negativos (trade-offs).

Critérios de aceitação
----------------------
- Liste critérios que mostram quando a ADR foi cumprida.

Justificativa vinculada ao semestre
----------------------------------
Explique em 1-2 linhas por que a decisão atende às restrições do período acadêmico (prazo, competências, custos).

```

Revisão e aprovação
--------------------

- Todas as ADRs devem ser revisadas via PR e aprovadas por pelo menos um membro técnico.
- Alterações a ADRs existentes devem criar uma nova ADR que cite a anterior com `Supersedes` quando aplicável.
