import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Ticket de confirmación. Componente "tonto": recibe todo por props
 * y no maneja estado propio. El estado real vive en InscripcionScreen
 * (lifting state up), tal como pide la consigna.
 */
export default function TicketConfirmacion({ datos, onVolver }) {
  const { nombreCompleto, email, edad, tipoEntrada, telefono } = datos;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎫 Sonido Sur</Text>
      <Text style={styles.subtitulo}>¡Inscripción confirmada!</Text>

      <View style={styles.card}>
        <FilaTicket label="Nombre" valor={nombreCompleto} />
        <FilaTicket label="Email" valor={email} />
        <FilaTicket label="Edad" valor={String(edad)} />
        <FilaTicket label="Entrada" valor={tipoEntrada === 'vip' ? 'VIP' : 'General'} />
        {telefono ? <FilaTicket label="Teléfono" valor={telefono} /> : null}
      </View>

      <TouchableOpacity style={styles.boton} onPress={onVolver}>
        <Text style={styles.textoBoton}>Volver a inscribir a otra persona</Text>
      </TouchableOpacity>
    </View>
  );
}

function FilaTicket({ label, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.filaLabel}>{label}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  titulo: { fontSize: 26, fontWeight: '800', textAlign: 'center', color: '#4a3f9e' },
  subtitulo: { fontSize: 15, textAlign: 'center', color: '#555', marginBottom: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  filaLabel: { color: '#888', fontSize: 14 },
  filaValor: { color: '#222', fontSize: 14, fontWeight: '600' },
  boton: {
    marginTop: 28,
    backgroundColor: '#4a3f9e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  textoBoton: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
