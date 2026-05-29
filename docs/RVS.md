## Relatório de Viabilidade de Software (RVS)

### Resumo executivo

- Objetivo: permitir registro confiável de retirada e devolução de chaves, com operação offline e sincronização posterior.
- Escopo do MVP: autenticação simples, painel de chaves, registrar retirada/devolução, armazenamento local e sincronização em lote.

### Viabilidade técnica

- Arquitetura proposta: Monolito Modular (macro) + Clean Architecture (médio) + MVVM (micro).
- Tecnologias previstas: React Native (app), Node.js + Express (API), SQLite (cliente), PostgreSQL (servidor).
- Principais riscos técnicos: sincronização offline (conflitos), integração com APIs nativas do dispositivo.

### Viabilidade econômica

- Recursos mínimos: hospedagem para PostgreSQL, dispositivos para testes, eventual licença de ferramenta (se aplicável).
- Estimativa de custo: preencher conforme orçamento real.

### Viabilidade operacional

- O campus dispõe de um único servidor gerenciado pelo TI, compatível com um monolito implantado centralmente.

### Riscos e mitigação

- Conflitos de sincronização: mitigação provisória com estratégia "último timestamp vence"; planejar revisão pós‑MVP.
- Falta de experiência em tecnologias específicas: mitigação com sessões de treinamento e pares.

### Conclusão

- O projeto é viável para entrega do MVP no prazo acadêmico, desde que o time mantenha disciplina nas fronteiras modulares e priorize testes de sincronização.
