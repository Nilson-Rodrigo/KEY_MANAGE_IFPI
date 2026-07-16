# Data Model

## Key

- `codigo`: public code; encoded only when used as a document identifier
- `status`: `disponivel` or `em_uso`
- `responsavelAtual`: person or null
- `ultimaMovimentacaoEm`: ISO timestamp or null

## Movement

- Stable `id`, `chaveCodigo`, `tipo`, `responsavel`, `timestampLocal`, `deviceId`, `syncStatus`

## Pending Queue

- Ordered local movements remain stored until their individual server result is accepted.

## State Transitions

- `disponivel -> em_uso`: withdrawal
- `em_uso -> disponivel`: return
