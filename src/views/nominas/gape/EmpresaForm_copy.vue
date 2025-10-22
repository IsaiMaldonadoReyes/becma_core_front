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
              :loading="loading"
              @click="onDecision"
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
          :disabled="btnDisabled.compCliente"
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
          v-model="dataModel.fiscal"
          :clearable="false"
          :disabled="btnDisabled.compTipoEmp"
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
            :disabled="dataModel.fiscal ? false : true"
            variant="tonal"
          >
            Fiscal
          </v-tab>
          <v-tab
            prepend-icon="mdi-bank-off"
            value="tab02"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
            :disabled="!dataModel.fiscal ? false : true"
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
        <v-tabs-window v-model="vtabMenuModel">
          <v-tabs-window-item value="tab01" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <v-tabs
                v-model="tabEmpresa"
                class="text-medium-emphasis tab-right border"
                color="primary"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                width="100px"
                show-arrows
              >
                <v-tab
                  prepend-icon="mdi-account"
                  text="Datos generales"
                  value="option-1"
                  class="text-none text-no-wrap"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresa == 'option-1' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
                <v-tab
                  prepend-icon="mdi-bank"
                  text="Bancos"
                  value="option-2"
                  class="text-none"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresa == 'option-2' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-tabs-window v-model="tabEmpresa" :mobile="smAndDown">
                  <v-form ref="formRefFiscalGral">
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
                            :disabled="btnDisabled.compEmpresa"
                            :item-subtitle="(item) => `${item.nombre_base}`"
                            :item-title="'nombre_empresa'"
                            :item-value="'id'"
                            :items="itemsEmpresaDatabase"
                            :label="'Empresa CONTAPQi Nóminas'"
                            :multiple="false"
                            :prepend-icon="'mdi-briefcase-account'"
                            :return-object="false"
                            :rules="[validationRules.required2]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                                  </v-col>
                                  <v-col cols="11">
                                    Seleccione la empresa a la que quiere relacionar el cliente.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-2" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <bec-text-field
                            v-model="dataModel.razon_social"
                            :disabled="btnDisabled.compRazonSocial"
                            :label="'Razón Social'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                                  </v-col>
                                  <v-col cols="11">
                                    Seleccione la empresa a la que quiere relacionar el cliente.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-2" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12">
                          <bec-text-field
                            v-model="dataModel.rfc"
                            :disabled="btnDisabled.compRfc"
                            :label="'RFC'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                                  </v-col>
                                  <v-col cols="11">
                                    Seleccione la empresa a la que quiere relacionar el cliente.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-2" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.correo_notificacion"
                            :disabled="btnDisabled.compCorreo"
                            :label="'Correo asignado para notificaciones'"
                            :prepend-icon="'mdi-email'"
                            :rules="[validationRules.required, validationRules.emailIfNotEmpty]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-email" />
                                  </v-col>
                                  <v-col cols="11"> Ingrese un correo electrónico válido. </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-4" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso de facturación.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.codigo_interno"
                            :disabled="btnDisabled.compCodigo"
                            :label="'Código interno'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[validationRules.required]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-email" />
                                  </v-col>
                                  <v-col cols="11">
                                    Ingrese un código de identificación del cliente/empresa.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-4" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso de facturación.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                  </v-form>
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

                    <!--v-form ref="formRefFiscalBanco"></v-form>
                    <v-form ref="formRefNoFiscalGral"></v-form>
                    <v-form ref="formRefNoFiscalBanco"></v-form-->
                    <v-row>
                      <v-col>
                        <v-data-table
                          :headers="headers2"
                          v-model="itemsSeleccionados"
                          :items="movies"
                          item-value="title"
                          hide-default-footer
                          :mobile="smAndDown"
                          :hover="true"
                          show-select
                        >
                          <template v-slot:item.isActive="{ item }">
                            <v-chip
                              :color="
                                itemsSeleccionados.some((i) => i === item.concepto)
                                  ? 'green'
                                  : 'red'
                              "
                              size="small"
                              label
                              variant="flat"
                            >
                              {{
                                itemsSeleccionados.some((i) => i === item.concepto) ? 'Sí' : 'No'
                              }}
                            </v-chip>
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
                            <v-data-table
                              hide-default-footer
                              v-model="item.cuentasDeOrigen"
                              item-value="cuenta"
                              :headers="encabezadoCuentaOrigen"
                              :hover="true"
                              :items="item.cuentasDeOrigen"
                              eager
                              color="transparent"
                              no-data-text="Sin cuentas de origen"
                            >
                              <template v-slot:header.eliminar>
                                <v-btn
                                  class="mr-1"
                                  color="primary"
                                  height="24px"
                                  min-width="24px"
                                  width="24px"
                                  size="x-small"
                                  variant="elevated"
                                  @click="agregarFila(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" />
                                </v-btn>
                              </template>
                              <template v-slot:header.cuenta> Cuenta </template>
                              <!-- solo sobrescribes la columna 'nombre' -->
                              <template v-slot:item.cuenta="{ item }">
                                <v-text-field
                                  v-model="item.cuenta"
                                  variant="underlined"
                                  clearable
                                  clear-icon="mdi-close"
                                  density="compact"
                                  hide-details
                                  :placeholder="'0.00'"
                                  class="text-end"
                                  color="primary"
                                />
                              </template>
                              <template v-slot:item.eliminar="{ item }">
                                <v-tooltip interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="primary"
                                      height="24px"
                                      min-width="24px"
                                      width="24px"
                                      size="x-small"
                                      variant="elevated"
                                    >
                                      <v-icon color="white" icon="mdi-delete" />
                                    </v-btn>
                                  </template>
                                  <span> Eliminar </span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </template>
                          <template v-slot:item.valorPrimaRiesgo="{ item }">
                            <v-data-table
                              hide-default-footer
                              v-model="item.cuentasDeOrigen"
                              item-value="cuenta"
                              :headers="encabezadoCuentaOrigen"
                              :hover="true"
                              :items="item.cuentasDeOrigen"
                              eager
                              color="transparent"
                              no-data-text="Sin cuentas de origen"
                            >
                              <template v-slot:header.eliminar>
                                <v-btn
                                  class="mr-1"
                                  color="primary"
                                  height="24px"
                                  min-width="24px"
                                  width="24px"
                                  size="x-small"
                                  variant="elevated"
                                  @click="agregarFila(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" />
                                </v-btn>
                              </template>
                              <template v-slot:header.cuenta> Cuenta </template>
                              <!-- solo sobrescribes la columna 'nombre' -->
                              <template v-slot:item.cuenta="{ item }">
                                <v-text-field
                                  v-model="item.cuenta"
                                  variant="underlined"
                                  clearable
                                  clear-icon="mdi-close"
                                  density="compact"
                                  hide-details
                                  :placeholder="'0.00'"
                                  class="text-end"
                                  color="primary"
                                />
                              </template>
                              <template v-slot:item.eliminar="{ item }">
                                <v-tooltip interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="primary"
                                      height="24px"
                                      min-width="24px"
                                      width="24px"
                                      size="x-small"
                                      variant="elevated"
                                    >
                                      <v-icon color="white" icon="mdi-delete" />
                                    </v-btn>
                                  </template>
                                  <span> Eliminar </span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                </v-tabs-window>
              </div>
            </div>
          </v-tabs-window-item>
          <v-tabs-window-item value="tab02" eager>
            <div class="d-lg-flex flex-lg-row" style="height: 100%">
              <v-tabs
                v-model="tabEmpresaNoFisc"
                class="text-medium-emphasis tab-right border"
                color="primary"
                :direction="smAndDown ? 'horizontal' : 'vertical'"
                align-tabs="center"
                border
                width="100px"
                show-arrows
              >
                <v-tab
                  prepend-icon="mdi-account"
                  text="Datos generales"
                  value="option-1"
                  class="text-none text-no-wrap"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresaNoFisc == 'option-1' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
                <v-tab
                  prepend-icon="mdi-bank"
                  text="Bancos"
                  value="option-2"
                  class="text-none"
                  style="letter-spacing: 0.5px"
                  :variant="tabEmpresaNoFisc == 'option-2' ? 'tonal' : 'text'"
                  min-width="100%"
                ></v-tab>
              </v-tabs>
              <div class="flex-lg-grow-1 overflow-auto ml-2" :style="getCardHeight">
                <v-tabs-window v-model="tabEmpresaNoFisc" :mobile="smAndDown">
                  <v-form ref="formRefNoFiscalGral">
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
                          <bec-text-field
                            v-model="dataModel.razon_social"
                            :disabled="btnDisabled.compNoFisRazonSocial"
                            :label="'Razón Social'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required]"
                            @keypress="inputFilters.onlyAlphanumericWithSpaces"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                                  </v-col>
                                  <v-col cols="11">
                                    Seleccione la empresa a la que quiere relacionar el cliente.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-2" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12">
                          <bec-text-field
                            v-model="dataModel.rfc"
                            :disabled="btnDisabled.compNoFisRfc"
                            :label="'RFC'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required, validationRules.rfc]"
                            @keypress="inputFilters.onlyRFC"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-account-box" />
                                  </v-col>
                                  <v-col cols="11">
                                    Seleccione la empresa a la que quiere relacionar el cliente.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-2" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.correo_notificacion"
                            :disabled="btnDisabled.compNoFisCorreo"
                            :label="'Correo asignado para notificaciones'"
                            :prepend-icon="'mdi-email'"
                            :rules="[validationRules.required, validationRules.emailIfNotEmpty]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-email" />
                                  </v-col>
                                  <v-col cols="11"> Ingrese un correo electrónico válido. </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-4" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso de facturación.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.codigo_interno"
                            :disabled="btnDisabled.compNoFisCodigo"
                            :label="'Código interno'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[validationRules.required]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-email" />
                                  </v-col>
                                  <v-col cols="11">
                                    Ingrese un código de identificación del cliente/empresa.
                                  </v-col>
                                </v-row>
                                <v-divider class="border-opacity-50 my-2 mx-4" />
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                  </v-col>
                                  <v-col cols="11">
                                    <span style="font-weight: bold">Nota:</span>
                                    los campos marcados con (*) son obligatorios para continuar con
                                    el proceso de facturación.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                  </v-form>
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

                    <!--v-form ref="formRefFiscalBanco"></v-form>
                    <v-form ref="formRefNoFiscalGral"></v-form>
                    <v-form ref="formRefNoFiscalBanco"></v-form-->
                    <v-row>
                      <v-col>
                        <v-data-table
                          :headers="headers2"
                          v-model="itemsSeleccionados"
                          :items="movies"
                          item-value="title"
                          hide-default-footer
                          :mobile="smAndDown"
                          :hover="true"
                          show-select
                        >
                          <template v-slot:item.isActive="{ item }">
                            <v-chip
                              :color="
                                itemsSeleccionados.some((i) => i === item.concepto)
                                  ? 'green'
                                  : 'red'
                              "
                              size="small"
                              label
                              variant="flat"
                            >
                              {{
                                itemsSeleccionados.some((i) => i === item.concepto) ? 'Sí' : 'No'
                              }}
                            </v-chip>
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
                            <v-data-table
                              hide-default-footer
                              v-model="item.cuentasDeOrigen"
                              item-value="cuenta"
                              :headers="encabezadoCuentaOrigen"
                              :hover="true"
                              :items="item.cuentasDeOrigen"
                              eager
                              color="transparent"
                              no-data-text="Sin cuentas de origen"
                            >
                              <template v-slot:header.eliminar>
                                <v-btn
                                  class="mr-1"
                                  color="primary"
                                  height="24px"
                                  min-width="24px"
                                  width="24px"
                                  size="x-small"
                                  variant="elevated"
                                  @click="agregarFila(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" />
                                </v-btn>
                              </template>
                              <template v-slot:header.cuenta> Cuenta </template>
                              <!-- solo sobrescribes la columna 'nombre' -->
                              <template v-slot:item.cuenta="{ item }">
                                <v-text-field
                                  v-model="item.cuenta"
                                  variant="underlined"
                                  clearable
                                  clear-icon="mdi-close"
                                  density="compact"
                                  hide-details
                                  :placeholder="'0.00'"
                                  class="text-end"
                                  color="primary"
                                />
                              </template>
                              <template v-slot:item.eliminar="{ item }">
                                <v-tooltip interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="primary"
                                      height="24px"
                                      min-width="24px"
                                      width="24px"
                                      size="x-small"
                                      variant="elevated"
                                    >
                                      <v-icon color="white" icon="mdi-delete" />
                                    </v-btn>
                                  </template>
                                  <span> Eliminar </span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </template>
                          <template v-slot:item.valorPrimaRiesgo="{ item }">
                            <v-data-table
                              hide-default-footer
                              v-model="item.cuentasDeOrigen"
                              item-value="cuenta"
                              :headers="encabezadoCuentaOrigen"
                              :hover="true"
                              :items="item.cuentasDeOrigen"
                              eager
                              color="transparent"
                              no-data-text="Sin cuentas de origen"
                            >
                              <template v-slot:header.eliminar>
                                <v-btn
                                  class="mr-1"
                                  color="primary"
                                  height="24px"
                                  min-width="24px"
                                  width="24px"
                                  size="x-small"
                                  variant="elevated"
                                  @click="agregarFila(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" />
                                </v-btn>
                              </template>
                              <template v-slot:header.cuenta> Cuenta </template>
                              <!-- solo sobrescribes la columna 'nombre' -->
                              <template v-slot:item.cuenta="{ item }">
                                <v-text-field
                                  v-model="item.cuenta"
                                  variant="underlined"
                                  clearable
                                  clear-icon="mdi-close"
                                  density="compact"
                                  hide-details
                                  :placeholder="'0.00'"
                                  class="text-end"
                                  color="primary"
                                />
                              </template>
                              <template v-slot:item.eliminar="{ item }">
                                <v-tooltip interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="primary"
                                      height="24px"
                                      min-width="24px"
                                      width="24px"
                                      size="x-small"
                                      variant="elevated"
                                    >
                                      <v-icon color="white" icon="mdi-delete" />
                                    </v-btn>
                                  </template>
                                  <span> Eliminar </span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-tabs-window-item>
                </v-tabs-window>
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
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { getDefaultCliente } from '@/utils/nomina/gape/getDefaultCliente'
import { getDefaultEmpresaDatabase } from '@/utils/core/getDefaultEmpresaDatabase'

import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'

export default defineComponent({
  name: 'EmpresaForm',
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

    // import Stores
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresasStore()
    const dialogConfirmation = useDialogManagerStore()
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
      //
      compTipoEmp: false,
      compCliente: false,
      compEmpresa: false,
      compRazonSocial: true,
      compRfc: true,
      compCorreo: false,
      compCodigo: false,
      compNoFisRazonSocial: false,
      compNoFisRfc: false,
      compNoFisCorreo: false,
      compNoFisCodigo: false,
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

    const loading = ref(false)
    const formRefFiscalGral = ref()
    const formRefFiscalBanco = ref()
    const formRefNoFiscalGral = ref()
    const formRefNoFiscalBanco = ref()

    const tabEmpresa = ref('option-1')
    const tabEmpresaNoFisc = ref('option-1')

    const vbtnActivarModel = ref(true)
    const vbtnMenuExportarModel = ref(false)
    const cardHeight = ref(0)

    const itemsComprobacion = ref([
      { title: 'Si', value: 0 },
      { title: 'No', value: 1 },
    ])

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
        btnDisabled.value.eliminarRegistros = true

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

          btnDisabled.value.eliminarRegistros = true

          const empresaSeleccionada = itemsEmpresaDatabase.value.find(
            (item) => item.id === idEmpresa,
          )

          const nombreBase = empresaSeleccionada?.nombre_base ?? ''

          await fetchDatosEmpresasNominaPorCliente(
            dataModel.value.id_nomina_gape_cliente,
            idEmpresa,
            nombreBase,
          )
        }
      },
    )

    watch(
      () => dataModel.value.fiscal,
      async (nuevoValor) => {
        vtabMenuModel.value = nuevoValor ? 'tab01' : 'tab02'

        const tabFiscal = nuevoValor
        const tabInfo = tabFiscal ? tabEmpresa.value : tabEmpresaNoFisc.value

        let formRef = null

        if (tabFiscal) {
          // Empresa FISCAL
          formRef = tabInfo === 'option-1' ? formRefFiscalGral.value : formRefFiscalBanco.value
        } else {
          // Empresa NO FISCAL
          formRef = tabInfo === 'option-1' ? formRefNoFiscalGral.value : formRefNoFiscalBanco.value
        }

        if (formRef) {
          await formRef.reset() // ✅ ahora sí puedes usar await
        }
      },
      { immediate: true },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
        fetchClientes()
        fetchSincronizarBases()
      })

      // edit
      if (props.id !== undefined && props.id !== null) {
        btnDisabled.value.eliminarRegistros = false

        btnDisabled.value.compTipoEmp = true
        btnDisabled.value.compCliente = true
        btnDisabled.value.compEmpresa = true
        btnDisabled.value.compRazonSocial = true
        btnDisabled.value.compRfc = true
        btnDisabled.value.compCorreo = false
        btnDisabled.value.compCodigo = false

        btnDisabled.value.compNoFisRazonSocial = false
        btnDisabled.value.compNoFisRfc = false
        btnDisabled.value.compNoFisCorreo = false
        btnDisabled.value.compNoFisCodigo = false

        fetchDatosEmpresasNominaPorClienteId(props.id)
      }
      // new
      else {
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
          vrowFiltrosRef.value.$el.clientHeight -
          vtabMenuRef.value.$el.clientHeight -
          15
      }
    }

    const fetchDatosEmpresasNominaPorClienteId = async (idCliente: any) => {
      try {
        await empresaStore.empresasDatosNominasPorClienteId(idCliente)

        if (empresaStore.empresa && !Array.isArray(empresaStore.empresa)) {
          const idCliente = empresaStore.empresa.id_nomina_gape_cliente
          const idEmpresa = empresaStore.empresa.id_empresa_database

          if (idEmpresa != 0) {
            fetchEmpresasNominaPorCliente(idCliente)
          }
          dataModel.value.id_nomina_gape_cliente = empresaStore.empresa.id_nomina_gape_cliente
          dataModel.value.id_empresa_database = empresaStore.empresa.id_empresa_database
          dataModel.value.razon_social = empresaStore.empresa.razon_social ?? ''
          dataModel.value.rfc = empresaStore.empresa.rfc ?? ''
          dataModel.value.correo_notificacion = empresaStore.empresa.correo_notificacion ?? ''
          dataModel.value.codigo_interno = empresaStore.empresa.codigo_interno ?? ''
        }
      } catch (error) {
        console.error('Error al cargar datps catálogos por empresa:', error)
      }
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

    const fetchEmpresasNominaPorCliente = async (idCliente: any) => {
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

    const onDecision = () => {
      let mensaje = ''
      let titulo = ''

      const fiscal = dataModel.value.fiscal
      const tabInfo = fiscal ? tabEmpresa.value : tabEmpresaNoFisc.value

      /*
      if (dialogPropiedades.value.elementos.id) {
        titulo = 'Actualización de datos'
        mensaje = `¿Está seguro de que desea actualizar el registro "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Los cambios realizados serán guardados de forma permanente.`
      } else {
        titulo = 'Registro de datos'
        mensaje = `¿Está seguro de que desea registrar el nuevo cliente "${dialogPropiedades.value.elementos.nombre}" (Código: ${dialogPropiedades.value.elementos.codigo})? Esta acción no se puede deshacer.`
      }
      */

      titulo = 'Registro de datos'
      mensaje = `¿Está seguro de que desea registrar los datos? Esta acción no se puede deshacer.`

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        () => validateForm(fiscal, tabInfo), // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const validateForm = async (tabFiscal: boolean, tabInfo: string) => {
      dialogConfirmation.onCloseDialogConfirmation()

      let formRef = null

      if (tabFiscal) {
        // Empresa FISCAL
        formRef = tabInfo == 'option-1' ? formRefFiscalGral.value : formRefFiscalBanco.value
      } else {
        // Empresa NO FISCAL
        formRef = tabInfo == 'option-1' ? formRefNoFiscalGral.value : formRefNoFiscalBanco.value
      }

      if (!formRef) return

      // Validar el formulario seleccionado
      const form = await formRef.validate()

      if (!form || !form.valid) return

      try {
        loading.value = true

        // Aquí va tu guardado real
        await empresaStore.storeNominaGapeEmpresa(dataModel.value)

        await formRef.reset()

        dialogConfirmation.onOpenDialogInformation(
          'Los datos se guardaron de forma exitosa.',
          'Registro guardado',
          'correct',
          '#438701',
          2,
        )
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
        title: 'Banco',
        key: 'perioricidad',
        sortable: false,
      },
      {
        title: '',
        key: 'clasePrimaRiesgo',
        sortable: false,
        align: 'center',
      },
      {
        title: 'Cuenta de origen',
        key: 'valorPrimaRiesgo',
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
      loading,
      dialogConfirmation,
      agregarFila,
      btnDisabled,
      dataModel,
      encabezadoCuentaOrigen,
      getCardHeight,
      headers,
      headers2,
      inputFilters,
      items,
      itemsClientesNomina,
      itemsComprobacion,
      itemsCuentaOrigen,
      itemsEmpresaDatabase,
      itemsSeleccionados,
      mergeProps,
      movies,
      name,
      onDecision,
      onDragStart,
      onDrop,
      smAndDown,
      tabEmpresa,
      validationRules,
      vbrePrincipalItems,
      vbtnActivarModel,
      vbtnActivarRegistro,
      vbtnMenuExportarModel,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
      formRefFiscalGral,
      formRefFiscalBanco,
      formRefNoFiscalGral,
      formRefNoFiscalBanco,
      tabEmpresaNoFisc,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
