import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!offline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sem conexão — Modo offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dc2626",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
