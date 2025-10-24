<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef">
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
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 my-2 border-opacity-50" vertical />

        <!-- vbtnCargar -->
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
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
        <v-tooltip bottom color="primary" interactive>
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
              <v-icon icon="mdi-floppy" color="white" size="24px" />
            </v-btn>
          </template>
          <span>Guardar</span>
        </v-tooltip>

        <!-- vbtnActivar -->
        <v-tooltip bottom color="primary" interactive>
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
              <v-icon color="white" size="24px">
                {{ vbtnActivarRegistro ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ vbtnActivarRegistro ? ' ACTIVAR ' : 'DESACTIVAR' }}
              </i>
            </b>
            este registro
          </span>
        </v-tooltip>

        <!--vbtnCrear-->
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
              v-bind="mergeProps(tooltipProps)"
              color="primary"
              height="40px"
              min-width="40px"
              width="40px"
              :disabled="btnDisabled.crearRegistro"
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
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="itemsClientesNomina"
          :label="'Cliente'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :show-chips="false"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                </v-col>
                <v-col cols="11">Elija el cliente al que se asociará la nueva empresa.</v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-alert" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold">Nota:</span>
                  antes de crear una nueva empresa, seleccione el cliente correspondiente. Esto le
                  permitirá continuar con el proceso de registro.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-autocomplete>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex align-start justify-end">
        <!--v-switch
          v-model="vswiFiscal"
          false-icon="mdi-bank-off"
          hide-details
          inset
          true-icon="mdi-bank"
          :label="vswiFiscal ? 'Empresa fiscal' : 'Empresa no fiscal'"
          class="text-medium-emphasis"
          density="compact"
        /-->
        <bec-select
          v-model="vswiFiscal"
          :items="[
            { title: 'Empresa fiscal', value: true },
            { title: 'Empresa no fiscal', value: false },
          ]"
          :item-title="'title'"
          :item-value="'value'"
          :label="'Tipo de empresa'"
          :multiple="false"
          :placeholder="'Seleccione'"
          :prepend-icon="'mdi-briefcase-account'"
          :rules="[validationRules.required]"
        >
          <template #tooltip>
            <v-card color="transparent" elevation="0" class="pa-3">
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-briefcase-account" />
                </v-col>
                <v-col cols="11">
                  Elija el tipo de empresa que desea registrar: <br />
                  - Fiscal: la información será considerada para procesos fiscales.
                  <br />
                  - No fiscal: se usa para registros sin efectos fiscales.
                </v-col>
              </v-row>
              <v-divider class="border-opacity-50 my-2 mx-2" />
              <v-row>
                <v-col cols="1" class="d-flex align-center justify-center">
                  <v-icon class="mr-1" color="white" icon="mdi-alert" />
                </v-col>
                <v-col cols="11">
                  <span style="font-weight: bold">Nota:</span>
                  antes de crear una nueva empresa, seleccione el tipo de empresa que desea
                  registrar.
                </v-col>
              </v-row>
            </v-card>
          </template>
        </bec-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <!-- vtabMenuRef -->
    <v-row ref="vtabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs v-model="vtabMenuModel" class="text-medium-emphasis" color="primary" grow>
          <v-tab
            prepend-icon="mdi-bank"
            value="tab01"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="vswiFiscal ? false : true"
            variant="tonal"
          >
            Fiscal
          </v-tab>
          <v-tab
            prepend-icon="mdi-bank-off"
            value="tab02"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="!vswiFiscal ? false : true"
          >
            No fiscal
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- vtabTipoEmmpresa-->
        <v-tabs-window v-model="vtabMenuModel">
          <!-- Fiscal -->
          <v-tabs-window-item value="tab01" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <!-- vtabDatos -->
              <v-tabs
                v-model="tabEmpresa"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                class="text-medium-emphasis tab-right border"
                color="primary"
                show-arrows
                width="100px"
              >
                <v-tab
                  :variant="tabEmpresa == 'option-1' ? 'tonal' : 'text'"
                  class="text-none text-no-wrap"
                  min-width="100%"
                  prepend-icon="mdi-account"
                  style="letter-spacing: 0.5px"
                  text="Datos generales"
                  value="option-1"
                ></v-tab>
                <v-tab
                  :variant="tabEmpresa == 'option-2' ? 'tonal' : 'text'"
                  class="text-none"
                  min-width="100%"
                  prepend-icon="mdi-bank"
                  style="letter-spacing: 0.5px"
                  text="Bancos"
                  value="option-2"
                ></v-tab>
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-tabs-window v-model="tabEmpresa" :mobile="smAndDown">
                  <v-tabs-window-item value="option-1">
                    <v-row>
                      <v-col>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                        <v-card-title color="primary" class="text-primary text-body-1">
                          Datos generales de la empresa
                        </v-card-title>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                      </v-col>
                    </v-row>
                    <v-row class="mt-1">
                      <v-col cols="12">
                        <bec-autocomplete
                          v-model="dataModel.id_empresa_database"
                          :item-subtitle="(item) => `${item.nombre_base}`"
                          :item-title="'nombre_empresa'"
                          :item-value="'id'"
                          :items="itemsEmpresaDatabase"
                          :label="'Empresa CONTAPQi Nóminas'"
                          :multiple="false"
                          :prepend-icon="'mdi-briefcase-account'"
                          :return-object="false"
                          :rules="[validationRules.required2]"
                          :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
                        />
                      </v-col>
                      <v-col cols="12">
                        <bec-text-field
                          v-model="dataModel.razon_social"
                          disabled
                          :label="'Razón Social'"
                          :prepend-icon="'mdi-briefcase-account'"
                          :rules="[validationRules.required]"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12">
                        <bec-text-field
                          v-model="dataModel.rfc"
                          disabled
                          :label="'RFC'"
                          :prepend-icon="'mdi-briefcase-account'"
                          :rules="[validationRules.required]"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6" md="12">
                        <bec-text-field
                          v-model="dataModel.correo_notificacion"
                          :label="'Correo asignado para notificaciones'"
                          :prepend-icon="'mdi-email'"
                          :rules="[validationRules.required]"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                      <v-col cols="12" lg="6" md="12">
                        <bec-text-field
                          v-model="dataModel.codigo_interno"
                          :label="'Código interno'"
                          :prepend-icon="'mdi-barcode'"
                          :rules="[validationRules.required]"
                          :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                        />
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="option-2">
                    <v-row>
                      <v-col>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                        <v-card-title color="primary" class="text-primary text-body-1">
                          Configuración de bancos para layouts de dispersión
                        </v-card-title>
                        <v-divider class="border-opacity-25 ma-0 pa-0" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-data-iterator :items="itemsBanco" items-per-page="-1">
                          <template v-slot:default="{ items }">
                            <v-row>
                              <v-col key="id" cols="12" md="12">
                                <v-card
                                  class="rounded d-flex justify-center align-center mx-4 pa-2 border"
                                  elevation="0"
                                  min-height="60px"
                                >
                                  <v-row class="pa-2">
                                    <v-col cols="12">
                                      <v-expansion-panels elevation="0" class="border-0">
                                        <v-expansion-panel class="border" readonly expand-icon="">
                                          <v-expansion-panel-title v-slot="{ expanded }">
                                            <v-row class="pa-2">
                                              <v-col cols="9">
                                                <v-row>
                                                  <v-col cols="2">
                                                    <v-switch
                                                      v-model="modelEmpresa"
                                                      false-icon="mdi-bank-off"
                                                      hide-details
                                                      inset
                                                      true-icon="mdi-bank"
                                                      class="text-medium-emphasis"
                                                      density="compact"
                                                      color="primary"
                                                      @click.stop
                                                    />
                                                  </v-col>
                                                  <v-col
                                                    cols="6"
                                                    class="d-flex align-center justify-end"
                                                  >
                                                    Fondeadora
                                                  </v-col>
                                                </v-row>
                                              </v-col>

                                              <v-col
                                                v-if="expanded"
                                                cols="3"
                                                class="d-flex align-center justify-end"
                                              >
                                                <!-- vbtnEliminar -->
                                                <v-divider
                                                  vertical
                                                  class="mr-3 my-2 border-opacity-25"
                                                />
                                                <v-tooltip bottom color="primary" interactive>
                                                  <template
                                                    v-slot:activator="{ props: tooltipProps }"
                                                  >
                                                    <v-btn
                                                      v-bind="mergeProps(tooltipProps)"
                                                      color="primary"
                                                      flat
                                                      height="40px"
                                                      min-width="40px"
                                                      width="40px"
                                                      @click.stop="console.log('holas')"
                                                    >
                                                      <v-icon
                                                        color="white"
                                                        icon="mdi-plus"
                                                        size="24px"
                                                      />
                                                    </v-btn>
                                                  </template>
                                                  <span>Quitar recibo</span>
                                                </v-tooltip>
                                              </v-col>
                                            </v-row>
                                          </v-expansion-panel-title>
                                        </v-expansion-panel>
                                        <v-expansion-panel
                                          class="border"
                                          collapse-icon="mdi-menu-up"
                                          expand-icon="mdi-menu-down"
                                        >
                                          <v-expansion-panel-title v-slot="{ expanded }">
                                            <v-row class="pa-2">
                                              <v-col cols="9">
                                                <v-row>
                                                  <v-col cols="2">
                                                    <v-switch
                                                      v-model="modelEmpresa"
                                                      false-icon="mdi-bank-off"
                                                      hide-details
                                                      inset
                                                      true-icon="mdi-bank"
                                                      class="text-medium-emphasis"
                                                      density="compact"
                                                      color="primary"
                                                      @click.stop
                                                    />
                                                  </v-col>
                                                  <v-col
                                                    cols="6"
                                                    class="d-flex align-center justify-end"
                                                  >
                                                    Azteca interbancario
                                                  </v-col>
                                                </v-row>
                                              </v-col>

                                              <v-col
                                                v-if="expanded"
                                                cols="3"
                                                class="d-flex align-center justify-end"
                                              >
                                                <!-- vbtnEliminar -->

                                                <v-tooltip bottom color="primary" interactive>
                                                  <template
                                                    v-slot:activator="{ props: tooltipProps }"
                                                  >
                                                    <v-btn
                                                      v-bind="mergeProps(tooltipProps)"
                                                      color="primary"
                                                      flat
                                                      height="40px"
                                                      min-width="40px"
                                                      width="40px"
                                                      @click.stop="console.log('holas')"
                                                    >
                                                      <v-icon
                                                        color="white"
                                                        icon="mdi-plus"
                                                        size="24px"
                                                      />
                                                    </v-btn>
                                                  </template>
                                                  <span>Quitar recibo</span>
                                                </v-tooltip>
                                                <v-divider
                                                  vertical
                                                  class="ml-4 my-1 border-opacity-25"
                                                />
                                              </v-col>
                                            </v-row>
                                            <v-divider
                                              v-if="expanded"
                                              class="border-opacity-25"
                                            ></v-divider>
                                          </v-expansion-panel-title>
                                          <v-expansion-panel-text>
                                            <v-data-table
                                              v-model="itemsSeleccionados"
                                              :headers="headers2"
                                              :hover="true"
                                              :items="movies"
                                              :mobile="smAndDown"
                                              hide-default-footer
                                              hide-default-header
                                              item-value="title"
                                            >
                                              <template v-slot:item.isActive="{ item }">
                                                <v-switch
                                                  v-model="modelEmpresa"
                                                  false-icon="mdi-bank-off"
                                                  hide-details
                                                  inset
                                                  true-icon="mdi-bank"
                                                  class="text-medium-emphasis"
                                                  density="compact"
                                                  color="primary"
                                                  @click.stop
                                                />
                                              </template>
                                              <template
                                                v-slot:header.data-table-select="{
                                                  allSelected,
                                                  selectAll,
                                                  someSelected,
                                                }"
                                              >
                                                <v-btn-group
                                                  class="border-opacity-25"
                                                  color="primary"
                                                  density="compact"
                                                  divided
                                                  variant="outlined"
                                                >
                                                  <v-btn
                                                    density="compact"
                                                    stacked
                                                    class="pa-2"
                                                    style="min-width: auto"
                                                  >
                                                    <v-tooltip>
                                                      <template
                                                        v-slot:activator="{ props: tooltip }"
                                                      >
                                                        <v-checkbox-btn
                                                          v-bind="mergeProps(tooltip)"
                                                          :indeterminate="
                                                            someSelected && !allSelected
                                                          "
                                                          :model-value="allSelected"
                                                          density="compact"
                                                          true-icon="mdi-checkbox-multiple-marked"
                                                          @update:model-value="
                                                            selectAll(!allSelected)
                                                          "
                                                          class="pa-0"
                                                        />
                                                      </template>
                                                      <span>Seleccionar todo</span>
                                                    </v-tooltip>
                                                  </v-btn>
                                                </v-btn-group>
                                              </template>
                                              <template
                                                v-slot:item.data-table-select="{
                                                  internalItem,
                                                  isSelected,
                                                  toggleSelect,
                                                }"
                                              >
                                                <v-checkbox-btn
                                                  :model-value="isSelected(internalItem)"
                                                  color="primary"
                                                  @update:model-value="toggleSelect(internalItem)"
                                                />
                                              </template>

                                              <template v-slot:item.clasePrimaRiesgo="{ item }">
                                                <bec-text-field
                                                  v-model="dataModel.folio"
                                                  :color="'#722B81'"
                                                  :label="'Clave de banco ID *'"
                                                  :placeholder="'Ingrese el folio del recibo'"
                                                  :prepend-icon="'mdi-invoice-list'"
                                                  @keypress="inputFilters.onlyAlphanumeric"
                                                >
                                                  <template #tooltip>
                                                    <v-card
                                                      color="transparent"
                                                      elevation="0"
                                                      class="pa-3"
                                                    >
                                                      <v-row>
                                                        <v-col
                                                          cols="1"
                                                          class="d-flex align-center justify-center"
                                                        >
                                                          <v-icon
                                                            class="mr-1"
                                                            color="white"
                                                            icon="mdi-invoice-list"
                                                          />
                                                        </v-col>
                                                        <v-col cols="11">
                                                          Ingrese el folio de su recibo tal como
                                                          aparece en el comprobante de pago. Este
                                                          dato permite identificar y validar
                                                          correctamente la operación antes de
                                                          generar la factura.
                                                        </v-col>
                                                      </v-row>
                                                      <v-divider
                                                        class="border-opacity-50 my-2 mx-2"
                                                      />
                                                      <v-row>
                                                        <v-col
                                                          cols="1"
                                                          class="d-flex align-center justify-center"
                                                        >
                                                          <v-icon
                                                            class="mr-1"
                                                            color="white"
                                                            icon="mdi-alert"
                                                          />
                                                        </v-col>
                                                        <v-col cols="11">
                                                          <span style="font-weight: bold"
                                                            >Nota:</span
                                                          >
                                                          los campos marcados con (*) son
                                                          obligatorios para continuar con el proceso
                                                          de facturación.
                                                        </v-col>
                                                      </v-row>
                                                    </v-card>
                                                  </template>
                                                </bec-text-field>
                                              </template>
                                            </v-data-table>
                                          </v-expansion-panel-text>
                                        </v-expansion-panel>
                                      </v-expansion-panels>
                                    </v-col>
                                  </v-row>
                                </v-card>
                              </v-col>
                            </v-row>
                          </template>
                        </v-data-iterator>
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                </v-tabs-window>
              </div>
            </div>
          </v-tabs-window-item>
          <!-- No fiscal -->
          <v-tabs-window-item value="tab02" eager>
            <v-row class="mt-1">
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Empresa CONTAPQi Nóminas'"
                  :multiple="false"
                  :prepend-icon="'mdi-briefcase-account'"
                  :return-object="false"
                  :tooltip="'Ruta del archivo de la base de datos de la empresa del cliente.'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Razón Social'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'RFC'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12" lg="6" md="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Correo asignado para notificaciones'"
                  :prepend-icon="'mdi-email'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
              <v-col cols="12" lg="6" md="12">
                <bec-text-field
                  v-model="modelSueldoIMSS"
                  :label="'Código interno'"
                  :prepend-icon="'mdi-barcode'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Porcentaje de comisión que se le cobrará al cliente'"
                />
              </v-col>
            </v-row>
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
} from 'vue'

import { useDisplay } from 'vuetify'

// import composables
import { useClienteModel } from '@/composables/nomina/gape/useCliente'
import { useEmpresaModel } from '@/composables/nomina/gape/useEmpresa'
import { useEmpresaDatabase } from '@/composables/core/useEmpresaDatabase'

// import stores
import { useClienteStore } from '@/stores/modules/Nomina/gape/Cliente'
import { useEmpresasStore } from '@/stores/modules/Core/empresas'
import { useEmpresaStore } from '@/stores/modules/Nomina/gape/Empresa'

// import utils
import { getDefaultCliente } from '@/utils/nomina/gape/getDefaultCliente'
import { getDefaultEmpresaDatabase } from '@/utils/core/getDefaultEmpresaDatabase'

import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

export default defineComponent({
  name: 'EmpresaForm',
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

    // import Stores
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresasStore()
    // GAPE
    const empresaStore = useEmpresaStore()

    // 3. Composables (funciones reutilizables de Vuetify)

    const { dataModel, setEmpresa, resetModel, resetModelEmpresa } = useEmpresaModel()

    const { name, mobile, smAndDown } = useDisplay()

    // 4. Reactive
    const vrowBarraDeAccionesRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Empresa',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Formulario',
      },
    ])

    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: false,
      activarRegistro: true,
      crearRegistro: true,
    })

    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()
    const vbtnActivarRegistro = ref(true)

    const vtabMenuRef = ref()
    const vtabMenuModel = ref<any>('tab01')
    const vtabMenuItems = ref([
      {
        icon: 'mdi-bank',
        title: 'Fiscal',
        value: 'tab01',
      },
      {
        icon: 'mdi-bank-off',
        title: 'No fiscal',
        value: 'tab02',
      },
    ])

    const tabEmpresa = ref('option-1')

    const vbtnActivarModel = ref(true)
    const vbtnMenuExportarModel = ref(false)
    const cardHeight = ref(0)

    const modelEmpresa = ref<Object>()
    const itemsEmpresas = ref<Object[]>([])

    const modelSueldoIMSS = ref<number | null>(null)
    const modelProvSoc = ref<number | null>(null)
    const modelTarjetaFacil = ref<number | null>(null)
    const modelHonAsimilados = ref<number | null>(null)
    const modelGastosPorComprobar = ref<number | null>(null)
    const modelClasePrimaRiesgo = ref<number | null>(null)
    const modelPerioricidad = ref<number | null>(null)

    const itemsComprobacion = ref([
      { title: 'Si', value: 0 },
      { title: 'No', value: 1 },
    ])

    const itemsClasePrimaRiesgo = ref([
      { title: 'Media', value: 0 },
      { title: 'Actualizada', value: 1 },
    ])

    const itemsBaseFEE = ref([
      { title: 'Percepciones brutas', value: 0 },
      { title: 'Percepciones brutas más carca', value: 21 },
      { title: 'Neto', value: 2 },
      { title: 'Neto más carga social', value: 3 },
      { title: 'FEE Neto + Bruto + CS', value: 4 },
    ])

    // Este se obtiene de la base de datos campo dependiente
    const itemsPerioricidad = ref([
      { title: 'Quicenal', value: 0 },
      { title: 'Semanal', value: 1 },
    ])

    const vforFiltrosRef = ref()

    const camposTab1 = ref([
      {
        ayuda: 'Primero selecciona el campo <b><i>Cliente</i></b> para habilitar esta opción.',
        etiqueta: 'Perioricidad',
        icono: 'mdi-information-slab-circle-outline',
        items: itemsPerioricidad.value,
        model: modelPerioricidad,
        placeholder: '',
        tipo: 'select',
      },

      {
        ayuda:
          'Es el sueldo mensual y en cuota diaria bruto, con el cual esta dado de alta el colaborador ante el IMSS.',
        etiqueta: 'Sueldo IMSS',
        icono: 'mdi-hospital',
        items: itemsComprobacion.value,
        model: modelSueldoIMSS,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Prov. Soc',
        etiqueta: 'Prov. Soc.',
        icono: 'mdi-account-injury',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Tarjeta fácil',
        etiqueta: 'Tarjeta fácil',
        icono: 'mdi-information-slab-circle-outline',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Hon. Asimilados',
        etiqueta: 'Hon. Asimilados',
        icono: 'mdi-account-hard-hat',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Gastos por comprobar',
        etiqueta: 'Gastos por comprobar',
        icono: 'mdi-account-file-text',
        items: itemsComprobacion.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
      {
        ayuda: 'Clase de Prima de Riesgo',
        etiqueta: 'Clase de Prima de Riesgo',
        icono: 'mdi-account-key',
        items: itemsClasePrimaRiesgo.value,
        model: modelProvSoc,
        placeholder: '',
        tipo: 'select',
      },
    ])

    const modelEmpresa2 = ref<Empresa>()

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
      { title: '', key: 'drag', sortable: false, align: 'end' },
    ])

    const items = ref([
      { concepto: 'Sueldo IMSS', tope: '5000' },
      { concepto: 'Prev. Soc.', tope: '2000' },
      { concepto: 'Fondos Sind.', tope: '' },
      { concepto: 'Tarjeta Fácil', tope: '' },
      { concepto: 'Hon. Asimilados', tope: '' },
      { concepto: 'Gastos por comprobar', tope: '' },
    ])

    const itemsSeleccionados = ref(['Sueldo IMSS'])

    // 4. Reactive | Bancos

    type Banco = { id: number; banco: string; esActivo: boolean }
    const itemsBanco: Banco[] = [
      {
        id: 1,
        banco: 'Fondeadora',
        esActivo: true,
      },
      {
        id: 2,
        banco: 'Azteca interbancario',
        esActivo: true,
      },
      {
        id: 3,
        banco: 'Azteca bancario',
        esActivo: true,
      },
      {
        id: 4,
        banco: 'Banorte terceros',
        esActivo: true,
      },
    ]

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    // 6. Watchers
    watch(
      () => dataModel.value.id_nomina_gape_cliente,
      async (idCliente) => {
        if (idCliente) {
          resetModel(true)

          await fetchEmpresasNominaPorCliente(idCliente)
        }
      },
    )

    watch(
      () => dataModel.value.id_empresa_database,
      async (idEmpresa) => {
        if (idEmpresa) {
          resetModelEmpresa(true)

          const empresaSeleccionada = itemsEmpresaDatabase.value.find(
            (item) => item.id === idEmpresa,
          )

          const nombreBase = empresaSeleccionada?.nombre_base ?? ''

          await fetchDatosEmpresasNominaPorCliente(
            idEmpresa,
            dataModel.value.id_nomina_gape_cliente,
            nombreBase,
          )
        }
      },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
        fetchClientes()
        fetchSincronizarBases()
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async)
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          vtabMenuRef.value.$el.clientHeight -
          15
      }
    }

    const myCustomUpdate = (nuevoValor: any) => {
      //alert(nuevoValor);
      //alert(modelSueldoIMSS.value); //✅ ya está actualizado gracias al emit
    }

    const fetchDatosEmpresasNominaPorCliente = async (
      idCliente: any,
      idEmpresa: any,
      rutaBD: string,
    ) => {
      try {
        await empresaStore.empresasDatosNominasPorCliente(idCliente, idEmpresa, rutaBD)

        if (empresaStore.empresa && !Array.isArray(empresaStore.empresa)) {
          dataModel.value.razon_social = empresaStore.empresa.razon_social ?? ''
          dataModel.value.rfc = empresaStore.empresa.rfc ?? ''
          dataModel.value.correo_notificacion = empresaStore.empresa.correo_notificacion ?? ''
          dataModel.value.codigo_interno = empresaStore.empresa.codigo_interno ?? ''
        }
      } catch (error) {
        console.error('Error al cargar datps catálogos por empresa:', error)
      }
    }

    const fetchEmpresasNominaPorCliente = async (idCliente: number) => {
      try {
        await empresasStore.empresasNominasPorCliente(idCliente)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
      }
    }

    const fetchClientes = async () => {
      try {
        await clienteStore.catalogoCliente()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    const fetchSincronizarBases = async () => {
      try {
        await clienteStore.sincronizarEmpresas()
      } catch (error) {
        console.error('Error al cargar sincronizar las empresas:', error)
      }
    }

    let dragIndex = -1

    function onDragStart(index: number) {
      dragIndex = index
    }

    function onDrop(dropIndex: number) {
      if (dragIndex === -1 || dragIndex === dropIndex) return
      const moved = items.value.splice(dragIndex, 1)[0]
      items.value.splice(dropIndex, 0, moved)
      dragIndex = -1
    }

    const headers2 = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      {
        title: 'es',
        key: 'isActive',
        sortable: false,
      },
      {
        title: '',
        key: 'clasePrimaRiesgo',
        sortable: false,
        align: 'center',
      },
    ])

    const movies = ref([
      {
        perioricidad: 'Fondeadora',
        cuentasDeOrigen: [{ cuenta: '1000000000' }, { cuenta: '2020202020' }],
      },
      {
        perioricidad: 'Azteca Interbancario',
        cuentasDeOrigen: [],
      },
      {
        perioricidad: 'Azteca bancario',
        cuentasDeOrigen: [],
      },
      {
        perioricidad: 'Banorte de terceros',
        cuentasDeOrigen: [],
      },
    ])

    const vswiFiscal = ref(true)
    watch(
      vswiFiscal,
      (nuevoValor) => {
        vtabMenuModel.value = nuevoValor ? 'tab01' : 'tab02'
      },
      { immediate: true },
    )
    const encabezadoCuentaOrigen = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      { title: 'Cuenta origen', key: 'cuenta', sortable: false, align: 'center', width: '90%' },
      { title: '', key: 'eliminar', sortable: false, align: 'end' },
    ])

    const itemsCuentaOrigen = ref([{ cuenta: '001850255586' }, { cuenta: '001850255586' }])
    const agregarFila = (item: any) => {
      if (!Array.isArray(item.cuentasDeOrigen)) {
        item.cuentasDeOrigen = []
      }
      item.cuentasDeOrigen.push({ cuenta: '' })
    }

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresas)

    return {
      itemsBanco,
      agregarFila,
      btnDisabled,
      camposTab1,
      dataModel,
      encabezadoCuentaOrigen,
      getCardHeight,
      headers,
      headers2,
      inputFilters,
      items,
      itemsBaseFEE,
      itemsClasePrimaRiesgo,
      itemsClientesNomina,
      itemsComprobacion,
      itemsCuentaOrigen,
      itemsEmpresaDatabase,
      itemsEmpresas,
      itemsSeleccionados,
      mergeProps,
      modelEmpresa,
      modelEmpresa2,
      modelGastosPorComprobar,
      modelPerioricidad,
      modelProvSoc,
      modelSueldoIMSS,
      movies,
      myCustomUpdate,
      name,
      onDragStart,
      onDrop,
      smAndDown,
      tabEmpresa,
      validarFiltros,
      validationRules,
      vbrePrincipalItems,
      vbtnActivarModel,
      vbtnActivarRegistro,
      vbtnMenuExportarModel,
      vconPrincipalRef,
      vforFiltrosRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vswiFiscal,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
