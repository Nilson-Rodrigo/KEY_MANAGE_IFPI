# Feature Specification: Stabilize Core Flows

> **Status: historical/superseded.** This specification described the transition away from the removed Express backend. The canonical implementation and remaining work are maintained in `specs/002-admin-guardas/` and the Firebase architecture documents.

**Feature Branch**: `main`
**Created**: 2026-07-16
**Status**: Approved
**Input**: Implement all actionable improvements found in the repository audit.

## User Scenarios & Testing

### User Story 1 - Reliable key operations (Priority: P1)

As a guard, I can identify myself, view the key board, withdraw an available key,
and return an in-use key without duplicate or contradictory records.

**Why this priority**: This is the product's primary operational value.
**Independent Test**: Complete withdrawal and return flows and verify invalid or
concurrent repetitions are rejected without corrupting state.

**Acceptance Scenarios**:

1. **Given** an available key, **When** two withdrawals compete, **Then** exactly one succeeds.
2. **Given** an in-use key, **When** it is returned, **Then** status and history update atomically.
3. **Given** invalid input, **When** submitted, **Then** no state changes and a validation error is returned.

### User Story 2 - Safe offline continuity (Priority: P1)

As a guard during an outage, I can keep recording operations and trust every pending
record will be retried and individually confirmed after recovery.

**Why this priority**: Data loss invalidates the product.
**Independent Test**: Record offline operations, simulate partial failure, reconnect,
and verify only confirmed records leave the queue.

**Acceptance Scenarios**:

1. **Given** cached data offline, **When** an operation is recorded, **Then** local board and history update immediately.
2. **Given** pending records, **When** connectivity returns, **Then** synchronization starts automatically.
3. **Given** partial failure, **When** results arrive, **Then** failed records remain pending.

### User Story 3 - Deployable system (Priority: P2)

As the project team, we can validate, build, deploy, and diagnose one canonical architecture.

**Independent Test**: Run all documented gates and production health checks.

**Acceptance Scenarios**:

1. **Given** a clean checkout, **When** quality gates run, **Then** all pass.
2. **Given** a deployment, **When** health and key-list endpoints are checked, **Then** both succeed.

### Edge Cases

- Equal timestamps from different devices.
- Connectivity disappears during synchronization.
- The same pending ID is delivered more than once.
- First launch occurs offline without cache.
- A key code contains `/`.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST atomically validate and persist key transitions and history.
- **FR-002**: The system MUST reject duplicate withdrawals and invalid returns.
- **FR-003**: The system MUST return client errors for malformed input.
- **FR-004**: Offline devices and records MUST have stable unique identifiers.
- **FR-005**: Synchronization MUST start automatically after connectivity recovery.
- **FR-006**: Only individually confirmed records MAY leave the pending queue.
- **FR-007**: The client MUST show offline state and pending count.
- **FR-008**: The client MUST use one navigation and session flow.
- **FR-009**: Secrets and machine state MUST be excluded from version control.
- **FR-010**: Backend and frontend gates MUST run in CI.
- **FR-011**: Documentation MUST match the deployed architecture.

### Key Entities

- **Key**: Campus code, status, current holder, and latest movement time.
- **Movement**: Stable ID, key, type, responsible person, device, time, and sync state.
- **Pending Queue**: Local movements awaiting individual confirmation.
- **Session**: Local guard identity used in operations.

## Success Criteria

### Measurable Outcomes

- **SC-001**: All backend and frontend quality gates finish with zero errors.
- **SC-002**: All automated tests pass, including retry and partial-failure scenarios.
- **SC-003**: Competing withdrawal tests produce exactly one success in every run.
- **SC-004**: All unconfirmed records remain available for retry.
- **SC-005**: Offline state and pending count update within five seconds.
- **SC-006**: Production health and key-list checks succeed before release.

## Assumptions

- Name and registration number remain the MVP operator identification.
- Existing legacy Firestore IDs remain readable during migration.
- Firebase Authentication, Firestore, and static Hosting are the production targets.
