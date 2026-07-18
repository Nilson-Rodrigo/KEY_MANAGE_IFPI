# Contract Addendum

- Validation failures return HTTP 400 with a stable error code.
- Withdrawal and return responses contain the updated key and movement.
- Synchronization returns one result per supplied movement ID.
- Repeating a synchronized ID is idempotent and does not duplicate history.
- Health output contains no credentials.
