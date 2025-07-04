<template>
  <v-container ref="vconPrincipalRef" style="height: 95% !important">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-bank" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" class="pa-3 pa-lg-3">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="dataModel.id_empresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresasNomina"
                  :label="'Cliente'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :return-object="false"
                  :rules="[validationRules.required]"
                  :tooltip="'Cliente'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="dataModel.id_tipo_periodo"
                  :item-title="'nombretipoperiodo'"
                  :item-value="'idtipoperiodo'"
                  :items="itemsTipoPeriodoNomina"
                  :label="'Tipo de periodo'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-clock'"
                  :return-object="false"
                  :rules="[validationRules.required]"
                  :tooltip="'Este es un campo dependiente selecciones primero el cliente para mostrar los Tipos de periodos'"
                />
              </v-col>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="dataModel.id_periodo"
                  :item-title="'numeroperiodo'"
                  :item-value="'idperiodo'"
                  :items="itemsPeriodoNomina"
                  :label="'Periodo'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-text'"
                  :return-object="false"
                  :rules="[validationRules.required]"
                  :tooltip="'Periodo'"
                  :item-subtitle="(item) => `${item.fechainicio} - ${item.fechafin}`"
                  :item-title-dinamic="
                    (item) =>
                      `${item.ejercicio} | Mes: ${item.mes} | Periodo: ${item.numeroperiodo}`
                  "
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="dataModel.banco"
                  :items="itemsBancosDispersion"
                  :item-title="'Descripcion'"
                  :item-value="'Codigo'"
                  :label="'Banco'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-bank'"
                  :rules="[validationRules.required]"
                  :tooltip="'Banco'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dataModel.claveId"
                  :disabled="claveIdDisabled"
                  :label="'Clave de banco ID'"
                  :multiple="false"
                  :placeholder="'Ingrese la clave del banco'"
                  :prepend-icon="'mdi-credit-card-lock'"
                  :rules="[validationRules.required]"
                  :tooltip="'Banorte'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dataModel.cuentaOrigen"
                  :disabled="cuentaOrigenDisabled"
                  :label="'Cuenta de origen'"
                  :multiple="false"
                  :placeholder="'Ingrese la cuenta ordenante'"
                  :prepend-icon="'mdi-credit-card'"
                  :rules="[validationRules.required]"
                  :tooltip="'Cuenta odenante'"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" class="d-flex align-center justify-end">
                <v-btn
                  class="px-4"
                  color="primary"
                  prepend-icon="mdi-file-download"
                  text="Generar layout"
                  variant="flat"
                  @click="onDecision"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue'

// import stores
import { useEmpresasStore } from '@/stores/modules/Core/empresas'
import { useTipoPeriodoStore } from '@/stores/modules/Nomina/default/TipoPeriodo'
import { usePeriodoStore } from '@/stores/modules/Nomina/default/Periodo'
import { useDispersionStore } from '@/stores/modules/Nomina/gape/Dispersion'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { getDefaultBancosDispersion } from '@/utils/nomina/gape/getDefaultBancosDispersion'

import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import { validationRules } from '@/utils/validationRules'

export default defineComponent({
  name: 'LayoutDispersion',
  components: { BecSelect, BecAutocomplete, BecTextField },

  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables de Vuetify)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 1. Imports stores
    const empresasStore = useEmpresasStore()
    const tipoPeriodoStore = useTipoPeriodoStore()
    const periodoStore = usePeriodoStore()
    const dispersionStore = useDispersionStore()
    const dialogConfirmation = useDialogManagerStore()

    const dataModel = ref({
      id_empresa: null,
      id_tipo_periodo: null,
      id_periodo: null,
      banco: null,
      claveId: null,
      cuentaOrigen: null,
    })

    const claveIdDisabled = ref(false)
    const cuentaOrigenDisabled = ref(false)

    // 3. Composables (funciones reutilizables de Vuetify)

    // 4. Reactive
    const vbrePrincipalRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '',
        title: 'Layout de Bancos',
      },
      {
        disabled: false,
        href: '',
        title: 'Formulario',
      },
    ])

    // 5. Computed properties

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      nextTick(() => {
        fetchEmpresasNomina()
      })
    })

    const onDecision = () => {
      const { banco, id_empresa, id_tipo_periodo, id_periodo } = dataModel.value

      if (!banco || !id_empresa || !id_tipo_periodo || !id_periodo) {
        dialogConfirmation.onOpenDialogInformation(
          'Los parámetros son obligatorios.',
          'Revisar',
          'alert',
          '#438701',
          1,
        )
        return // importante para evitar que siga
      } else {
        try {
          dispersionStore.descargarArchivo(banco, {
            id: id_empresa,
            claveId: dataModel.value.claveId,
            cuentaOrigen: dataModel.value.cuentaOrigen,
            idperiodo: id_periodo,
          })
        } catch (err) {
          alert('Ocurrió un error al generar el archivo')
        }
      }
    }

    // 8. Functions (fetch, metodos, async)

    const itemsEmpresasNomina = computed(() => empresasStore.empresas)

    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    const itemsPeriodoNomina = computed(() => periodoStore.periodo)

    const itemsBancosDispersion = computed(() => getDefaultBancosDispersion())

    const fetchEmpresasNomina = async () => {
      try {
        await empresasStore.empresasNominas()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    watch(
      () => dataModel.value.id_empresa,
      async (idEmpresa) => {
        if (idEmpresa) {
          dataModel.value.id_tipo_periodo = null
          dataModel.value.id_periodo = null
          try {
            await tipoPeriodoStore.catalogoTipoPeriodo(idEmpresa)
          } catch (error) {
            console.error('Error al cargar tipos de periodo nómina:', error)
          }
        }
      },
    )

    watch(
      () => dataModel.value.id_tipo_periodo,
      async (idTipoPeriodo) => {
        if (idTipoPeriodo && dataModel.value.id_empresa) {
          dataModel.value.id_periodo = null

          try {
            await periodoStore.catalogoPeriodo(dataModel.value.id_empresa, idTipoPeriodo)
          } catch (error) {
            console.error('Error al cargar periodos nómina:', error)
          }
        }
      },
    )

    watch(
      () => dataModel.value.banco,
      (banco) => {
        if (typeof banco !== 'string') return


        dataModel.value.claveId = null
        dataModel.value.cuentaOrigen = null

        switch (banco) {
          case 'Fondeadora':
            claveIdDisabled.value = true
            cuentaOrigenDisabled.value = true
            break
          case 'AztecaInterbancario':
          case 'AztecaBancario':
            claveIdDisabled.value = true
            cuentaOrigenDisabled.value = false
            break
          case 'BanorteTerceros':
            claveIdDisabled.value = false
            cuentaOrigenDisabled.value = false
            break
          default:
            claveIdDisabled.value = false
            cuentaOrigenDisabled.value = false
        }
      },
      { immediate: true },
    )

    return {
      mergeProps,
      vbrePrincipalItems,
      vbrePrincipalRef,
      dataModel,
      itemsEmpresasNomina,
      itemsTipoPeriodoNomina,
      itemsPeriodoNomina,
      itemsBancosDispersion,
      onDecision,
      validationRules,
      claveIdDisabled,
      cuentaOrigenDisabled,
    }
  },
})
</script>
