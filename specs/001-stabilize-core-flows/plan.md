# Implementation Plan: Stabilize Core Flows

> **Status: historical/superseded.** Do not execute the backend paths in this plan. The canonical architecture is Expo Router, Firebase Authentication, direct Firestore access, AsyncStorage, Security Rules, and Firebase Hosting.

**Branch**: `main` | **Date**: 2026-07-16 | **Spec**: [spec.md](spec.md)

## Summary

Finish the transaction and offline refactors already present in the worktree, converge
the mobile app on Expo Router, restore all quality gates, secure local configuration,
and align documentation with Firebase Authentication, direct Firestore access, and static Hosting.

## Technical Context

**Language/Version**: TypeScript, Node.js 20
**Primary Dependencies**: Firebase client SDK, Zod, Expo Router, AsyncStorage
**Storage**: Firestore server-side; AsyncStorage on device
**Testing**: Vitest and frontend service tests
**Target Platform**: Firebase Authentication/Firestore/Hosting, Android/iOS, static web
**Project Type**: Mobile app plus web service
**Constraints**: Offline-capable, key codes contain `/`, free-tier hosting

## Constitution Check

- Contract/schema/client/test alignment: PASS after implementation
- Durable per-item offline acknowledgement: REQUIRED
- Secrets and direct Firestore access prohibited: PASS
- All automated gates: REQUIRED
- Expo Router and Firebase Hosting canonical paths: PASS after cleanup

## Project Structure

```text
src/                    # Express API and Firestore repositories
tests/                  # Backend contract tests
frontend/app/           # Canonical Expo Router screens
frontend/src/services/  # API, cache, network and queue
docs/                   # Product and architecture documentation
```

**Structure Decision**: Preserve the monorepo and remove unreachable legacy mobile code.

## Complexity Tracking

No constitution exceptions are required.
