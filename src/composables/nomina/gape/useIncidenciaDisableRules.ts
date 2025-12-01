import { computed } from 'vue'

export const useIncidenciaDisableRules = (dataModel: any) => {
  //
  // 1️⃣ Helpers atómicos
  //
  const isFiscal = computed(() => !!dataModel.value.fiscal)
  const hasCliente = computed(() => !!dataModel.value.id_nomina_gape_cliente)
  const hasEmpresa = computed(() => !!dataModel.value.id_nomina_gape_empresa)
  const hasTipoPeriodo = computed(() => !!dataModel.value.id_tipo_periodo)
  const hasEjercicio = computed(() => !!dataModel.value.id_ejercicio)

  //
  // 2️⃣ Helpers compuestos (flow fiscal)
  //
  const canSelectTipoPeriodo = computed(() => isFiscal.value && hasEmpresa.value)
  const canSelectEjercicio = computed(() => canSelectTipoPeriodo.value && hasTipoPeriodo.value)

  //
  // 3️⃣ Helpers compuestos (flow NO fiscal)
  //
  const canSelectEmpleadosNoFiscales = computed(() => !isFiscal.value && hasEmpresa.value)

  //
  // 4️⃣ Computed final btnDisabled
  //
  const btnDisabled = computed(() => ({
    importarRegistros: !canSelectEjercicio.value,
    descargarFormato: !canSelectEjercicio.value,
    eliminarRegistros: true,
    guardarCambios: true,
    activarRegistro: true,
    crearRegistro: true,

    compCliente: false,
    compTipoEmp: !hasCliente.value,
    compEmpresa: !hasCliente.value,

    compTipoPeriodo: !canSelectTipoPeriodo.value,
    compEjercicio: true,
    compPeriodoInicial: true,
  }))

  //
  // 🔚 Exportar helpers si quieres usarlos individualmente
  //
  return {
    btnDisabled,

    // Helpers (opcional)
    isFiscal,
    hasCliente,
    hasEmpresa,
    hasTipoPeriodo,
    hasEjercicio,

    canSelectTipoPeriodo,
    canSelectEmpleadosNoFiscales,
  }
}
