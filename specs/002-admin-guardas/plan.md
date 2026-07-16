# Implementation Plan: Administração e acesso de guardas

**Branch**: `main` | **Date**: 2026-07-16 | **Spec**: [spec.md](spec.md)

## Summary

Migrar para Expo com Firebase Auth e acesso direto ao Firestore. O administrador provisiona guardas com uma instância secundária de Auth; guardas entram por matrícula e PIN. Security Rules, transações e testes protegem o acesso direto.

## Technical Context

**Language/Version**: TypeScript, Expo 57, React Native 0.86
**Primary Dependencies**: Firebase JS SDK, Expo Router, AsyncStorage, Zod
**Storage**: Firestore e cache/fila em AsyncStorage
**Testing**: Vitest, Firebase Emulator e Expo Doctor
**Target Platform**: Android, iOS e Firebase Hosting
**Constraints**: arquitetura sem camada de servidor; PIN somente no Firebase Auth

## Constitution Check

- Contratos e regras testáveis: REQUIRED
- Fila offline durável: REQUIRED
- Firebase Auth e regras deny-by-default: REQUIRED
- Gates completos: REQUIRED
- Arquitetura única sem servidor próprio: PASS

## Project Structure

```text
frontend/app/                 # Expo Router
frontend/src/services/        # Auth e Firestore direto
frontend/src/context/         # sessão autenticada
firestore.rules               # autorização e invariantes
tests/rules/                  # testes do emulador
```

## Complexity Tracking

O provisionamento client-side pode criar contas órfãs em falha parcial; a implementação executa rollback da conta recém-criada.
