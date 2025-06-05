import { ref } from 'vue'
import type { EmpresaUsuarioModel } from '@/interfaces/core/EmpresaUsuario'
import { getDefaultEmpresaUsuario } from '@/utils/core/getDefaultEmpresaUsuario'

export function useEmpresaUsuario() {
  const empresaUsuario = ref<EmpresaUsuarioModel>(getDefaultEmpresaUsuario())
  const empresaUsuarios = ref<EmpresaUsuarioModel[]>([])

  const setEmpresaUsuario = (data: Partial<EmpresaUsuarioModel>) => {
    empresaUsuario.value = { ...empresaUsuario.value, ...data }
  }

  const resetEmpresaUsuario = () => {
    empresaUsuario.value = getDefaultEmpresaUsuario()
  }

  return {
    empresaUsuario,
    empresaUsuarios,
    setEmpresaUsuario,
    resetEmpresaUsuario,
  }
}
