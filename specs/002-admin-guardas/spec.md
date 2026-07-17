# Especificação: Administração de guardas sem servidor próprio

## Objetivo

Permitir que o administrador cadastre guardas no app web hospedado no Firebase Hosting e que cada guarda entre no Expo somente com matrícula e PIN de seis dígitos. O app acessa Firebase Auth e Firestore diretamente, protegido por Security Rules, sem Render, Express ou Cloud Functions.

## Histórias e critérios de aceitação

### US1 — Administrador cadastra um guarda (P1)

- Dado um administrador autenticado e ativo, quando informa nome, matrícula inédita e PIN válido, então são criados o usuário no Firebase Auth e o perfil `guarda` no Firestore.
- Um usuário não administrador não pode criar, listar, bloquear ou reativar guardas.
- O PIN nunca é gravado no Firestore.

### US2 — Guarda acessa o aplicativo (P1)

- O guarda informa somente matrícula e PIN.
- O app normaliza a matrícula, autentica no Firebase Auth e carrega nome e matrícula do perfil ativo.
- Credenciais inválidas, perfil ausente, inativo ou que não seja guarda são rejeitados sem revelar qual dado falhou.

### US3 — Administrador controla acesso (P2)

- O administrador lista guardas e pode bloquear ou reativar cada perfil.
- Um guarda bloqueado perde acesso aos documentos protegidos pelas regras.

## Requisitos não funcionais

- **FR-001**: Firestore MUST negar por padrão e autorizar por `request.auth.uid` e perfil ativo.
- **FR-002**: Movimentações MUST ser imutáveis e vinculadas ao guarda autenticado.
- **FR-003**: Configuração pública Firebase MUST vir de `EXPO_PUBLIC_FIREBASE_*`; credenciais administrativas não entram no bundle.
- **FR-004**: O primeiro administrador MUST ser provisionado uma única vez por ferramenta local segura.
- **FR-005**: A matrícula do guarda MUST ser imutável porque define sua identidade técnica no Firebase Auth.
- **FR-006**: Remoção de acesso MUST ocorrer por bloqueio lógico; o cliente sem privilégio Admin SDK não exclui contas do Firebase Auth.
- **FR-007**: Sessões offline MUST pertencer ao mesmo UID autenticado e expirar após 12 horas sem validação remota.
- **FR-008**: Chaves removidas MUST ser arquivadas logicamente para preservar o histórico.
- **FR-009**: Conflitos offline MUST permanecer visíveis até retry ou descarte confirmado pelo operador.
- **FR-010**: Ações administrativas MUST produzir eventos imutáveis de auditoria.
- **FR-011**: Administradores MUST poder recuperar senha e a equipe autorizada MUST ter ferramenta local para redefinir PIN.

## Critérios mensuráveis

- **SC-001**: lint, typecheck, testes e build terminam com zero erros.
- **SC-002**: testes no Emulator Suite comprovam deny-by-default, perfis ativo/inativo e proibição de escalada de privilégio.
- **SC-003**: editar um guarda preserva matrícula e e-mail técnico de autenticação.
- **SC-004**: uma sessão offline expirada ou pertencente a outro UID não é restaurada.
- **SC-005**: nenhuma chave pode ser excluída fisicamente pelo cliente.
- **SC-006**: pendências exibem motivo, tentativas e ações explícitas de retry/descarte.

## Fora de escopo

- Redefinição de PIN pelo painel; a operação permanece em ferramenta local com Admin SDK.
- Alteração de matrícula ou exclusão física da conta Auth pelo painel.
- Criação de chaves pelo cliente.
- Backend próprio, Render ou Cloud Functions.
