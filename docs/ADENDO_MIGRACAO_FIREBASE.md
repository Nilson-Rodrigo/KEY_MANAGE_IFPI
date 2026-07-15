# Adendo — Migração da Persistência de PostgreSQL para Firebase (Firestore)

| Informação            | Descrição                                                      |
| --------------------- | --------------------------------------------------------------- |
| Instituição           | Instituto Federal do Piauí — Campus Piripiri                    |
| Componente Curricular | Engenharia de Software II                                        |
| Professor             | Mayllon Veras                                                    |
| Empresa/Time          | CoreTech                                                         |
| Data deste adendo     | 14/07/2026                                                       |
| Referente a           | RVS.md (Abril/2026) e ERS.md v1.0 — Preliminar (Abril/2026)      |
| Autorização           | Orientação verbal do Prof. Mayllon Veras: manter os documentos originais e registrar a mudança por meio de adendo |

## 1. Natureza deste documento

Este é um **adendo**, não uma revisão do RVS ou do ERS. Um adendo é um documento que se soma a um documento já concluído, sem alterar o seu conteúdo original, para registrar uma decisão ou fato posterior à sua elaboração.

O RVS e o ERS do projeto foram concluídos em Abril de 2026 e refletem, corretamente, a análise de viabilidade feita naquele momento — incluindo a decisão consciente de descartar o Firebase. Essa conclusão **era válida e correta para o contexto e a informação disponível na época**. Por isso, os arquivos `RVS.md` e `ERS.md` **permanecem inalterados** em seu conteúdo técnico original. Este adendo existe para que qualquer leitor — equipe, professor ou banca — entenda que uma decisão tomada posteriormente (14/07/2026) altera partes específicas do cenário técnico descrito naqueles documentos, sem invalidar o processo de análise que os originou.

## 2. Contexto da mudança

A ADR-0003 (28/05/2026) definiu a stack original do MVP: React Native + Expo, Node.js + Express, SQLite (local) e PostgreSQL (servidor), alinhada ao RVS. O próprio RVS (seção 3.1) já registrava como trade-off negativo o custo de manter dois bancos de paradigmas diferentes simultaneamente (SQLite e PostgreSQL), com sincronização construída manualmente entre eles — item classificado como risco de nível **ALTO** na Matriz de Riscos (RVS, seção 4).

Em 14/07/2026, a equipe consultou o Prof. Mayllon Veras sobre alternativas para reduzir esse risco técnico, e a partir dessa consulta reabriu e conduziu a análise técnica que resultou na decisão de adotar o Firebase (Cloud Firestore) como banco de dados do MVP. As ADRs 0010, 0011, 0012 e 0013 documentam essa decisão em detalhe técnico e são o registro oficial da mudança de arquitetura.

## 3. O que muda

| Aspecto | Decisão original (RVS/ERS, Abril/2026) | Decisão atual (14/07/2026) | ADR correspondente |
| --- | --- | --- | --- |
| Banco de dados do servidor | PostgreSQL | Firebase (Cloud Firestore) | ADR-0010 (supersedes ADR-0003) |
| Persistência offline | SQLite local + motor de sincronização próprio | Cache local nativo do SDK do Firestore | ADR-0012 (supersedes ADR-0006) |
| Hospedagem | Railway (API Node.js/Express + PostgreSQL) | Infraestrutura própria do Firebase (Hosting + Cloud Functions) | ADR-0011 (supersedes ADR-0005) |
| Justificativa da arquitetura macro (Monolito Modular) | Baseada em "um único servidor Node.js/Express e um único banco PostgreSQL" | Reafirmada com a unidade de implantação redefinida como o próprio projeto Firebase | ADR-0013 (supersedes ADR-0008, apenas na justificativa de infraestrutura) |

## 4. O que **não** muda

- **A rejeição original do Firebase no RVS (seção 3.1) permanece correta** para o que ela avaliou: o uso do **Firebase Authentication** como mecanismo de login em nuvem, que exigiria conexão constante. A identificação dos usuários continua **100% local, por nome e matrícula**, conforme a ADR-0004, que não foi alterada por esta mudança.
- O escopo funcional do MVP — RF01 a RF10, RN01 a RN08, US01 a US10 e os casos de uso UC01 a UC04 do backlog — **continua válido integralmente**. O que muda é o mecanismo técnico de implementação de RF07/RF08 (operação offline e sincronização), não o requisito em si.
- A arquitetura macro **Monolito Modular** continua sendo a decisão vigente (ADR-0013 reafirma, não reverte, a ADR-0008).
- Os demais riscos da Matriz de Riscos do RVS (seção 4) — em especial a inexperiência da equipe com React Native, classificada como risco **CRÍTICO**, o de maior severidade do projeto — permanecem válidos e inalterados por este adendo.

## 5. Seções do RVS e do ERS afetadas por esta mudança

| Documento | Seção | O que está desatualizado | Onde ver a atualização |
| --- | --- | --- | --- |
| RVS.md | 3.1 — Viabilidade Técnica | Stack descrita como React Native + Node/Express + SQLite + PostgreSQL | ADR-0010, ADR-0011 |
| RVS.md | 3.2 — Viabilidade Econômica | TCO calculado com hospedagem Railway/servidor do campus | ADR-0011 |
| RVS.md | 3.4 — Viabilidade Operacional | Dependência da disponibilidade do servidor Node.js/PostgreSQL do campus | ADR-0011 |
| RVS.md | 4 — Matriz de Riscos / 4.1 | Risco ALTO da sincronização SQLite↔PostgreSQL com POC dedicado | ADR-0012 |
| ERS.md | Seções de stack e requisitos não funcionais (ex.: RNF10) | Referências a PostgreSQL/Express como infraestrutura de persistência | ADR-0010, ADR-0011 |
| Trabalho de Pesquisa (Anatomia e Padrões da Arquitetura) | 3.6 — Aplicabilidade no MVP CoreTech | Justificativa do Monolito Modular citando "um único servidor Node.js + Express e um único banco PostgreSQL" | ADR-0013 |

## 6. Rastreabilidade

Este adendo referencia e é referenciado pelas seguintes ADRs, que contêm o detalhamento técnico completo de contexto, decisão e consequências de cada mudança:

- **ADR-0010** — Substituição do PostgreSQL pelo Firebase (Cloud Firestore)
- **ADR-0011** — Adoção do Firebase como Plataforma de Hospedagem
- **ADR-0012** — Estratégia de Sincronização Offline via Persistência Nativa do Firestore
- **ADR-0013** — Reafirmação do Monolito Modular como Arquitetura Macro Após Adoção do Firebase

## 7. Declaração de preservação histórica

Os documentos `RVS.md` e `ERS.md` permanecem, em seu conteúdo original, como registro histórico fiel da análise de viabilidade e do levantamento de requisitos conduzidos pela equipe CoreTech em Abril de 2026. Para compreender o estado técnico atual (14/07/2026) do projeto, este adendo e as ADRs 0010 a 0013 devem ser lidos **em conjunto** com o RVS e o ERS originais, e não em substituição a eles.
