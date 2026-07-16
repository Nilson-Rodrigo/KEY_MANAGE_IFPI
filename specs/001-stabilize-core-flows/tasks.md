# Tasks: Stabilize Core Flows

## Phase 1: Setup

- [ ] T001 Protect credentials and machine state in `.gitignore`
- [ ] T002 Complete governance artifacts in `.specify/` and `specs/001-stabilize-core-flows/`

## Phase 2: Foundation

- [ ] T003 Fix Expo assets, configuration, dependencies, and frontend scripts in `frontend/`
- [ ] T004 Complete API input validation, CORS configuration, and health behavior in `src/`

## Phase 3: User Story 1

- [ ] T005 [US1] Complete atomic Firestore movements in `src/core/repositories/firestore.repository.ts`
- [ ] T006 [US1] Align Firestore transactions, schemas, seeds, Security Rules, and client contracts
- [ ] T007 [US1] Update backend tests for transaction and idempotency behavior in `tests/`

## Phase 4: User Story 2

- [ ] T008 [US2] Complete stable device and queue storage in `frontend/src/services/storage.ts`
- [ ] T009 [US2] Complete per-item synchronization in `frontend/src/services/api.ts`
- [ ] T010 [US2] Add reconnect synchronization and pending UI in `frontend/app/`
- [ ] T011 [US2] Add frontend service tests in `frontend/tests/`

## Phase 5: User Story 3

- [ ] T012 [US3] Remove legacy navigation and converge on Expo Router
- [ ] T013 [US3] Fix general history and session-driven forms in `frontend/app/`
- [ ] T014 [US3] Align ADR-0014/0015, README, requirements, harness, Firebase, and CI

## Phase 6: Validation

- [ ] T015 Run backend lint, typecheck, tests, and build
- [ ] T016 Run frontend lint, typecheck, tests, build, and Expo Doctor
- [ ] T017 Validate local and production health without exposing secrets

## Dependencies

T001-T004 block user stories. US1 stabilizes contracts before US2. Validation runs last.
