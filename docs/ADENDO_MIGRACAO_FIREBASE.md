# Adendo — Arquitetura Firebase Vigente

| Informação | Descrição |
|---|---|
| Instituição | Instituto Federal do Piauí — Campus Piripiri |
| Componente Curricular | Engenharia de Software II |
| Equipe | CoreTech |
| Data da consolidação | 16/07/2026 |
| Decisão vigente | ADR-0015 |

## Natureza

O RVS e o ERS permanecem como registros históricos do levantamento realizado em abril de 2026. Este adendo informa a arquitetura implementada e deve ser lido com a ADR-0010 e a ADR-0015.

## Evolução

| Aspecto | Decisão histórica | Decisão vigente |
|---|---|---|
| Persistência central | PostgreSQL | Cloud Firestore |
| Identidade técnica | Sem provedor remoto | Firebase Authentication por e-mail/senha e perfis |
| Acesso aos dados | Camada de servidor dedicada | SDK Firebase direto no aplicativo |
| Offline | SQLite planejado | AsyncStorage com cache e fila manual |
| Web | Não definido | Export estático no Firebase Hosting |

## Arquitetura vigente

O aplicativo Expo autentica administradores e guardas com Firebase Authentication e acessa o Firestore diretamente. O administrador cadastra guardas; retiradas e devoluções são executadas em transações atômicas que atualizam a chave e criam uma movimentação imutável. As Firestore Security Rules exigem perfil ativo, validam papéis, shapes e transições e negam coleções desconhecidas.

O cache e a fila offline ficam no AsyncStorage. Ao recuperar conexão, o aplicativo reaplica as pendências no Firestore respeitando a política de conflito RN07.

## Segurança e limitações

- Administradores usam e-mail e senha; guardas usam matrícula e PIN cadastrados pelo administrador.
- Nome e matrícula são dados operacionais e permanecem sujeitos às obrigações de minimização e acesso restrito da LGPD.
- A carga inicial de chaves é administrativa; clientes não podem criar ou excluir chaves.
- Conflitos entre dispositivos offline continuam sujeitos à política LWW aceita no MVP.
- O Hosting publica somente arquivos estáticos de `frontend/dist`.

## Rastreabilidade

- **ADR-0010** — adoção do Cloud Firestore.
- **ADR-0015** — Firebase Auth com perfis, Firestore direto e Hosting estático.
- **ADRs 0011–0014** — registros históricos superseded.
