# Tasks: Administração e acesso de guardas sem servidor

## Phase 1: Setup

- [ ] T001 Atualizar ambiente, Firebase e documentação para a arquitetura direta da ADR-0015

## Phase 2: Foundational

- [ ] T002 Criar contratos e tipos de identidade em `frontend/src/services/firebase.ts`
- [ ] T003 Implementar autenticação, perfis e provisionamento em `frontend/src/services/auth.ts`
- [ ] T004 Implementar acesso direto e transações em `frontend/src/services/api.ts`
- [ ] T005 Reescrever autorização deny-by-default em `firestore.rules`

## Phase 3: User Story 1 - Administrador cadastra guardas

- [ ] T006 [P] [US1] Criar testes dos serviços administrativos em `frontend/tests/auth.test.ts`
- [ ] T007 [US1] Implementar tela administrativa em `frontend/app/admin.tsx`

## Phase 4: User Story 2 - Guarda entra com PIN

- [ ] T008 [P] [US2] Criar testes de normalização e login em `frontend/tests/auth.test.ts`
- [ ] T009 [US2] Implementar sessão Firebase em `frontend/src/context/AppContext.tsx`
- [ ] T010 [US2] Implementar login por matrícula e PIN em `frontend/app/identificacao.tsx`

## Phase 5: User Story 3 - Operação rastreável

- [ ] T011 [US3] Remover edição manual em `frontend/app/retirada/[codigo].tsx` e `frontend/app/devolucao/[codigo].tsx`
- [ ] T012 [US3] Proteger rotas e integrar telas ao Firestore em `frontend/app/_layout.tsx` e `frontend/app/(tabs)/*.tsx`
- [ ] T013 [P] [US3] Testar regras críticas com emulador em `tests/rules/firestore.rules.test.ts`

## Phase 6: Polish and Validation

- [ ] T014 Atualizar arquitetura e instruções em `README.md` e `docs/architecture/decisions/0016-firebase-direto-auth-firestore.md`
- [ ] T015 Executar lint, typecheck, testes, build, Expo Doctor e emuladores

## Dependencies

T001-T005 bloqueiam as histórias. US1 provisiona dados para US2. US3 depende da sessão validada.
