# Frontend Spec — CoreTech Chaves

- **Versão:** 2.0
- **Status:** Aprovado
- **Arquitetura:** ADR-0015

## Objetivo

Definir o contrato do aplicativo Expo offline-first que usa Firebase Authentication anônima e transações diretas no Cloud Firestore.

## Fluxos

### Identificação

- Validar nome e matrícula localmente.
- Garantir uma sessão Firebase anônima antes da primeira operação remota.
- A identidade anônima identifica a instalação; nome e matrícula identificam operacionalmente o responsável.

### Quadro de chaves

- Ler a coleção `chaves` após autenticação.
- Exibir `disponivel` em verde e `em_uso` em vermelho.
- Usar o cache AsyncStorage quando não houver rede.

### Retirada e devolução

- Executar uma transação Firestore.
- Ler a chave atual e rejeitar transições inválidas.
- Atualizar `chaves/{id}` e criar `movimentacoes/{id}` na mesma transação.
- Registrar `autorUid` com o UID anônimo atual.
- Quando offline, salvar a operação na fila local e reaplicá-la ao reconectar.

### Histórico

- Consultar `movimentacoes`, opcionalmente filtradas por `chaveCodigo`.
- Ordenar por `timestampLocal` decrescente.
- Preservar cache local para consulta offline.

## Modelo remoto

### `chaves/{id}`

- `codigo`: string imutável.
- `status`: `disponivel | em_uso`.
- `responsavelAtual`: `{ nome, matricula } | null`.
- `ultimaMovimentacaoEm`: timestamp.
- `ultimaMovimentacaoId`: string.

### `movimentacoes/{id}`

- `id`: igual ao ID do documento.
- `chaveId` e `chaveCodigo`: vínculo com a chave.
- `tipo`: `retirada | devolucao`.
- `responsavel`: `{ nome, matricula }`.
- `timestampLocal`: timestamp.
- `deviceId`: string.
- `syncStatus`: `sincronizado`.
- `autorUid`: igual ao UID autenticado.

## Segurança

- Toda operação remota exige autenticação.
- Clientes não criam nem excluem chaves.
- Movimentações são imutáveis.
- Security Rules validam shapes, autoria, transições e atomicidade entre chave e movimentação.
- Coleções não declaradas são negadas.

## Critérios globais

- O app abre com cache quando está offline.
- Retirada duplicada e devolução indevida são bloqueadas.
- Pendências são reaplicadas automaticamente ao recuperar conexão.
- A mesma operação não duplica movimentações.
- O export web é publicável em `frontend/dist`.
