import { computed } from 'vue'

export const usePrenominaDisableRules = (dataModel: any) => {
  //
  // 1️⃣ Helpers atómicos
  //
  const isFiscal = computed(() => !!dataModel.value.fiscal)
  const hasCliente = computed(() => !!dataModel.value.id_nomina_gape_cliente)
  const hasEmpresa = computed(() => !!dataModel.value.id_nomina_gape_empresa)
  const hasTipoPeriodo = computed(() => !!dataModel.value.id_tipo_periodo)
  const hasEjercicio = computed(() => !!dataModel.value.id_ejercicio)
  const hasPeriodo = computed(() => !!dataModel.value.periodo_inicial)
  const hasDepartamentoInicial = computed(() => !!dataModel.value.departamento_inicial)
  const hasDepartamentoFinal = computed(() => !!dataModel.value.departamento_final)

  //
  // 2️⃣ Helpers compuestos (flow fiscal)
  //
  const canSelectTipoPeriodo = computed(() => isFiscal.value && hasEmpresa.value)

  const canSelectEjercicio = computed(() => canSelectTipoPeriodo.value && hasTipoPeriodo.value)

  const canSelectPeriodos = computed(() => canSelectEjercicio.value && hasEjercicio.value)

  const canSelectDepartamentos = computed(() => canSelectTipoPeriodo.value)

  const canSelectEmpleadosFiscales = computed(() => hasPeriodo.value)

  //
  // 3️⃣ Helpers compuestos (flow NO fiscal)
  //
  const canSelectEmpleadosNoFiscales = computed(() => !isFiscal.value && hasEmpresa.value)

  //
  // 4️⃣ Computed final btnDisabled
  //
  const btnDisabled = computed(() => ({
    importarRegistros: true,
    descargarFormato: true,
    eliminarRegistros: true,
    guardarCambios: false,
    activarRegistro: true,
    crearRegistro: true,

    compCliente: false,
    compTipoEmp: !hasCliente.value,
    compEmpresa: !hasCliente.value,

    compTipoPeriodo: !canSelectTipoPeriodo.value,
    compEjercicio: !canSelectEjercicio.value,
    compPeriodoInicial: !canSelectPeriodos.value,
    compPeriodoFinal: !canSelectPeriodos.value,
    compDepartamentoInicial: !canSelectDepartamentos.value,
    compDepartamentoFinal: !canSelectDepartamentos.value,
    compEmpleadoInicial: !canSelectEmpleadosFiscales.value,
    compEmpleadoFinal: !canSelectEmpleadosFiscales.value,

    compNoEmpleadoInicial: !canSelectEmpleadosNoFiscales.value,
    compNoEmpleadoFinal: !canSelectEmpleadosNoFiscales.value,
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
    hasDepartamentoInicial,
    hasDepartamentoFinal,

    canSelectTipoPeriodo,
    canSelectEjercicio,
    canSelectPeriodos,
    canSelectDepartamentos,
    canSelectEmpleadosFiscales,
    canSelectEmpleadosNoFiscales,
  }
}
