# Research Decisions

## Login do guarda

- **Decision**: Firebase Auth email/senha com e-mail técnico oculto e PIN de seis dígitos.
- **Rationale**: Firebase protege a credencial; o guarda usa somente matrícula e PIN.
- **Alternatives considered**: PIN em Firestore foi rejeitado por exposição; Google foi rejeitado pelo usuário.

## Provisionamento administrativo

- **Decision**: conta administrativa criada manualmente e instância secundária do Auth para cadastrar guardas.
- **Rationale**: mantém a sessão do administrador sem backend privilegiado.
- **Alternatives considered**: credenciais administrativas no cliente foram rejeitadas; o provisionamento deve usar recursos seguros do Firebase compatíveis com o escopo.

## Autorização

- **Decision**: perfis e acessos no Firestore com regras deny-by-default e verificação de UID/estado em toda operação.
- **Rationale**: contas Firebase não autorizadas não recebem acesso aos dados.

## Offline

- **Decision**: preservar cache e fila AsyncStorage; confirmar cada escrita por transação Firestore.
- **Rationale**: evita perda de operações quando a conectividade oscila.
