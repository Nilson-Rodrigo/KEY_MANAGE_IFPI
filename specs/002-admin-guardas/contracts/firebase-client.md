# Contrato do cliente Firebase

- `entrarGuarda(matricula, pin)` retorna perfil ativo `guarda` ou erro genérico de credencial.
- `entrarAdministrador(email, senha)` retorna perfil ativo `admin` ou erro genérico.
- `cadastrarGuarda(nome, matricula, pin)` requer admin autenticado, matrícula inédita e PIN numérico de seis dígitos.
- `listarGuardas()` e `alterarStatusGuarda()` requerem admin ativo.
- `editarNomeGuarda()` altera somente o nome; matrícula é identidade imutável.
- Remoção de acesso usa `alterarStatusGuarda(..., false)`; não há exclusão física pelo cliente.
- Retirada/devolução requerem guarda ativo e gravam `autorUid` igual ao UID autenticado.
- Chaves são arquivadas, nunca excluídas fisicamente pelo cliente.
- Pendências com conflito permanecem no dispositivo até retry ou descarte confirmado.
- Ações administrativas gravam evento imutável em `auditoria`.
