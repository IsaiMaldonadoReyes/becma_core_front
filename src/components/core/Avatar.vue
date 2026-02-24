<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="mx-2" color="primary">
          <span>{{ iniciales }}</span>
        </v-avatar>
      </template>

      <v-card min-width="300">
        <v-list v-if="user">
          <v-list-item lines="three">
            <template v-slot:prepend>
              <v-avatar color="primary" size="x-large">
                <span class="text-h5">{{ iniciales }}</span>
              </v-avatar>
            </template>
            <v-list-item-title>{{ user.nombre }} {{ user.apellidoPaterno }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.rol }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ user.correo }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list>
          <v-list-item
            class="py-3 border-b"
            color="primary"
            title="Mi cuenta"
            value="cuenta"
            @click="onOpenDialogForm('onEdit', user, 'Mi cuenta')"
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
            @click="cerrarSesion"
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
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/modules/Core/sesion'

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
    const router = useRouter()
    const session = sessionStore()

    const menu = ref(false)

    const dialogCuentaPropiedades = ref({
      dialog: false,
      evento: '',
      items: {} as Partial<Item>,
      titulo: '',
    })

    const onOpenDialogForm = (evento: string, items: any, titulo: string) => {
      menu.value = false
      dialogCuentaPropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const user = computed(() => session.userInformation)

    const iniciales = computed(() => {
      if (!user.value) return ''

      const nombre = user.value.nombre?.trim()
      const apellido = user.value.apellidoPaterno?.trim()

      if (!nombre || !apellido) return ''

      return `${nombre[0].toUpperCase()}${apellido[0].toUpperCase()}`
    })

    const onCloseDialogForm = () => {
      dialogCuentaPropiedades.value.dialog = false
    }

    const cerrarSesion = async () => {
      try {
        await session.logout()

        router.replace({ name: 'Login' })
      } catch (err) {
        //alert('Ocurrió un error al cerrar sesión')
      }
    }

    return {
      menu,
      user,
      iniciales,
      dialogCuentaPropiedades,
      onOpenDialogForm,
      onCloseDialogForm,
      cerrarSesion,
    }
  },
})
</script>
