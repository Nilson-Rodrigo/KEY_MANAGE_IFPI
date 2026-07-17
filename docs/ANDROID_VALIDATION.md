# Roteiro de validação Android real

1. Gerar development build/APK pelo EAS ou `npx expo run:android`.
2. Instalar em dois aparelhos com o mesmo projeto Firebase.
3. Entrar como guarda, fechar e reabrir o app e confirmar persistência da sessão.
4. Carregar o quadro online, ativar modo avião e registrar retirada/devolução.
5. Confirmar a operação na aba Pendências e reiniciar o aparelho sem perder o registro.
6. Alterar a mesma chave no segundo aparelho, restaurar a rede no primeiro e validar conflito visível.
7. Usar Tentar novamente e Descartar, conferindo que nenhuma pendência some sem confirmação.
8. Bloquear o guarda pelo painel e confirmar que as Security Rules negam novos acessos.

Registre modelo dos aparelhos, versão Android, horário e resultado de cada etapa. Este roteiro exige dispositivos físicos e não é substituído pelo build web ou pelo Emulator Suite.
