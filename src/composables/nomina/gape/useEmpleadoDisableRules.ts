import { computed } from 'vue'

export const useEmpleadoDisableRules = (dataModel: any, isEdit: { value: boolean }) => {
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
    importarRegistros: true,
    descargarFormato: true,
    eliminarRegistros: true,
    guardarCambios: false,
    activarRegistro: false,
    crearRegistro: true,

    compCliente: false,
    compTipoEmp: true,
    compEmpresa: isEdit.value || !hasCliente.value,
    compEsquema: isEdit.value || !canSelectEsquema.value,
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
