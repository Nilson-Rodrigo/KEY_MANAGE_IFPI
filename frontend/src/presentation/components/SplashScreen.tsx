import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { colors } from '../theme';

export default function SplashScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.mark}><Text style={styles.markText}>IF</Text></View><Text style={styles.title}>Controle de Chaves</Text><Text style={styles.subtitle}>IFPI • Campus Piripiri</Text><ActivityIndicator color="#FFFFFF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brandDark,
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
  mark: { width: 70, height: 70, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }, markText: { color: '#fff', fontSize: 26, fontWeight: '900' }, loader: { marginTop: 26 },
});
