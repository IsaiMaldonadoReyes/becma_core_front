<template>
  <div>
    <!-- Drawer padre -->
    <v-navigation-drawer
      v-model="propsComponente.drawerPadre"
      :mobile="smAndDown"
      rail
      rail-width="130"
      elevation="0"
    >
      <v-list color="primary" nav>
        <v-list-item
          v-for="parent in getParentItems"
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
      v-model="propsComponente.drawerHijo"
      :mobile="smAndDown"
      :rail="propsComponente.railHijo"
      elevation="0"
    >
      <v-list>
        <v-list-item
          v-for="child in getChildrenItems"
          :key="child.id"
          :border="propsComponente.borderHijo"
          :prepend-icon="child.icono"
          :title="child.etiqueta"
          :value="child.id"
          color="primary"
          :to="child.ruta"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, watch } from 'vue'
import { useDisplay } from 'vuetify'
import axios from 'axios'

export interface Item {
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

export default defineComponent({
  name: 'NavigationDrawer',
  props: {
    borderChildren: Boolean,
    drawerChildren: {
      type: Boolean,
      default: false,
    },
    drawerParent: {
      type: Boolean,
      default: false,
    },
    railChildren: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // Estado reactivo
    const propsComponente = ref({
      borderHijo: ref(props.borderChildren),
      drawerHijo: ref(props.drawerChildren),
      drawerPadre: ref(props.drawerParent),
      railHijo: ref(props.railChildren),
    })

    const items = ref<Item[]>([])

    // Método para obtener datos desde la API
    const getItems = async () => {
      try {
        //const response = await axios.get('https://api.ejemplo.com/items') // URL de la API
        //items.value = response.data // Asignar los datos recibidos a items
        /*items.value = [
          {
            id: 1,
            idSistema: 1,
            idPadre: 0,
            isActive: true,
            nombre: "becore",
            descripcion: "Core principal del sistema",
            etiqueta: "BECORE",
            ruta: "",
            icono: "mdi-robot",
            orden: 1,
          },
          {
            id: 2,
            idSistema: 2,
            idPadre: 0,
            isActive: true,
            nombre: "becloud",
            descripcion: "Sistema de respaldos",
            etiqueta: "BECLOUD",
            ruta: "",
            icono: "mdi-cloud",
            orden: 2,
          },
          {
            id: 3,
            idSistema: 3,
            idPadre: 0,
            isActive: true,
            nombre: "becnom",
            descripcion: "Sistema complementario CONTPAQi® Nóminas",
            etiqueta: "Nóminas",
            ruta: "",
            icono: "mdi-account-group",
            orden: 3,
          },
          {
            id: 4,
            idSistema: 4,
            idPadre: 0,
            isActive: true,
            nombre: "becom",
            descripcion: "Sistema comercial",
            etiqueta: "BECOM",
            ruta: "",
            icono: "mdi-chart-bar",
            orden: 4,
          },
          {
            id: 5,
            idSistema: 2,
            idPadre: 2,
            isActive: true,
            nombre: "respaldos",
            descripcion: "Consulta de respaldos BECMA",
            etiqueta: "Respaldos",
            ruta: "",
            icono: "mdi-cloud",
            orden: 1,
          },
          {
            id: 6,
            idSistema: 4,
            idPadre: 4,
            isActive: true,
            nombre: "panel_de_resultados",
            descripcion: "Panel de resultados",
            etiqueta: "Panel de resultados",
            ruta: "",
            icono: "mdi-chart-bar",
            orden: 1,
          },
          {
            id: 7,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: "sistemas",
            descripcion: "Sistemas de Becma",
            etiqueta: "Sistema",
            ruta: "",
            icono: "mdi-laptop",
            orden: 2,
          },
          {
            id: 8,
            idSistema: 3,
            idPadre: 3,
            isActive: true,
            nombre: "contratos",
            descripcion: "Contratos de empleados",
            etiqueta: "Contratos",
            ruta: "",
            icono: "mdi-file-sign",
            orden: 2,
          },
          {
            id: 9,
            idSistema: 3,
            idPadre: 3,
            isActive: true,
            nombre: "insidencias",
            descripcion: "Incidencias de empleados",
            etiqueta: "Incidencias",
            ruta: "",
            icono: "mdi-calendar-cursor",
            orden: 2,
          },
          {
            id: 10,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: "roles",
            descripcion: "Roles del sistema",
            etiqueta: "Roles",
            ruta: "",
            icono: "mdi-folder-account",
            orden: 2,
          },
          {
            id: 11,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: "empresas",
            descripcion: "Empresas del sistema",
            etiqueta: "Empresas",
            ruta: "",
            icono: "mdi-home-city",
            orden: 2,
          },
          {
            id: 12,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: "usuarios",
            descripcion: "Usuarios del sistema",
            etiqueta: "Usuarios",
            ruta: "",
            icono: "mdi-account",
            orden: 2,
          },
          
        ];*/

        items.value = [
          {
            id: 1,
            idSistema: 1,
            idPadre: 0,
            isActive: true,
            nombre: 'becnom',
            descripcion: 'Sistema complementario CONTPAQi® Nóminas',
            etiqueta: 'Nóminas',
            ruta: '',
            icono: 'mdi-account-group',
            orden: 3,
          },
          {
            id: 8,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'cliente',
            descripcion: 'Clientes',
            etiqueta: 'Cliente',
            ruta: '/nominas/gape/clienteList',
            icono: 'mdi-account-box',
            orden: 2,
          },
          {
            id: 2,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'empresa',
            descripcion: 'Empresas',
            etiqueta: 'Empresa',
            ruta: '/nominas/gape/empresaList',
            icono: 'mdi-briefcase-account',
            orden: 2,
          },
          {
            id: 3,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'empleado',
            descripcion: 'Empleados',
            etiqueta: 'Empleado',
            ruta: '/nominas/empleadoForm',
            icono: 'mdi-calendar-cursor',
            orden: 2,
          },
          {
            id: 9,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'concepto',
            descripcion: 'Catálogo de conceptos',
            etiqueta: 'Concepto',
            ruta: '/nominas/gape/empresaList',
            icono: 'mdi-book-open-variant',
            orden: 2,
          },
          {
            id: 4,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'parametrizacion',
            descripcion: 'Parametrización de conceptos',
            etiqueta: 'Parametrización',
            ruta: '/nominas/gape/parametrizacionList',
            icono: 'mdi-list-box',
            orden: 2,
          },
          {
            id: 5,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'incidencias',
            descripcion: 'Importador de incidencias',
            etiqueta: 'Incidencias',
            ruta: '/nominas/gape/incidenciasForm',
            icono: 'mdi-calendar-cursor',
            orden: 2,
          },
          {
            id: 6,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'prenomina',
            descripcion: 'Prenomina',
            etiqueta: 'Prenomina',
            ruta: '/nominas/gape/parametrizacionForm',
            icono: 'mdi-calendar-cursor',
            orden: 2,
          },
          {
            id: 7,
            idSistema: 1,
            idPadre: 1,
            isActive: true,
            nombre: 'LayoutDispersion',
            descripcion: 'Layout de bancos para dispersión',
            etiqueta: 'Layout de Bancos',
            ruta: '/nominas/gape/layoutDispersion',
            icono: 'mdi-bank',
            orden: 2,
          },
          {
            id: 8,
            idSistema: 2,
            idPadre: 0,
            isActive: true,
            nombre: 'beccom',
            descripcion: 'Sistema complementario CONTPAQi® Comercial',
            etiqueta: 'Comercial',
            ruta: '',
            icono: 'mdi-account-group',
            orden: 3,
          },
          {
            id: 9,
            idSistema: 2,
            idPadre: 8,
            isActive: true,
            nombre: 'LayoutDispersion',
            descripcion: 'Layout de bancos para dispersión',
            etiqueta: 'Ventas por marca',
            ruta: '/comercial/ventaspormarcaschart',
            icono: 'mdi-invoice-check',
            orden: 1,
          },
          {
            id: 10,
            idSistema: 2,
            idPadre: 8,
            isActive: true,
            nombre: 'LayoutDispersion',
            descripcion: 'Layout de bancos para dispersión',
            etiqueta: 'Ventas por concepto',
            ruta: '/comercial/ventaspormarcaschart',
            icono: 'mdi-invoice-check',
            orden: 1,
          },
        ]
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    onMounted(() => {
      getItems()
      // Selecciona por defecto el primer padre si existe
      if (getParentItems.value.length > 0) {
        selectedParentId.value = getParentItems.value[0].id
      }
    })

    // Computed properties
    const getParentItems = computed(() => items.value.filter((item) => item.idPadre === 0))

    const selectedParentId = ref<number | null>(null)

    const getChildrenItems = computed(() => {
      if (selectedParentId.value === null) return []
      return items.value.filter((item) => item.idPadre === selectedParentId.value)
    })

    // Métodos
    const selectParentItem = (id: number) => {
      if (!propsComponente.value.drawerHijo) {
        propsComponente.value.drawerPadre = true
      }
      selectedParentId.value = id
    }

    // Watchers
    watch(
      [
        () => props.borderChildren,
        () => props.drawerChildren,
        () => props.drawerParent,
        () => props.railChildren,
      ],
      (newDrawer) => {
        propsComponente.value = {
          borderHijo: props.borderChildren,
          drawerHijo: props.drawerChildren,
          drawerPadre: props.drawerParent,
          railHijo: props.railChildren,
        }
      },
    )

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      propsComponente,
      getChildrenItems,
      getParentItems,
      mergeProps,
      selectParentItem,
      smAndDown,
    }
  },
})
</script>
