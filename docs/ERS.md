## Especificação de Requisitos do Software (ERS)

### 1. Objetivo

Este documento descreve os requisitos necessários para o MVP do CoreTech.

### 2. Escopo

Funcionalidades principais do MVP: autenticação, painel de chaves, registrar retirada/devolução, armazenamento local e sincronização.

### 3. Requisitos Funcionais (RF)

- RF-01: Autenticar usuário por nome e matrícula.
  - Prioridade: Alta
  - Critério de aceitação: usuário consegue iniciar sessão no aplicativo.

- RF-02: Listar todas as chaves com status atual.
  - Prioridade: Alta
  - Critério de aceitação: endpoint `/keys` fornece lista correta.

- RF-03: Registrar retirada de chave (operador + timestamp).
  - Prioridade: Alta
  - Critério de aceitação: evento salvo localmente e sincronizado ao servidor.

- RF-04: Registrar devolução de chave.
  - Prioridade: Alta

- RF-05: Sincronizar eventos em lote com servidor central.
  - Prioridade: Alta

### 4. Requisitos Não-Funcionais (RNF)

- RNF-01: Operação offline com persistência local.
- RNF-02: Resposta da API adequada (meta: < 500ms para consultas simples).
- RNF-03: Registros auditáveis das operações.

### 5. Roadmap (priorização)

- Sprint 1: autenticação, listagem de chaves, registrar retirada/devolução local.
- Sprint 2: sincronização, resolução de conflitos, testes de integração.

### 6. Anexos

Linkar diagramas, wireframes e casos de uso aqui.
