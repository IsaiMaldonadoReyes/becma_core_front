<template><</template>
<script lang="ts">
import { ref, defineComponent, mergeProps, onMounted } from 'vue'
import axios from 'axios'

export interface Item {
  id: number
  id_directorio: number
  etiqueta_directorio: string
  ruta_directorio: string
  id_usuario_origen: number
  nombre_usuario_origen: string
  id_usuario_destino: number
  nombre_usuario_destino: string
  descripcion: string
  fechaHora: string
  id_registro: number
  isActive: boolean
}

export default defineComponent({
  name: 'Avatar',
  props: {
    borderChildren: Boolean,
    drawerChildren: Boolean,
    drawerParent: Boolean,
    railChildren: Boolean,
  },
  setup() {
    const items = ref<Item[]>([])

    // Método para obtener datos desde la API
    const getItems = async () => {
      try {
        //const response = await axios.get('https://api.ejemplo.com/items') // URL de la API
        //items.value = response.data // Asignar los datos recibidos a items
        items.value = [
          {
            id: 1,
            id_directorio: 2,
            etiqueta_directorio: 'Insidencias',
            ruta_directorio: '/core/sistemaList/',
            id_usuario_origen: 2,
            nombre_usuario_origen: 'Dulce Díaz',
            id_usuario_destino: 1,
            nombre_usuario_destino: 'Jefe',
            descripcion: 'Ha solicitado una nueva insidencia',
            fechaHora: '11/02/2025 12:45',
            id_registro: 1,
            isActive: true,
          },
          {
            id: 2,
            id_directorio: 2,
            etiqueta_directorio: 'Insidencias',
            ruta_directorio: '/core/sistemaList/',
            id_usuario_origen: 2,
            nombre_usuario_origen: 'Isai Maldonado',
            id_usuario_destino: 1,
            nombre_usuario_destino: 'Jefe de departamento',
            descripcion: 'Ha solicitado una nueva insidencia',
            fechaHora: '12/02/2025 12:45',
            id_registro: 2,
            isActive: true,
          },
          {
            id: 3,
            id_directorio: 2,
            etiqueta_directorio: 'Contratos',
            ruta_directorio: '/core/sistemaList/',
            id_usuario_origen: 2,
            nombre_usuario_origen: 'Jonathan Atlitec',
            id_usuario_destino: 1,
            nombre_usuario_destino: 'Jefa de RH',
            descripcion: 'Ha actualizado su contrato',
            fechaHora: '13/02/2025 12:45',
            id_registro: 1,
            isActive: true,
          },
        ]
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    onMounted(() => {
      getItems()
    })

    // Métodos
    const marcarComoVisto = (id: number) => {
      const notificacion = items.value.find((n) => n.id === id)
      if (notificacion) {
        notificacion.isActive = false
      }
    }

    return {
      items,
      marcarComoVisto,
      mergeProps,
    }
  },
})
</script>
