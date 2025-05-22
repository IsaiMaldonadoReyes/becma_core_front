export const validationRules = {
  required: (v: string) => !!v || 'Este dato es requerido para continuar.',
  passwordMatch: (password: string) => (v: string) =>
    v === password || 'Las contraseñas no coinciden.',
  // Nueva regla para validar contraseñas
  validatePasswordUpdate: (password: string | undefined, passwordConfirm: string | undefined) => {
    if (password && !passwordConfirm) {
      return 'Confirma tu contraseña.'
    }
    if (!password && passwordConfirm) {
      return 'Ingresa tu contraseña.'
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      return 'Las contraseñas no coinciden.'
    }
    return true // Si ambos están vacíos o coinciden, no hay error
  },
  //si los valores son vacíos no los toma en cuenta, si alguno esta lleno si valida
  requiredEmpty: (v: string, condition: boolean) =>
    !condition || !!v || 'Este dato es requerido para continuar.',
}
