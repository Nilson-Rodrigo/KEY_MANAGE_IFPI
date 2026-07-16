# ADR 0012 — Persistência Offline Nativa do Firestore

- **Status:** Superseded pela ADR-0015
- **Data:** 2026-07-14
- **Autor:** CoreTech

## Registro histórico

Esta ADR propôs o cache nativo do SDK mobile do Firestore. O aplicativo entregue não incorpora o SDK Firebase no cliente e implementa cache e fila de operações pendentes com AsyncStorage.

## Consequência

A estratégia vigente é a fila manual descrita na ADR-0015. A sincronização ocorre por transações diretas no Firestore, preservando a regra RN07.
