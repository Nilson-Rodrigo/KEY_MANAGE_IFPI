# ADR 0007 — Identificação de Chaves e Ausência de Hardware Adicional

**Status:** Aceito  
**Data:** 2026-05-28  
**Time:** CoreTech  
**Projeto:** Sistema de Gerenciamento de Acesso a Chaves — IFPI Campus Piripiri

**Autor:** CoreTech  
**ID:** ADR 0007-ID

---

## Contexto

O sistema precisa identificar cada chave de forma única e inequívoca para vincular registros de retirada e devolução ao item correto. Isso é essencial para substituir o caderno físico com rastreabilidade equivalente ou superior (RF02, RN04).

Alternativas consideradas para identificação das chaves:

- **QR Code (etiquetas nas chaves, leitura via câmera do celular):** permite identificação automática sem digitação, mas exige impressão e adesivagem de etiquetas em cada chave, manutenção das etiquetas (desgaste, substituição) e implementação da câmera no app. Introduz hardware adicional e complexidade de setup.
- **NFC / RFID (tags eletrônicas):** identificação por aproximação, mais robusta que QR Code. Exige hardware específico (tags NFC, leitores) e infraestrutura de custo incompatível com o contexto acadêmico.
- **Código alfanumérico existente (padrão Bloco/Sala):** as chaves já possuem identificadores próprios gravados ou afixados, no padrão já utilizado pelo campus (ex.: A/S9 para Sala 9 do Bloco A, L/B2 para Laboratório B2). Nenhum hardware adicional é necessário — o guarda seleciona a chave no quadro visual pelo código que já conhece.

A entrevista com o guarda (abril/2026) confirmou que o padrão de codificação existente já é compreendido e utilizado no dia a dia, não representando curva de aprendizado.

## Decisão

Adotamos o **padrão de identificação alfanumérico já utilizado no campus** (ex.: A/S9, L/B2) como identificador único de cada chave no sistema, **sem QR Code, NFC ou qualquer hardware adicional** no MVP.

O quadro virtual de chaves (RF02, RF03) exibirá cada chave pelo seu código existente, com indicador visual de status por cor (verde = disponível, vermelho = em uso). A seleção da chave pelo guarda é feita com toque direto no quadro — sem necessidade de câmera ou leitura automática.

## Consequências

### Positivas
- Custo zero de hardware: nenhuma etiqueta, tag ou leitor adicional precisa ser adquirido ou instalado.
- Compatibilidade imediata com o inventário físico existente, reduzindo barreira de adoção.

### Negativas / Trade-offs
- Requer cadastro inicial manual das chaves (lista de códigos) antes do deploy.
- Padrão de código imutável no MVP: renomear chaves exige migração de dados local nos dispositivos SQLite.

### Mitigações
- Validar e coletar a lista de códigos na entrevista final com o guarda (Seção 11.2 do DR) e automatizar importação via CSV/JSON para reduzir esforço manual.
- Documentar processo de migração de códigos e estabelecer procedimento administrativo para alterações pós‑MVP.

## Critérios de aceitação

- Cadastro inicial de chaves realizado e validado com os guardas (lista de códigos carregada no sistema).
- Exibição do quadro de chaves mostra status corretos (disponível/em uso) e seleção funciona sem necessidade de hardware adicional.

## Justificativa vinculada ao semestre

Optamos por não introduzir hardware adicional para reduzir custos e acelerar o processo de implantação durante o semestre; a solução adere ao princípio KISS e facilita entrega dentro do cronograma.
