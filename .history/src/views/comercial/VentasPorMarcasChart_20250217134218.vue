<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-breadcrumbs class="text-h5" :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="border-opacity-25" />
      </v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed } from 'vue'

import { useDisplay } from 'vuetify'

export interface Elementos {
  codigo: string
  descripcion: string
  nombre: string
}

export default defineComponent({
  name: 'VentasPorMarcasChart',
  components: {},

  setup() {
    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Panel de resultados',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Ventas por marcas',
      },
    ])

    // Tabla
    const vdtbPrincipalBusqueda = ref('')
    const vdtbPrincipalEncabezados = ref<
      { key: string; align?: 'start' | 'center' | 'end'; title: string; sortable?: boolean }[]
    >([
      { key: 'nombre', align: 'start', title: 'Nombre', sortable: true },
      { key: 'codigo', align: 'center', title: 'Código', sortable: true },
      { key: 'descripcion', align: 'start', title: 'Descripción', sortable: true },
      { key: 'fecha', align: 'center', title: 'Fecha' },
      { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
    ])
    const vdtbPrincipalItems = ref([
      {
        nombre: 'Comercial',
        codigo: '01CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Nóminas',
        codigo: '02CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
      {
        nombre: 'Contabilidad',
        codigo: '03CONTPAQ',
        descripcion: '0.1',
        fecha: '16-01-2025',
      },
    ])
    const vdtbPrincipalItemsPorPagina = ref(5)
    const vdtbPrincipalItemsSeleccionados = ref([])
    const vdtbPrincipalOpcionesCheck = ref([{ title: 'Eliminar' }, { title: 'Click Me2' }])
    const vdtbPrincipalOpcionesItemsPorPagina = ref([
      { titulo: '5', valor: 5 },
      { titulo: '10', valor: 10 },
      { titulo: '15', valor: 15 },
      { titulo: '20', valor: 20 },
      { titulo: 'Ver todos', valor: 0 },
    ])
    const vdtbPrincipalPaginaActual = ref(1)

    const getVdtPrincipalTotalPaginas = computed(() =>
      Math.ceil(vdtbPrincipalItems.value.length / vdtbPrincipalItemsPorPagina.value),
    )

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    const dialogSistemaPropiedades = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    // DialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
    }

    const onOpenDialogInformation = (
      color: string,
      cuerpo: string,
      icono: string,
      titulo: string,
      velocidad: number,
    ) => {
      dialogInformation.value = {
        color: color,
        cuerpo: cuerpo,
        dialog: true,
        icono: icono,
        titulo: titulo,
        velocidad: velocidad,
      }
    }

    // DialogConfirmation
    const dialogConfirmation = ref({
      cuerpo: '',
      dialog: false,
      evento: '',
      icono: '',
      items: {},
      titulo: '',
    })

    const onOpenDialogConfirmation = (
      cuerpo: string,
      evento: string,
      items: object,
      titulo: string,
    ) => {
      dialogConfirmation.value = {
        cuerpo: cuerpo,
        dialog: true,
        evento: evento,
        icono: 'alert',
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogConfirmation = () => {
      dialogConfirmation.value.dialog = false
    }

    const onClickYesDialogConfirmation = (evento: Eventos, items: object) => {
      methods[evento](items)
    }

    // DialogSistema
    type Eventos = 'onSave' | 'onEdit' | 'onDelete'

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        alert('Save new')
        dialogSistemaPropiedades.value.dialog = false
      },
      onEdit: () => {
        dialogSistemaPropiedades.value.dialog = false
        onOpenDialogInformation(
          '#438701',
          `Se guardo correctamente`,
          'correct',
          'Registro guardado',
          1,
        )
      },
      onDelete: (items: Elementos) => {
        dialogConfirmation.value.dialog = false
        onOpenDialogInformation(
          '#438701',
          `Esta acción eliminará ${items.codigo} de forma definitiva. ¿Desea continuar?`,
          'correct',
          'Registro eliminado',
          1,
        )
      },
    }

    const onOpenDialogSistema = (evento: string, items: object, titulo: string) => {
      dialogSistemaPropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseDialogSistema = () => {
      dialogSistemaPropiedades.value.dialog = false
    }

    const onSaveDialogSistema = (evento: Eventos) => {
      methods[evento]()
    }

    return {
      dialogConfirmation,
      dialogInformation,
      dialogSistemaPropiedades,
      getVdtPrincipalTotalPaginas,
      mergeProps,
      onClickYesDialogConfirmation,
      onCloseDialogConfirmation,
      onCloseDialogInformation,
      onCloseDialogSistema,
      onOpenDialogConfirmation,
      onOpenDialogInformation,
      onOpenDialogSistema,
      onSaveDialogSistema,
      smAndDown,
      toRaw,
      vbrePrincipalItems,
      vdtbPrincipalBusqueda,
      vdtbPrincipalEncabezados,
      vdtbPrincipalItems,
      vdtbPrincipalItemsPorPagina,
      vdtbPrincipalItemsSeleccionados,
      vdtbPrincipalOpcionesCheck,
      vdtbPrincipalOpcionesItemsPorPagina,
      vdtbPrincipalPaginaActual,
    }
  },
})
</script>
