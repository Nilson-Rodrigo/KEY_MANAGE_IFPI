# AI Harness — CoreTech

O harness mantém implementação, schemas e regras Firestore alinhados à ADR-0015.

## Feedforward

Antes de gerar ou alterar um fluxo, fornecer ao agente:

1. requisito RF/RN/UC/US aplicável;
2. schemas Zod envolvidos;
3. modelo das coleções e `firestore.rules`;
4. ADR-0015;
5. testes existentes do fluxo.

O template operacional está em `docs/harness/prompts/feedforward.prompt.md`.

## Feedback

O pipeline executa `lint → typecheck → testes → export web`.

- tooling administrativo: `npm run verify` e `npm run build`;
- aplicativo: `npm --prefix frontend run verify` e `npm --prefix frontend run build`;
- CI: `.github/workflows/ci.yml` em pushes e pull requests para `main`.

## Invariantes protegidas

- somente usuários Firebase autenticados acessam dados remotos;
- retirada alterna `disponivel → em_uso`;
- devolução alterna `em_uso → disponivel`;
- alteração da chave e criação da movimentação são atômicas;
- `autorUid` corresponde ao UID autenticado;
- movimentações são imutáveis;
- fila offline preserva itens não confirmados.

## Limitações

- autenticação anônima não comprova a identidade humana do guarda;
- testes de Security Rules no Emulator Suite devem acompanhar novos shapes;
- conflitos offline entre dispositivos continuam sujeitos à política RN07.
