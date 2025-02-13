<template>
  <div>
    <!-- Drawer padre -->
    <v-navigation-drawer
      v-model="drawerPropiedades.drawerPadre"
      :mobile="smAndDown"
      :rail="drawerPropiedades.railPadre"
      rail-width="130"
    >
      <v-list color="primary" nav>
        <v-list-item
          v-for="parent in parentItems"
          :key="parent.id"
          :value="parent.nombre"
          border
          class="d-flex align-center justify-center"
          color="primary"
          lines="three"
          @click="selectParentItem(parent.id)"
        >
          <v-tooltip>
            <template v-slot:activator="{ props: tooltip }">
              <v-btn
                v-bind="mergeProps(tooltip)"
                :prepend-icon="parent.icono"
                stacked
                variant="flat"
              >
                {{ parent.etiqueta }}
              </v-btn>
            </template>
            <span> {{ parent.descripcion }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Drawer hijo -->
    <v-navigation-drawer
      v-model="drawerPropiedades.drawerHijo"
      :mobile="smAndDown"
      :rail="drawerPropiedades.railHijo"
      elevation="10"
    >
      <v-list>
        <!-- Iterar sobre los elementos hijos del padre seleccionado -->
        <v-list-item
          v-for="child in childItems"
          :key="child.id"
          :border="borderChildren"
          :prepend-icon="child.icono"
          :title="child.etiqueta"
          :value="child.id"
          color="primary"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, mergeProps, watch } from 'vue'
import { useDisplay } from 'vuetify'
export default defineComponent({
  name: 'NavigationDrawer',

  props: {
    drawerChildren: Boolean,
    drawerParent: Boolean,
    railChildren: Boolean,
    borderChildren: Boolean,
  },
  setup(props, { emit }) {
    const drawerPropiedades = ref({
      drawerHijo: ref(props.drawerChildren),
      drawerPadre: ref(props.drawerParent),
      railHijo: ref(props.railChildren),
      borderHijo: ref(props.borderChildren),
    })

    const drawerChildren = ref(true)

    watch(
      [
        () => props.drawerParent,
        () => props.drawerChildren,
        () => props.railChildren,
        () => props.borderChildren,
      ],
      (newDrawer) => {
        drawerPropiedades.value = {
          drawerHijo: props.drawerChildren,
          drawerPadre: props.drawerParent,
          railHijo: props.railChildren,
          borderHijo: props.borderChildren,
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
      borderChildren,
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
