<template>
  <div>
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="mx-2" color="primary">
          <v-img v-if="item.imagen" :src="item.imagen" alt="DD" />
          <span v-else class="text-h6">{{ getIniciales }}</span>
        </v-avatar>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item lines="three">
            <template v-slot:prepend>
              <v-avatar color="primary" size="x-large">
                <v-img v-if="item.imagen" :src="item.imagen" alt="DD" />
                <span v-else class="text-h5">{{ getIniciales }}</span>
              </v-avatar>
            </template>
            <v-list-item-title>{{ item.nombre }} {{ item.apellidoPaterno }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.rol }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.correo }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list>
          <v-list-item
            class="py-3 border-b"
            color="primary"
            title="Mi cuenta"
            value="cuenta"
            @click="onOpenDialogSistema('onEdit', item, 'Editar sistema')"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-account-cog" size="30" />
            </template>
          </v-list-item>

          <v-list-item class="py-3 border-b" color="primary" title="Cerrar" value="cerrar">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout" size="30" />
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <dialog-cuenta
      :dialog-event="dialogCuentaPropiedades.evento"
      :dialog-items="dialogCuentaPropiedades.items"
      :dialog-title="dialogCuentaPropiedades.titulo"
      :dialog-view="dialogCuentaPropiedades.dialog"
      @close="onCloseDialogSistema"
      @cancel="onCloseDialogSistema"
      @save="onSaveDialogSistema"
    ></dialog-cuenta>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, mergeProps, onMounted, computed } from 'vue'
import DialogCuenta from '../core/dialogForm/DialogCuenta.vue'
import axios from 'axios'

export interface Item {
  id: number
  correo: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  imagen: string
  rol: string
}

export default defineComponent({
  name: 'Avatar',
  components: { DialogCuenta },
  setup() {
    const item = ref<Item | any>({})

    // Método para obtener datos desde la API
    const getItems = async () => {
      try {
        //const response = await axios.get('https://api.ejemplo.com/items') // URL de la API
        //items.value = response.data // Asignar los datos recibidos a items
        item.value = {
          id: 1,
          correo: 'dulce@gmail.com',
          nombre: 'Dulce',
          apellidoPaterno: 'Díaz',
          apellidoMaterno: 'Sánchez',
          imagen: 'https://cdn.vuetifyjs.com/images/john.jpg',
          rol: 'Desarrollador',
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    onMounted(() => {
      getItems()
    })

    const dialogCuentaPropiedades = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    const onOpenDialogForm = (evento: string, items: object, titulo: string) => {
      dialogCuentaPropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogForm = () => {
      dialogCuentaPropiedades.value.dialog = false
    }

    // Computed properties
    const getIniciales = computed(() => {
      if (item.value && 'nombre' in item.value && 'apellidoPaterno' in item.value) {
        const nombre = item.value.nombre
        const apellidoPaterno = item.value.apellidoPaterno

        const inicialNombre = nombre.charAt(0).toUpperCase()
        const inicialApellido = apellidoPaterno.charAt(0).toUpperCase()

        return `${inicialNombre}${inicialApellido}`
      }
      return ''
    })

    return {
      item,
      getIniciales,
      mergeProps,
      onOpenDialogForm,
      onCloseDialogForm,
      dialogCuentaPropiedades,
    }
  },
})
</script>
