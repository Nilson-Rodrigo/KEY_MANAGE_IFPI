# Política de Branches

Cada branch deve tratar apenas do assunto indicado pelo nome.

Regras simples

- `docs`: somente documentação, templates, índices e textos acadêmicos.
- `docs-adr`: somente ADRs e decisões arquiteturais documentadas.
- `backend` ou `feature/*`: somente mudanças de backend, regras de negócio, APIs e infraestrutura.
- `frontend` ou `feature/*`: somente mudanças de interface e aplicação mobile.

Boas práticas

- Não misturar documentação com código funcional na mesma branch.
- Se uma tarefa tocar mais de uma área, separar em branches diferentes e abrir PRs diferentes.
- Antes de enviar, conferir se o diff da branch combina com o nome dela.
