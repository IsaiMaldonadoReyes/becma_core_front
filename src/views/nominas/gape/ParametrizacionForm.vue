<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <v-form ref="formRefParametrizacion" v-model="isFormValid" lazy-validation>
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
        <v-col cols="12" lg="9">
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
                    es necesario configurar la parametrización de la prenómina para cada una de las
                    empresas de cada cliente.<br />
                    Elija el <b style="color: #2a73c5"><i>CLIENTE</i></b> para después elegir la
                    empresa a la que desea configurar su parametrización.
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </bec-autocomplete>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex align-start justify-end">
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
                    elija el tipo de empresa (fiscal o no fiscal) para mostrar únicamente las
                    empresas correspondientes.
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
        <v-col cols="12" lg="9">
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
            @update:model-value="buscarDatosPorEmpresa"
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
                    elija la empresa a la que desea definir los parámetros de la prenómina.
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
                <v-divider class="border-opacity-50 my-2 mx-2" />
                <v-row>
                  <v-col cols="1" class="d-flex align-center justify-center">
                    <v-icon icon="mdi-cursor-default-click" />
                  </v-col>
                  <v-col cols="11">
                    <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                    al seleccionar una opción en este campo, se habilitará y mostrará la información
                    correspondiente de: <b style="color: #2a73c5"><i>TIPO DE PERIODO</i></b>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </bec-autocomplete>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex align-start justify-end">
          <bec-autocomplete
            v-model="dataModel.id_tipo_periodo"
            :clearable="false"
            :disabled="btnDisabled.compTipoPeriodo"
            :item-title="'nombretipoperiodo'"
            :item-value="'idtipoperiodo'"
            :items="itemsTipoPeriodoNomina"
            :label="'Tipo de periodo '"
            :multiple="false"
            :prepend-icon="'mdi-briefcase-account'"
            :return-object="false"
            :show-chips="false"
          >
            <template #tooltip>
              <v-card
                :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                class="pa-3"
                color="transparent"
                elevation="0"
              >
                <v-row>
                  <v-col cols="1" class="d-flex align-center justify-center">
                    <v-icon class="mr-1" color="white" icon="mdi-information-slab-circle-outline" />
                  </v-col>
                  <v-col cols="11">
                    <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                    la parametrización debe configurarse de forma independiente para cada uno de los
                    tipos de periodo manejados dentro de la empresa. <br />Elija el tipo de periodo
                    (periodicidad) para el cual desea definir la configuración de parametrización de
                    prenómina.
                  </v-col>
                </v-row>
                <v-divider class="border-opacity-50 my-2 mx-2" />
                <v-row>
                  <v-col cols="1" class="d-flex align-center justify-center">
                    <v-icon class="mr-1" color="white" icon="mdi-file-rotate-left" />
                  </v-col>
                  <v-col cols="11">
                    <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
                    debe seleccionar primero una <b style="color: #2a73c5"><i>EMPRESA</i></b> fiscal
                    para poder habilitar este campo y mostrar los tipos de periodo manejados en la
                    empresa.
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

      <v-row class="overflow-auto" :style="getCardHeight">
        <v-col cols="12" lg="6">
          <v-card-title color="primary" class="text-primary text-body-1">
            Conceptos alternativos de pago
          </v-card-title>
          <v-divider class="border-opacity-25 ma-0 pa-0" />
          <v-data-table
            hide-default-footer
            v-model="itemsSeleccionados"
            :headers="headers"
            :hover="true"
            :items="itemsConceptos"
            :mobile="smAndDown"
            eager
            item-value="Codigo"
            show-select
            color="transparent"
          >
            <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
              <v-btn-group
                class="border-opacity-25"
                color="primary"
                density="compact"
                divided
                variant="outlined"
              >
                <v-btn density="compact" stacked class="pa-2" style="min-width: auto">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-checkbox-btn
                        v-bind="mergeProps(tooltip)"
                        :indeterminate="someSelected && !allSelected"
                        :model-value="allSelected"
                        density="compact"
                        true-icon="mdi-checkbox-multiple-marked"
                        @update:model-value="selectAll(!allSelected)"
                        class="pa-0"
                      />
                    </template>
                    <span>Seleccionar todo</span>
                  </v-tooltip>
                </v-btn>
              </v-btn-group>
            </template>
            <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
              <v-checkbox-btn
                :model-value="isSelected(internalItem)"
                color="primary"
                @update:model-value="toggleSelect(internalItem)"
              />
            </template>
            <template v-slot:item.seleccionado="{ item }">
              <v-chip
                :color="itemsSeleccionados.some((i) => i === item.Codigo) ? 'primary' : 'grey'"
                size="small"
                label
                variant="flat"
              >
                {{
                  itemsSeleccionados.some((i) => i === item.Codigo) ? 'Habilitado' : 'Inhabilitado'
                }}
              </v-chip>
            </template>
            <!-- solo sobrescribes la columna 'nombre' -->
            <template v-slot:item.tope="{ item }">
              <v-text-field
                v-model="item.tope"
                :placeholder="'0.00'"
                class="text-end"
                clear-icon="mdi-close"
                color="primary"
                density="compact"
                hide-details
                prefix="$"
                variant="underlined"
                @keypress="inputFilters.onlyDecimal"
              />
            </template>

            <!-- sobrescribes la columna 'drag' -->
            <template v-slot:item.drag="{ index }">
              <div style="pointer-events: auto; cursor: help">
                <v-tooltip location="bottom">
                  <template #activator="{ props: tooltipProps }">
                    <v-icon
                      v-bind="mergeProps(tooltipProps)"
                      class="draggable-row"
                      color="primary"
                      draggable="true"
                      icon="mdi-drag"
                      @dragover.prevent
                      @dragstart="onDragStart(index)"
                      @drop="onDrop(index)"
                    />
                  </template>
                  <template #default>
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
                          arrastre y suelte los conceptos alternativos de pago para organizarlos en
                          el orden deseado. <br />
                          El sistema utilizará este orden para calcular los excedentes durante el
                          proceso de cálculo de la prenómina.
                        </v-col>
                      </v-row>
                    </v-card>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card-title color="primary" class="text-primary text-body-1">
            Parametrización
          </v-card-title>
          <v-divider class="border-opacity-25 ma-0 pa-0" />
          <v-row class="mt-3">
            <v-col cols="12">
              <bec-select
                v-model="parametrizacionModel.clase_prima_riesgo"
                :items="itemsClasePrimaRiesgo"
                :item-title="'concepto'"
                :item-value="'codigo'"
                :label="'Clase de Prima de Riesgo'"
                :multiple="false"
                :placeholder="'Seleccione'"
                :prepend-icon="'mdi-account-key'"
                :tooltip="'Clase de Prima de Riesgo'"
                :rules="[validationRules.required]"
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
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">Elija la Clase prima de riesgo.</v-col>
                    </v-row>
                    <v-divider class="border-opacity-50 my-2 mx-2" />
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-cursor-default-click" />
                      </v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
                        al seleccionar la opción <b style="color: #2a73c5"><i>ACTUALIZADA</i></b> en
                        este campo, se habilitará el campo
                        <b style="color: #2a73c5"><i>PRIMA DE RIESGO ACTUALIZADA</i></b> para que
                        pueda capturar su valor correspondiente.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-select>
            </v-col>
            <v-col v-if="parametrizacionModel.clase_prima_riesgo === 'media'" cols="12">
              <bec-text-field
                v-model="parametrizacionModel.clase_prima_riesgo_valor"
                :label="'Clase Valor'"
                :placeholder="'0.00'"
                :prefix="'%'"
                :prepend-icon="'mdi-account-key'"
                :tooltip="'Base FEE'"
                :rules="[validationRules.required]"
                @keypress="inputFilters.onlyNumbers"
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
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">Capture el valor de la prima de riesgo actualizada.</v-col>
                    </v-row>
                    <v-divider class="border-opacity-50 my-2 mx-2" />
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon class="mr-1" color="white" icon="mdi-file-rotate-left" />
                      </v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
                        debe seleccionar primero la opción:
                        <b style="color: #2a73c5"><i>ACTUALIZADA</i></b> del campo
                        <b style="color: #2a73c5"><i>CLASE PRIMA DE RIESGO</i></b> para poder
                        habilitar este campo.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
            <v-col cols="12">
              <bec-text-field
                v-model="parametrizacionModel.fee"
                :label="'FEE'"
                :placeholder="'0.00'"
                :prepend-icon="'mdi-account-cash'"
                :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                :rules="[validationRules.required]"
                @keypress="inputFilters.onlyNumbers"
              >
                <template #tooltip>
                  <v-card
                    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                    class="pa-3"
                    color="transparent"
                    elevation="0"
                  >
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">Porcentaje de comisión que se aplicará al cliente.</v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
            <v-col cols="12">
              <bec-select
                v-model="parametrizacionModel.base_fee"
                :items="itemsBaseFEE"
                :item-title="'concepto'"
                :item-value="'codigo'"
                :label="'Base FEE'"
                :multiple="false"
                :placeholder="'Seleccione'"
                :prepend-icon="'mdi-account-cash'"
                :tooltip="'Base FEE'"
                :rules="[validationRules.required]"
              >
                <template #tooltip>
                  <v-card
                    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                    class="pa-3"
                    color="transparent"
                    elevation="0"
                  >
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">
                        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span> indique
                        la base de cálculo que se utilizará para determinar la comisión aplicada al
                        cliente.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-select>
            </v-col>
            <v-col cols="12">
              <bec-select
                v-model="parametrizacionModel.provisiones"
                :items="itemsComprobacion"
                :item-title="'concepto'"
                :item-value="'codigo'"
                :label="'Provisiones'"
                :multiple="false"
                :placeholder="'Seleccione'"
                :prepend-icon="'mdi-hand-coin'"
                :tooltip="'Base FEE'"
                :rules="[validationRules.required]"
              >
                <template #tooltip>
                  <v-card
                    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                    class="pa-3"
                    color="transparent"
                    elevation="0"
                  >
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">
                        Corresponde a las provisiones de las prestaciones de ley, como aguinaldo y
                        prima vacacional, que deberán calcularse y provisionarse conforme a cada
                        periodo de pago, cuando aplique.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-select>
            </v-col>
            <v-col cols="12">
              <bec-text-field
                v-model="parametrizacionModel.isn"
                :label="'ISN'"
                :placeholder="'0.00'"
                :prefix="'%'"
                :prepend-icon="'mdi-bank-transfer-out'"
                :tooltip="'Se requiere reporte de ISN mensual.<br><br>Fecha creación: 01/02/2025 14:56<br>Fecha modificación: 01/02/2025 14:56'"
                :rules="[validationRules.required]"
                @keypress="inputFilters.onlyNumbers"
              >
                <template #tooltip>
                  <v-card
                    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                    class="pa-3"
                    color="transparent"
                    elevation="0"
                  >
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon
                          class="mr-1"
                          color="white"
                          icon="mdi-information-slab-circle-outline"
                        />
                      </v-col>
                      <v-col cols="11">
                        Capture el porcentaje correspondiente al Impuesto Sobre Nómina (ISN).
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-text-field>
            </v-col>
            <v-col cols="12">
              <bec-select
                v-model="parametrizacionModel.cuota_sindical"
                :items="itemsComprobacion"
                :item-title="'concepto'"
                :item-value="'codigo'"
                :label="'Cuota sindical'"
                :multiple="false"
                :placeholder="'Seleccione'"
                :prepend-icon="'mdi-cash-refund'"
                :tooltip="'Es el % de retención que se tiene que se tiene que realizar a en la nómina fiscal, sobre sueldo o percepción bruta a los trabajadores agremiados.'"
                :rules="[validationRules.required]"
              >
                <template #tooltip>
                  <v-card
                    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                    class="pa-3"
                    color="transparent"
                    elevation="0"
                  >
                    <v-row>
                      <v-col cols="1" class="d-flex align-center justify-center">
                        <v-icon color="white" icon="mdi-information-slab-circle-outline" />
                      </v-col>
                      <v-col cols="11">
                        Corresponde al porcentaje de retención que se aplicará en la nómina fiscal a
                        los trabajadores agremiados, tomando como base su sueldo o percepción bruta.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import {
  ref,
  computed,
  defineComponent,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
} from 'vue'

import { useDisplay } from 'vuetify'

// import interface
import type { ConceptosPagoModel } from '@/interfaces/nomina/gape/ConceptosPagoModel'
import type { BaseFeeModel } from '@/interfaces/nomina/gape/BaseFeeModel'
import type { ClasePrimaRiesgoModel } from '@/interfaces/nomina/gape/ClasePrimaRiesgoModel'

// import composables
import { useConceptoPagoParametrizacionModel } from '@/composables/nomina/gape/useConceptoPagoParametrizacion'
import { useParametrizacionModel } from '@/composables/nomina/gape/useParametrizacion'

// import stores
import { useEmpresaStore } from '@/stores/modules/Nomina/gape/Empresa'
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { useTipoPeriodoStore } from '@/stores/modules/Nomina/default/TipoPeriodo'
import { useConceptoPagoParametrizacionStore } from '@/stores/modules/Nomina/gape/ConceptoPagoParametrizacion'
import { useParametrizacionStore } from '@/stores/modules/Nomina/gape/Parametrizacion'

// import utils
import { getDefaultConceptosPago } from '@/utils/nomina/gape/getDefaultConceptosPago'
import { getDefaultBaseFee } from '@/utils/nomina/gape/getDefaultBaseFee'
import { getDefaultClasePrimaRiesgo } from '@/utils/nomina/gape/getDefaultClasePrimaRiesgo'

// import components
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import router
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ParametrizacionForm',
  components: { BecSelect, BecAutocomplete, BecTextField },
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

    // 3. Composables (funciones reutilizables de Vuetify)
    const router = useRouter()

    const { dataModel, setConceptoPagoParametrizacion, resetModel } =
      useConceptoPagoParametrizacionModel()

    const { dataModel: parametrizacionModel } = useParametrizacionModel()

    const tipoPeriodoStore = useTipoPeriodoStore()
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresaStore()

    const conceptoParametrizacionStore = useConceptoPagoParametrizacionStore()
    const parametrizacionStore = useParametrizacionStore()

    const { name, mobile, smAndDown } = useDisplay()
    const dialogConfirmation = useDialogManagerStore()

    // 4. Reactive
    const vrowBarraDeAccionesRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: '/nominas/gape/parametrizacionList',
        title: 'Parametrización',
      },
      {
        disabled: false,
        title: 'Formulario',
      },
    ])

    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

    const loading = ref(false)
    const formRefParametrizacion = ref()
    const isFormValid = ref(false)

    const cardHeight = ref(0)

    const itemsComprobacion = ref([
      { concepto: 'Si', codigo: 'si' },
      { concepto: 'No', codigo: 'no' },
    ])

    const itemsClasePrimaRiesgo: Ref<ClasePrimaRiesgoModel[]> = ref(getDefaultClasePrimaRiesgo())
    const itemsBaseFEE: Ref<BaseFeeModel[]> = ref(getDefaultBaseFee())

    const itemsConceptos: Ref<ConceptosPagoModel[]> = ref(getDefaultConceptosPago())
    const itemsSeleccionados: Ref<string[]> = ref([])

    const headers = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      { title: '', key: 'seleccionado', width: '5%', sortable: false },
      { title: 'Concepto', key: 'concepto', sortable: false },
      { title: 'Tope', key: 'tope', sortable: false },
      { title: '', key: 'drag', sortable: false, align: 'center' },
    ])

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
      compTipoPeriodo: true,
    })

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresasList)
    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
      })
      await fetchClientes()

      if (props.id !== undefined && props.id !== null) {
        btnDisabled.value.compCliente = true
        btnDisabled.value.compTipoEmp = true
        btnDisabled.value.compEmpresa = true
        btnDisabled.value.compTipoPeriodo = true

        btnDisabled.value.crearRegistro = false

        await fetchDatosParametrizacionPorId(props.id)
      } else {
        if (Array.isArray(itemsClientesNomina.value) && itemsClientesNomina.value.length > 0) {
          btnDisabled.value.compTipoEmp = false
        } else {
          btnDisabled.value.compTipoEmp = true
        }
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async)

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight
      }
    }

    const fetchDatosParametrizacionPorId = async (idParametrizacion: any) => {
      try {
        const data = {
          id: idParametrizacion,
        }
        await conceptoParametrizacionStore.parametrizacionConceptosPorId(data)
        if (
          conceptoParametrizacionStore.data &&
          !Array.isArray(conceptoParametrizacionStore.data)
        ) {
          const idCliente = Number(conceptoParametrizacionStore.data.id_nomina_gape_cliente)
          const fiscal = conceptoParametrizacionStore.data.id_tipo_periodo == null ? false : true
          const idEmpresa = conceptoParametrizacionStore.data.id_nomina_gape_empresa
          const idTipoPeriodo = conceptoParametrizacionStore.data.id_tipo_periodo ?? null
          const estado = conceptoParametrizacionStore.data.estado
          await fetchEmpresasNominaPorClienteTipo(idCliente, fiscal)

          dataModel.value.id_nomina_gape_cliente = idCliente
          dataModel.value.id_nomina_gape_empresa = idEmpresa
          dataModel.value.fiscal = fiscal
          dataModel.value.id_tipo_periodo = idTipoPeriodo
          dataModel.value.estado = estado

          if (fiscal)
            tipoPeriodoStore.tipoPeriodoNGE({
              id: idEmpresa,
              idCliente: idCliente,
              action: 'update',
            })

          const conceptosOrdenados = buildConceptosDesdeBackend(conceptoParametrizacionStore.data)

          itemsConceptos.value = conceptosOrdenados
          itemsSeleccionados.value = conceptosOrdenados.filter((c) => c.Activo).map((c) => c.Codigo)

          await fetchParametrizacion(idCliente, idEmpresa, idTipoPeriodo)

          if (parametrizacionStore.data && !Array.isArray(parametrizacionStore.data)) {
            parametrizacionModel.value.clase_prima_riesgo =
              parametrizacionStore.data.clase_prima_riesgo
            parametrizacionModel.value.clase_prima_riesgo_valor =
              parametrizacionStore.data.clase_prima_riesgo_valor
            parametrizacionModel.value.fee = parametrizacionStore.data.fee
            parametrizacionModel.value.base_fee = parametrizacionStore.data.base_fee
            parametrizacionModel.value.provisiones = parametrizacionStore.data.provisiones
            parametrizacionModel.value.isn = parametrizacionStore.data.isn
            parametrizacionModel.value.cuota_sindical = parametrizacionStore.data.cuota_sindical
          }
        }
      } catch (error) {
        console.error('Error al cargar datos de la parametrizacion:', error)
      }
    }

    const fetchParametrizacion = async (idCliente: any, idEmpresa: any, idTipoPeriodo: any) => {
      try {
        const data = {
          idNominaGapeCliente: idCliente,
          idNominaGapeEmpresa: idEmpresa,
          idTipoPeriodo: idTipoPeriodo ?? null,
        }
        await parametrizacionStore.parametrizacionPorId(data)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const buildConceptosDesdeBackend = (data: any) => {
      if (!data) return []

      const conceptos = [
        { Codigo: 'sueldo_imss', concepto: 'Sueldo IMSS' },
        { Codigo: 'prev_social', concepto: 'Prev. Soc.' },
        { Codigo: 'fondos_sind', concepto: 'Fondos Sind.' },
        { Codigo: 'tarjeta_facil', concepto: 'Tarjeta Fácil' },
        { Codigo: 'hon_asimilados', concepto: 'Hon. Asimilados' },
        { Codigo: 'gastos_compro', concepto: 'Gastos por comprobar' },
      ]

      return conceptos
        .map((c) => ({
          Codigo: c.Codigo,
          concepto: c.concepto,
          tope: Number(data[`${c.Codigo}_tope`] ?? 0),
          Orden: Number(data[`${c.Codigo}_orden`] ?? 0),
          Activo: data[c.Codigo] === 1 || data[c.Codigo] === true || data[c.Codigo] === '1', // ✅ corrige el bug del Boolean("0")
        }))
        .sort((a, b) => a.Orden - b.Orden)
    }

    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    const fetchEmpresasNominaPorClienteTipo = async (idCliente: any, fiscal: boolean) => {
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

    const buscarEmpresasNomina = async (codigo: any) => {
      resetModel(true)

      empresasStore.reset()
      tipoPeriodoStore.reset()

      const idCliente = dataModel.value.id_nomina_gape_cliente
      const fiscal = dataModel.value.fiscal

      btnDisabled.value.compEmpresa = idCliente != null ? false : true

      // ✅ Si el cliente está seleccionado, aplicar la lógica fiscal/no fiscal
      await fetchEmpresasNominaPorClienteTipo(idCliente, fiscal)
      if (fiscal) {
        btnDisabled.value.compTipoPeriodo = false
      } else {
        btnDisabled.value.compTipoPeriodo = true
      }
    }

    const buscarDatosPorEmpresa = async () => {
      tipoPeriodoStore.reset()

      const idEmpresa = dataModel.value.id_nomina_gape_empresa
      const idCliente = dataModel.value.id_nomina_gape_cliente
      const fiscal = dataModel.value.fiscal

      if (fiscal && idEmpresa != null) {
        const data = {
          id: idEmpresa,
          idCliente: idCliente,
          action: 'new',
        }
        tipoPeriodoStore.tipoPeriodoNGE(data)
      } else {
      }
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

      let idParametrizacionCreado = null

      // Validar el formulario seleccionado
      const isValid = await formRefParametrizacion.value?.validate()

      if (!isValid) return

      if (isValid.valid) {
        try {
          loading.value = true

          let titulo = 'Registro guardado'
          let mensaje = 'Los datos se guardaron de forma exitosa.'

          if (props.id !== undefined && props.id !== null) {
            titulo = 'Registro actualizado'
            mensaje = 'Los datos se actualizaron de forma exitosa.'
          }

          const payload = buildConceptoParametrizacionPayload()

          const payloadParametrizacion = buildParametrizacionPayload()

          const responde =
            await conceptoParametrizacionStore.storeConceptoPagoParametrizacion(payload)

          await conceptoParametrizacionStore.upsertParametrizacion(payloadParametrizacion)

          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)

          if (props.id !== undefined && props.id !== null) {
          } else {
            idParametrizacionCreado = responde.data.id
            router.push({ path: `/nominas/gape/parametrizacionForm/${idParametrizacionCreado}` })
          }

          //await isValid.reset()
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

    const buildConceptoParametrizacionPayload = () => {
      const selectedPeriodo = itemsTipoPeriodoNomina.value.find(
        (p: any) => p.idtipoperiodo === dataModel.value.id_tipo_periodo,
      )

      const payload: any = {
        id_nomina_gape_cliente: dataModel.value.id_nomina_gape_cliente,
        id_nomina_gape_empresa: dataModel.value.id_nomina_gape_empresa,
        id_tipo_periodo: dataModel.value.id_tipo_periodo,
        estado: dataModel.value.estado,
        tipo_periodo_nombre: selectedPeriodo?.nombretipoperiodo || null,
      }

      itemsConceptos.value.forEach((concepto, index) => {
        const codigo = concepto.Codigo // ejemplo: 'sueldo_imss'
        const activo = itemsSeleccionados.value.includes(codigo) // true si está seleccionado

        // boolean
        payload[codigo] = activo
        // tope numérico (parseFloat para asegurar formato correcto)
        payload[`${codigo}_tope`] = concepto.tope ? parseFloat(concepto.tope as any) : 0 // orden numérico
        payload[`${codigo}_orden`] = index + 1
      })

      return payload
    }

    const buildParametrizacionPayload = () => {
      const selectedPeriodo = itemsTipoPeriodoNomina.value.find(
        (p: any) => p.idtipoperiodo === dataModel.value.id_tipo_periodo,
      )

      const payload: any = {
        id_nomina_gape_cliente: dataModel.value.id_nomina_gape_cliente,
        id_nomina_gape_empresa: dataModel.value.id_nomina_gape_empresa,
        id_tipo_periodo: dataModel.value.id_tipo_periodo,
        tipo_periodo_nombre: selectedPeriodo?.nombretipoperiodo || null,

        clase_prima_riesgo: parametrizacionModel.value.clase_prima_riesgo,
        clase_prima_riesgo_valor: parametrizacionModel.value.clase_prima_riesgo_valor,
        fee: parametrizacionModel.value.fee,
        base_fee: parametrizacionModel.value.base_fee,
        provisiones: parametrizacionModel.value.provisiones,
        isn: parametrizacionModel.value.isn,
        cuota_sindical: parametrizacionModel.value.cuota_sindical,
      }

      return payload
    }

    let dragIndex = -1

    function onDragStart(index: number) {
      dragIndex = index
    }

    function onDrop(dropIndex: number) {
      if (dragIndex === -1 || dragIndex === dropIndex) return
      const moved = itemsConceptos.value.splice(dragIndex, 1)[0]
      itemsConceptos.value.splice(dropIndex, 0, moved)
      dragIndex = -1
    }

    return {
      btnDisabled,
      buscarDatosPorEmpresa,
      buscarEmpresasNomina,
      dataModel,
      formRefParametrizacion,
      getCardHeight,
      headers,
      inputFilters,
      isFormValid,
      itemsBaseFEE,
      itemsClasePrimaRiesgo,
      itemsClientesNomina,
      itemsComprobacion,
      itemsConceptos,
      itemsEmpresaDatabase,
      itemsSeleccionados,
      itemsTipoPeriodoNomina,
      loading,
      mergeProps,
      name,
      onDecision,
      onDragStart,
      onDrop,
      parametrizacionModel,
      smAndDown,
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
