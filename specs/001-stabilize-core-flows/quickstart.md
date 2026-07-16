# Validation Quickstart

1. Configure `.env` without committing credentials.
2. Run `npm run verify` and `npm run build` in the root.
3. Run `npm run verify` and `npm run build` in `frontend/`.
4. Start Firestore emulator, seed data, and start the API.
5. Validate list, withdrawal, duplicate conflict, return, and history.
6. Create offline operations, reconnect, and verify only confirmed IDs leave the queue.
7. Run `npx expo-doctor` and resolve every failure.
8. Check the hosted web app and an authenticated Firestore read before release.
