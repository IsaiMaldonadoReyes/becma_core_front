import { ref } from 'vue'
import type { EmpresaDatabaseModel } from '@/interfaces/core/EmpresaDatabase'
import { getDefaultEmpresaDatabase } from '@/utils/core/getDefaultEmpresaDatabase'

export function useEmpresaDatabase() {
  const empresaDatabase = ref<EmpresaDatabaseModel>(getDefaultEmpresaDatabase())
  const empresasDatabase = ref<EmpresaDatabaseModel[]>([])

  const setEmpresaDatabase = (data: Partial<EmpresaDatabaseModel>) => {
    empresaDatabase.value = { ...empresaDatabase.value, ...data }
  }

  const resetEmpresaDatabase = () => {
    empresaDatabase.value = getDefaultEmpresaDatabase()
  }

  return {
    empresaDatabase,
    empresasDatabase,
    setEmpresaDatabase,
    resetEmpresaDatabase,
  }
}
