import { computed } from 'vue'

export const useIncidenciaDisableRules = (dataModel: any) => {
  //
  // 1️⃣ Helpers atómicos
  //
  const hasCliente = computed(() => !!dataModel.value.id_nomina_gape_cliente)
  const hasEmpresa = computed(() => !!dataModel.value.id_nomina_gape_empresa)

  const hasTipoPeriodo = computed(() => !!dataModel.value.id_tipo_periodo)

  const hasEjercicio = computed(() => !!dataModel.value.id_ejercicio)

  const hasEsquemaSeleccionado = computed(() => {
    const esquemas = dataModel.value.id_esquema
    return Array.isArray(esquemas) && esquemas.length > 0
  })

  //
  // 2️⃣ Helpers compuestos (flow fiscal)
  //
  const canSelectTipoPeriodo = computed(() => hasEmpresa.value)

  const canSelectEsquema = computed(() => canSelectTipoPeriodo.value && hasTipoPeriodo.value)

  const canSelectEjercicio = computed(() => canSelectTipoPeriodo.value && hasTipoPeriodo.value)

  //
  // 3️⃣ Helpers compuestos (flow NO fiscal)
  //
  const canSelectEmpleadosNoFiscales = computed(() => hasEmpresa.value)

  //
  // 4️⃣ Computed final btnDisabled
  //
  const btnDisabled = computed(() => ({
    importarRegistros: !hasEsquemaSeleccionado.value,
    descargarFormato: !hasEsquemaSeleccionado.value,

    eliminarRegistros: true,
    guardarCambios: true,
    activarRegistro: true,
    crearRegistro: true,

    compCliente: false,
    compEmpresa: !hasCliente.value,

    compTipoPeriodo: !canSelectTipoPeriodo.value,
    compEsquema: !canSelectEsquema.value,

    compEjercicio: true,
    compPeriodoInicial: true,
  }))

  //
  // 🔚 Exportar helpers si quieres usarlos individualmente
  //
  return {
    btnDisabled,

    // Helpers (opcional)
    hasCliente,
    hasEmpresa,
    hasTipoPeriodo,
    hasEjercicio,

    canSelectTipoPeriodo,
    canSelectEmpleadosNoFiscales,
  }
}
