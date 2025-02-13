<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-avatar class="mx-2" v-bind="props">
        <v-img alt="DD" src="https://cdn.vuetifyjs.com/images/john.jpg" />
      </v-avatar>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item lines="three">
          <template v-slot:prepend>
            <v-avatar size="x-large">
              <v-img alt="DD" src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
          </template>
          <v-list-item-title>Dulce Díaz</v-list-item-title>
          <v-list-item-subtitle>Desarrollador</v-list-item-subtitle>
          <v-list-item-subtitle>dulce@gmail.com</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item title="Mi cuenta" color="primary" value="cuenta" class="py-3 border-b">
          <template v-slot:prepend>
            <v-icon size="30" icon="mdi-account-cog"></v-icon>
          </template>
        </v-list-item>

        <v-list-item title="Cerrar" color="primary" value="cerrar" class="py-3 border-b">
          <template v-slot:prepend>
            <v-icon size="30" icon="mdi-logout"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import { ref, defineComponent, mergeProps, onMounted } from 'vue'
import axios from 'axios'

export interface Item {
  id: number
  correo: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  imagen: string
}

export default defineComponent({
  name: 'Avatar',
  setup() {
    const item = ref<Item>()

    // Método para obtener datos desde la API
    const getItems = async () => {
      try {
        //const response = await axios.get('https://api.ejemplo.com/items') // URL de la API
        //items.value = response.data // Asignar los datos recibidos a items
        item.value = {
            id:1,
            correo: 'dulce@gmail.com',
            nombre: 'Dulce',
            apellidoPaterno : 'Díaz',
            apellidoMaterno: 'Sánchez'

          imagen: 'https://cdn.vuetifyjs.com/images/john.jpg',
        }
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
