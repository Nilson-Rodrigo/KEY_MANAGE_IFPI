# ADR 0015 — Firebase Auth com Perfis e Firestore Direto

- **Status:** Aceito — Supersedes ADR-0011, ADR-0012, ADR-0013 e ADR-0014
- **Data:** 2026-07-16
- **Autor:** CoreTech
- **ID:** ADR 0015

## Contexto

O aplicativo precisa operar online e offline com baixa complexidade operacional. A implementação usa o SDK Firebase no cliente, autenticação por e-mail/senha, perfis no Firestore, transações Firestore e AsyncStorage. Manter uma camada de servidor duplicaria contratos e implantação sem ser necessário para o MVP.

## Decisão

```text
Expo / React Native
  ├─ Firebase Authentication por e-mail/senha
  ├─ Cloud Firestore direto
  └─ AsyncStorage (cache + fila offline)

Firebase Hosting
  └─ frontend/dist
```

- Toda operação remota exige usuário Firebase autenticado e perfil ativo no Firestore.
- Administradores cadastram e bloqueiam guardas; guardas entram com matrícula e PIN.
- Retirada e devolução usam uma transação que atualiza `chaves/{id}` e cria `movimentacoes/{id}` atomicamente.
- Security Rules validam autenticação, shapes, transições de estado, vínculo entre os dois documentos e autoria pelo `auth.uid`.
- O cliente não cria nem exclui chaves; a carga inicial é administrativa.
- Movimentações são imutáveis após a criação.
- O Hosting publica somente o export web estático.
- AsyncStorage mantém cache e fila de operações pendentes quando não há rede.

## Consequências

- **Positivas:** uma única plataforma operacional; menos infraestrutura; transações atômicas; regras próximas aos dados; suporte direto ao SDK web/mobile.
- **Negativas:** Security Rules tornam-se parte crítica do domínio; o administrador inicial exige provisionamento seguro; mudanças de esquema exigem coordenação entre cliente e regras; operações offline conflitantes continuam sujeitas à política LWW aceita no MVP. Como o Firebase Auth por e-mail/senha permite autoinscrição no cliente, alguém pode ocupar antecipadamente um e-mail técnico e impedir o cadastro daquela matrícula, embora não consiga criar o perfil protegido nem acessar o Firestore. Eliminar também esse risco exigiria um ambiente confiável com Admin SDK, contrariando a restrição desta versão de não usar backend ou Functions.

## Critérios de aceitação

- Authentication por e-mail/senha habilitada no projeto Firebase.
- Administrador inicial provisionado no Firebase Auth e em `usuarios/{uid}`.
- `firebase.json` contém apenas Firestore, Hosting estático e emuladores.
- `firestore.rules` nega usuários não autenticados e coleções desconhecidas.
- Atualizações de chave exigem uma movimentação correspondente na mesma transação.
- CI valida contratos, regras, frontend e export web.
- A documentação não define servidor de aplicação como parte da implantação.

## Justificativa vinculada ao semestre

A decisão reduz componentes operacionais e mantém os controles essenciais de integridade dentro do prazo acadêmico.
