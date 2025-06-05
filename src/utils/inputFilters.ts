export const inputFilters = {
  onlyNumbers: (e: KeyboardEvent) => {
    if (!/^\d$/.test(e.key)) e.preventDefault()
  },
  onlyLetters: (e: KeyboardEvent) => {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(e.key)) e.preventDefault()
  },
  onlyAlphanumeric: (e: KeyboardEvent) => {
    if (!/^[a-zA-Z0-9]$/.test(e.key)) e.preventDefault()
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
