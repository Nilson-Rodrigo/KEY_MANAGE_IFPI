# Data Model

## usuarios/{uid}

- `uid`, `nome`, `matricula`, `perfil` (`admin` ou `guarda`), `ativo`, `criadoEm`, `atualizadoEm`.
- Não contém PIN, hash ou segredo.

## acessos/{matriculaNormalizada}

- `uid`, `authEmail`, `ativo`.
- Leitura individual é permitida para iniciar login; listagem é administrativa.

## chaves/{idCodificado}

- Estado atual e referência da última movimentação.

## movimentacoes/{id}

- Código, tipo, responsável canônico, UID autor, dispositivo e timestamps.

## State Transitions

- Inexistente → ativo: cadastro pelo administrador.
- Ativo ↔ inativo: alteração pelo administrador.
- Disponível → em uso: retirada atômica.
- Em uso → disponível: devolução atômica.
