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
              <v-icon icon="mdi-floppy" color="white" size="24px" />
            </v-btn>
          </template>
          <span>Guardar</span>
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
            <v-card
              :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
              class="py-3"
              color="transparent"
              elevation="0"
            >
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-information-slab-circle-outline" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                  Seleccione el <b style="color: #2a73c5"><i>CLIENTE</i></b> para el que desea
                  registrar nuevos empleados.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                  al seleccionar una opción en este campo, se habilitará:
                  <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b>
                </v-col>
              </v-row>
            </v-card>
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
            <v-card
              :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
              class="py-3"
              color="transparent"
              elevation="0"
            >
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-information-slab-circle-outline" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                  elija el tipo de empresa (fiscal o no fiscal) para mostrar únicamente las empresas
                  correspondientes.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-cursor-default-click" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                  al seleccionar una opción en este campo, se habilitará y mostrará la información
                  correspondiente de:
                  <b style="color: #2a73c5"><i>EMPRESA</i></b>
                </v-col>
              </v-row>
            </v-card>
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
            <v-card
              :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
              class="py-3"
              color="transparent"
              elevation="0"
            >
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-information-slab-circle-outline" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                  seleccione la empresa donde se registrarán los nuevos empleados.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-file-rotate-left" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
                  debe seleccionar primero
                  <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b> para poder habilitar este
                  campo y mostrar las empresas correspondientes.
                </v-col>
              </v-row>
            </v-card>
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

    <v-row>
      <v-col>
        <!-- vtabTipoEmpresa-->
        <v-tabs-window v-model="vtabTipoEmpresa">
          <!-- Empresa fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa01" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <!-- vtabDatos -->
              <v-tabs
                v-model="vtabDatosFiscales"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                class="text-medium-emphasis tab-right border"
                color="primary"
                show-arrows
                :width="smAndDown ? '100px' : 'auto'"
              >
                <v-tab
                  v-for="tab in vtabDatosFiscalesItems"
                  :key="tab.value"
                  :min-width="smAndDown ? '100%' : 'auto'"
                  :prepend-icon="tab.icon"
                  :text="tab.title"
                  :value="tab.value"
                  :variant="vtabDatosFiscales == tab.value ? 'tonal' : 'text'"
                  class="text-none text-no-wrap"
                  style="letter-spacing: 0.5px"
                />
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-form ref="formRefFiscal">
                  <v-tabs-window v-model="vtabDatosFiscales" :mobile="smAndDown">
                    <!-- Principales-->
                    <v-tabs-window-item value="tab01" eager>
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
                            :clearable="true"
                            :disabled="btnDisabled.dmCodigoEmpleado"
                            :label="'Código *'"
                            :multiple="false"
                            :placeholder="'XXXX'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[reglaMascarillaCodigo, validationRules.required]"
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
                              :clearable="true"
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

                        <!-- Tipo de contrato -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.tipocontrato"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'ClaveTipoContrato'"
                            :items="itemsTipoContratoNomina"
                            :label="'Tipo de contrato *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-draw-pen'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDeContrato" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Apellido paterno -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.apellidopaterno"
                            :clearable="true"
                            :label="'Apellido paterno *'"
                            :placeholder="'Apellido paterno'"
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
                            :clearable="true"
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
                            :clearable="true"
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
                            clear-icon="mdi-close"
                            @keypress="inputFilters.onlyLetters"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Tipo de periodo -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.idtipoperiodo"
                            :clearable="true"
                            :item-title="'nombretipoperiodo'"
                            :item-value="'idtipoperiodo'"
                            :items="itemsTipoPeriodoNomina"
                            :label="'Tipo de periodo *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-clipboard-text-clock-outline'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Salario diario -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldodiario"
                            :clearable="true"
                            :label="'Salario diario'"
                            :placeholder="'0.00'"
                            :prefix="'$'"
                            :prepend-icon="'mdi-cash'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldodiario)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSalarioDiario" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Base de cotización -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.basecotizacionimss"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsBaseCotizacion"
                            :label="'Base de cotización'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaBaseCotizacion" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- SBC parte fija-->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldointegrado"
                            :clearable="true"
                            :label="'SBC parte fija'"
                            :placeholder="'0.00'"
                            :prefix="'$'"
                            :prepend-icon="'mdi-currency-usd'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldointegrado)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSBCParteFija" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- SBC parte variable-->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldovariable"
                            :clearable="true"
                            :label="'SBC parte variable'"
                            :placeholder="'0.00'"
                            :prefix="'$'"
                            :prepend-icon="'mdi-currency-usd'"
                            disabled
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSBCParteVariable" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- SBC (Topado a 25 UMA) -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldovariable"
                            :clearable="true"
                            :label="'SBC (Topado a 25 UMA)'"
                            :placeholder="'0.00'"
                            :prefix="'$'"
                            :prepend-icon="'mdi-currency-usd'"
                            disabled
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSBCTopado" />
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>

                    <!-- Generales -->
                    <v-tabs-window-item value="tab02" eager>
                      <v-row class="mx-2">
                        <v-col cols="12">
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                          <v-card-title color="primary" class="text-primary text-body-1">
                            Datos generales
                          </v-card-title>
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                        </v-col>
                      </v-row>

                      <v-row class="mt-1 mx-2">
                        <!-- Departamento -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.iddepartamento"
                            :clearable="true"
                            :item-title="'descripcion'"
                            :item-value="'iddepartamento'"
                            :items="itemsDepartamentoNomina"
                            :label="'Departamento'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-toolbox-outline'"
                            :return-object="false"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaDepartamento" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Puesto -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.idpuesto"
                            :clearable="true"
                            :item-title="'descripcion'"
                            :item-value="'idpuesto'"
                            :items="itemsPuestoNomina"
                            :label="'Puesto'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-tie'"
                            :return-object="false"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaPuesto" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Sindizalizado -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.tipoempleado"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsTipoEmpleado"
                            :label="'Sindicalizado *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-check'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSindicalizado" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Tipo de prestación -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoPrestacion"
                            :clearable="true"
                            :item-title="'Nombre'"
                            :item-value="'IDTabla'"
                            :items="itemsTipoPrestacionNomina"
                            :label="'Tipo de prestación *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-cash'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePrestacion" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Base de pago -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.basepago"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsBasePago"
                            :label="'Base de Pago *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-cash'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaBaseDePago" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Método de pago -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.formapago"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsFormaPago"
                            :label="'Método de pago *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-credit-card'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaMetodoDePago" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Turno de trabajo -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.idturno"
                            :clearable="true"
                            :item-title="'descripcion'"
                            :item-value="'idturno'"
                            :items="itemsTurnoNomina"
                            :label="'Turno de trabajo *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-briefcase-clock'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTurnoDeTrabajo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Zona de salario -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.zonasalario"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsZonaSalario"
                            :label="'Zona de salario *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-marker'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaZonaDeSalario" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Tipo de jornada -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoSemanaReducida"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'TipoSemanaReducida'"
                            :items="itemsTipoJornadaNomina"
                            :label="'Tipo jornada / Semana reducida *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-marker'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoJornada" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Tipo de régimen fiscal -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoRegimen"
                            :clearable="true"
                            :item-title="'descripcion'"
                            :item-value="'claveTipoRegimen'"
                            :items="itemsTipoRegimen"
                            :label="'Tipo de régimen fiscal *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-folder-key'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaRegimenFiscal" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Número de FONACOT -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.NumeroFonacot"
                            :clearable="true"
                            :label="'Número de FONACOT'"
                            :placeholder="'00000000000'"
                            :prepend-icon="'mdi-bank'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateNumericField(v, {
                                  required: false,
                                  min: 10,
                                  max: 10,
                                }),
                            ]"
                            @keypress="inputFilters.onlyNumbers"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNumeroFonacot" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Afore -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.numeroafore"
                            :clearable="true"
                            :label="'Afore'"
                            :placeholder="'Afore'"
                            :prepend-icon="'mdi-piggy-bank'"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaAfore" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Correo electrónico -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.CorreoElectronico"
                            :clearable="true"
                            :label="'Correo electrónico'"
                            :placeholder="'usuario@domain.com'"
                            :prepend-icon="'mdi-email'"
                            :rules="[validationRules.emailIfNotEmpty]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaCorreoElectronico" />
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>

                    <!-- IMMS, Infonavit -->
                    <v-tabs-window-item value="tab03" eager>
                      <v-row class="mx-2">
                        <v-col cols="12">
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                          <v-card-title color="primary" class="text-primary text-body-1">
                            Datos afiliatorios IMMS
                          </v-card-title>
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                        </v-col>
                      </v-row>

                      <v-row class="mt-1 mx-2">
                        <!-- Número de seguridad social -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.numerosegurosocial"
                            :clearable="true"
                            :label="'Número de seguridad social *'"
                            :placeholder="'Código de 11 caracteres'"
                            :prepend-icon="'mdi-hospital-box-outline'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateNumericField(v, {
                                  required: true,
                                  min: 11,
                                  max: 11,
                                }),
                            ]"
                            @keypress="inputFilters.onlyNumbers"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Registro patronal del IMSS -->
                        <v-col cols="12" lg="6">
                          <bec-autocomplete
                            v-model="dataModel.cidregistropatronal"
                            :item-title="'cregistroimss'"
                            :item-value="'cidregistropatronal'"
                            :items="itemsRegistroPatronalNomina"
                            :label="'Registro patronal del IMSS *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-medication-outline'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- U.M.F. -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.umf"
                            :clearable="true"
                            :label="'U.M.F'"
                            :placeholder="'U.M.F'"
                            :prepend-icon="'mdi-mother-nurse'"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Estado civil -->
                        <v-col cols="12" lg="6">
                          <bec-autocomplete
                            v-model="dataModel.estadocivil"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsEstadoCivil"
                            :label="'Estado civil'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-human-male-female'"
                            :return-object="false"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <v-divider></v-divider>

                        <!-- Sexo -->
                        <v-col cols="12" lg="6">
                          <bec-autocomplete
                            v-model="dataModel.sexo"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsSexo"
                            :label="'Sexo *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-human-male-female'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Fecha de nacimiento -->
                        <v-col cols="12" lg="6">
                          <v-locale-provider locale="es-MX">
                            <v-date-input
                              v-model="dataModel.fechanacimiento"
                              :clearable="true"
                              :mobile="smAndDown"
                              :rules="[validationRules.required]"
                              clear-icon="mdi-close"
                              color="primary"
                              density="compact"
                              hide-details="auto"
                              label="Fecha de nacimiento *"
                              prepend-icon=""
                              prepend-inner-icon="mdi-calendar"
                              title="Rango de fechas"
                              type="chip"
                              variant="outlined"
                            >
                              <template v-slot:prepend>
                                <empleado-tooltips name="ayudaFechaDeNacimiento" />
                              </template>
                            </v-date-input>
                          </v-locale-provider>
                        </v-col>

                        <!-- Entidad federativa de nacimiento -->
                        <v-col cols="12" lg="6">
                          <bec-autocomplete
                            v-model="dataModel.EntidadFederativa"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsClaveEntidad"
                            :label="'Entidad federativa de nacimiento *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-map-marker-radius'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Ciudad de nacimiento -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.lugarnacimiento"
                            :clearable="true"
                            :label="'Ciudad de nacimiento'"
                            :placeholder="'Ciudad de nacimiento'"
                            :prepend-icon="'mdi-file-account-outline'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateLettersField(v, {
                                  required: false,
                                  max: 40,
                                }),
                            ]"
                            @keypress="inputFilters.onlyLetters"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Homoclave -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.homoclave"
                            :clearable="true"
                            :label="'Homoclave - RFC *'"
                            :placeholder="'Homoclave'"
                            :prepend-icon="'mdi-file-key-outline'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateAlphanumericField(v, {
                                  required: true,
                                  max: 3,
                                }),
                            ]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- CURP -->
                        <v-col cols="12" lg="5">
                          <bec-text-field
                            v-model="dataModel.curpCompleto"
                            :clearable="true"
                            :label="'CURP *'"
                            :placeholder="'CURP'"
                            :prepend-icon="'mdi-file-account-outline'"
                            :rules="[validationRules.required, validationRules.curp]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Extranjero sin CURP -->
                        <v-col cols="12" lg="3" class="d-flex align-start">
                          <v-checkbox
                            v-model="dataModel.ExtranjeroSinCURP"
                            color="primary"
                            label="Extranjero sin CURP"
                            :hide-details="true"
                            density="compact"
                          >
                          </v-checkbox>
                        </v-col>

                        <v-divider></v-divider>

                        <!-- Dirección -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.direccion"
                            :clearable="true"
                            :label="'Dirección'"
                            :placeholder="'Dirección'"
                            :prepend-icon="'mdi-file-account-outline'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateAlphanumericField(v, {
                                  required: false,
                                  max: 60,
                                }),
                            ]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Población -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.poblacion"
                            :clearable="true"
                            :label="'Población'"
                            :placeholder="'Población'"
                            :prepend-icon="'mdi-file-account-outline'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateAlphanumericField(v, {
                                  required: false,
                                  max: 60,
                                }),
                            ]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Entidad federativa de domicilio -->
                        <v-col cols="12" lg="6">
                          <bec-autocomplete
                            v-model="dataModel.estado"
                            :clearable="true"
                            :item-title="'Descripcion'"
                            :item-value="'ClaveEstado'"
                            :items="itemsEntidadFederativaNomina"
                            :label="'Entidad federativa de domicilio *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-map-marker-radius'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaTipoDePeriodo" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Código postal -->
                        <v-col cols="12" lg="3">
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
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Télefono -->
                        <v-col cols="12" lg="3">
                          <bec-text-field
                            v-model="dataModel.telefono"
                            :label="'Teléfono'"
                            :placeholder="'Teléfono'"
                            :prepend-icon="'mdi-phone'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateNumericField(v, {
                                  required: false,
                                  min: 10,
                                  max: 10,
                                }),
                            ]"
                            @keypress="inputFilters.onlyNumbers"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <v-divider />

                        <!-- Nombre del padre -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.nombrepadre"
                            :label="'Nombre del padre'"
                            :placeholder="'Nombre del padre'"
                            :prepend-icon="'mdi-face-man'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateLettersField(v, {
                                  required: false,
                                  max: 60,
                                }),
                            ]"
                            @keypress="inputFilters.onlyLetters"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Nombre del madre -->
                        <v-col cols="12" lg="6">
                          <bec-text-field
                            v-model="dataModel.nombremadre"
                            :label="'Nombre de la madre'"
                            :placeholder="'Nombre de la madre'"
                            :prepend-icon="'mdi-face-woman'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateLettersField(v, {
                                  required: false,
                                  max: 60,
                                }),
                            ]"
                            @keypress="inputFilters.onlyLetters"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaNombres" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <v-divider />
                        <v-card-subtitle color="primary"
                          >Avisos pendientes ante el IMSS</v-card-subtitle
                        >
                        <v-col cols="12" lg="3">
                          <v-checkbox v-model="dataModel.altaimss" color="primary" label="Alta">
                          </v-checkbox>
                        </v-col>
                        <v-col cols="12" lg="3">
                          <v-checkbox v-model="dataModel.bajaimss" color="primary" label="Baja">
                          </v-checkbox>
                        </v-col>
                        <v-col cols="12" lg="3">
                          <v-checkbox
                            v-model="dataModel.modificacionsalarioimss"
                            color="primary"
                            label="Modif. salario"
                          >
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>

                    <!-- Sueldos y salarios -->
                    <v-tabs-window-item value="tab04" eager>
                      <v-card>
                        <v-card-title color="primary">Datos sueldos y salarios</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.sueldovariable"
                                :label="'Sueldo variable'"
                                :placeholder="'Sueldo variable'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validatePositiveNumber(v, { required: false }),
                                ]"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldovariable)
                                "
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>

                            <v-col cols="12" lg="4">
                              <v-locale-provider locale="es-MX">
                                <v-date-input
                                  v-model="dataModel.fechasueldovariable"
                                  :mobile="smAndDown"
                                  clear-icon="mdi-close"
                                  color="primary"
                                  density="compact"
                                  label="Fecha salario variable"
                                  prepend-icon=""
                                  prepend-inner-icon="mdi-calendar"
                                  title="Rango de fechas"
                                  type="chip"
                                  variant="outlined"
                                >
                                  <template v-slot:prepend>
                                    <v-icon icon="mdi-information-outline" />
                                  </template>
                                </v-date-input>
                              </v-locale-provider>
                            </v-col>
                            <v-col cols="12" lg="4">
                              <v-locale-provider locale="es-MX">
                                <v-date-input
                                  v-model="dataModel.fechasueldodiario"
                                  :mobile="smAndDown"
                                  clear-icon="mdi-close"
                                  color="primary"
                                  density="compact"
                                  label="Fecha salario diario"
                                  prepend-icon=""
                                  prepend-inner-icon="mdi-calendar"
                                  title="Rango de fechas"
                                  type="chip"
                                  variant="outlined"
                                >
                                  <template v-slot:prepend>
                                    <v-icon icon="mdi-information-outline" />
                                  </template>
                                </v-date-input>
                              </v-locale-provider>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.sueldopromedio"
                                :label="'Salario promedio'"
                                :placeholder="'Salario promedio'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validatePositiveNumber(v, { required: false }),
                                ]"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldopromedio)
                                "
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>

                            <v-col cols="12" lg="4">
                              <v-locale-provider locale="es-MX">
                                <v-date-input
                                  v-model="dataModel.fechasueldopromedio"
                                  :mobile="smAndDown"
                                  clear-icon="mdi-close"
                                  color="primary"
                                  density="compact"
                                  label="Fecha salario promedio"
                                  prepend-icon=""
                                  prepend-inner-icon="mdi-calendar"
                                  title="Rango de fechas"
                                  type="chip"
                                  variant="outlined"
                                >
                                  <template v-slot:prepend>
                                    <v-icon icon="mdi-information-outline" />
                                  </template>
                                </v-date-input>
                              </v-locale-provider>
                            </v-col>
                            <v-col cols="12" lg="4">
                              <v-locale-provider locale="es-MX">
                                <v-date-input
                                  v-model="dataModel.fechasueldointegrado"
                                  :mobile="smAndDown"
                                  clear-icon="mdi-close"
                                  color="primary"
                                  density="compact"
                                  label="Fecha salario integrado"
                                  prepend-icon=""
                                  prepend-inner-icon="mdi-calendar"
                                  title="Rango de fechas"
                                  type="chip"
                                  variant="outlined"
                                >
                                  <template v-slot:prepend>
                                    <v-icon icon="mdi-information-outline" />
                                  </template>
                                </v-date-input>
                              </v-locale-provider>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.sueldobaseliquidacion"
                                :label="'Salario base liquidación'"
                                :placeholder="'Salario base liquidación'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validatePositiveNumber(v, { required: false }),
                                ]"
                                @keypress="
                                  (e: any) =>
                                    inputFilters.onlyDecimal(e, dataModel.sueldobaseliquidacion)
                                "
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>
                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.ajustealneto"
                                :label="'Saldo del ajuste al neto'"
                                :placeholder="'Saldo del ajuste al neto'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validatePositiveNumber(v, { required: false }),
                                ]"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.ajustealneto)
                                "
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-tabs-window-item>

                    <!-- Pagos y extras -->
                    <v-tabs-window-item value="tab05" eager>
                      <v-card>
                        <v-card-title color="primary">Datos Pagos extras</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" lg="4">
                              <bec-autocomplete
                                v-model="dataModel.bancopagoelectronico"
                                :item-title="'Descripcion'"
                                :item-value="'ClaveBanco'"
                                :items="itemsBancoNomina"
                                :label="'Banco para pago electronico'"
                                :multiple="false"
                                :placeholder="'Seleccione'"
                                :prepend-icon="'mdi-draw-pen'"
                                :return-object="false"
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaTipoDePeriodo" />
                                </template>
                              </bec-autocomplete>
                            </v-col>
                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.sucursalpagoelectronico"
                                :label="'Sucursal para pago electrónico'"
                                :placeholder="'Sucursal para pago electrónico'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validateAlphanumericField(v, {
                                      required: false,
                                      max: 50,
                                    }),
                                ]"
                                @keypress="inputFilters.onlyAlphanumeric"
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>

                            <v-col cols="12" lg="4">
                              <bec-text-field
                                v-model="dataModel.cuentapagoelectronico"
                                :label="'Número de cuenta para pago electrónico'"
                                :placeholder="'Número de cuenta para pago electrónico'"
                                :prepend-icon="'mdi-hospital-box-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validateAlphanumericField(v, {
                                      required: false,
                                      max: 20,
                                    }),
                                ]"
                                @keypress="inputFilters.onlyAlphanumeric"
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
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
                                      required: false,
                                      min: 18,
                                      max: 30,
                                    }),
                                ]"
                                @keypress="inputFilters.onlyNumbers"
                              >
                                <template #tooltip>
                                  <empleado-tooltips name="ayudaNombres" />
                                </template>
                              </bec-text-field>
                            </v-col>

                            <v-divider></v-divider>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-tabs-window-item>

                    <!-- Datos GAPE -->
                    <v-tabs-window-item value="tab06" eager>
                      <v-row class="mx-2">
                        <v-col cols="12">
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                          <v-card-title color="primary" class="text-primary text-body-1">
                            Datos GAPE
                          </v-card-title>
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                        </v-col>
                      </v-row>

                      <v-row class="mt-1 mx-2">
                        <!-- Fecha de alta con GAPE-->
                        <v-col cols="12" lg="4">
                          <v-locale-provider locale="es-MX">
                            <v-date-input
                              v-model="dataModel.fecha_alta_gape"
                              :mobile="smAndDown"
                              :rules="[validationRules.required]"
                              clear-icon="mdi-close"
                              color="primary"
                              density="compact"
                              hide-details="auto"
                              label="Fecha de alta con GAPE *"
                              prepend-icon=""
                              prepend-inner-icon="mdi-calendar"
                              title="Rango de fechas"
                              type="chip"
                              variant="outlined"
                            >
                              <template v-slot:prepend>
                                <empleado-tooltips name="ayudaFechaDeAltaConGape" />
                              </template>
                            </v-date-input>
                          </v-locale-provider>
                        </v-col>

                        <!-- Sueldo real -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldo_real"
                            :label="'Salario real *'"
                            :placeholder="'0.00'"
                            :prepend-icon="'mdi-cash'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            prefix="$"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldo_real)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSueldoReal" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Sueldo IMMS GAPE -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldo_imss_gape"
                            :label="'Sueldo IMMS GAPE *'"
                            :placeholder="'0.00'"
                            :prepend-icon="'mdi-cash-clock'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            prefix="$"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldo_imss_gape)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSueldoIMMGGape" />
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                  </v-tabs-window>
                </v-form>
              </div>
            </div>
          </v-tabs-window-item>
          <!-- Empresa no fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa02" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <!-- vtabDatos -->
              <v-tabs
                v-model="vtabDatosNoFiscales"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                :width="smAndDown ? '100px' : 'auto'"
                align-tabs="center"
                border
                class="text-medium-emphasis tab-right border"
                color="primary"
                show-arrows
              >
                <v-tab
                  v-for="tab in vtabDatosNoFiscalesItems"
                  :key="tab.value"
                  :prepend-icon="tab.icon"
                  :text="tab.title"
                  :value="tab.value"
                  :variant="vtabDatosNoFiscales == tab.value ? 'tonal' : 'text'"
                  class="text-none text-no-wrap"
                  :min-width="smAndDown ? '100%' : 'auto'"
                  style="letter-spacing: 0.5px"
                />
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-form ref="formRefNoFiscal">
                  <v-tabs-window v-model="vtabDatosNoFiscales" :mobile="smAndDown">
                    <!-- Principales-->
                    <v-tabs-window-item value="tabDatosNoFiscales01" eager>
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
                            :label="'Código *'"
                            :multiple="false"
                            :placeholder="'XXXX'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[reglaMascarillaCodigo, validationRules.required]"
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
                      </v-row>
                    </v-tabs-window-item>

                    <!-- Datos GAPE -->
                    <v-tabs-window-item value="tabDatosNoFiscales02" eager>
                      <v-row class="mx-2">
                        <v-col cols="12">
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                          <v-card-title color="primary" class="text-primary text-body-1">
                            Datos GAPE
                          </v-card-title>
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                        </v-col>
                      </v-row>

                      <v-row class="mt-1 mx-2">
                        <!-- Fecha de alta con GAPE-->
                        <v-col cols="12" lg="4">
                          <v-locale-provider locale="es-MX">
                            <v-date-input
                              v-model="dataModel.fecha_alta_gape"
                              :mobile="smAndDown"
                              :rules="[validationRules.required]"
                              clear-icon="mdi-close"
                              color="primary"
                              density="compact"
                              hide-details="auto"
                              label="Fecha de alta con GAPE *"
                              prepend-icon=""
                              prepend-inner-icon="mdi-calendar"
                              title="Rango de fechas"
                              type="chip"
                              variant="outlined"
                            >
                              <template v-slot:prepend>
                                <empleado-tooltips name="ayudaFechaDeAltaConGape" />
                              </template>
                            </v-date-input>
                          </v-locale-provider>
                        </v-col>

                        <!-- Sueldo real -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldo_real"
                            :label="'Salario real *'"
                            :placeholder="'0.00'"
                            :prepend-icon="'mdi-cash'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            prefix="$"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldo_real)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSueldoReal" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- Sueldo IMMS GAPE -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldo_imss_gape"
                            :label="'Sueldo IMMS GAPE *'"
                            :placeholder="'0.00'"
                            :prepend-icon="'mdi-cash-clock'"
                            :rules="[
                              (v: any) =>
                                validationRules.validatePositiveNumber(v, { required: false }),
                            ]"
                            prefix="$"
                            @keypress="
                              (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldo_imss_gape)
                            "
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSueldoIMMGGape" />
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                  </v-tabs-window>
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

import { useTipoContratoStore } from '../../stores/modules/Nomina/nomGenerales/SATCatTipoContrato'
import { useTipoPeriodoStore } from '../../stores/modules/Nomina/default/TipoPeriodo'
import { useDepartamentoStore } from '../../stores/modules/Nomina/default/Departamento'
import { usePuestoStore } from '../../stores/modules/Nomina/default/Puesto'
import { useTipoPrestacionStore } from '../../stores/modules/Nomina/default/TipoPrestacion'
import { useTurnoStore } from '../../stores/modules/Nomina/default/Turno'
import { useRegistroPatronalStore } from '../../stores/modules/Nomina/default/RegistroPatronal'
import { useEntidadFederativaStore } from '../../stores/modules/Nomina/nomGenerales/SATCatEntidadFederativa'
import { useBancoStore } from '../../stores/modules/Nomina/nomGenerales/SATCatBancos'
import { useTipoJornadaStore } from '../../stores/modules/Nomina/nomGenerales/IMSSCatTipoSemanaReducida'
import { useEmpleadoStore } from '../../stores/modules/Nomina/gape/Empleado'
import { useTipoRegimenStore } from '../../stores/modules/Nomina/nomGenerales/SATCatTipoRegimen'
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
import EmpleadoTooltips from '@/components/nomina/ayudas/EmpleadoTooltips.vue'

// import router
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'EmpleadoForm',
  components: { BecSelect, BecAutocomplete, BecTextField, EmpleadoTooltips },
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

    const bancoStore = useBancoStore()
    const departamentoStore = useDepartamentoStore()
    const dialogConfirmation = useDialogManagerStore()

    const empresaStore = useEmpresaStore()
    const entidadFederativaStore = useEntidadFederativaStore()
    const puestoStore = usePuestoStore()
    const registroPatronalStore = useRegistroPatronalStore()
    const tipoContratoStore = useTipoContratoStore()
    const tipoJornadaStore = useTipoJornadaStore()
    const tipoPeriodoStore = useTipoPeriodoStore()
    const tipoPrestacionStore = useTipoPrestacionStore()
    const tipoRegimenStore = useTipoRegimenStore()
    const turnoStore = useTurnoStore()

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

    let codigoAsignado = false

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

      dmCodigoEmpleado: false,
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

    const itemsTipoContratoNomina = computed(() => tipoContratoStore.tipoContrato)
    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    const itemsDepartamentoNomina = computed(() => departamentoStore.departamento)
    const itemsPuestoNomina = computed(() => puestoStore.puesto)

    const itemsTipoPrestacionNomina = computed(() => tipoPrestacionStore.tipoPrestacion)
    const itemsTurnoNomina = computed(() => turnoStore.turno)

    const itemsTipoRegimen = computed(() => tipoRegimenStore.tipoRegimen)
    const itemsRegistroPatronalNomina = computed(() => registroPatronalStore.registroPatronal)

    const itemsEntidadFederativaNomina = computed(() => entidadFederativaStore.entidadFederativa)
    const itemsBancoNomina = computed(() => bancoStore.banco)
    const itemsTipoJornadaNomina = computed(() => tipoJornadaStore.tipoJornada)

    const reglaMascarillaCodigo = computed(() => {
      return validationRules.codeMask(empresaNomStore.empresa[0]?.mascarillacodigo ?? '')
    })

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
      () => empresaNomStore.siguienteCodigo,
      (nuevoCodigo) => {
        if (props.id !== undefined && props.id !== null) {
          return
        }
        if (!codigoAsignado && !dataModel.value.codigoempleado && nuevoCodigo) {
          dataModel.value.codigoempleado = nuevoCodigo
          codigoAsignado = true
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
      await fetchClientes()

      if (props.id !== undefined && props.id !== null) {
        dataModel.value.id_nomina_gape_cliente = idClienteParam
        dataModel.value.id_nomina_gape_empresa = idEmpresaParam
        dataModel.value.fiscal = fiscalParam

        btnDisabled.value.dmCodigoEmpleado = true

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

    const buscarCatalogosPorEmpresa = async () => {
      const idCliente = dataModel.value.id_nomina_gape_cliente
      const idEmpresa = dataModel.value.id_nomina_gape_empresa
      const fiscal = dataModel.value.fiscal

      const data = {
        idCliente: idCliente,
        idEmpresa: idEmpresa,
      }

      if (fiscal) {
        cargarCatalogosPorEmpresa(data)
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
        tipoContratoStore.catalogoTipoContrato(data),
        tipoPeriodoStore.catalogoTipoPeriodo(data),
        departamentoStore.catalogoDepartamento(data),
        puestoStore.catalogoPuesto(data),
        tipoPrestacionStore.catalogoTipoPrestacion(data),
        turnoStore.catalogoTurno(data),
        tipoRegimenStore.catalogoTipoRegimen(data),
        registroPatronalStore.catalogoRegistroPatronal(data),
        entidadFederativaStore.catalogoEntidadFederativa(data),
        bancoStore.catalogoBanco(data),
        tipoJornadaStore.catalogoTipoJornada(data),

        empresaNomStore.catalogoEmpresa(data),

        (dataModel.value.zonasalario = empresaNomStore.empresa[0]?.zonasalariogeneral ?? ''),
      ])
    }

    const onDecision = () => {
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
      itemsBancoNomina,
      itemsBaseCotizacion,
      itemsBasePago,
      itemsClaveEntidad,
      itemsClientesNomina,
      itemsDepartamentoNomina,
      itemsEmpresaDatabase,
      itemsEntidadFederativaNomina,
      itemsEstadoCivil,
      itemsFormaPago,
      itemsPuestoNomina,
      itemsRegistroPatronalNomina,
      itemsSexo,
      itemsTipoContratoNomina,
      itemsTipoEmpleado,
      itemsTipoJornadaNomina,
      itemsTipoPeriodoNomina,
      itemsTipoPrestacionNomina,
      itemsTipoRegimen,
      itemsTurnoNomina,
      itemsZonaSalario,
      loading,
      mergeProps,
      name,
      onDecision,
      reglaMascarillaCodigo,
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
