# ADR 0015 — Firebase Auth Anônimo e Firestore Direto

- **Status:** Aceito — Supersedes ADR-0011, ADR-0012, ADR-0013 e ADR-0014
- **Data:** 2026-07-16
- **Autor:** CoreTech
- **ID:** ADR 0015

## Contexto

O aplicativo precisa operar online e offline com baixa complexidade operacional. A implementação já usa o SDK Firebase no cliente, autenticação anônima, transações Firestore e AsyncStorage. Manter uma camada de servidor duplicaria contratos e implantação sem ser necessário para o MVP.

## Decisão

```text
Expo / React Native
  ├─ Firebase Authentication anônima
  ├─ Cloud Firestore direto
  └─ AsyncStorage (cache + fila offline)

Firebase Hosting
  └─ frontend/dist
```

- Toda operação remota exige usuário Firebase autenticado anonimamente.
- Retirada e devolução usam uma transação que atualiza `chaves/{id}` e cria `movimentacoes/{id}` atomicamente.
- Security Rules validam autenticação, shapes, transições de estado, vínculo entre os dois documentos e autoria pelo `auth.uid`.
- O cliente não cria nem exclui chaves; a carga inicial é administrativa.
- Movimentações são imutáveis após a criação.
- O Hosting publica somente o export web estático.
- AsyncStorage mantém cache e fila de operações pendentes quando não há rede.

## Consequências

- **Positivas:** uma única plataforma operacional; menos infraestrutura; transações atômicas; regras próximas aos dados; suporte direto ao SDK web/mobile.
- **Negativas:** Security Rules tornam-se parte crítica do domínio; autenticação anônima não comprova a identidade humana; mudanças de esquema exigem coordenação entre cliente e regras; operações offline conflitantes continuam sujeitas à política LWW aceita no MVP.

## Critérios de aceitação

- Authentication anônima habilitada no projeto Firebase.
- `firebase.json` contém apenas Firestore, Hosting estático e emuladores.
- `firestore.rules` nega usuários não autenticados e coleções desconhecidas.
- Atualizações de chave exigem uma movimentação correspondente na mesma transação.
- CI valida contratos, regras, frontend e export web.
- A documentação não define servidor de aplicação como parte da implantação.

## Justificativa vinculada ao semestre

A decisão reduz componentes operacionais e mantém os controles essenciais de integridade dentro do prazo acadêmico.
