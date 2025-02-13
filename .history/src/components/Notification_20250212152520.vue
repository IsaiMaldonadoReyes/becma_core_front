<template>
  <v-menu min-width="200px" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="text-none pa-3 ml-3"
        density="compact"
        stacked
        style="min-width: auto"
      >
        <v-badge color="primary" content="3">
          <v-icon icon="mdi-bell" />
        </v-badge>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="500">
      <v-toolbar color="primary">
        <v-toolbar-title>Notificaciones</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          :to="
            item.id_registro && item.id_registro !== 0
              ? item.ruta_directorio + item.id_registro
              : item.ruta_directorio
          "
          :value="item.id"
          active-class="text-primary"
          class="py-3 border-b"
          @click="marcarComoVisto(item.id)"
        >
          <v-list-item-title>{{ item.nombre_usuario_origen }}</v-list-item-title>

          <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
            {{ item.etiqueta_directorio }}
          </v-list-item-subtitle>

          <v-list-item-subtitle class="text-high-emphasis">
            {{ item.descripcion }}
          </v-list-item-subtitle>

          <template v-slot:append="{ isSelected }">
            <v-list-item-action class="flex-column align-end">
              <small class="mb-4 text-high-emphasis opacity-60">{{ item.fechaHora }}</small>
              <v-spacer />
              <v-icon v-if="item.isActive" color="primary" icon="mdi-bell" />
              <v-icon v-else class="opacity-30" icon="mdi-bell-outline" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, watch } from 'vue'
import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'Notificacion',
  props: {
    borderChildren: Boolean,
    drawerChildren: Boolean,
    drawerParent: Boolean,
    railChildren: Boolean,
  },
  setup(props, { emit }) {
    const drawerPropiedades = ref({
      borderHijo: ref(props.borderChildren),
      drawerHijo: ref(props.drawerChildren),
      drawerPadre: ref(props.drawerParent),
      railHijo: ref(props.railChildren),
    })

    watch(
      [
        () => props.borderChildren,
        () => props.drawerChildren,
        () => props.drawerParent,
        () => props.railChildren,
      ],
      (newDrawer) => {
        drawerPropiedades.value = {
          borderHijo: props.borderChildren,
          drawerHijo: props.drawerChildren,
          drawerPadre: props.drawerParent,
          railHijo: props.railChildren,
        }
      },
    )

    type CoreDirectorio = {
      id: number
      idSistema: number
      idPadre: number
      isActive: boolean
      nombre: string
      descripcion: string
      etiqueta: string
      ruta: string
      icono: string
      orden: number
    }

    const drawerItems = ref<CoreDirectorio[]>([])

    drawerItems.value = [
      {
        id: 1,
        idSistema: 1,
        idPadre: 0,
        isActive: true,
        nombre: 'becore',
        descripcion: 'Core principal del sistema',
        etiqueta: 'BECORE',
        ruta: '',
        icono: 'mdi-robot',
        orden: 1,
      },
      {
        id: 2,
        idSistema: 2,
        idPadre: 0,
        isActive: true,
        nombre: 'becloud',
        descripcion: 'Sistema de respaldos',
        etiqueta: 'BECLOUD',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 2,
      },
      {
        id: 3,
        idSistema: 3,
        idPadre: 0,
        isActive: true,
        nombre: 'becnom',
        descripcion: 'Sistema de recursos humanos',
        etiqueta: 'BECNOM',
        ruta: '',
        icono: 'mdi-account-group',
        orden: 3,
      },
      {
        id: 4,
        idSistema: 4,
        idPadre: 0,
        isActive: true,
        nombre: 'becom',
        descripcion: 'Sistema comercial',
        etiqueta: 'BECOM',
        ruta: '',
        icono: 'mdi-chart-bar',
        orden: 4,
      },
      {
        id: 5,
        idSistema: 2,
        idPadre: 2,
        isActive: true,
        nombre: 'respaldos',
        descripcion: 'Consulta de respaldos BECMA',
        etiqueta: 'Respaldos',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 1,
      },
      {
        id: 6,
        idSistema: 4,
        idPadre: 4,
        isActive: true,
        nombre: 'panel_de_resultados',
        descripcion: 'Panel de resultados',
        etiqueta: 'Panel de resultados',
        ruta: '',
        icono: 'mdi-chart-bar',
        orden: 1,
      },
      {
        id: 7,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'sistemas',
        descripcion: 'Sistemas de Becma',
        etiqueta: 'Sistema',
        ruta: '',
        icono: 'mdi-laptop',
        orden: 2,
      },
      {
        id: 8,
        idSistema: 3,
        idPadre: 3,
        isActive: true,
        nombre: 'contratos',
        descripcion: 'Contratos de empleados',
        etiqueta: 'Contratos',
        ruta: '',
        icono: 'mdi-file-sign',
        orden: 2,
      },
      {
        id: 9,
        idSistema: 3,
        idPadre: 3,
        isActive: true,
        nombre: 'insidencias',
        descripcion: 'Insidencias de empleados',
        etiqueta: 'Insidencias',
        ruta: '',
        icono: 'mdi-calendar-cursor',
        orden: 2,
      },
      {
        id: 10,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'roles',
        descripcion: 'Roles del sistema',
        etiqueta: 'Roles',
        ruta: '',
        icono: 'mdi-folder-account',
        orden: 2,
      },
      {
        id: 11,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'empresas',
        descripcion: 'Empresas del sistema',
        etiqueta: 'Empresas',
        ruta: '',
        icono: 'mdi-home-city',
        orden: 2,
      },
      {
        id: 12,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'usuarios',
        descripcion: 'Usuarios del sistema',
        etiqueta: 'Usuarios',
        ruta: '',
        icono: 'mdi-account',
        orden: 2,
      },
    ]
    // Obtener elementos padres (idPadre === 0)
    const parentItems = computed(() => drawerItems.value.filter((item) => item.idPadre === 0))

    // Estado para controlar el elemento padre seleccionado
    const selectedParentId = ref<number | null>(null)

    // Obtener elementos hijos del padre seleccionado
    const childItems = computed(() => {
      if (selectedParentId.value === null) return []
      return drawerItems.value.filter((item) => item.idPadre === selectedParentId.value)
    })

    // Método para seleccionar un elemento padre
    const selectParentItem = (id: number) => {
      if (!drawerPropiedades.value.drawerHijo) {
        drawerPropiedades.value.drawerPadre = true
      }
      selectedParentId.value = id
    }

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      drawerPropiedades,
      smAndDown,
      selectParentItem,
      parentItems,
      childItems,
      mergeProps,
    }
  },
})
</script>
