# Validation Quickstart

1. Configure as variáveis `EXPO_PUBLIC_FIREBASE_*`.
2. Ative Email/Password no Firebase Authentication.
3. Crie o primeiro usuário administrador no Console e seu documento `usuarios/{uid}` com perfil `admin`.
4. Execute emuladores de Auth, Firestore e Hosting.
5. Entre em `/admin`, cadastre um guarda e confirme que nenhum PIN aparece.
6. Entre como guarda usando matrícula e PIN.
7. Confirme que bloqueio impede login e escrita.
8. Execute lint, typecheck, testes, build e Expo Doctor.
