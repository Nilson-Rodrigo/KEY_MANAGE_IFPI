# Tarefas: Administração de guardas

- [x] T001 Atualizar constituição e arquitetura canônica.
- [x] T002 Configurar Firebase Auth, Firestore e Hosting sem Functions/Render.
- [x] T003 Implementar autenticação de guarda por matrícula e PIN.
- [x] T004 Implementar autenticação administrativa por e-mail e senha.
- [x] T005 Implementar cadastro compensável de guardas.
- [x] T006 Implementar listagem, bloqueio e reativação.
- [x] T007 Proteger rotas por perfil.
- [x] T008 Usar identidade canônica nas movimentações Firestore.
- [x] T009 Aplicar Security Rules deny-by-default.
- [x] T010 Remover dependência de arquivo de credencial do bundle.
- [x] T011 Documentar provisionamento inicial e configuração.
- [x] T012 Adicionar testes de validação das credenciais.
- [x] T013 Executar lint, typecheck, testes, build e Expo Doctor.
- [x] T014 Validar a compilação das Security Rules no Emulator Suite.
- [x] T015 Tornar matrícula imutável e substituir exclusão física por bloqueio lógico.
- [x] T016 Limitar restauração offline por UID e janela de validade.
- [x] T017 Adicionar testes reais de autorização das Security Rules.
- [x] T018 Incluir Security Rules e Expo Doctor no CI.
- [x] T019 Arquivar a spec legada e consolidar a documentação canônica.

## Phase 2: Convergence

- [x] T020 Adicionar confirmação explícita para exclusão de chave e bloqueio de guarda (product safety, missing).
- [x] T021 Substituir exclusão física de chave por arquivamento lógico preservando histórico (auditability, partial).
- [x] T022 Criar central de pendências com motivo do conflito, nova tentativa e descarte confirmado (Constitution II, partial).
- [x] T023 Implementar retry exponencial, sincronização manual e sincronização no retorno da conectividade (offline reliability, partial).
- [x] T024 Registrar auditoria imutável das ações administrativas e exibir última atividade (secure operations, missing).
- [x] T025 Implementar recuperação de senha administrativa e ferramenta segura para redefinição de PIN (credential recovery, missing).
- [x] T026 Adicionar importação e exportação CSV para chaves e histórico (operational usability, missing).
- [x] T027 Ampliar testes unitários e de Security Rules para arquivamento, auditoria e conflitos (SC-001/SC-002, partial).
- [x] T028 Alinhar README, documentação offline, contratos, modelo de dados e CI ao comportamento implementado (Constitution V, contradicts).
- [x] T029 Executar gates completos, Expo Doctor, export web e registrar roteiro de validação Android real (Constitution IV, partial).
