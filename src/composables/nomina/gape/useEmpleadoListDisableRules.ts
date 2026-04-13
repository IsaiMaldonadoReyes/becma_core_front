import { computed } from 'vue'

export const useEmpleadoListDisableRules = (dataModel: any) => {
  //
  // 1️⃣ Helpers atómicos
  //
  const hasCliente = computed(() => !!dataModel.value.id_nomina_gape_cliente)
  const hasEmpresa = computed(() => !!dataModel.value.id_nomina_gape_empresa)

  //
  // 2️⃣ Helpers compuestos (flow fiscal)
  //
  const canSelectEsquema = computed(() => hasEmpresa.value)

  //

  //
  // 4️⃣ Computed final btnDisabled
  //
  const btnDisabled = computed(() => ({
    importarRegistros: false,
    descargarFormato: false,
    eliminarRegistros: true,
    guardarCambios: true,
    activarRegistro: true,
    crearRegistro: false,

    compCliente: false,
    compTipoEmp: true,
    compEmpresa: !hasCliente.value,
    compEsquema: !canSelectEsquema.value,

    dmCodigoEmpleado: true,
  }))

  //
  // 🔚 Exportar helpers si quieres usarlos individualmente
  //
  return {
    btnDisabled,

    // Helpers (opcional)
    hasCliente,
    hasEmpresa,
  }
}
