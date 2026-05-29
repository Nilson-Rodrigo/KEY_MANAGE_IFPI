# ADR 0001 — Registro de Decisões Arquiteturais

- **Status:** Accepted
- **Data:** 2026-05-28

Context
-------
O repositório do projeto necessita de um mecanismo simples, padronizado e visível para registrar decisões arquiteturais importantes ao longo do desenvolvimento do MVP. Essas decisões devem ser consultáveis por toda a equipe e conter justificativas técnicas para futuras revisões.

Decision
--------
Adotamos o padrão de ADRs (Architecture Decision Records) como ferramenta oficial de governança técnica e registro histórico do repositório. Cada decisão importante será documentada em um arquivo numerado dentro de `docs/ADRs/` seguindo o template de Michael Nygard: `Status`, `Context`, `Decision` e `Consequences`.

Consequences
------------
- Todas as decisões arquiteturais relevantes serão documentadas no repositório.
- O status inicial desta ADR é `Accepted` para tornar explícita a adoção do processo.
- Revisões e mudanças futuras deverão ser registradas via novas ADRs, preservando o histórico.

O time CoreTech é composto por 7 membros com diferentes papéis (Scrum Master, PO, Analista, UX/UI, Devs Full Stack), o que torna ainda mais importante que as justificativas técnicas estejam documentadas de forma consultável por todos.

## Decisão

Adotamos o padrão de **ADRs (Architecture Decision Records)** como ferramenta oficial de governança técnica e registro histórico do repositório.

Cada decisão arquitetural relevante será documentada em um arquivo Markdown numerado sequencialmente, armazenado na pasta `docs/architecture/decisions/` na raiz do repositório, seguindo o template de Michael Nygard com as seções: **Status**, **Contexto**, **Decisão** e **Consequências**.

A inicialização da estrutura de pastas pode ser feita manualmente ou via ferramentas de CLI como `adr-tools` ou o equivalente em Node.js (`adr-cli` / `adr-log`):

```bash
# Opção manual
mkdir -p docs/architecture/decisions

# Opção via adr-tools (requer instalação)
adr init docs/architecture/decisions
```

## Consequências (detalhado)

- Todas as decisões arquiteturais relevantes para o MVP serão documentadas no repositório antes do início do desenvolvimento pleno.
- O status inicial desta ADR é `Accepted`, tornando explícita a adoção do processo pelo time.
- Revisões e mudanças futuras em decisões já registradas deverão ser feitas via **novas ADRs** (com status `Supersedes ADR-XXXX`), preservando o histórico completo de raciocínio.
- O conjunto de ADRs será referenciado no `README.md` do repositório para facilitar a navegação.
- Itens classificados como pós-MVP ou sujeitos a validação institucional não precisam de ADR própria, mas devem ser mencionados nas ADRs das decisões que os influenciam.

