
# ADR 0008 — Arquitetura Macro: Monolito Modular + Clean Architecture + Vertical Slices + MVVM

- **Status:** Aceito
- **Data:** 2026-05-28
- **Time:** CoreTech
- **Projeto:** Sistema de Gerenciamento de Acesso a Chaves — IFPI Campus Piripiri

- **Autor:** CoreTech
- **ID:** ADR 0008

---

## Contexto

O projeto precisa de uma abordagem arquitetural que equilibre rapidez de entrega (prazo acadêmico curto), baixo custo operacional (infraestrutura limitada) e qualidade técnica suficiente para permitir evolução pós-MVP. O time é pequeno e tem experiência variada; além disso, o requisito de operação offline-first impõe restrições importantes ao desenho da solução.

Decisões já tomadas (ver ADRs relacionadas): stack tecnológica (ADR 0003), organização por features (ADR 0002), estratégia de sincronização offline (ADR 0006) e identificação de chaves sem hardware (ADR 0007). Falta explicitar a decisão macro que unifica essas escolhas e orienta a implementação prática.

## Decisão

Adotamos como arquitetura macro para o MVP a combinação:

- **Monolito Modular** (implantação única, limites internos explícitos);
- **Clean Architecture / Ports & Adapters** (núcleo de regras de negócio isolado de detalhes de infraestrutura);
- **Vertical Slice / Feature-Based** para organização de código (pastas por feature/épico);
- **MVVM** como orientação para camadas de apresentação nas interfaces móveis (React Native / Expo).

Essa combinação visa preservar simplicidade operacional (um único deploy e banco), promover desacoplamento e testabilidade do core de negócio, e acelerar entrega de features completas por pequenos times.

## Consequências

### Positivas
- Reduz complexidade operacional (um único processo/DB), adequado ao contexto do campus.
- Facilita extração futura de módulos porque as fronteiras internas serão explícitas.
- Clean Architecture protege regras de negócio de mudanças em infraestrutura, facilitando testes de unidade e integração.
- Vertical Slices acelera entregas por permitir que uma feature seja desenvolvida de ponta a ponta com menos coordenação entre desenvolvedores.
- MVVM favorece testabilidade e reatividade no cliente mobile.

### Negativas / Trade-offs
- Requer disciplina para manter boundaries claros entre módulos; sem disciplina o monolito pode degenerar em código com alto acoplamento.
- Extração para microsserviços no futuro exige trabalho adicional, embora facilitada por fronteiras claras.

### Mitigações
- Definir e documentar critérios de boundary (responsabilidade única, interface pública mínima, dependências via ports/adapters).
- Scaffold inicial e exemplos em `feature/arquitetura` para orientar implementação consistente.
- PR template e checklist para garantir que mudanças respeitem as fronteiras (testes, interfaces, migrations).

## Critérios de aceitação

- Estrutura de pastas `src/core`, `src/features/*`, `src/adapters`, `src/presentation` criada e referenciada na documentação.
- Exemplo mínimo de `port` e `adapter` implementado para `sincronizacao` e `chaves`.
- POC da sincronização integrado ao scaffold com testes end‑to‑end demonstrando ciclo offline→sync.

## Plano imediato de ação (sprint 0 / spike)

- Criar branch `feature/arquitetura` com scaffold e exemplos de ports/adapters.
- Implementar POC de sincronização na nova estrutura e publicar instruções de execução no README de `src/`.
- Registrar ADRs adicionais para fronteiras significativas que surgirem durante a implementação.

Justificativa vinculada ao semestre
----------------------------------

Esta combinação arquitetural entrega baixo custo operacional e alta velocidade de desenvolvimento, adequada às limitações de tempo e recursos do semestre; favorece entregas incrementais e mitigação de riscos técnicos durante o POC.

## Consequências de longo prazo

- Facilita futuras extrações e testes; reduz custo de manutenção ao longo do tempo se as fronteiras forem respeitadas.
- A qualidade do código no final do MVP dependerá da disciplina do time em respeitar boundaries e padrões acordados.

---

Referências: ADR 0001, ADR 0002, ADR 0003, ADR 0006, ADR 0007.
