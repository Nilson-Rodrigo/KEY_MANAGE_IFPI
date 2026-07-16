# Feature Specification: Administração e acesso de guardas

**Feature Branch**: `main`
**Created**: 2026-07-16
**Status**: Approved
**Input**: Somente o administrador cadastra guardas; cada guarda entra com matrícula e PIN.

## User Scenarios & Testing

### User Story 1 - Administrador cadastra guardas (Priority: P1)

Como administrador, quero cadastrar nome, matrícula e PIN inicial para controlar quem pode operar o sistema.

**Independent Test**: O administrador cadastra um guarda, que aparece na lista sem revelar o PIN.

**Acceptance Scenarios**:

1. Credenciais administrativas válidas liberam a gestão de guardas.
2. Nome, matrícula e PIN válidos criam um guarda ativo.
3. Matrícula duplicada é recusada sem alterar o cadastro existente.
4. Bloquear um guarda impede novos acessos e novas gravações.

### User Story 2 - Guarda entra com matrícula e PIN (Priority: P1)

Como guarda cadastrado, quero entrar com minha matrícula e PIN para que minhas operações sejam rastreáveis.

**Independent Test**: Apenas um guarda ativo com matrícula e PIN corretos consegue entrar.

**Acceptance Scenarios**:

1. Login válido retorna o nome canônico do cadastro.
2. Matrícula, PIN ou estado inválido produz a mesma mensagem genérica.
3. O PIN nunca é exibido nem armazenado nos documentos da aplicação.

### User Story 3 - Operação rastreável e offline (Priority: P2)

Como gestor, quero que cada movimentação use a identidade autenticada e continue segura após reconexão.

**Independent Test**: Retirada e devolução usam a sessão sem campos editáveis; regras recusam identidade forjada.

**Acceptance Scenarios**:

1. A identidade da movimentação vem exclusivamente da sessão autenticada.
2. Sem sessão válida, rotas operacionais retornam ao login.
3. Operações pendentes permanecem locais até confirmação do Firestore.

### Edge Cases

- Matrículas são normalizadas antes do cadastro e login.
- O primeiro administrador é criado manualmente no Firebase Console.
- O primeiro login exige conexão; uma sessão previamente validada pode sustentar o fluxo offline.
- Falha após criar a credencial tenta remover a conta incompleta.
- O PIN possui exatamente seis dígitos.

## Requirements

### Functional Requirements

- **FR-001**: Somente o administrador MUST listar, cadastrar, ativar e desativar guardas.
- **FR-002**: Cada guarda MUST ter nome, matrícula única, identidade Firebase e estado ativo.
- **FR-003**: Guardas MUST entrar por matrícula e PIN de seis dígitos.
- **FR-004**: O PIN MUST ser armazenado somente pelo provedor de autenticação.
- **FR-005**: Acesso inexistente, inativo ou com PIN incorreto MUST ser recusado genericamente.
- **FR-006**: Movimentações MUST usar nome, matrícula e UID da sessão autenticada.
- **FR-007**: Regras remotas MUST negar tudo que não esteja explicitamente autorizado.
- **FR-008**: Operações de chave MUST atualizar chave e histórico atomicamente.
- **FR-009**: A fila offline MUST remover somente operações confirmadas.
- **FR-010**: Testes MUST cobrir autenticação, autorização e regras críticas.

### Key Entities

- **Administrador**: conta Firebase autorizada com perfil `admin`.
- **Guarda**: perfil vinculado a UID, nome, matrícula e estado.
- **Acesso**: mapeamento mínimo de matrícula para credencial interna do Firebase Auth.
- **Movimentação**: retirada ou devolução vinculada ao UID autenticado.

## Success Criteria

- **SC-001**: 100% dos acessos inexistentes, inativos ou com PIN incorreto são recusados.
- **SC-002**: Um guarda pode ser cadastrado em menos de dois minutos.
- **SC-003**: Nenhum documento, log ou resposta contém PIN.
- **SC-004**: 100% das movimentações da interface usam a identidade autenticada.
- **SC-005**: Todos os testes, verificações estáticas e builds passam.

## Assumptions

- O administrador usa e-mail e senha do Firebase; guardas veem apenas matrícula e PIN.
- O cadastro de contas utiliza uma instância secundária de autenticação para preservar a sessão administrativa.
- Recuperação administrativa de PIN fica fora desta primeira entrega sem backend privilegiado.
