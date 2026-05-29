# ADR 0001 — Registro de Decisões Arquiteturais

- **Status:** Aceito
- **Data:** 2026-05-28
- **Autor:** CoreTech
- **ID:** ADR 0001


Contexto
-------
O repositório do projeto necessita de um mecanismo simples, padronizado e visível para registrar decisões arquiteturais importantes ao longo do desenvolvimento do MVP. Essas decisões devem ser consultáveis por toda a equipe e conter justificativas técnicas, alternativas consideradas e trade‑offs, para que avaliadores e futuros membros entendam o porquê das escolhas.

Decisão
--------
Adotamos o padrão de **ADRs (Registros de Decisão de Arquitetura)** como ferramenta oficial de governança técnica e registro histórico do repositório. Cada decisão importante será documentada em um arquivo numerado dentro de `docs/architecture/decisions/` seguindo o template inspirado em Michael Nygard: `Status`, `Contexto`, `Decisão` e `Consequências`.

Consequências
------------
- Positivas:
	- Todas as decisões arquiteturais relevantes serão documentadas no repositório, com metadados mínimos (`Autor`, `Data`, `ID`, `Critérios de aceitação`), melhorando rastreabilidade e avaliação.
	- A adoção do processo torna explícita a governança técnica e cria um ponto único de consulta para avaliadores e novos membros.
	- Preservar histórico por meio de novas ADRs (`Supersedes`) facilita auditoria e aprendizagem ao longo do tempo.

- Negativas / Trade-offs:
	- A prática introduz custo de manutenção (escrever e revisar ADRs), exigindo disciplina do time para manter conteúdo atualizado.
	- Risco de burocratização: decisões simples podem atrasar se o processo for aplicado de forma excessiva.
	- ADRs desatualizados podem confundir se não houver revisão periódica; é necessário convênio sobre responsáveis e periodicidade de revisão.

Mitigações
---------
- Incluir checklist de ADR no template de PR para garantir qualidade mínima sem burocracia excessiva.
- Definir responsável rotativo para revisão periódica das ADRs (ex.: a cada sprint ou mês).
- Usar `Supersedes` para manter histórico e evitar edits diretas em ADRs completadas.

Validação e processo (evitar oscilações)
--------------------------------------

- Cada ADR deve ser criada via Pull Request direcionado à `main` e receber pelo menos um aprovador técnico (peer review) além do autor.
- Critérios de aceitação devem constar na própria ADR e ser verificáveis (ex.: artefatos, scripts, configuração ou testes automatizados).
- Decisões só devem ser revertidas por uma nova ADR que documente a motivação da mudança e o resultado da avaliação; isto evita oscilações arbitrárias.

Papel do revisor
----------------

- O revisor técnico valida que a ADR contém contexto claro, alternativas e trade‑offs, critérios de aceitação e impacto no cronograma do semestre. O revisor assina a aprovação no PR.

Registro de revisões
--------------------

- Alterações a ADRs existentes devem criar uma nova ADR com `Supersedes ADR-XXXX` no cabeçalho; mantenha o arquivo antigo inalterado para preservar histórico.

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

### Positivas
- Documentação centralizada e padronizada melhora clareza e facilita avaliações acadêmicas.
- Protege o histórico de decisões e motivações técnicas, apoiando futuras refatorações e mudanças de arquitetura.

### Negativas / Trade-offs
- Requer esforço adicional por PRs e revisões; deve ser equilibrado com a velocidade do desenvolvimento.
- Possibilidade de criar arquivos redundantes se não houver coordenação; usar `Supersedes` para manter clareza.
- Necessidade de incluir no fluxo de trabalho (PR template, checklist) para evitar esquecimentos.

### Mitigações
- Adotar PR template e checklist que tornem a criação de ADRs rápida e consistente.
- Definir periodicidade e responsáveis pela revisão das ADRs.

Critérios de aceitação
----------------------

- Pasta `docs/architecture/decisions/` existe e contém pelo menos as ADRs 0001–0003.
- Cada ADR inclui `Status`, `Contexto`, `Decisão` e `Consequências` e está em Português.

Justificativa vinculada ao semestre
----------------------------------

Esta ADR institucionaliza o registro mínimo necessário para rastrear decisões durante o semestre académico, garantindo que escolhas relevantes sejam documentadas e justificadas para avaliação.

