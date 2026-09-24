import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/**
 * Campo de formulario reutilizable.
 * No maneja estado propio: recibe value/onChangeText por props
 * (por eso funciona igual con useState o con Controller de RHF).
 */
export default function CampoFormulario({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  keyboardType = 'default',
  placeholder = '',
  maxLength,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#999"
        maxLength={maxLength}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#222' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#e53935' },
  errorText: { color: '#e53935', fontSize: 12, marginTop: 4 },
});
