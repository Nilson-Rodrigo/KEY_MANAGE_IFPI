# Documentação do Projeto — Índice

Este diretório reúne os artefatos existentes e vigentes do projeto CoreTech.

- `PRD.md` — visão do produto, escopo, critérios e arquitetura atual.
- `RVS.md` — relatório histórico de viabilidade de software.
- `ERS.md` — especificação histórica de requisitos do software.
- `ADENDO_MIGRACAO_FIREBASE.md` — evolução da persistência para Firestore e alinhamento da implantação atual.
- `REQS_HIERARCHY.md` — épicos, histórias, tarefas e rastreabilidade.
- `CONTRIBUTORS.md` — integrantes e responsabilidades.
- `BRANCHING_POLICY.md` — política de branches.
- `harness/HARNESS.md` — feedforward, feedback e CI.
- `harness/prompts/feedforward.prompt.md` — template operacional de prompt.
- `architecture/decisions/` — registros de decisões arquiteturais.

## Arquitetura vigente

A decisão vigente é a ADR-0015: aplicativo Expo autenticado por e-mail/senha (administrador) ou matrícula/PIN sobre e-mail técnico (guarda) → Firestore direto, com cache e fila manual em AsyncStorage. O Firebase Hosting publica somente o frontend web.
