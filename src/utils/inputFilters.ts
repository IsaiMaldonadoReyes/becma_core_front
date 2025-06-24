export const inputFilters = {
  onlyNumbers: (e: KeyboardEvent) => {
    if (!/^\d$/.test(e.key)) e.preventDefault()
  },
  onlyLetters: (e: KeyboardEvent) => {
    const char = e.key

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) {
      e.preventDefault()
      return
    }

    // Convertir a mayúscula si es una letra válida
    if (char.length === 1 && char.match(/[a-záéíóúñ]/i)) {
      e.preventDefault()
      const upper = char.toUpperCase()

      const target = e.target as HTMLInputElement
      const start = target.selectionStart ?? 0
      const end = target.selectionEnd ?? 0
      const value = target.value

      target.value = value.slice(0, start) + upper + value.slice(end)
      target.setSelectionRange(start + 1, start + 1)

      const event = new Event('input', { bubbles: true })
      target.dispatchEvent(event)
    }
  },
  onlyAlphanumeric: (e: KeyboardEvent) => {
    const char = e.key

    if (!/^[a-zA-Z0-9]$/.test(char)) {
      e.preventDefault()
      return
    }

    // Convertir letras a mayúscula
    if (char.match(/[a-zA-Z]/)) {
      e.preventDefault()
      const upper = char.toUpperCase()

      const target = e.target as HTMLInputElement
      const start = target.selectionStart ?? 0
      const end = target.selectionEnd ?? 0
      const value = target.value

      target.value = value.slice(0, start) + upper + value.slice(end)
      target.setSelectionRange(start + 1, start + 1)

      const event = new Event('input', { bubbles: true })
      target.dispatchEvent(event)
    }
  },
  onlyCURP: (e: KeyboardEvent) => {
    if (!/[A-Z0-9]/.test(e.key.toUpperCase())) e.preventDefault()
  },
  onlyRFC: (e: KeyboardEvent) => {
    if (!/[A-Z0-9&]/.test(e.key.toUpperCase())) e.preventDefault()
  },
  onlyPhone: (e: KeyboardEvent) => {
    if (!/^\d$/.test(e.key)) e.preventDefault()
  },
  onlyDecimal(e: KeyboardEvent, value: string | number | undefined) {
    const val = String(value ?? '')
    const key = e.key

    if (/^\d$/.test(key)) return
    if (key === '.' && !val.includes('.')) return

    e.preventDefault()
  },
}
