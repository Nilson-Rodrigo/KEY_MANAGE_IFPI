
# ADR 0004 — Estratégia de Autenticação

- **Status:** Aceito
- **Data:** 2026-05-28
- **Autor:** CoreTech
- **ID:** ADR 0004

Contexto
-------
Autenticação e autorização são áreas críticas de segurança e frequentemente exigem atenção operacional contínua (gestão de senhas, hashing, recuperação, MFA, monitoramento). O prazo do MVP e a composição da equipe sugerem priorizar segurança e velocidade de entrega.


Alternativas consideradas:

- Solução gerenciada (Serviço de Identidade - IdaaS): Firebase Auth, Auth0 — prós: integração rápida, segurança delegada; contras: custo e lock-in parcial.
- Solução customizada: JWT com armazenamento próprio de credenciais — prós: controle total; contras: maior esforço e risco de implementação insegura.

Decisão
--------
Adotamos **Identity-as-a-Service (IdaaS)** como estratégia de autenticação para o MVP, integrando via tokens JWT/Session emitidos pelo provedor e validando-os no backend.

Justificativa resumida: reduz trabalho operacional e risco de implementar mecanismos inseguros; permite focar nas regras de negócio do MVP durante o semestre.

Consequências
------------

- Positivas:
	- Integração rápida com SDKs e fluxos prontos (login, reset de senha, verificação de e-mail).
	- Menor surface de segurança para o time (hashing, MFA, verificação de tokens são gerenciados).

- Negativas / Trade-offs:
	- Dependência e possível vendor lock-in; migração futura exigirá planejamento.
	- Custos operacionais no ambiente de produção dependendo do provedor.

Mitigações
---------

- Encapsular integrações com o provedor em `adapters/auth/` para facilitar troca futura.
- Manter tabela `profiles` em Postgres para atributos de domínio ligados ao `user_id` do provedor.
- Documentar processo de exportação/importação de usuários e requisitos para migração.

Critérios de aceitação
----------------------

- Autenticação funcional no ambiente de desenvolvimento com um provedor gerenciado (ex.: Railway, Neon) e exemplos documentados em `docs/`.
- Endpoints críticos protegidos e validados por middleware de verificação de token.

Notas de implementação
--------------------

- Armazenar segredos em variáveis de ambiente: `PROVIDER_URL`, `PROVIDER_ANON_KEY`, `PROVIDER_SERVICE_ROLE_KEY`.
- Para operações sensíveis, utilizar verificação server-side com a chave de serviço do provedor.
- Considerar Row-Level Security (RLS) no Postgres quando aplicável e documentar as políticas.

Justificativa vinculada ao semestre
----------------------------------

Escolhemos IdAaS para reduzir tempo de implementação e risco de falhas de segurança, priorizando entrega do MVP dentro do semestre.

