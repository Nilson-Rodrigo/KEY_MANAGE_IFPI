import { useEffect } from "react";
import { router } from "expo-router";

/**
 * Componente de redirecionamento da página inicial.
 * Redireciona automaticamente para a tela de identificação.
 * @returns null (componente não renderiza nada)
 */
export default function IndexRedirect(): null {
  useEffect(() => {
    router.replace("/identificacao");
  }, []);

  return null;
}