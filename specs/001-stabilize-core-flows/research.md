# Research Decisions

## Transactional operations

- **Decision**: Validate key state and write key plus movement in one Firestore transaction.
- **Rationale**: Prevents concurrent duplicate withdrawals.
- **Alternative rejected**: Separate reads and writes allow races and partial state.

## Durable manual offline queue

- **Decision**: Use AsyncStorage with stable IDs and per-item acknowledgement.
- **Rationale**: The mobile client uses an HTTP API and cannot use Firestore native persistence.
- **Alternative rejected**: Direct Firestore access conflicts with the API-only boundary.

## Canonical mobile runtime

- **Decision**: Keep Expo Router only.
- **Rationale**: It is the configured package entry and owns all exported routes.
- **Alternative rejected**: A second navigator creates dead code and divergent sessions.
