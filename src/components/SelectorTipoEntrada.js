import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Selector de dos opciones excluyentes para "tipoEntrada".
 * Resuelto con dos botones tipo "toggle" en vez de Picker,
 * para que se vea igual en Android, iOS y web.
 */
export default function SelectorTipoEntrada({ value, onChange, error }) {
  const opciones = [
    { key: 'general', label: 'General' },
    { key: 'vip', label: 'VIP' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de entrada</Text>
      <View style={styles.row}>
        {opciones.map((op) => {
          const seleccionado = value === op.key;
          return (
            <TouchableOpacity
              key={op.key}
              style={[
                styles.boton,
                seleccionado && styles.botonSeleccionado,
                op.key === 'general' && { marginRight: 12 },
              ]}
              onPress={() => onChange(op.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.textoBoton, seleccionado && styles.textoSeleccionado]}>
                {op.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#222' },
  row: { flexDirection: 'row' },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botonSeleccionado: { backgroundColor: '#4a3f9e', borderColor: '#4a3f9e' },
  textoBoton: { fontSize: 15, color: '#333', fontWeight: '500' },
  textoSeleccionado: { color: '#fff' },
  errorText: { color: '#e53935', fontSize: 12, marginTop: 4 },
});
