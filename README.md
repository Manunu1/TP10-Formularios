[README.md](https://github.com/user-attachments/files/32611237/README.md)
# Sonido Sur 🎶 — Inscripción al festival

TP de formularios con validaciones y estados complejos. React Native + Expo, pantalla de inscripción a un festival ficticio que valida los datos ingresados y muestra un ticket de confirmación.

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Desde ahí podés abrirlo en Android/iOS (con la app de Expo Go) o en web presionando `w` en la terminal.

### Dependencias extra usadas

Además de las que ya trae el proyecto base, se usan:

```bash
npx expo install react-hook-form @react-native-async-storage/async-storage react-native-safe-area-context
```

## Estructura del proyecto

```
src/
  components/
    CampoFormulario.js       -> input de texto reutilizable, con label y error
    SelectorTipoEntrada.js   -> selector de dos botones (General / VIP)
    TicketConfirmacion.js    -> ticket final, recibe los datos por props
  screens/
    InscripcionScreen.js     -> pantalla principal, tiene el estado real (lifting state up)
App.js                        -> punto de entrada, renderiza InscripcionScreen
```

## Validación elegida: React Hook Form

Se usó **React Hook Form** (`useForm` + `Controller` + `rules`) en vez de un objeto de errores manual.

¿Por qué? Porque centraliza el estado del formulario y los errores en un solo lugar (`formState.errors`), evita tener que escribir un `setErrors({...})` a mano por cada campo, y con `mode: 'onChange'` recalcula automáticamente si el formulario es válido (`isValid`) para habilitar/deshabilitar el botón, sin lógica adicional.

## Reglas de validación implementadas

| Campo | Regla |
|---|---|
| `nombreCompleto` | Obligatorio, mínimo 3 caracteres (con `.trim()` para que no pasen solo espacios) |
| `email` | Obligatorio, formato válido con regex (`usuario@dominio.algo`) |
| `edad` | Obligatorio, número entre 12 y 99 (mensajes separados si es muy baja o muy alta) |
| `tipoEntrada` | Obligatorio, se elige entre "General" o "VIP" con dos botones |
| `telefono` | Opcional. Si se completa: solo números, entre 6 y 15 dígitos (este último chequeo de longitud es una validación extra, no pedida explícitamente en la consigna, agregada para evitar valores absurdos) |

El botón "Confirmar inscripción" queda deshabilitado mientras `isValid` sea `false`.

## Bonus implementados

- ✅ **AsyncStorage**: se guarda el email de la última persona inscripta y se precarga automáticamente la próxima vez que se abre la app.
- ✅ **Loading simulado**: al confirmar, el botón muestra un spinner durante 1 segundo (simulando un envío a un servidor) antes de mostrar el ticket.

## Capturas de pantalla

_(Agregar acá las 3 capturas pedidas: formulario con errores visibles, formulario completo y válido, y ticket de confirmación)_

1. Formulario con errores
2. Formulario válido
3. Ticket de confirmación
