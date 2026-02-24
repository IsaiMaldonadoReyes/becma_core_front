<template>
  <v-container fluid ref="vconPrincipalRef" class="h-100">
    <v-form ref="formRefFiscal" v-model="isFormValid" lazy-validation></v-form>
    <!--vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-tooltip interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-icon
              v-bind="mergeProps(tooltipProps)"
              icon="mdi-information-slab-circle-outline"
              size="20"
              class="text-medium-emphasis"
            />
          </template>
          <v-icon icon="mdi-calendar-clock" size="14" />
          <span style="font-size: 10px"> Fecha de creación: 02/04/2025 14:52:02</span>
          <br />
          <v-icon icon="mdi-account-circle" size="14" />
          <span style="font-size: 10px"> Creado por: Administrador</span>
          <br />
          <v-icon icon="mdi-calendar-clock" size="14" />
          <span style="font-size: 10px"> Última edición: 02/04/2025 14:52:02</span>
          <br />
          <v-icon icon="mdi-account-circle" size="14" />
          <span style="font-size: 10px"> Última edición por: Administrador 2</span>
        </v-tooltip>
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-list-box" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-50" vertical />
        <!-- vbtnCargar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.importarRegistros"
              :loading="loadingUpload"
              @click="onDecisionUpload"
            >
              <v-icon color="white" icon="mdi-upload" size="24px" />
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" />
            Importar registros desde el formato Excel
          </span>
        </v-tooltip>

        <!-- vbtnDescargar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.descargarFormato"
              :loading="loading"
              @click="onDecisionDownload"
            >
              <v-icon color="white" icon="mdi-download" size="24px" />
            </v-btn>
          </template>
          <span>
            <v-icon icon="mdi-microsoft-excel" />
            Descargar el formato base de Excel para importación de registros
          </span>
        </v-tooltip>

        <!-- vbtnEliminar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.eliminarRegistros"
            >
              <v-icon color="white" icon="mdi-delete" size="24px" />
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <!-- vbtnGuardar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.guardarCambios"
            >
              <v-icon icon="mdi-replay" color="white" size="24px" />
            </v-btn>
          </template>
          <template #default>Ejecutar cálculo de prenómina</template>
        </v-tooltip>

        <!-- vbtnActivar -->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.activarRegistro"
            >
              <v-icon color="white" size="24px"> mdi-checkbox-blank-outline </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i> DESACTIVAR </i>
            </b>
            este registro
          </span>
        </v-tooltip>

        <!--vbtnCrear-->
        <v-tooltip bottom color="primary" interactive location="bottom">
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.crearRegistro"
              :to="'/nominas/gape/empleadoForm'"
            >
              <v-icon color="white" icon="mdi-plus" size="24px" />
            </v-btn>
          </template>
          <span>Crear nuevo registro</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row ref="vrowFiltrosRef">
      <!-- Principales-->
      <v-col cols="12">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_cliente"
          :clearable="false"
          :disabled="btnDisabled.compCliente"
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="itemsClientesNomina"
          :label="'Cliente *'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :rules="[validationRules.required2]"
          :show-chips="false"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaFiltroCliente" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_empresa"
          :clearable="false"
          :disabled="btnDisabled.compEmpresa"
          :item-subtitle="(item) => `${item.rfc}`"
          :item-title="'razon_social'"
          :item-value="'id'"
          :items="itemsEmpresaDatabase"
          :label="'Empresa *'"
          :multiple="false"
          :prepend-icon="'mdi-briefcase-account'"
          :return-object="false"
          :rules="[validationRules.required2]"
          :show-chips="false"
          @update:model-value="buscarTipoPeriodoPorEmpresa"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaFiltroEmpresa" />
          </template>
        </bec-autocomplete>
      </v-col>

      <v-col cols="12" lg="6">
        <bec-autocomplete
          v-model="dataModel.id_tipo_periodo"
          :clearable="false"
          :disabled="btnDisabled.compTipoPeriodo"
          :item-title="'nombretipoperiodo'"
          :item-value="'idtipoperiodo'"
          :items="itemsTipoPeriodoNomina"
          :label="'Tipo de periodo *'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar-month'"
          :return-object="false"
          :rules="[validationRules.required]"
          @update:model-value="buscarEsquemasPorTipoPeriodo"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaTipoDePeriodo" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" lg="6">
        <bec-autocomplete
          v-model="dataModel.id_esquema"
          :clearable="false"
          :disabled="btnDisabled.compEsquema"
          :item-title="'combinacion'"
          :item-value="'id'"
          :items="itemsEsquemas"
          :label="'Esquema *'"
          :multiple="true"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar-month'"
          :return-object="false"
          :rules="[validationRules.required]"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaTipoDePeriodo" />
          </template>
        </bec-autocomplete>
      </v-col>
      <!-- Ejercicio -->
      <v-col cols="12" lg="6">
        <bec-autocomplete
          v-model="dataModel.id_ejercicio"
          :clearable="false"
          :disabled="btnDisabled.compEjercicio"
          :item-title="'ejercicio'"
          :item-value="'ejercicio'"
          :items="itemsEjercicios"
          :label="'Ejercicio *'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar'"
          :return-object="false"
          :rules="[validationRules.required]"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaEjercicio" />
          </template>
        </bec-autocomplete>
      </v-col>

      <!-- Periodo inicial -->
      <v-col cols="12" lg="12">
        <bec-autocomplete
          v-model="dataModel.periodo_inicial"
          :clearable="false"
          :disabled="btnDisabled.compEjercicio"
          :item-subtitle="(item) => `${item.fechainicio} - ${item.fechafin}`"
          :item-title="'numeroperiodo'"
          :item-value="'idperiodo'"
          :items="itemsPeriodos"
          :label="'Periodo *'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-calendar-arrow-left'"
          :return-object="false"
          :rules="[validationRules.required]"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaPeriodoInicial" />
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
      <v-col cols="12" lg="12">
        <v-file-upload
          v-model="dataModel.archivo"
          density="compact"
          variant="compact"
        ></v-file-upload>
      </v-col>
      <v-row>
        <v-col class="my-0 py-0">
          <v-divider class="border-opacity-25 ma-0 pa-0" />
        </v-col>
      </v-row>
    </v-row>

    <!-- vrowFiltrosRef -->

    <incidencia-modal-log
      :dialog-event="modalLogIncidencia.evento"
      :dialog-items="modalLogIncidencia.items"
      :dialog-title="modalLogIncidencia.titulo"
      :dialog-view="modalLogIncidencia.dialog"
      @close="onCloseModalLogIncidencia"
      @cancel="onCloseModalLogIncidencia"
    />
  </v-container>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  mergeProps,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount,
  watch,
  readonly,
} from 'vue'

import { useDisplay } from 'vuetify'

import { VFileUpload } from 'vuetify/labs/VFileUpload'

// import composables
import {
  useEmpleadoModel,
  useIncidenciaModel,
  useIncidenciaDisableRules,
} from '@/composables/nomina/gape'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'
import prenominaTooltips from '@/components/nomina/ayudas/PrenominaTooltips.vue'
import IncidenciaModalLog from '@/views/nominas/gape/IncidenciaModalLog.vue'

import type { ItemError } from '@/interfaces/nomina/gape/IncidenciaItemError'

// import stores
import {
  useClienteStore,
  useEmpresaStore,
  useEmpleadoStore,
  useIncidenciaStore,
  useEsquemaStore,
} from '@/stores/modules/Nomina/gape'
import { useTipoPeriodoStore, usePeriodoStore } from '@/stores/modules/Nomina/default'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import router
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'IncidenciaForm',
  components: {
    BecSelect,
    BecAutocomplete,
    BecTextField,
    prenominaTooltips,
    VFileUpload,
    IncidenciaModalLog,
  },
  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables de Vuetify)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables

    const clienteStore = useClienteStore()
    const empresasStore = useEmpresaStore()

    const empleadoStore = useEmpleadoStore()
    const incidenciaStore = useIncidenciaStore()

    const tipoPeriodoStore = useTipoPeriodoStore()
    const periodoStore = usePeriodoStore()
    const esquemaStore = useEsquemaStore()

    const dialogConfirmation = useDialogManagerStore()

    const { dataModel, setIncidencia, resetModel } = useIncidenciaModel()
    const { btnDisabled } = useIncidenciaDisableRules(dataModel)

    const { resetModel: resetEmpleado } = useEmpleadoModel()

    // 3. Composables vuetify
    const { name, mobile, smAndDown } = useDisplay()

    const route = useRoute()
    const router = useRouter()

    // 4. Reactive

    const formRefFiscal = ref()
    const loading = ref(false)
    const loadingUpload = ref(false)
    const isFormValid = ref(false)

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        title: 'Incidencias',
      },
      {
        disabled: false,
        title: 'Formulario',
      },
    ])

    const vrowBarraDeAccionesRef = ref()
    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

    const vtabTipoEmpresaRef = ref()
    const vtabTipoEmpresa = ref<any>('tabTipoEmpresa01')

    const cardHeight = ref(0)

    // 5. Computed properties
    const getCardHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value = cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          vtabTipoEmpresaRef.value.$el.clientHeight -
          55
      }
      return { height: `${alto.value}px !important` }
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresasList)
    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    const itemsEjercicios = computed(() => tipoPeriodoStore.ejercicios)
    const itemsPeriodos = computed(() => periodoStore.periodo)

    const itemsEsquemas = computed(() => esquemaStore.combinacion)

    const itemsEmpleados = computed(() => empleadoStore.empleado)

    const buildData = (extras: any = {}) => {
      return {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        idEmpresa: dataModel.value.id_nomina_gape_empresa,
        idTipoPeriodo: dataModel.value.id_tipo_periodo,
        idEjercicio: dataModel.value.id_ejercicio,
        ...extras, // añade valores adicionales dinámicamente
      }
    }

    const modalLogIncidencia = ref<{
      dialog: boolean
      evento: string
      items: ItemError[]
      titulo: string
    }>({
      dialog: false,
      evento: '',
      items: [],
      titulo: '',
    })

    // 6. Watchers

    watch(
      () => dataModel.value.id_esquema,
      async (newValue, oldValue) => {
        if (!newValue || newValue.length === 0) {
          resetEjercicioPeriodo()
          return
        }

        if (hayEsquemaFiscal.value) {
          // 👉 SOLO aquí cargas ejercicios y periodos
          dataModel.value.fiscal = true
          await buscarEjerciciosPorTipoPeriodo()
        } else {
          dataModel.value.fiscal = false
          resetEjercicioPeriodo()
        }
      },
      { deep: true },
    )

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount

    onMounted(async () => {
      nextTick(() => {})
      resetModel()
      await fetchClientes()
    })

    onBeforeUnmount(() => {})

    // 8. Functions (fetch, metodos, async)

    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }
    const resetEjercicioPeriodo = () => {
      dataModel.value.id_ejercicio = undefined
      dataModel.value.periodo_inicial = undefined
    }

    const buscarTipoPeriodo = async () => {
      await tipoPeriodoStore.tipoPeriodoConfiguradosNGE(buildData())
    }

    const buscarEsquemas = async () => {
      await esquemaStore.combinacionPorTipoPeriodo(buildData())
    }

    const buscarTipoPeriodoPorEmpresa = async () => {
      resetEmpleado()
      tipoPeriodoStore.reset()
      await buscarTipoPeriodo()
    }

    const buscarEsquemasPorTipoPeriodo = async () => {
      //tipoPeriodoStore.reset()
      await buscarEsquemas()
    }

    const buscarEjerciciosPorTipoPeriodo = async () => {
      await tipoPeriodoStore.ejerciciosPorTipoPeriodoActivo(buildData())

      if (tipoPeriodoStore.ejercicios.length > 0) {
        dataModel.value.id_ejercicio = tipoPeriodoStore.ejercicios[0].ejercicio
        await buscarPeriodosPorEjercicio()
      } else {
        dataModel.value.id_ejercicio = undefined // O lo que requieras
      }
    }

    const buscarPeriodosPorEjercicio = async () => {
      await periodoStore.periodoPorEjercicio(buildData())

      dataModel.value.periodo_inicial = tipoPeriodoStore.idEjercicio
    }

    const buscarEmpresasNomina = async () => {
      resetModel(true)
      await fetchEmpresasNominaPorClienteTipo(buildData())
    }

    const fetchEmpresasNominaPorClienteTipo = async (data: any) => {
      empresasStore.reset()
      try {
        await empresasStore.empresasNominasPorClienteTipo(data)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const hayEsquemaFiscal = computed<boolean>(() => {
      if (!Array.isArray(dataModel.value.id_esquema)) return false

      return dataModel.value.id_esquema.some((idEsquema: number) => {
        const esquema = itemsEsquemas.value.find((e) => e.id === idEsquema.toString())
        return esquema?.contpaq === true
      })
    })

    const buildFormData = (extras: any = {}) => {
      return {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        idEmpresa: dataModel.value.id_nomina_gape_empresa,
        idTipoPeriodo: dataModel.value.id_tipo_periodo,
        idEsquema: dataModel.value.id_esquema,
        idPeriodo: dataModel.value.periodo_inicial,
      }
    }

    function objectToFormData(obj: any): FormData {
      const formData = new FormData()

      Object.keys(obj).forEach((key) => {
        const value = obj[key]

        // Ignorar null o undefined
        if (value === null || value === undefined) return

        // ✅ ARRAY (ej. idEsquema)
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== null && item !== undefined) {
              formData.append(`${key}[]`, item.toString())
            }
          })
          return
        }

        // Booleanos → string
        if (typeof value === 'boolean') {
          formData.append(key, value ? '1' : '0')
          return
        }

        // Default
        formData.append(key, value)
      })

      return formData
    }

    const onDecisionUpload = async () => {
      let mensaje = ''
      let titulo = ''

      titulo = 'Carga de incidencias'
      mensaje = `¿Está seguro de que desea subir las incidencias mediante el archivo seleccionado?`

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateUpload, // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const validateUpload = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      try {
        loadingUpload.value = true

        let titulo = 'Carga de incidencias'
        let mensaje =
          'Los datos se guardaron de forma exitosa, revisar en el sistema de nóminas para confirmar.'

        const data = buildFormData()
        const formData = objectToFormData(data)

        // 3. Agregas el archivo

        const archivo = dataModel.value.archivo

        if (archivo instanceof File) {
          // v-file-upload devuelve un solo File
          formData.append('file', archivo)
        } else if (Array.isArray(archivo) && archivo.length > 0) {
          // v-file-upload devuelve File[]
          formData.append('file', archivo[0])
        }

        await incidenciaStore.uploadIncidencias(formData)

        dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)
      } catch (error: any) {
        if (error.type === 'validation') {
          modalLogIncidencia.value = {
            dialog: true,
            evento: '',
            items: error.errors,
            titulo: 'hola',
          }
        } else {
          dialogConfirmation.onOpenDialogInformation(
            'Ocurrió un error inesperado al guardar.',
            'Error',
            'incorrect',
            '#B00000',
            2,
          )
        }
      } finally {
        loadingUpload.value = false
      }
    }

    const onDecisionDownload = async () => {
      let mensaje = ''
      let titulo = ''

      titulo = 'Descarga de formato de incidencias'
      mensaje = `¿Está seguro de que desea generar formato con los datos seleccionados?`

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateForm, // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const validateForm = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      let formRef = null

      formRef = formRefFiscal.value

      const form = await formRef.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          await incidenciaStore.formatoIncidencias(dataModel.value)

          await form.value?.reset()
        } catch (error: any) {
          if (error.type === 'validation') {
            const errores = Object.values(error.errors).flat().join('<br>')
            dialogConfirmation.onOpenDialogInformation(
              errores,
              'Verifique los siguientes errores',
              'incorrect',
              '#B00000',
              2,
            )
          } else {
            dialogConfirmation.onOpenDialogInformation(
              'Ocurrió un error inesperado al guardar.',
              'Error',
              'incorrect',
              '#B00000',
              2,
            )
          }
        } finally {
          loading.value = false
        }
      }
    }

    const onCloseModalLogIncidencia = async () => {
      modalLogIncidencia.value.dialog = false
    }
    return {
      isFormValid,
      onCloseModalLogIncidencia,
      modalLogIncidencia,
      btnDisabled,
      buscarTipoPeriodoPorEmpresa,
      buscarEsquemasPorTipoPeriodo,
      buscarEjerciciosPorTipoPeriodo,
      buscarEmpresasNomina,
      buscarPeriodosPorEjercicio,
      dataModel,
      formRefFiscal,
      getCardHeight,
      inputFilters,
      itemsClientesNomina,
      itemsEjercicios,
      itemsEmpleados,
      itemsEmpresaDatabase,
      itemsPeriodos,
      itemsTipoPeriodoNomina,
      itemsEsquemas,
      loading,
      loadingUpload,
      mergeProps,
      name,
      onDecisionDownload,
      smAndDown,
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vtabTipoEmpresa,
      vtabTipoEmpresaRef,
      onDecisionUpload,
    }
  },
})
</script>
