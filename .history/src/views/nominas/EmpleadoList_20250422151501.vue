<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed, onMounted } from 'vue'

import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'SistemaListado',
  components: { DialogInformation, DialogSistema, DialogConfirmation },

  setup() {
    const sistema = sistemaStore()

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Sistema',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Listado',
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
    const vdtbPrincipalItems = ref<InterfaceItem[]>([])

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
        dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()
      },
      onEdit: () => {
        dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()
      },
      onDelete: async (items: Elementos) => {
        dialogConfirmation.value.dialog = false

        try {
          await sistema.destroySistema(items.id)
          onOpenDialogInformation(
            '#438701',
            sistema.object.message,
            'correct',
            'Registro eliminado',
            1,
          )
        } catch (error) {
          onOpenDialogInformation(
            '#438701',
            sistema.responseMessage,
            'incorrect',
            'Ocurrió un error en el registro guardado',
            1,
          )
        }
        fnCargarListado()
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

    async function fnCargarListado() {
      vdtbPrincipalItems.value = []

      await sistema.indexSistema()

      vdtbPrincipalItems.value = sistema.object.data.map((item: InterfaceItem) => ({
        id: item.id,
        nombre: item.nombre,
        codigo: item.codigo,
        descripcion: item.descripcion,
        fecha: item.fecha_creacion,
        estado: item.estado,
      }))
    }

    onMounted(() => {
      fnCargarListado()
    })

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
