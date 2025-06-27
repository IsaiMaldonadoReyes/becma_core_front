<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="mx-2" color="primary">
          <v-img v-if="item.imagen" :src="item.imagen" :alt="getIniciales" />
          <span v-else class="text-h6">{{ getIniciales }}</span>
        </v-avatar>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item lines="three">
            <template v-slot:prepend>
              <v-avatar color="primary" size="x-large">
                <v-img v-if="item.imagen" :src="item.imagen" :alt="getIniciales" />
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
            @click="onOpenDialogForm('onEdit', item, 'Mi cuenta')"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-account-cog" size="30" />
            </template>
          </v-list-item>

          <v-list-item
            class="py-3 border-b"
            color="primary"
            title="Cerrar"
            value="cerrar"
            @click="cerrarSesion()"
          >
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
      @close="onCloseDialogForm"
      @cancel="onCloseDialogForm"
    ></dialog-cuenta>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, mergeProps, onMounted, computed } from 'vue'
import DialogCuenta from '../core/dialogForm/DialogCuenta.vue'
import { useRouter } from "vue-router";
import { sessionStore } from '../../stores/modules/Core/sesion'

export interface Item {
  id: number
  correo: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  imagen: string
  rol: string
  password: string
  passwordConfirm: string
  iniciales: string
}

export default defineComponent({
  name: 'Avatar',
  components: { DialogCuenta },
  setup() {
    const router = useRouter();
    const session = sessionStore()

    const item = ref<Item | any>({})
    const menu = ref(false)

    // Método para obtener datos desde la API
    const getItems = async () => {
      try {
        await session.authUserInformation()

        item.value = {
          id: session.userInformation.id,
          correo: session.userInformation.correo,
          nombre: session.userInformation.nombre,
          apellidoPaterno: session.userInformation.apellidoPaterno,
          apellidoMaterno: session.userInformation.apellidoMaterno,
          imagen:
            import.meta.env.VITE_APP_API_URL +
            '/storage/profile_images/' +
            session.userInformation.imagen,
          rol: session.userInformation.rol,
          password: '',
          passwordConfirm: '',
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
      menu.value = false
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

    const cerrarSesion = () => {
      try {
        session.logout()

        router.push({ name: "Login" });
      } catch (err) {
        alert('Ocurrió un error al cerrar sesión')
      }
    }

    return {
      dialogCuentaPropiedades,
      getIniciales,
      item,
      menu,
      mergeProps,
      onCloseDialogForm,
      onOpenDialogForm,
      cerrarSesion,
    }
  },
})
</script>
