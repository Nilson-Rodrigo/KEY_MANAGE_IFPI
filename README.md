# CoreTech — Sistema de Gerenciamento de Acesso a Chaves

Aplicativo Expo offline-first para controlar retirada e devolução de chaves do IFPI Campus Piripiri.

## Arquitetura vigente

```text
Expo / React Native
  ├─ Firebase Authentication por e-mail/senha
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
| Identidade e acesso | Firebase Auth + perfis admin/guarda no Firestore |
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
- provedor **E-mail/senha** habilitado em Authentication → Sign-in method
- Firestore criado no projeto

## Instalação

```bash
npm ci
cd frontend
npm ci --legacy-peer-deps
```

Copie `frontend/.env.example` para `frontend/.env.local` e preencha as variáveis públicas do aplicativo web obtidas em **Firebase Console → Configurações do projeto → Seus apps**. Nenhuma credencial administrativa é incluída no app.

O primeiro administrador é criado por ferramenta local, usando a credencial de serviço apenas fora do aplicativo:

```bash
# Preencha FIREBASE_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS e ADMIN_* no .env
npm run provision:admin
```

Depois disso, o administrador entra em `/admin` e cadastra os guardas com nome, matrícula e PIN de seis dígitos.

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

# Na raiz: valida autorização no Emulator Suite
cd ..
npm run rules:check
```

O workflow em `.github/workflows/ci.yml` executa essas verificações em pushes e pull requests para `main`.

## Deploy

```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting,firestore:rules
```

O Hosting publica exclusivamente `frontend/dist`. Antes do primeiro deploy, habilite Authentication por e-mail/senha, crie o perfil inicial do administrador e revise as regras com o Emulator Suite.

## Modelo de segurança

- toda leitura e escrita exige `request.auth != null`;
- somente o administrador autenticado cria, lista, bloqueia ou reativa guardas;
- o PIN fica apenas no Firebase Authentication e nunca é salvo no Firestore;
- guardas não podem administrar chaves; administradores podem cadastrar, editar e arquivar, mas ninguém as exclui fisicamente pelo cliente;
- uma chave só pode alternar `disponivel ↔ em_uso`;
- cada alteração de chave exige uma movimentação correspondente na mesma transação;
- a movimentação registra `autorUid == request.auth.uid`;
- movimentações não podem ser alteradas ou excluídas pelo cliente;
- coleções não declaradas são negadas por padrão.

O administrador entra com e-mail e senha e cadastra cada guarda com nome, matrícula e PIN. Somente perfis ativos podem acessar as chaves; somente guardas podem registrar movimentações.

## Operação administrativa

- `npm run reset:guard-pin`: redefine o PIN usando `GUARD_MATRICULA` e `GUARD_NEW_PIN` no ambiente local seguro.
- `npm run import:keys`: importa o arquivo `codigo;nome;descricao` indicado por `KEYS_CSV`.
- `npm run export:history`: exporta movimentações para o caminho indicado por `HISTORY_CSV`.
- A tela de auditoria lista as últimas 100 ações administrativas imutáveis.

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
