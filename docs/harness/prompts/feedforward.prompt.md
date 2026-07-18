# Feedforward — Template operacional

Use este bloco antes de solicitar a implementação de um fluxo ou regra de negócio.

```text
Implemente a alteração descrita abaixo seguindo estritamente os artefatos fornecidos.

OBJETIVO
[descreva a mudança]

CONTRATO DE DADOS
[cole os schemas Zod, coleções e regras Firestore relevantes]

SCHEMA ZOD
[cole ou referencie o schema correspondente em src/specs/schemas]

DECISÕES ARQUITETURAIS
- ADR aplicável: [arquivo]
- Arquitetura de implantação vigente: ADR-0015
- O app usa Firebase Auth por e-mail/senha e perfis ativos antes de acessar dados remotos.
- Toda persistência remota usa transações diretas no Firestore.
- Operações offline usam cache/fila manual no AsyncStorage e sincronizam no Firestore.

RASTREABILIDADE
- RF: [códigos]
- RN: [códigos]
- UC/US: [códigos]

RESTRIÇÕES
- Reutilize os schemas existentes; não recrie tipos equivalentes.
- Preserve os códigos de domínio definidos nos schemas e contratos.
- Não exponha credenciais administrativas; o cliente usa apenas a configuração pública Firebase.
- Ao concluir, execute lint, typecheck, testes existentes e build aplicável.
```
