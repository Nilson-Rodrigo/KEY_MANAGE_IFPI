# ADR 0010 — Substituição do PostgreSQL pelo Firebase (Cloud Firestore) como Banco de Dados do MVP

- **Status:** Aceito — Supersedes ADR-0003; implementação clarificada pela ADR-0015
- **Data:** 2026-07-14
- **Autor:** CoreTech

## Contexto
A ADR-0003 definiu **PostgreSQL** como banco relacional centralizado do servidor, justificado pela compatibilidade com a infraestrutura Node.js + PostgreSQL já operada pelo técnico de TI do campus. Essa mesma ADR já registrava como trade-off negativo o custo de manter **dois bancos de paradigmas diferentes simultaneamente** (SQLite local e PostgreSQL remoto), exigindo mapeamento manual de esquemas duplicados.

O RVS original havia descartado Firebase por dependência de autenticação online. Essa posição foi posteriormente substituída pela ADR-0015, que adotou Firebase Authentication por e-mail/senha, perfis ativos e cache operacional offline.

Adicionalmente, a ADR-0003 registrava como trade-off negativo o custo de manter dois bancos de paradigmas diferentes simultaneamente (SQLite local e PostgreSQL remoto). A sincronização offline construída sob medida entre esses dois bancos foi classificada como risco de nível **ALTO** na Matriz de Riscos do RVS (seção 4) — o risco de maior criticidade do projeto, segundo o mesmo documento, é a inexperiência da equipe com React Native, classificado como **CRÍTICO** (RVS, seção 4.1). Ainda assim, o risco ALTO da sincronização exigia um POC dedicado nas Semanas 1–2 do cronograma. Também é uma incerteza institucional, não uma garantia, a disponibilidade do servidor Node.js + PostgreSQL do campus (RVS, seções 3.1 e 3.4).

Diante das incertezas acima, a equipe consultou o **Prof. Mayllon Veras** — avaliador da disciplina e stakeholder de alta influência institucional conforme a tabela de stakeholders do Documento de Requisitos (seção 3), responsável por verificar a correta aplicação de Engenharia de Requisitos e Scrum no projeto — que sugeriu considerar o Firebase como alternativa. Essa consulta foi o que levou a equipe a **reabrir** a análise da escolha de banco de dados; a decisão em si, registrada a seguir, é resultado da análise técnica conduzida pela própria equipe e apoiada nos critérios de contexto já expostos, não uma decisão delegada ao professor.

## Decisão
Adotamos o **Firebase (Cloud Firestore)** como banco de dados central do MVP, substituindo o PostgreSQL. Conforme clarificado pela ADR-0015, o aplicativo acessa o Firestore diretamente após autenticação por e-mail/senha e mantém cache e fila offline no AsyncStorage. Nome e matrícula continuam sendo identificação operacional, enquanto o Firebase Auth fornece a identidade técnica exigida pelas regras.

## Consequências
- **Positivas:** elimina PostgreSQL e mantém uma única persistência remota; usa acesso direto protegido por Firebase Auth e Security Rules; preserva a identificação operacional; permite operar dentro das cotas gratuitas aplicáveis.
- **Negativas / Trade-offs:** mantém vendor lock-in no Firestore; exige modelagem documental e Security Rules rigorosas; a fila offline e os conflitos LWW continuam sendo responsabilidade da aplicação, conforme ADR-0015.
