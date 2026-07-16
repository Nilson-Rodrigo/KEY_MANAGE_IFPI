import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoreTech</Text>
      <Text style={styles.subtitle}>Sistema de Gerenciamento de Acesso a Chaves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e5e7eb',
    marginTop: 8,
  },
});