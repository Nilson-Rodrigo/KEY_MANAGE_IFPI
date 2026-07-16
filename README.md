# CoreTech — Sistema de Gerenciamento de Acesso a Chaves

Aplicativo Expo offline-first para controlar retirada e devolução de chaves do IFPI Campus Piripiri.

## Arquitetura vigente

```text
Expo / React Native
  ├─ Firebase Authentication anônima
  ├─ Cloud Firestore (acesso direto, protegido por Security Rules)
  └─ AsyncStorage (cache e fila offline)

Firebase Hosting
  └─ frontend/dist (export web estático)
```

Retiradas e devoluções são transações atômicas no Firestore: a mesma transação altera a chave e cria sua movimentação de auditoria.

## Stack

| Camada | Tecnologia |
|---|---|
| Aplicativo | React Native + Expo + TypeScript |
| Identidade técnica | Firebase Auth anônima |
| Banco | Cloud Firestore |
| Offline | AsyncStorage + fila manual |
| Web | Firebase Hosting |
| Validação | Zod + Firestore Security Rules |
| Qualidade | ESLint, TypeScript e Vitest |

## Pré-requisitos

- Node.js 20+
- npm 10+
- Firebase CLI
- projeto Firebase `coretech-chaves-e62e7`
- provedor **Anônimo** habilitado em Authentication → Sign-in method
- Firestore criado no projeto

## Instalação

```bash
npm ci
cd frontend
npm ci --legacy-peer-deps
```

O cliente Firebase é inicializado a partir de `frontend/google-services.json`. Esse arquivo identifica o projeto e não deve conter chave privada ou credencial administrativa.

## Desenvolvimento

```bash
# Emuladores de Auth, Firestore e Hosting
firebase emulators:start --only auth,firestore,hosting

# Aplicativo Expo
cd frontend
npm start
```

Para usar emuladores no aplicativo, a conexão explícita aos emuladores deve estar habilitada no cliente antes do build. Sem isso, o app usa o projeto Firebase configurado.

## Verificação

```bash
# Contratos e testes do repositório
npm run verify

# Frontend
cd frontend
npm run verify
npm run build
```

O workflow em `.github/workflows/ci.yml` executa essas verificações em pushes e pull requests para `main`.

## Deploy

```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting,firestore:rules
```

O Hosting publica exclusivamente `frontend/dist`. Antes do primeiro deploy, habilite Authentication anônima no Console Firebase e revise as regras com o Emulator Suite.

## Modelo de segurança

- toda leitura e escrita exige `request.auth != null`;
- clientes não podem criar ou excluir chaves;
- uma chave só pode alternar `disponivel ↔ em_uso`;
- cada alteração de chave exige uma movimentação correspondente na mesma transação;
- a movimentação registra `autorUid == request.auth.uid`;
- movimentações não podem ser alteradas ou excluídas pelo cliente;
- coleções não declaradas são negadas por padrão.

Autenticação anônima identifica a instalação Firebase, não comprova a identidade civil do guarda. Nome e matrícula continuam sendo dados operacionais informados no aplicativo.

## Documentação

- [PRD](docs/PRD.md)
- [ERS](docs/ERS.md)
- [RVS](docs/RVS.md)
- [Adendo Firebase](docs/ADENDO_MIGRACAO_FIREBASE.md)
- [ADR 0015 — arquitetura vigente](docs/architecture/decisions/0015-firebase-auth-anonimo-firestore-direto.md)
- [Harness](docs/harness/HARNESS.md)

## Equipe

| Integrante | Função |
|---|---|
| Wesley Tiago | Scrum Master |
| Antônio Carlos | Product Owner |
| Ana Rosa Pereira Chaves | Analista de Requisitos |
| Eric Vinicius | UX/UI |
| Roger Pierre | Desenvolvimento Full Stack |
| Nilson Rodrigo | Desenvolvimento Full Stack |

Projeto acadêmico — Engenharia de Software II — IFPI Campus Piripiri.
