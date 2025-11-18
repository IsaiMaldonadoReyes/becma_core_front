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
              v-model="dataModel.estado_empleado"
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.activarRegistro"
              @click="dataModel.estado_empleado = !dataModel.estado_empleado"
            >
              <v-icon color="white" size="24px">
                {{
                  !dataModel.estado_empleado ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked'
                }}
                mdi-checkbox-blank-outline
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ !dataModel.estado_empleado ? ' ACTIVAR ' : 'DESACTIVAR' }}
              </i>
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
      <v-col cols="12" md="3">
        <bec-select
          v-model="dataModel.fiscal"
          :clearable="false"
          :disabled="btnDisabled.compTipoEmp"
          :item-title="'title'"
          :item-value="'value'"
          :items="[
            { title: 'Empresa fiscal', value: true },
            { title: 'Empresa no fiscal', value: false },
          ]"
          :label="'Tipo de empresa'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-briefcase-account'"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaFiltroTipoEmpresa" />
          </template>
        </bec-select>
      </v-col>
      <v-col cols="12" md="9">
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
          @update:model-value="buscarCatalogosPorEmpresa"
        >
          <template #tooltip>
            <prenomina-tooltips name="ayudaFiltroEmpresa" />
          </template>
        </bec-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>

    <!-- vtabTipoEmpresaRef -->
    <v-row ref="vtabTipoEmpresaRef">
      <v-col class="my-0 py-0">
        <v-tabs
          v-model="vtabTipoEmpresa"
          class="text-medium-emphasis"
          color="primary"
          grow
          height="40px"
        >
          <v-tab
            :disabled="dataModel.fiscal ? false : true"
            class="text-none text-no-wrap"
            prepend-icon="mdi-bank"
            style="letter-spacing: 0.5px"
            value="tabTipoEmpresa01"
            variant="tonal"
          >
            Fiscal
          </v-tab>
          <v-tab
            :disabled="!dataModel.fiscal ? false : true"
            class="text-none text-no-wrap"
            prepend-icon="mdi-bank-off"
            style="letter-spacing: 0.5px"
            value="tabTipoEmpresa02"
            variant="tonal"
          >
            No fiscal
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col>
        <!-- vtabTipoEmpresa-->
        <v-tabs-window v-model="vtabTipoEmpresa">
          <!-- Empresa fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa01" eager>
            <v-form ref="formRefFiscal">
              <!-- Principales-->
              <v-row class="mt-1">
                <!-- Ejercicio -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
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

                <!-- Tipo de periodo -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Tipo de periodo *'"
                    :multiple="false"
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

                <!-- Periodo inicial -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Periodo inicial *'"
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

                <!-- Periodo final -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Periodo final *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-calendar-arrow-right'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                  >
                    <template #tooltip>
                      <prenomina-tooltips name="ayudaPeriodoFinal" />
                    </template>
                  </bec-autocomplete>
                </v-col>

                <!-- Departamento inicial -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Departamento inicial *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-human-queue'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                  >
                    <template #tooltip>
                      <prenomina-tooltips name="ayudaDepartamentoInicial" />
                    </template>
                  </bec-autocomplete>
                </v-col>

                <!-- Departamento final -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Departamento final *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-human-queue'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                  >
                    <template #tooltip>
                      <prenomina-tooltips name="ayudaDepartamentoFinal" />
                    </template>
                  </bec-autocomplete>
                </v-col>

                <!-- Empleado inicial -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
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

                <!-- Empleado final -->
                <v-col cols="12" lg="6">
                  <bec-autocomplete
                    v-model="dataModel.tipocontrato"
                    :clearable="true"
                    :item-title="'Descripcion'"
                    :item-value="'ClaveTipoContrato'"
                    :items="itemsTipoContratoNomina"
                    :label="'Empleado final *'"
                    :multiple="false"
                    :placeholder="'Seleccione'"
                    :prepend-icon="'mdi-account-arrow-right'"
                    :return-object="false"
                    :rules="[validationRules.required]"
                  >
                    <template #tooltip>
                      <prenomina-tooltips name="ayudaEmpleadoFinal" />
                    </template>
                  </bec-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-tabs-window-item>
          <!-- Empresa no fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa02" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <!-- vtabDatos -->

              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-form ref="formRefNoFiscal">
                  <v-row class="mx-2">
                    <v-col cols="12">
                      <v-divider class="border-opacity-25 ma-0 pa-0" />
                      <v-card-title color="primary" class="text-primary text-body-1">
                        Datos principales
                      </v-card-title>
                      <v-divider class="border-opacity-25 ma-0 pa-0" />
                    </v-col>
                  </v-row>

                  <v-row class="mt-1 mx-2">
                    <!-- Código -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.codigoempleado"
                        :disabled="btnDisabled.dmCodigoEmpleado"
                        :label="'Código *'"
                        :multiple="false"
                        :placeholder="'XXXX'"
                        :prepend-icon="'mdi-barcode'"
                        :rules="[validationRules.required]"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaCodigo" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <!-- Fecha de alta -->
                    <v-col cols="12" lg="4">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          v-model="dataModel.fechaalta"
                          :mobile="smAndDown"
                          :rules="[validationRules.required]"
                          clear-icon="mdi-close"
                          color="primary"
                          density="compact"
                          hide-details="auto"
                          label="Fecha de alta *"
                          prepend-icon=""
                          prepend-inner-icon="mdi-calendar"
                          title="Rango de fechas"
                          type="chip"
                          variant="outlined"
                        >
                          <template v-slot:prepend>
                            <empleado-tooltips name="ayudaFechaDeAlta" />
                          </template>
                        </v-date-input>
                      </v-locale-provider>
                    </v-col>

                    <!-- Apellido paterno -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.apellidopaterno"
                        :label="'Apellido paterno *'"
                        :placeholder="''"
                        :prepend-icon="'mdi-badge-account-outline'"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, {
                              required: true,
                              max: 80,
                            }),
                        ]"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaApellidoPaterno" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <!-- Apellido materno -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.apellidomaterno"
                        :label="'Apellido materno *'"
                        :placeholder="'Apellido materno'"
                        :prepend-icon="'mdi-badge-account-outline'"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, {
                              required: true,
                              max: 80,
                            }),
                        ]"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaApellidoMaterno" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <!-- Nombre(s) -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.nombre"
                        :label="'Nombre(s) *'"
                        :placeholder="''"
                        :prepend-icon="'mdi-badge-account-outline'"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, {
                              required: true,
                              max: 90,
                            }),
                        ]"
                        clearable
                        clear-icon="mdi-close"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaNombres" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <!-- RFC -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.cuentacw"
                        :label="'RFC *'"
                        :placeholder="''"
                        :prepend-icon="'mdi-badge-account-outline'"
                        :rules="[validationRules.required, validationRules.rfc]"
                        clear-icon="mdi-close"
                        clearable
                        @keypress="inputFilters.onlyRFC"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaRFC" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <!-- Código postal -->
                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.codigopostal"
                        :label="'C.P. *'"
                        :placeholder="'Código postal'"
                        :prepend-icon="'mdi-file-account-outline'"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: true,
                              max: 5,
                            }),
                        ]"
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaCodigoPostal" />
                        </template>
                      </bec-text-field>
                    </v-col>

                    <v-col cols="12" lg="4">
                      <bec-text-field
                        v-model="dataModel.ClabeInterbancaria"
                        :label="'Clabe interbancaria'"
                        :placeholder="'Clabe interbancaria'"
                        :prepend-icon="'mdi-hospital-box-outline'"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: true,
                              min: 10,
                              max: 30,
                            }),
                        ]"
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template #tooltip>
                          <empleado-tooltips name="ayudaCLABEInterbancaria" />
                        </template>
                      </bec-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
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
//import { useNomGeneralesStore } from '../../stores/modules/Nomina/nomGenerales'

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useEmpresaStore } from '@/stores/modules/Nomina/gape/Empresa'

import { useEmpresaNomStore } from '@/stores/modules/Nomina/default/Empresa'

import { useTipoPeriodoStore } from '@/stores/modules/Nomina/default/TipoPeriodo'
import { useDepartamentoStore } from '@/stores/modules/Nomina/default/Departamento'
import { useEmpleadoStore } from '@/stores/modules/Nomina/gape/Empleado'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { getDefaultSATCatBaseCotizacion } from '@/utils/nomina/nomGenerales/getDefaultSATCatBaseCotizacion'
import { getDefaultSATCatTipoEmpleado } from '@/utils/nomina/nomGenerales/getDefaultSATCatTipoEmpleado'
import { getDefaultSATCatBasePago } from '@/utils/nomina/nomGenerales/getDefaultSATCatBasePago'
import { getDefaultSATCatFormaPago } from '@/utils/nomina/nomGenerales/getDefaultSATCatFormaPago'
import { getDefaultSATCatZonaSalario } from '@/utils/nomina/nomGenerales/getDefaultSATCatZonaSalario'
import { getDefaultSATCatEstadoCivil } from '@/utils/nomina/nomGenerales/getDefaultSATCatEstadoCivil'
import { getDefaultSATCatSexo } from '@/utils/nomina/nomGenerales/getDefaultSATCatSexo'
import { getDefaultSATCatClaveEntidadFederativa } from '@/utils/nomina/nomGenerales/getDefaultSATCatClaveEntidadFederativa'

// import composables y utils
import { useEmpleadoModel } from '@/composables/nomina/gape/useEmpleado'

import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'
import { generarCurpExtendida } from '@/utils/curp'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import prenominaTooltips from '@/components/nomina/ayudas/PrenominaTooltips.vue'

// import router
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PrenominaForm',
  components: { BecSelect, BecAutocomplete, BecTextField, prenominaTooltips },
  props: {
    id: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
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

    const empresaNomStore = useEmpresaNomStore()

    const empleadoStore = useEmpleadoStore()

    const departamentoStore = useDepartamentoStore()
    const dialogConfirmation = useDialogManagerStore()

    const empresaStore = useEmpresaStore()

    const { dataModel, setEmpleado, resetModel } = useEmpleadoModel()

    // 3. Composables vuetify
    const { name, mobile, smAndDown } = useDisplay()

    const route = useRoute()
    const router = useRouter()

    // 4. Reactive
    const idClienteParam = Number(route.query.id_nomina_gape_cliente || 0)
    const idEmpresaParam = Number(route.query.id_nomina_gape_empresa || 0)
    const fiscalParam = route.query.fiscal === 'true'

    const formRefFiscal = ref()
    const formRefNoFiscal = ref()
    const loading = ref(false)

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '/nominas/gape/empleadoList',
        title: 'Empleado',
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
    const vtabDatosFiscalesItems = ref([
      {
        icon: 'mdi-badge-account-horizontal',
        title: 'Principales',
        value: 'tab01',
      },
      {
        icon: 'mdi-badge-account',
        title: 'Generales',
        value: 'tab02',
      },
      {
        icon: 'mdi-home-account',
        title: 'IMMS, Infonavit',
        value: 'tab03',
      },
      {
        icon: 'mdi-account-cash',
        title: 'Sueldos y salarios',
        value: 'tab04',
      },
      {
        icon: 'mdi-account-credit-card',
        title: 'Pagos y extras',
        value: 'tab05',
      },
      {
        icon: 'mdi-account-file-text',
        title: 'Datos GAPE',
        value: 'tab06',
      },
    ])
    const vtabDatosFiscales = ref<any>('tab01')
    const vtabDatosNoFiscales = ref<any>('tabDatosNoFiscales01')

    const vtabDatosNoFiscalesItems = ref([
      {
        icon: 'mdi-badge-account-horizontal',
        title: 'Principales',
        value: 'tabDatosNoFiscales01',
      },
      {
        icon: 'mdi-account-file-text',
        title: 'Datos GAPE',
        value: 'tabDatosNoFiscales02',
      },
    ])

    const cardHeight = ref(0)

    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: false,
      activarRegistro: true,
      crearRegistro: true,

      compCliente: false,
      compTipoEmp: true,
      compEmpresa: true,

      dmCodigoEmpleado: true,
    })

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

    const itemsBaseCotizacion = computed(() => getDefaultSATCatBaseCotizacion())
    const itemsTipoEmpleado = computed(() => getDefaultSATCatTipoEmpleado())
    const itemsBasePago = computed(() => getDefaultSATCatBasePago())
    const itemsFormaPago = computed(() => getDefaultSATCatFormaPago())
    const itemsZonaSalario = computed(() => getDefaultSATCatZonaSalario())
    const itemsEstadoCivil = computed(() => getDefaultSATCatEstadoCivil())
    const itemsSexo = computed(() => getDefaultSATCatSexo())
    const itemsClaveEntidad = computed(() => getDefaultSATCatClaveEntidadFederativa())

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresasList)

    // 6. Watchers
    watch(
      () => ({
        nombre: dataModel.value.nombre,
        apellidopaterno: dataModel.value.apellidopaterno,
        apellidomaterno: dataModel.value.apellidomaterno,
        fechanacimiento: dataModel.value.fechanacimiento,
        sexo: dataModel.value.sexo,
        entidadnacimiento: dataModel.value.EntidadFederativa,
      }),
      (val) => {
        // Normalizamos la fecha a 'YYYY-MM-DD'
        const fechaStr =
          val.fechanacimiento instanceof Date
            ? val.fechanacimiento.toISOString().split('T')[0]
            : typeof val.fechanacimiento === 'string'
              ? val.fechanacimiento
              : ''

        // Convierte 'YYYY-MM-DD' -> 'YYMMDD' para la CURP
        let fechaCurp = ''
        if (fechaStr && fechaStr.includes('-')) {
          const [y, m, d] = fechaStr.split('-')
          fechaCurp = `${y.slice(2)}${m}${d}` // → '970129'
        }

        const sexoCurp = val.sexo === 'F' ? 'M' : 'H'

        // Genera el nombre largo
        dataModel.value.nombrelargo = `${val.apellidopaterno || ''} ${
          val.apellidomaterno || ''
        } ${val.nombre || ''}`.trim()

        // 🟢 Si estás EDITANDO → construir CURP con curpi + fechaCurp + curpf
        if (props.id) {
          const curpi = (dataModel.value.curpi || '').trim().toUpperCase()
          const curpf = (dataModel.value.curpf || '').trim().toUpperCase()

          if (curpi && fechaCurp && curpf) {
            dataModel.value.curpCompleto = `${curpi}${fechaCurp}${curpf}`
          }
          return
        }

        // 🟣 Si es NUEVO registro → generar automáticamente
        const parcial = generarCurpExtendida({
          nombre: val.nombre || '',
          apellidopaterno: val.apellidopaterno || '',
          apellidomaterno: val.apellidomaterno || '',
          fechanacimiento: fechaStr,
          sexo: sexoCurp,
          entidadnacimiento: val.entidadnacimiento,
        })

        if (parcial) {
          dataModel.value.curpCompleto = parcial.toUpperCase()
        }
      },
      { immediate: true, deep: true },
    )

    watch(
      () => dataModel.value.curpCompleto,
      (val) => {
        const curp = val?.toUpperCase().trim() || ''

        if (curp.length === 18) {
          dataModel.value.curpi = curp.slice(0, 4) // letras
          dataModel.value.curpf = curp.slice(-8) // fecha + sexo + entidad + demás
        } else {
          dataModel.value.curpi = ''
          dataModel.value.curpf = ''
        }
      },
      { immediate: true },
    )

    watch(
      () => dataModel.value.ExtranjeroSinCURP,
      (isExtranjero) => {
        if (isExtranjero) {
          const curpGenerico = 'XEXX010101HNEXXXA4'
          dataModel.value.curpCompleto = curpGenerico
          dataModel.value.curpi = curpGenerico.slice(0, 4)
          dataModel.value.curpf = curpGenerico.slice(8)
        } else {
          // Si quieres limpiar el campo cuando se desmarca:
          //dataModel.value.curpCompleto = ''
          //dataModel.value.curpi = ''
          //dataModel.value.curpf = ''
        }
      },
      { immediate: true },
    )

    watch(
      () => dataModel.value.fiscal,
      async (nuevoValor) => {
        vtabTipoEmpresa.value = nuevoValor ? 'tabTipoEmpresa01' : 'tabTipoEmpresa02'

        let formRef = nuevoValor ? formRefFiscal.value : formRefNoFiscal.value

        if (props.id !== undefined && props.id !== null) {
        } else {
          if (formRef) {
            await formRef.reset() // ✅ ahora sí puedes usar await
          }
        }
      },
      { immediate: true },
    )

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount

    onMounted(async () => {
      nextTick(() => {})
      resetModel(false)
      await fetchClientes()

      if (props.id !== undefined && props.id !== null) {
        dataModel.value.id_nomina_gape_cliente = idClienteParam
        dataModel.value.id_nomina_gape_empresa = idEmpresaParam
        dataModel.value.fiscal = fiscalParam

        const data = {
          idEmpleado: props.id,
          idCliente: idClienteParam,
          idEmpresa: idEmpresaParam,
          fiscal: fiscalParam,
        }

        buscarEmpresasNomina()

        if (fiscalParam) {
          await buscarCatalogosPorEmpresa()
        }

        await fetchDatosEmpleado(data)
      }
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

    const informacionEmpresaNoFiscal = async (data: any) => {
      await empresaNomStore.catalogoEmpresaNoFiscal(data)
    }

    const buscarCatalogosPorEmpresa = async () => {
      const idCliente = dataModel.value.id_nomina_gape_cliente
      const idEmpresa = dataModel.value.id_nomina_gape_empresa
      const fiscal = dataModel.value.fiscal

      const data = {
        idCliente: idCliente,
        idEmpresa: idEmpresa,
        fiscal: fiscal,
      }

      if (fiscal) {
        cargarCatalogosPorEmpresa(data)
      } else {
        await informacionEmpresaNoFiscal(data)
        if (props.id === undefined) {
          dataModel.value.codigoempleado = empresaNomStore.siguienteCodigo ?? ''
        }
      }
    }

    const buscarEmpresasNomina = async () => {
      const idCliente = dataModel.value.id_nomina_gape_cliente
      const fiscal = dataModel.value.fiscal

      if (props.id !== undefined && props.id !== null) {
        btnDisabled.value.compCliente = true
        btnDisabled.value.crearRegistro = false
      } else {
        resetModel(true)
        btnDisabled.value.compTipoEmp = idCliente != null ? false : true
        btnDisabled.value.compEmpresa = idCliente != null ? false : true
      }

      // ✅ Si el cliente está seleccionado, aplicar la lógica fiscal/no fiscal
      await fetchEmpresasNominaPorClienteTipo(idCliente, fiscal)
    }

    const fetchDatosEmpleado = async (data: any) => {
      try {
        const datos = await empleadoStore.editEmpleado(data)

        setEmpleado(datos)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const fetchEmpresasNominaPorClienteTipo = async (idCliente: any, fiscal: boolean) => {
      empresasStore.reset()
      try {
        const data = {
          idCliente: idCliente,
          fiscal: fiscal,
        }
        await empresasStore.empresasNominasPorClienteTipo(data)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const cargarCatalogosPorEmpresa = async (data: any) => {
      await Promise.all([
        departamentoStore.catalogoDepartamento(data),

        empresaNomStore.catalogoEmpresa(data),
      ])

      if (empresaNomStore.empresa && !Array.isArray(empresaNomStore.empresa)) {
        dataModel.value.zonasalario = empresaNomStore.empresa.zonasalariogeneral ?? ''

        if (props.id === undefined) {
          dataModel.value.codigoempleado = empresaNomStore.siguienteCodigo ?? ''
        }
      }
    }

    const onDecision = () => {
      console.log(dataModel.value.zonasalario)
      let mensaje = ''
      let titulo = ''

      if (props.id !== undefined && props.id !== null) {
        titulo = 'Actualización de datos'
        mensaje = `¿Está seguro de que desea actualizar el registro? Los cambios realizados serán guardados de forma permanente.`
      } else {
        titulo = 'Registro de datos'
        mensaje = `¿Está seguro de que desea registrar los datos? Esta acción no se puede deshacer.`
      }

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

      formRef = dataModel.value.fiscal ? formRefFiscal.value : formRefNoFiscal.value

      const form = await formRef.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          let titulo = 'Registro guardado'
          let mensaje = 'Los datos se guardaron de forma exitosa.'

          dataModel.value.ExtranjeroSinCURP = dataModel.value.ExtranjeroSinCURP
          if (props.id !== undefined && props.id !== null) {
            if (dataModel.value.fiscal) {
              await empleadoStore.actualizarEmpleado(dataModel.value)
            } else {
              await empleadoStore.actualizarEmpleadoNoFiscal(dataModel.value)
            }

            mensaje = 'Los datos se actualizaron de forma exitosa.'
            titulo = 'Registro actualizado'
          } else {
            if (dataModel.value.fiscal) {
              await empleadoStore.guardarEmpleado(dataModel.value)
            } else {
              await empleadoStore.guardarEmpleadoNoFiscal(dataModel.value)
            }
          }

          empresaNomStore.siguienteCodigo = null
          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)
          router.push({ name: 'EmpleadoList' })

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
      buscarCatalogosPorEmpresa,
      buscarEmpresasNomina,
      dataModel,
      formRefFiscal,
      formRefNoFiscal,
      getCardHeight,
      inputFilters,
      itemsBaseCotizacion,
      itemsBasePago,
      itemsClaveEntidad,
      itemsClientesNomina,
      itemsEstadoCivil,
      itemsFormaPago,
      itemsSexo,
      itemsTipoEmpleado,
      itemsZonaSalario,
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
      vtabDatosNoFiscales,
      vtabDatosNoFiscalesItems,
      vtabTipoEmpresa,
      vtabTipoEmpresaRef,
      vtabDatosFiscalesItems,
      vtabDatosFiscales,
    }
  },
})
</script>
