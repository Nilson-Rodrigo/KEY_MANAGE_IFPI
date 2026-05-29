
# ADR 0005 — Hospedagem e Infraestrutura

- **Status:** Aceito
- **Data:** 2026-05-28
- **Autor:** CoreTech
- **ID:** ADR 0005

Contexto
-------
Escolher hospedagem e infraestrutura influencia diretamente custo, tempo de entrega e complexidade operacional. Para o MVP, priorizamos velocidade e previsibilidade operacional, considerando opções como BaaS/Serverless e containers em provedores cloud.

Decisão
--------
Adotamos **BaaS / serviços gerenciados** para a fase inicial do MVP, utilizando provedor que ofereça Postgres gerenciado, autenticação e storage (ex.: Railway, Neon). Funções serverless/Edge podem ser usadas para rotinas específicas.

Consequências
------------

- Positivas:
	- Deploys rápidos com menor overhead operacional.
	- Menos trabalho inicial com infraestrutura e monitoramento.

- Negativas / Trade-offs:
	- Dependência do provedor e possível lock-in.
	- Limitações na configuração e possíveis custos em produção.

Mitigações
---------

- Documentar infra e manter exemplos de `docker-compose` e comandos de migração para facilitar migração futura.
- Isolar integrações do provider em adaptadores para reduzir acoplamento.
- Monitorar uso e custos; definir alertas e limites no provedor.

Critérios de aceitação
----------------------

- Processo de deploy documentado e automatizado (CI/CD) para frontend e backend.
- Variáveis de ambiente e segredos centralizados em secrets do CI e exemplos em `.env.example`.

Notas de implementação
--------------------

- Armazenar segredos sensíveis em variáveis de ambiente e não expor chaves de serviço no frontend.
- Para backups e migrações, preferir uso de migrations automatizadas (`prisma migrate deploy`) em CI e políticas de backup do provedor.

 Justificativa vinculada ao semestre
 ----------------------------------

 Escolhemos BaaS/serviços gerenciados para reduzir esforço operacional e permitir foco nas features do MVP durante o prazo do semestre.

