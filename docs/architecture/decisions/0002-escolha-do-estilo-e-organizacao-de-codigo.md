
# ADR 0002 — Escolha do Estilo e Organização de Código

- **Status:** Aceito
- **Data:** 2026-05-28
- **Autor:** CoreTech
- **ID:** ADR 0002

Contexto
-------
O time do MVP tem prazo reduzido (semestre acadêmico), composição cross-functional e necessidade de entrega rápida de funcionalidades end-to-end. Consideramos duas abordagens comuns:

- Arquitetura em camadas (Layered / Horizontal): separa por responsabilidades técnicas (ex.: controllers, services, repositories).
- Arquitetura por fatias de contexto (Vertical Slice / Feature-Based): organiza o código por domínio/feature, agrupando tudo necessário para uma funcionalidade.

Fatores relevantes:
- Curva de aprendizado da equipe (boa familiaridade com JavaScript/TypeScript).
- Prioridade na entrega de features completas e testáveis para avaliação do MVP.
- Necessidade de responsabilidade clara por feature para revisão e correção rápida.

Decisão
--------
Adotamos a **Arquitetura por Fatias de Contexto (Vertical Slice / Feature-Based)** para o escopo do MVP.

Justificativa resumida: facilita entrega de funcionalidades completas, reduz o custo de navegação no código para novos membros e favorece ownership de feature em equipes pequenas durante o semestre.

Consequências
------------

- Positivas:
	- Ciclo de feedback mais curto: cada fatia contém handlers, serviços, modelos e testes relacionados, permitindo PRs mais focados.
	- Facilita desenvolvimento paralelo: membros podem trabalhar em slices diferentes com menor risco de conflitos.
	- Testabilidade: testes por feature ficam co-localizados com a implementação.

- Negativas / Trade-offs:
	- Risco de duplicação de código entre slices (funções utilitárias ou validações repetidas).
	- Necessidade de políticas e ferramentas para manter consistência (linters, formatação, convenções de pastas, revisões de PR).

Mitigações
---------

- Manter uma pasta `shared/` ou `core/` para utilitários reutilizáveis e documentação de padrões.
- Adotar regras de lint/format (ESLint + Prettier) e um checklist de PR que inclua verificação de duplicação.
- Revisões peer-to-peer e pares rotativos para disseminar convenções.

Critérios de aceitação (para esta ADR ser considerada cumprida)
---------------------------------

- Estrutura de repositório exemplificada em README com ao menos 3 slices implementadas.
- Linters e scripts de verificação configurados e acionáveis via `npm run check`.
- Documentação breve (`docs/architecture/decisions/0002-*`) explicando onde colocar código compartilhado.

Notas de implementação
--------------------

- Exemplo de estrutura recomendada:

```
src/
	features/
		chaves/
			handler.ts
			service.ts
			model.ts
			chaves.spec.ts
	shared/
		db/
		utils/
```

Esta organização pode ser refinada em ADRs futuras conforme o projeto evolui.

Justificativa vinculada ao semestre
----------------------------------

A decisão favorece entregas rápidas e ownership de features, adequando-se ao prazo e à composição reduzida do time durante o semestre.

