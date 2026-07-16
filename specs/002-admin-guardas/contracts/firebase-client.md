# Firebase Client Contract

- `entrarAdministrador(email, senha)`: autentica e exige perfil `admin` ativo.
- `cadastrarGuarda(nome, matricula, pin)`: cria credencial secundária e documentos autorizados.
- `listarGuardas()`: retorna perfis sem credenciais.
- `alterarStatusGuarda(uid, matricula, ativo)`: atualiza perfil e acesso atomicamente.
- `entrarGuarda(matricula, pin)`: resolve acesso individual, autentica e exige perfil ativo.
- `registrarMovimentacao(...)`: transação que valida estado, grava histórico e atualiza chave.

Erros de login são genéricos. PIN e e-mail técnico nunca são exibidos na interface ou movimentações.
