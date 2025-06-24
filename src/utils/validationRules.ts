export const validationRules = {
  required: (v: string) => !!v || 'Este dato es requerido para continuar.',

  // Nueva regla para validar cualquier valor no nulo y no vacío
  required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',

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

  // Validación de RFC
  rfc: (value: string): true | string => {
    if (!value) return 'El RFC es requerido'

    const rfcRegex = /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}([A\d])$/

    return rfcRegex.test(value.toUpperCase()) ? true : 'RFC no válido'
  },
  curp: (value: string): true | string => {
    if (!value) return 'El CURP es requerido'

    const curpRegex =
      /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/

    return curpRegex.test(value.toUpperCase())
      ? true
      : 'CURP no válido. Verifica que tenga 18 caracteres y esté bien formado.'
  },

  codeMask:
    (mask: string) =>
    (value: string): true | string => {
      if (!mask) return true // Si no hay mascarilla, no se valida

      const expectedLength = (mask.match(/X/g) || []).length
      if (!value) return `Este campo debe tener ${expectedLength} caracteres.`

      return value.length === expectedLength
        ? true
        : `Debe tener exactamente ${expectedLength} caracteres.`
    },
  validateLettersField: (
    value: string,
    {
      required = false,
      max,
      min,
    }: {
      required?: boolean
      max?: number
      min?: number
    } = {},
  ): true | string => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

    if (required && !value) return 'Este campo es obligatorio'

    if (value) {
      if (!regex.test(value)) return 'Solo se permiten letras'
      if (min && value.length < min) return `Debe tener al menos ${min} caracteres`
      if (max && value.length > max) return `Debe tener máximo ${max} caracteres`
    }

    return true
  },

  validateNumericField: (
    value: string,
    {
      required = false,
      min,
      max,
    }: {
      required?: boolean
      min?: number
      max?: number
    } = {},
  ): true | string => {
    const regex = /^\d+$/

    if (required && !value) return 'Este campo es obligatorio'

    if (value) {
      if (!regex.test(value)) return 'Solo se permiten números'
      if (min && value.length < min) return `Debe tener al menos ${min} dígitos`
      if (max && value.length > max) return `Debe tener máximo ${max} dígitos`
    }

    return true
  },

  validateAlphanumericField: (
    value: string,
    {
      required = false,
      min,
      max,
    }: {
      required?: boolean
      min?: number
      max?: number
    } = {},
  ): true | string => {
    const regex = /^[a-zA-Z0-9]+$/

    if (required && !value) return 'Este campo es obligatorio'

    if (value) {
      if (!regex.test(value)) return 'Solo se permiten caracteres alfanuméricos'
      if (min && value.length < min) return `Debe tener al menos ${min} caracteres`
      if (max && value.length > max) return `Debe tener máximo ${max} caracteres`
    }

    return true
  },

  emailIfNotEmpty: (v: string) => {
    if (!v) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(v) || 'Correo electrónico no válido.'
  },
  validatePositiveNumber: (
    value: string,
    {
      required = false,
      allowZero = false,
    }: {
      required?: boolean
      allowZero?: boolean
    } = {},
  ): true | string => {
    if (!value) {
      return required ? 'Este campo es obligatorio' : true
    }

    const number = parseFloat(value)

    if (isNaN(number)) return 'Debe ser un número válido'
    if (!allowZero && number <= 0) return 'Debe ser mayor a 0'

    return true
  },
}
