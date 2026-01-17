<template>
  <v-container fluid ref="vconPrincipalRef" class="h-100">
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
              :loading="loading"
              @click="onDecision"
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

    <!-- vrowFiltrosRef -->
    <v-row ref="vrowFiltrosRef">
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
      <v-col cols="12" md="12">
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
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col>
        <v-form ref="formRefFiscal">
          <!-- si selecciona una combinación que es de tipo contpaq-->

          <template v-for="sec in filtrosPorEsquema" :key="sec.id_esquema">
            <v-row class="mx-2">
              <v-col cols="12">
                <v-divider class="border-opacity-25 ma-0 pa-0" />
                <v-card-title color="primary" class="text-primary text-body-1">
                  {{ itemsEsquemas.find((e) => e.id == sec.id_esquema)?.combinacion }}
                </v-card-title>
                <v-divider class="border-opacity-25 ma-0 pa-0" />
              </v-col>
            </v-row>
            <v-row class="mt-1">
              <!-- CONTAPQ -->
              <template v-if="sec.esContpaq">
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="sec.id_ejercicio"
                    :clearable="true"
                    :item-title="'ejercicio'"
                    :item-value="'ejercicio'"
                    :items="sec.ejerciciosDisponibles"
                    :label="'Ejercicio *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-calendar'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                    @update:model-value="cargarPeriodosPorEjercicio(sec.id_esquema)"
                  >
                    <template #tooltip> <prenomina-tooltips name="ayudaEjercicio" /> </template>
                  </bec-autocomplete>
                </v-col>

                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="sec.id_periodo"
                    :clearable="true"
                    :item-subtitle="(item) => `${item.fechainicio} - ${item.fechafin}`"
                    :item-title="'numeroperiodo'"
                    :item-value="'idperiodo'"
                    :items="sec.periodosDisponibles"
                    :label="'Periodo *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-calendar-arrow-left'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                    @update:model-value="cargarEmpleadosFiscal(sec.id_esquema)"
                  >
                    <template #tooltip>
                      <prenomina-tooltips name="ayudaPeriodoInicial" />
                    </template>
                  </bec-autocomplete>
                </v-col>
              </template>

              <!-- EMPLEADOS (AMBOS CASOS) -->
              <v-col cols="12" lg="6">
                <bec-autocomplete
                  v-model="sec.empleado_inicial"
                  :clearable="true"
                  :item-subtitle="(item) => `${item.rfc}`"
                  :item-title="'nombrelargo'"
                  :item-value="'idempleado'"
                  :items="sec.empleadosDisponibles"
                  :label="'Empleado inicial *'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-account-arrow-left'"
                  :return-object="false"
                  :rules="[validationRules.required]"
                >
                  <template #tooltip>
                    <prenomina-tooltips name="ayudaEmpleadoInicial" />
                  </template>
                </bec-autocomplete>
              </v-col>

              <v-col cols="12" lg="6">
                <bec-autocomplete
                  v-model="sec.empleado_final"
                  :clearable="true"
                  :item-subtitle="(item) => `${item.rfc}`"
                  :item-title="'nombrelargo'"
                  :item-value="'idempleado'"
                  :items="sec.empleadosDisponibles"
                  :label="'Empleado final *'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-account-arrow-right'"
                  :return-object="false"
                  :rules="[validationRules.required]"
                >
                  <template #tooltip> <prenomina-tooltips name="ayudaEmpleadoInicial" /> </template>
                </bec-autocomplete>
              </v-col>
              <v-col cols="12" lg="6">
                <bec-autocomplete
                  v-model="sec.id_nomina_gape_incidencia"
                  :clearable="true"
                  :item-subtitle="(item) => `${item.descripcion_incidencia}`"
                  :item-title="'titulo_incidencia'"
                  :item-value="'id'"
                  :items="sec.incidenciasDisponibles"
                  :label="'Carga de incidencias para el reporte *'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-account-arrow-left'"
                  :return-object="false"
                >
                  <template #tooltip>
                    <prenomina-tooltips name="ayudaEmpleadoInicial" />
                  </template>
                </bec-autocomplete>
              </v-col>
            </v-row>
          </template>
        </v-form>
      </v-col>
    </v-row>
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

// import composables
import {
  useEmpleadoModel,
  usePrenominaModel,
  usePrenominaDisableRules,
} from '@/composables/nomina/gape'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'
import prenominaTooltips from '@/components/nomina/ayudas/PrenominaTooltips.vue'

// import stores
import {
  useClienteStore,
  useEmpresaStore,
  useEmpleadoStore,
  usePrenominaStore,
  useEsquemaStore,
  useIncidenciaStore,
} from '@/stores/modules/Nomina/gape'

import { useTipoPeriodoStore, usePeriodoStore } from '@/stores/modules/Nomina/default'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import router
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PrenominaForm',
  components: { BecSelect, BecAutocomplete, BecTextField, prenominaTooltips },
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
    const prenominaStore = usePrenominaStore()

    const tipoPeriodoStore = useTipoPeriodoStore()
    const periodoStore = usePeriodoStore()
    const esquemaStore = useEsquemaStore()

    const incidenciaStore = useIncidenciaStore()

    const dialogConfirmation = useDialogManagerStore()

    const { dataModel, setPrenomina, resetModel } = usePrenominaModel()
    const { btnDisabled } = usePrenominaDisableRules(dataModel)

    const { resetModel: resetEmpleado } = useEmpleadoModel()

    // 3. Composables vuetify
    const { name, mobile, smAndDown } = useDisplay()

    const route = useRoute()
    const router = useRouter()

    // 4. Reactive

    const formRefFiscal = ref()
    const loading = ref(false)

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        title: 'Prenomina',
      },
      {
        disabled: false,
        title: 'Formulario',
      },
    ])

    const vrowBarraDeAccionesRef = ref()
    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

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
          55
      }
      return { height: `${alto.value}px !important` }
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresasList)
    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    const itemsEsquemas = computed(() => esquemaStore.combinacion)

    type FiltrosSeccion = {
      id_esquema: string
      esContpaq: boolean

      id_ejercicio?: number | null
      id_periodo?: number | null
      id_nomina_gape_incidencia?: number | null

      empleado_inicial?: number | null
      empleado_final?: number | null

      ejerciciosDisponibles: any[]
      periodosDisponibles: any[]
      empleadosDisponibles: any[]
      incidenciasDisponibles: any[]
    }

    const filtrosPorEsquema = ref<Record<number, FiltrosSeccion>>({})

    const buildData = (extras: any = {}) => {
      return {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        idEmpresa: dataModel.value.id_nomina_gape_empresa,
        idTipoPeriodo: dataModel.value.id_tipo_periodo,
        ...extras, // añade valores adicionales dinámicamente
      }
    }

    // 6. Watchers

    watch(
      () => dataModel.value.id_esquema ?? [], // 👈 aseguramos array
      async (ids) => {
        if (!Array.isArray(ids)) return

        const nuevos: Record<number, FiltrosSeccion> = {}

        for (const id of ids) {
          const esquema = itemsEsquemas.value.find((e) => Number(e.id) === Number(id))

          if (!esquema) continue

          const esContpaq = Boolean(Number(esquema.contpaq))

          // Reusar si ya existe
          nuevos[id] = filtrosPorEsquema.value[id] ?? {
            id_esquema: id,
            esContpaq,

            id_ejercicio: null,
            id_periodo: null,
            empleado_inicial: null,
            empleado_final: null,
            id_nomina_gape_incidencia: null,

            ejerciciosDisponibles: [],
            periodosDisponibles: [],
            empleadosDisponibles: [],
            incidenciasDisponibles: [],
          }
        }

        // ✅ Primero asignamos el estado
        filtrosPorEsquema.value = nuevos

        // 🟢 FASE 2: async según tipo
        for (const id of ids) {
          const seccion = filtrosPorEsquema.value[id]
          if (!seccion) continue

          // cuando el esquema no es CONTPAQ (IMSS - asimilados)
          if (!seccion.esContpaq) {
            await cargarEmpleados(id)
          } else {
            await buscarEjerciciosPorTipoPeriodo(id)
          }

          await cargarIncidencias(id)
        }
      },
      { deep: true },
    )

    // Peticiones dinámicas según selección

    const cargarPeriodosPorEjercicio = async (idEsquema: any) => {
      const seccion = filtrosPorEsquema.value[idEsquema]
      if (!seccion || !seccion.id_ejercicio) return

      await periodoStore.periodoPorEjercicio(buildData({ idEjercicio: seccion.id_ejercicio }))

      seccion.periodosDisponibles = [...periodoStore.periodo]
      seccion.id_periodo = null
    }

    const cargarEmpleadosFiscal = async (idEsquema: any) => {
      const seccion = filtrosPorEsquema.value[idEsquema]
      if (!seccion || !seccion.id_periodo) return

      await empleadoStore.listEmpleadosFiscales(
        buildData({ idPeriodo: seccion.id_periodo, idEsquema }),
      )

      seccion.empleadosDisponibles = [...empleadoStore.empleado]
    }

    const cargarEmpleados = async (idEsquema: number) => {
      const seccion = filtrosPorEsquema.value[idEsquema]

      if (!seccion) return
      await empleadoStore.listEmpleadosNoFiscales(buildData({ idEsquema }))

      seccion.empleadosDisponibles = [...empleadoStore.empleado]
    }

    const cargarIncidencias = async (idEsquema: number) => {
      const seccion = filtrosPorEsquema.value[idEsquema]
      if (!seccion) return

      await incidenciaStore.listIncidenciasPrenomina(buildData({ idEsquema }))

      seccion.incidenciasDisponibles = [...incidenciaStore.incidencia]
    }

    const buscarEjerciciosPorTipoPeriodo = async (idEsquema: number) => {
      const seccion = filtrosPorEsquema.value[idEsquema]
      if (!seccion) return

      await tipoPeriodoStore.ejerciciosPorTipoPeriodo(buildData())

      seccion.ejerciciosDisponibles = [...tipoPeriodoStore.ejercicios]
    }

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount

    onMounted(async () => {
      nextTick(() => {})
      resetModel()
      await fetchClientes()
    })

    onBeforeUnmount(() => {})

    // 8. Functions (fetch, metodos, async)

    // Peticiones Filtros
    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
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

    const buscarTipoPeriodoPorEmpresa = async () => {
      resetEmpleado()
      tipoPeriodoStore.reset()
      await buscarTipoPeriodo()
    }

    const buscarTipoPeriodo = async () => {
      await tipoPeriodoStore.tipoPeriodoConfiguradosNGE(buildData())
    }

    const buscarEsquemasPorTipoPeriodo = async () => {
      await buscarEsquemas()
    }

    const buscarEsquemas = async () => {
      await esquemaStore.combinacionPorTipoPeriodo(buildData())
    }

    const onDecision = async () => {
      let mensaje = ''
      let titulo = ''

      titulo = 'Generación de prenomina'
      mensaje = `¿Está seguro de que desea generar con los datos seleccionados?`

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        validateForm, // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const buildPrenominaPayload = () => {
      return {
        // filtros generales
        id_nomina_gape_cliente: dataModel.value.id_nomina_gape_cliente,
        id_nomina_gape_empresa: dataModel.value.id_nomina_gape_empresa,
        id_tipo_periodo: dataModel.value.id_tipo_periodo,

        // ids seleccionados
        id_esquema: dataModel.value.id_esquema,

        // combinaciones dinámicas
        combinaciones: Object.values(filtrosPorEsquema.value).map((sec) => ({
          id_esquema: sec.id_esquema,
          esContpaq: sec.esContpaq,

          id_ejercicio: sec.esContpaq ? sec.id_ejercicio : null,
          periodo_inicial: sec.esContpaq ? sec.id_periodo : null,

          empleado_inicial: sec.empleado_inicial,
          empleado_final: sec.empleado_final,

          id_nomina_gape_incidencia: sec.id_nomina_gape_incidencia,
        })),
      }
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

          const payload = buildPrenominaPayload()

          await prenominaStore.prenomina(payload)

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

    return {
      btnDisabled,
      buscarEjerciciosPorTipoPeriodo,
      buscarEmpresasNomina,
      buscarEsquemasPorTipoPeriodo,
      buscarTipoPeriodoPorEmpresa,
      cargarEmpleados,
      cargarEmpleadosFiscal,
      cargarPeriodosPorEjercicio,
      dataModel,
      filtrosPorEsquema,
      formRefFiscal,
      getCardHeight,
      inputFilters,
      itemsClientesNomina,
      itemsEmpresaDatabase,
      itemsEsquemas,
      itemsTipoPeriodoNomina,
      loading,
      mergeProps,
      name,
      onDecision,
      smAndDown,
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vtabTipoEmpresa,
    }
  },
})
</script>
