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
              v-model="dataModel.estado"
              v-bind="mergeProps(tooltipProps)"
              class="mr-1"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.activarRegistro"
              @click="dataModel.estado = !dataModel.estado"
            >
              <v-icon color="white" size="24px">
                {{ !dataModel.estado ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
                mdi-checkbox-blank-outline
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ !dataModel.estado ? ' ACTIVAR ' : 'DESACTIVAR' }}
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
              :to="'/nominas/gape/parametrizacionForm'"
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
                  correspondiente de: <b style="color: #2a73c5"><i>EMPRESA</i></b>
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
                v-model="vtabGraficaSelected"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                class="text-medium-emphasis tab-right border"
                color="primary"
                show-arrows
                width="100px"
              >
                <v-tab
                  v-for="tab in vtabMenuItems"
                  :key="tab.value"
                  :prepend-icon="tab.icon"
                  :text="tab.title"
                  :value="tab.value"
                  :variant="vtabGraficaSelected == tab.value ? 'tonal' : 'text'"
                  class="text-none text-no-wrap"
                  min-width="100%"
                  style="letter-spacing: 0.5px"
                />
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-form ref="formRefFiscal">
                  <v-tabs-window v-model="vtabGraficaSelected" :mobile="smAndDown">
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

                        <!-- Tipo de contrato -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.tipocontrato"
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
                            :tooltip="'Nombre del empleado'"
                            clearable
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
                            :label="'Salario diario'"
                            :placeholder="''"
                            :prepend-icon="'mdi-currency-usd'"
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
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsBaseCotizacion"
                            :label="'Base de cotización'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-clock'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaBaseCotizacion" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- SBC Parte fija -->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.sueldointegrado"
                            :label="'SBC Parte fija'"
                            :placeholder="''"
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

                        <!-- SBC Parte variable-->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            :label="'SBC Parte variable'"
                            :placeholder="''"
                            :prepend-icon="'mdi-currency-usd'"
                            disabled
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaSBCParteVariable" />
                            </template>
                          </bec-text-field>
                        </v-col>

                        <!-- SBC Parte topado a 25 UMA-->
                        <v-col cols="12" lg="4">
                          <bec-text-field
                            :label="'SBC (Topado a 25 UMA)'"
                            :placeholder="''"
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
                            :item-title="'descripcion'"
                            :item-value="'idpuesto'"
                            :items="itemsPuestoNomina"
                            :label="'Puesto'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-tie'"
                            :return-object="false"
                            :tooltip="'Identificador del <b>Puesto</b> al que pertenece el empleado.'"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaPuesto" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <!-- Sindicalizado -->
                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.tipoempleado"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsTipoEmpleado"
                            :label="'Sindicalizado *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-check'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Seleccione para poder ver las opciones.'"
                          >
                            <template #tooltip>
                              <empleado-tooltips name="ayudaPuesto" />
                            </template>
                          </bec-autocomplete>
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoPrestacion"
                            :item-title="'Nombre'"
                            :item-value="'IDTabla'"
                            :items="itemsTipoPrestacionNomina"
                            :label="'Tipo de Prestación *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-cash'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Identificador del <b>Tipo de prestación</b> que fue asignado al empleado.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.basepago"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsBasePago"
                            :label="'Base de Pago *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-cash'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Indica el tipo de base de pago:<br /><b>S =</b> Sueldo <br /><b>C =</b> Comisión <br /><b>D =</b> Destajo <br /><b>O =</b> Sueldo/Comisión <br /><b>E =</b> Sueldo/Destajo.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.formapago"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsFormaPago"
                            :label="'Método de pago *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-account-credit-card'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Seleccione para poder ver las opciones.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.idturno"
                            :item-title="'descripcion'"
                            :item-value="'idturno'"
                            :items="itemsTurnoNomina"
                            :label="'Turno de trabajo *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-briefcase-clock'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Seleccione para poder ver las opciones.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.zonasalario"
                            :item-title="'Descripcion'"
                            :item-value="'Codigo'"
                            :items="itemsZonaSalario"
                            :label="'Zona de salario *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-marker'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Zona del salario del empleado: <br /><b>A = </b> Zona A <br /><b>B = </b> Zona B <br /><b>C = </b> Zona C.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoSemanaReducida"
                            :item-title="'Descripcion'"
                            :item-value="'TipoSemanaReducida'"
                            :items="itemsTipoJornadaNomina"
                            :label="'Tipo jornada / Semana reducida *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-cash-marker'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Zona del salario del empleado: <br /><b>A = </b> Zona A <br /><b>B = </b> Zona B <br /><b>C = </b> Zona C.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-autocomplete
                            v-model="dataModel.TipoRegimen"
                            :item-title="'descripcion'"
                            :item-value="'claveTipoRegimen'"
                            :items="itemsTipoRegimen"
                            :label="'Tipo de régimen fiscal *'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                            :prepend-icon="'mdi-folder-key'"
                            :return-object="false"
                            :rules="[validationRules.required]"
                            :tooltip="'Clave del <b>Régimen Fiscal</b> en el que tributa el contribuyente, de acuerdo con el catálogo publicado por el SAT.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.NumeroFonacot"
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
                            :tooltip="'Número de FONACOT'"
                            @keypress="inputFilters.onlyNumbers"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.numeroafore"
                            :label="'Afore'"
                            :placeholder="'COD0001'"
                            :prepend-icon="'mdi-piggy-bank'"
                            :tooltip="'Número de la cuenta de AFORE del empleado.'"
                          />
                        </v-col>

                        <v-col cols="12" lg="4">
                          <bec-text-field
                            v-model="dataModel.CorreoElectronico"
                            :label="'Correo electrónico'"
                            :placeholder="'usuario@domain.com'"
                            :prepend-icon="'mdi-email'"
                            :rules="[validationRules.emailIfNotEmpty]"
                            :tooltip="'Correo electrónico del empleado.'"
                          />
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>

                    <!-- IMMS, Infonavit -->
                    <v-tabs-window-item value="tab03" eager>
                      <v-card>
                        <v-card-title color="primary">Datos afiliatorios IMMS</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.numerosegurosocial"
                                :label="'Número de seguridad social'"
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
                                :tooltip="'Número asignado al empleado por el Seguro Social (IMSS).'"
                                @keypress="inputFilters.onlyNumbers"
                              />
                            </v-col>

                            <v-col cols="12" lg="4">
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
                                :tooltip="'Identificador del <b>Registro Patronal.'"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.umf"
                                :label="'U.M.F'"
                                :placeholder="'U.M.F'"
                                :prepend-icon="'mdi-mother-nurse'"
                                :tooltip="'Unidad Medica Familiar.'"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-autocomplete
                                v-model="dataModel.estadocivil"
                                :item-title="'Descripcion'"
                                :item-value="'Codigo'"
                                :items="itemsEstadoCivil"
                                :label="'Estado civil'"
                                :multiple="false"
                                :placeholder="'Seleccione'"
                                :prepend-icon="'mdi-human-male-female'"
                                :return-object="false"
                                :tooltip="'Identificador del estado civil del empleado.'"
                              />
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12" lg="3">
                              <bec-autocomplete
                                v-model="dataModel.sexo"
                                :item-title="'Descripcion'"
                                :item-value="'Codigo'"
                                :items="itemsSexo"
                                :label="'Sexo'"
                                :multiple="false"
                                :placeholder="'Seleccione'"
                                :prepend-icon="'mdi-human-male-female'"
                                :return-object="false"
                                :rules="[validationRules.required]"
                                :tooltip="'Identificador del sexo del empleado.'"
                              />
                            </v-col>
                            <v-col cols="12" lg="3">
                              <v-locale-provider locale="es-MX">
                                <v-date-input
                                  v-model="dataModel.fechanacimiento"
                                  :mobile="smAndDown"
                                  :rules="[validationRules.required]"
                                  clear-icon="mdi-close"
                                  color="primary"
                                  density="compact"
                                  label="Fecha de nacimiento"
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
                            <v-col cols="12" lg="3">
                              <bec-autocomplete
                                v-model="dataModel.EntidadFederativa"
                                :item-title="'Descripcion'"
                                :item-value="'Codigo'"
                                :items="itemsClaveEntidad"
                                :label="'Entidad federativa de nacimiento'"
                                :multiple="false"
                                :placeholder="'Seleccione'"
                                :prepend-icon="'mdi-map-marker-radius'"
                                :return-object="false"
                                :rules="[validationRules.required]"
                                :tooltip="'Identificador de la entidad federativa de nacimiento del empleado.'"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.lugarnacimiento"
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
                                :tooltip="'Ciudad de nacimiento'"
                                @keypress="inputFilters.onlyLetters"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.homoclave"
                                :label="'Homoclave - RFC'"
                                :placeholder="'Homoclave Homoclave'"
                                :prepend-icon="'mdi-file-key-outline'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validateAlphanumericField(v, {
                                      required: true,
                                      max: 3,
                                    }),
                                ]"
                                :tooltip="'Homoclave de RFC.'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.curpCompleto"
                                :label="'C.U.R.P.'"
                                :placeholder="'C.U.R.P'"
                                :prepend-icon="'mdi-file-account-outline'"
                                :rules="[validationRules.required, validationRules.curp]"
                                :tooltip="'Clave única de registro poblacional (18 digitos)'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
                            </v-col>

                            <v-col cols="12" lg="6">
                              <v-checkbox
                                v-model="dataModel.ExtranjeroSinCURP"
                                color="primary"
                                label="Extranjero sin CURP"
                              >
                              </v-checkbox>
                            </v-col>
                            <v-divider></v-divider>
                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.direccion"
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
                                :tooltip="'Direccion del empleado.'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-text-field
                                v-model="dataModel.poblacion"
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
                                :tooltip="'Ciudad de residencia del empleado.'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
                              <bec-autocomplete
                                v-model="dataModel.estado"
                                :item-title="'Descripcion'"
                                :item-value="'ClaveEstado'"
                                :items="itemsEntidadFederativaNomina"
                                :label="'Entidad federativa de domicilio *'"
                                :multiple="false"
                                :placeholder="'Seleccione'"
                                :prepend-icon="'mdi-map-marker-radius'"
                                :return-object="false"
                                :rules="[validationRules.required]"
                                :tooltip="'Entidad federativa de residencia del empleado.'"
                              />
                            </v-col>

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
                                :tooltip="'Código Postal'"
                                @keypress="inputFilters.onlyNumbers"
                              />
                            </v-col>

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
                                :tooltip="'Teléfono de contacto del empleado'"
                                @keypress="inputFilters.onlyNumbers"
                              />
                            </v-col>

                            <v-divider />
                            <v-col cols="12" lg="3">
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
                                :tooltip="'Nombre del padre'"
                                @keypress="inputFilters.onlyLetters"
                              />
                            </v-col>

                            <v-col cols="12" lg="3">
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
                                :tooltip="'Nombre de la madre'"
                                @keypress="inputFilters.onlyLetters"
                              />
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
                        </v-card-text>
                      </v-card>
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
                                :tooltip="'Sueldo variable.'"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldovariable)
                                "
                              />
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
                                  multiple="range"
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
                                  multiple="range"
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
                                :tooltip="'Sueldo promedio.'"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldopromedio)
                                "
                              />
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
                                  multiple="range"
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
                                  multiple="range"
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
                                :tooltip="'Salario base liquidación.'"
                                :rules="[
                                  (v: any) =>
                                    validationRules.validatePositiveNumber(v, { required: false }),
                                ]"
                                @keypress="
                                  (e: any) =>
                                    inputFilters.onlyDecimal(e, dataModel.sueldobaseliquidacion)
                                "
                              />
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
                                :tooltip="'Saldo del ajuste al neto.'"
                                @keypress="
                                  (e: any) => inputFilters.onlyDecimal(e, dataModel.ajustealneto)
                                "
                              />
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
                                :tooltip="'Seleccione para poder ver los bancos.'"
                              />
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
                                :tooltip="'Sucursal para pago electrónico.'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
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
                                :tooltip="'Numero de cuenta para pago electrónico.'"
                                @keypress="inputFilters.onlyAlphanumeric"
                              />
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
                                :tooltip="'Clabe interbancaria.'"
                                @keypress="inputFilters.onlyNumbers"
                              />
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
                    </v-tabs-window-item>
                  </v-tabs-window>
                </v-form>
              </div>
            </div>
          </v-tabs-window-item>
          <!-- Empresa no fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa02" eager> </v-tabs-window-item>
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

    // 4. Reactive
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
    const vtabMenuItems = ref([
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
    const vtabGraficaSelected = ref<any>('tabBarrasV')

    const cardHeight = ref(0)

    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: false,
      activarRegistro: false,
      crearRegistro: true,

      compCliente: false,
      compTipoEmp: true,
      compEmpresa: true,
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
      return validationRules.codeMask(empresaStore.empresa?.mascarillacodigo ?? '')
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
        const fecha =
          val.fechanacimiento instanceof Date
            ? val.fechanacimiento.toISOString().split('T')[0] // convierte a 'YYYY-MM-DD'
            : typeof val.fechanacimiento === 'string'
              ? val.fechanacimiento
              : undefined

        const sexoCurp = val.sexo === 'F' ? 'M' : 'H'

        const parcial = generarCurpExtendida({
          nombre: val.nombre || '',
          apellidopaterno: val.apellidopaterno || '',
          apellidomaterno: val.apellidomaterno || '',
          fechanacimiento: fecha,
          sexo: sexoCurp,
          entidadnacimiento: val.entidadnacimiento,
        })

        if (parcial) {
          dataModel.value.curpCompleto = parcial
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
          dataModel.value.curpf = curp.slice(4) // fecha + sexo + entidad + demás
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
          dataModel.value.curpCompleto = ''
          dataModel.value.curpi = ''
          dataModel.value.curpf = ''
        }
      },
      { immediate: true },
    )

    watch(
      () => empresaStore.siguienteCodigo,
      (nuevoCodigo) => {
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

      const fiscal = dataModel.value.fiscal

      if (!fiscal) {
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
      const fiscal = dataModel.value.fiscal
    }

    const buscarEmpresasNomina = async () => {
      resetModel(true)

      const idCliente = dataModel.value.id_nomina_gape_cliente
      const fiscal = dataModel.value.fiscal

      btnDisabled.value.compTipoEmp = idCliente != null ? false : true
      btnDisabled.value.compEmpresa = idCliente != null ? false : true

      // ✅ Si el cliente está seleccionado, aplicar la lógica fiscal/no fiscal
      await fetchEmpresasNominaPorClienteTipo(idCliente, fiscal)
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

    const cargarCatalogosPorEmpresa = async (idEmpresa: number) => {
      await Promise.all([
        tipoContratoStore.catalogoTipoContrato(idEmpresa),
        tipoPeriodoStore.catalogoTipoPeriodo(idEmpresa),
        departamentoStore.catalogoDepartamento(idEmpresa),
        puestoStore.catalogoPuesto(idEmpresa),
        tipoPrestacionStore.catalogoTipoPrestacion(idEmpresa),
        turnoStore.catalogoTurno(idEmpresa),
        tipoRegimenStore.catalogoTipoRegimen(idEmpresa),
        registroPatronalStore.catalogoRegistroPatronal(idEmpresa),
        entidadFederativaStore.catalogoEntidadFederativa(idEmpresa),
        bancoStore.catalogoBanco(idEmpresa),
        empresaStore.catalogoEmpresa(idEmpresa),
        tipoJornadaStore.catalogoTipoJornada(idEmpresa),

        (dataModel.value.zonasalario = empresaStore.empresa?.zonasalariogeneral ?? ''),
      ])
    }

    const onDecision = () => {
      dialogConfirmation.onOpenDialogConfirmation(
        '¿Estás seguro de guardar el registro?',
        validateForm, // << callback directo
        [],
        'Confirmación',
        'alert',
      )
    }

    const validateForm = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      const formRef = dataModel.value.fiscal ? formRefFiscal.value : formRefNoFiscal.value

      const form = await formRef.value?.validate()

      if (!form) return

      if (form.valid) {
        try {
          loading.value = true

          dataModel.value.ExtranjeroSinCURP = dataModel.value.ExtranjeroSinCURP
          await empleadoStore.guardarEmpleado(dataModel.value)

          await form.value?.reset()

          dialogConfirmation.onOpenDialogInformation(
            'Los datos se guardarán en la base de datos.',
            'Titulo',
            'alert',
            '#438701',
            1,
          )
          // Snackbar o confirmación aquí
        } catch (error) {
          console.error('Error al guardar empleado:', error)
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
      vtabGraficaSelected,
      vtabMenuItems,
      vtabTipoEmpresa,
      vtabTipoEmpresaRef,
    }
  },
})
</script>
