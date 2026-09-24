import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CampoFormulario from '../components/CampoFormulario';
import SelectorTipoEntrada from '../components/SelectorTipoEntrada';
import TicketConfirmacion from '../components/TicketConfirmacion';

const ASYNC_STORAGE_KEY = '@sonido_sur_ultimo_email';

export default function InscripcionScreen() {
  // Estado real de la pantalla (lifting state up): si ya se envió el
  // formulario, y con qué datos, para decidir qué mostrar.
  const [inscripcionEnviada, setInscripcionEnviada] = useState(false);
  const [datosInscripcion, setDatosInscripcion] = useState(null);
  const [enviando, setEnviando] = useState(false); // bonus: loading simulado

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // recalcula validaciones en cada cambio -> habilita/deshabilita el botón en vivo
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: null,
      telefono: '',
    },
  });

  // Bonus: precargar el email de la última persona inscripta.
  useEffect(() => {
    (async () => {
      try {
        const emailGuardado = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (emailGuardado) setValue('email', emailGuardado);
      } catch (e) {
        console.warn('No se pudo leer AsyncStorage', e);
      }
    })();
  }, [setValue]);

  const onSubmit = async (data) => {
    // Bonus: simulamos 1 segundo de "envío al servidor" antes de confirmar.
    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, data.email);
    } catch (e) {
      console.warn('No se pudo guardar en AsyncStorage', e);
    }

    setDatosInscripcion(data);
    setInscripcionEnviada(true);
    setEnviando(false);
  };

  const volverAInscribir = () => {
    reset(); // limpia el formulario y vuelve a mostrar los campos vacíos
    setDatosInscripcion(null);
    setInscripcionEnviada(false);
  };

  // Renderizado condicional: formulario mientras no se envió, ticket después.
  if (inscripcionEnviada) {
    return <TicketConfirmacion datos={datosInscripcion} onVolver={volverAInscribir} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Sonido Sur 🎶</Text>
        <Text style={styles.subtitulo}>Inscripción al festival</Text>

        <Controller
          control={control}
          name="nombreCompleto"
          rules={{
            required: 'Ingresá tu nombre completo',
            validate: (v) => v.trim().length >= 3 || 'Ingresá tu nombre completo',
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CampoFormulario
              label="Nombre completo"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.nombreCompleto?.message}
              placeholder="Ej: Juana Pérez"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Ingresá un email válido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingresá un email válido',
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CampoFormulario
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              placeholder="ejemplo@mail.com"
            />
          )}
        />

        <Controller
          control={control}
          name="edad"
          rules={{
            required: 'La edad tiene que ser mayor a 12',
            validate: (v) => {
              const n = Number(v);
              if (!v || Number.isNaN(n)) return 'La edad tiene que ser mayor a 12';
              if (n < 12) return 'La edad tiene que ser mayor a 12';
              if (n > 99) return 'La edad no puede ser mayor a 99';
              return true;
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CampoFormulario
              label="Edad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.edad?.message}
              keyboardType="numeric"
              placeholder="Ej: 25"
            />
          )}
        />

        <Controller
          control={control}
          name="tipoEntrada"
          rules={{ required: 'Elegí un tipo de entrada' }}
          render={({ field: { value, onChange } }) => (
            <SelectorTipoEntrada
              value={value}
              onChange={onChange}
              error={errors.tipoEntrada?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="telefono"
          rules={{
            validate: (v) => {
              if (!v) return true; // es opcional
              if (!/^[0-9]+$/.test(v)) return 'Solo se permiten números';
              if (v.length < 6 || v.length > 15) return 'Ingresá un teléfono válido';
              return true;
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <CampoFormulario
              label="Teléfono (opcional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.telefono?.message}
              keyboardType="phone-pad"
              placeholder="Ej: 1122334455"
              maxLength={15}
            />
          )}
        />

        <TouchableOpacity
          style={[styles.boton, (!isValid || enviando) && styles.botonDeshabilitado]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBoton}>Confirmar inscripción</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#4a3f9e', textAlign: 'center' },
  subtitulo: { fontSize: 15, color: '#555', textAlign: 'center', marginBottom: 24 },
  boton: {
    backgroundColor: '#4a3f9e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: { backgroundColor: '#b3aee0' },
  textoBoton: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
