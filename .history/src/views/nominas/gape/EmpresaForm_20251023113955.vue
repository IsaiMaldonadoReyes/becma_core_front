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
          @update:model-value="buscarEmpresasNomina"
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

    <!-- vtabTipoEmpresaRef -->
    <v-row ref="vtabTipoEmpresaRef">
      <v-col class="my-0 py-0">
        <v-tabs v-model="vtabTipoEmpresa" class="text-medium-emphasis" color="primary" grow>
          <v-tab
            :disabled="modelTipoEmpresa ? false : true"
            class="text-none text-no-wrap"
            prepend-icon="mdi-bank"
            style="letter-spacing: 0.5px"
            value="tabTipoEmpresa01"
            variant="tonal"
          >
            Fiscal
          </v-tab>
          <v-tab
            :disabled="!modelTipoEmpresa ? false : true"
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
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
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
                  <!-- Datos generales -->
                  <v-form ref="formRefFiscalGral">
                    <v-tabs-window-item value="option-1">
                      <v-row class="mx-2">
                        <v-col cols="12">
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                          <v-card-title color="primary" class="text-primary text-body-1">
                            Datos generales de la empresa
                          </v-card-title>
                          <v-divider class="border-opacity-25 ma-0 pa-0" />
                        </v-col>
                      </v-row>
                      <v-row class="mt-1 mx-2">
                        <v-col cols="12">
                          <bec-autocomplete
                            v-model="dataModel.id_empresa_database"
                            :disabled="btnDisabled.compEmpresa"
                            :item-subtitle="(item) => `${item.nombre_base}`"
                            :item-title="'nombre_empresa'"
                            :item-value="'id'"
                            :items="itemsEmpresaDatabase"
                            :label="'Empresa CONTAPQi Nóminas *'"
                            :multiple="false"
                            :prepend-icon="'mdi-laptop'"
                            :return-object="false"
                            :rules="[validationRules.required2]"
                            @update:model-value="buscarDatosEmpresaNomina"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon class="mr-1" color="white" icon="mdi-laptop" />
                                  </v-col>
                                  <v-col cols="11">
                                    Elija la empresa del sistema CONTPAQi Nóminas que desea vincular
                                    a la nueva empresa Fiscal para establecer la conexión
                                    correspondiente.
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
                            :prepend-icon="'mdi-card-account-details'"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon
                                      class="mr-1"
                                      color="white"
                                      icon="mdi-card-account-details"
                                    />
                                  </v-col>
                                  <v-col cols="11">Ingrese la razón social de la empresa.</v-col>
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
                            :prepend-icon="'mdi-card-account-details'"
                            :rules="[validationRules.required]"
                          >
                            <template #tooltip>
                              <v-card color="transparent" elevation="0" class="py-3">
                                <v-row>
                                  <v-col cols="1" class="d-flex align-center justify-center">
                                    <v-icon
                                      class="mr-1"
                                      color="white"
                                      icon="mdi-card-account-details"
                                    />
                                  </v-col>
                                  <v-col cols="11">
                                    Capture el RFC correspondiente a la empresa fiscal registrada
                                    ante el SAT.
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
                        <v-col cols="12" md="6">
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
                                    el proceso.
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" md="16">
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
                                    <v-icon class="mr-1" color="white" icon="mdi-barcode" />
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
                  <!-- Bancos  -->
                  <v-tabs-window-item value="option-2" eager>
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
                                        <!-- Fondeadora -->
                                        <v-expansion-panel class="border" expand-icon="" readonly>
                                          <v-expansion-panel-title v-slot="{ expanded }">
                                            <v-row>
                                              <v-col cols="12" md="2">
                                                <v-switch
                                                  v-model="isActiveFondeadora"
                                                  class="text-medium-emphasis"
                                                  color="primary"
                                                  density="compact"
                                                  false-icon="mdi-bank-off"
                                                  hide-details
                                                  inset
                                                  true-icon="mdi-bank"
                                                  @click.stop
                                                />
                                              </v-col>
                                              <v-col
                                                class="d-flex align-center justify-center"
                                                cols="12"
                                                md="8"
                                              >
                                                Fondeadora
                                              </v-col>
                                            </v-row>
                                          </v-expansion-panel-title>
                                        </v-expansion-panel>

                                        <!-- Azteca interbancario -->
                                        <v-expansion-panel
                                          class="border"
                                          collapse-icon="mdi-menu-up"
                                          expand-icon="mdi-menu-down"
                                        >
                                          <v-expansion-panel-title
                                            class="border-b"
                                            v-slot="{ expanded }"
                                          >
                                            <v-row>
                                              <v-col cols="12" md="2">
                                                <v-switch
                                                  v-model="isActiveAztecaInterbancario"
                                                  class="text-medium-emphasis"
                                                  color="primary"
                                                  density="compact"
                                                  false-icon="mdi-bank-off"
                                                  hide-details
                                                  inset
                                                  true-icon="mdi-bank"
                                                  @click.stop
                                                />
                                              </v-col>
                                              <v-col
                                                cols="12"
                                                class="d-flex align-center justify-center"
                                                md="8"
                                              >
                                                Azteca Interbancario
                                              </v-col>
                                              <v-col
                                                v-if="expanded"
                                                class="d-flex align-center justify-end"
                                                cols="12"
                                                md="2"
                                              >
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
                                                      @click.stop="onInsertItemAztecaInterbancario"
                                                    >
                                                      <v-icon
                                                        color="white"
                                                        icon="mdi-plus"
                                                        size="24px"
                                                      />
                                                    </v-btn>
                                                  </template>
                                                  <span>Agregar clave de banco ID</span>
                                                </v-tooltip>
                                                <v-divider
                                                  vertical
                                                  class="ml-5 mr-3 my-1 border-opacity-25"
                                                />
                                              </v-col>
                                            </v-row>
                                          </v-expansion-panel-title>
                                          <v-expansion-panel-text>
                                            <v-data-table
                                              :headers="headersAztecaInterbancario"
                                              :hover="true"
                                              :items="itemsAztecaInterbancario"
                                              :mobile="smAndDown"
                                              hide-default-footer
                                              hide-default-header
                                              item-value="title"
                                            >
                                              <template v-slot:item.esActivo="{ item }">
                                                <v-switch
                                                  v-model="item.esActivo"
                                                  false-icon="mdi-smart-card-off"
                                                  hide-details
                                                  inset
                                                  true-icon="mdi-smart-card"
                                                  class="text-medium-emphasis"
                                                  density="compact"
                                                  color="primary"
                                                />
                                              </template>

                                              <template v-slot:item.claveDeBancoId="{ item }">
                                                <bec-text-field
                                                  v-model="item.claveDeBancoId"
                                                  :label="'Clave de banco ID'"
                                                  :placeholder="'Clave de banco ID'"
                                                  :prepend-icon="'mdi-bank'"
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
                                                            icon="mdi-bank"
                                                          />
                                                        </v-col>
                                                        <v-col cols="11">
                                                          Capture la clave de banco ID
                                                          correspondiente para generar el layout de
                                                          dispersión del Banco Azteca Interbancario.
                                                        </v-col>
                                                      </v-row>
                                                    </v-card>
                                                  </template>
                                                </bec-text-field>
                                              </template>

                                              <template v-slot:item.acciones="{ item }">
                                                <v-tooltip interactive>
                                                  <template
                                                    v-slot:activator="{ props: tooltipProps }"
                                                  >
                                                    <v-btn
                                                      v-bind="mergeProps(tooltipProps)"
                                                      class="mr-1"
                                                      color="primary"
                                                      height="40px"
                                                      min-width="40px"
                                                      width="40px"
                                                      variant="elevated"
                                                      @click="onDeleteItemAztecaInterbancario(item)"
                                                    >
                                                      <v-icon color="white" icon="mdi-delete" />
                                                    </v-btn>
                                                  </template>
                                                  <span>Eliminar</span>
                                                </v-tooltip>
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
          <!-- Empresa no fiscal -->
          <v-tabs-window-item value="tabTipoEmpresa02" eager>
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
                      <v-col> </v-col>
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

// import router
import { useRouter } from 'vue-router'

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

    // 3. Composables
    const clienteStore = useClienteStore()
    const empresasStore = useEmpresasStore()
    const empresaStore = useEmpresaStore()
    const { dataModel, setEmpresa, resetModel, resetModelEmpresa } = useEmpresaModel()
    const dialogConfirmation = useDialogManagerStore()
    const { name, mobile, smAndDown } = useDisplay()

    const router = useRouter()

    // 4. Reactive
    const vrowBarraDeAccionesRef = ref()
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'empresaList',
        title: 'Empresa',
      },
      {
        disabled: false,
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

    const vtabTipoEmpresaRef = ref()
    const vtabTipoEmpresa = ref<any>('tabTipoEmpresa01')

    const loading = ref(false)
    const formRefFiscalGral = ref()
    const formRefFiscalBanco = ref()
    const formRefNoFiscalGral = ref()
    const formRefNoFiscalBanco = ref()

    const tabEmpresa = ref('option-1')
    const tabEmpresaNoFisc = ref('option-1')

    const cardHeight = ref(0)

    const modelEmpresa = ref<Object>()
    const itemsEmpresas = ref<Object[]>([])

    const vforFiltrosRef = ref()

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

    const isActiveFondeadora = ref(false)
    const isActiveAztecaInterbancario = ref(false)
    const isActiveAztecaBancario = ref(false)
    const isActiveBanorteTerceros = ref(false)

    type AztecaInterbancario = {
      id: number
      idCliente: number
      idEmpresa: number
      banco: string
      esActivo: boolean
      claveDeBancoId: string
    }
    const itemsAztecaInterbancario = ref<AztecaInterbancario[]>([
      {
        id: 1,
        idCliente: 1,
        idEmpresa: 1,
        banco: 'Azteca Interbancario',
        esActivo: true,
        claveDeBancoId: '010203040506',
      },
    ])

    const headersAztecaInterbancario = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'esActivo',
        sortable: false,
        title: '',
        width: '20%',
      },
      {
        key: 'claveDeBancoId',
        align: 'center',
        sortable: false,
        title: '',
      },
      {
        key: 'acciones',
        align: 'end',
        sortable: false,
        title: '',
        width: '20%',
      },
    ])

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    // 6. Watchers

    watch(
      () => dataModel.value.fiscal,
      async (nuevoValor) => {
        vtabTipoEmpresa.value = nuevoValor ? 'tabTipoEmpresa01' : 'tabTipoEmpresa02'

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

        if (props.id !== undefined && props.id !== null) {
        } else {
          if (formRef) {
            await formRef.reset() // ✅ ahora sí puedes usar await
          }
        }
      },
      { immediate: true },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
      })

      await fetchClientes()
      console.log('fetchClientes')
      await fetchSincronizarBases()

      // edit
      if (props.id !== undefined && props.id !== null) {
        console.log('props')
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

        await fetchDatosEmpresasNominaPorClienteId(props.id)
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
          vtabTipoEmpresaRef.value.$el.clientHeight -
          15
      }
    }

    const buscarEmpresasNomina = async (codigo: number) => {
      resetModel(true)

      await fetchEmpresasNominaPorCliente(codigo)
    }

    const buscarDatosEmpresaNomina = async (codigo: number) => {
      resetModelEmpresa(true)

      const empresaSeleccionada = itemsEmpresaDatabase.value.find((item) => item.id === codigo)

      const nombreBase = empresaSeleccionada?.nombre_base ?? ''

      await fetchDatosEmpresasNominaPorCliente(
        dataModel.value.id_nomina_gape_cliente,
        codigo,
        nombreBase,
      )
    }

    const fetchDatosEmpresasNominaPorClienteId = async (idCliente: any) => {
      try {
        await empresaStore.empresasDatosNominasPorClienteId(idCliente)

        if (empresaStore.empresa && !Array.isArray(empresaStore.empresa)) {
          const idClienteEdit = empresaStore.empresa.id_nomina_gape_cliente
          const idEmpresa = empresaStore.empresa.id_empresa_database

          console.log(idEmpresa)

          console.log('fetchEmpresasNominaPorCliente 1269')
          await fetchEmpresasNominaPorClienteEdit(idClienteEdit)

          console.log(itemsEmpresaDatabase)
          console.log(itemsClientesNomina)

          dataModel.value.id_nomina_gape_cliente = Number(
            empresaStore.empresa.id_nomina_gape_cliente,
          )
          dataModel.value.id_empresa_database = empresaStore.empresa.id_empresa_database
          dataModel.value.razon_social = empresaStore.empresa.razon_social ?? ''
          dataModel.value.rfc = empresaStore.empresa.rfc ?? ''
          dataModel.value.correo_notificacion = empresaStore.empresa.correo_notificacion ?? ''
          dataModel.value.codigo_interno = empresaStore.empresa.codigo_interno ?? ''
          dataModel.value.id = Number(props.id)

          dataModel.value.fiscal = (empresaStore.empresa.fiscal as any) === '1'

          console.log('dataModel.value')
          console.log(dataModel.value)
          console.log('dataModel.value')
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

    const fetchEmpresasNominaPorClienteEdit = async (idCliente: any) => {
      try {
        await empresasStore.empresasNominasPorClienteEdit(idCliente)
      } catch (error) {
        console.error('Error al cargar catálogos por empresa:', error)
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

      if (props.id !== undefined && props.id !== null) {
        titulo = 'Actualización de datos'
        mensaje = `¿Está seguro de que desea actualizar el registro? Los cambios realizados serán guardados de forma permanente.`
      } else {
        titulo = 'Registro de datos'
        mensaje = `¿Está seguro de que desea registrar los datos? Esta acción no se puede deshacer.`
      }

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
        if (props.id !== undefined && props.id !== null) {
          await empresaStore.updateNominaGapeEmpresa(dataModel.value, props.id)
        } else {
          await empresaStore.storeNominaGapeEmpresa(dataModel.value)
        }

        await formRef.reset()

        dialogConfirmation.onOpenDialogInformation(
          'Los datos se guardaron de forma exitosa.',
          'Registro guardado',
          'correct',
          '#438701',
          2,
        )

        router.push({ name: 'EmpresaList' })
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

    function onDeleteItemAztecaInterbancario(item: AztecaInterbancario) {
      itemsAztecaInterbancario.value = itemsAztecaInterbancario.value.filter(
        (i) => i.id !== item.id,
      )
    }

    function onInsertItemAztecaInterbancario() {
      const items = itemsAztecaInterbancario.value

      // Si hay al menos un elemento
      if (items.length > 0) {
        const lastItem = items[items.length - 1]

        // Validar que el último registro tenga clave válida
        if (!lastItem.claveDeBancoId || lastItem.claveDeBancoId.trim() === '') {
          alert('Debe llenar la Clave de Banco ID del último registro antes de agregar otro.')
          return
        }
      }

      // Si pasa la validación, agregar un nuevo registro
      const nuevo: AztecaInterbancario = {
        id: Date.now(), // o algún contador local
        idCliente: 1,
        idEmpresa: 1,
        banco: 'Azteca Interbancario',
        esActivo: true,
        claveDeBancoId: '', // vacío para que lo edite después
      }

      items.push(nuevo)
    }

    const modelTipoEmpresa = ref(true)
    watch(
      modelTipoEmpresa,
      (nuevoValor) => {
        vtabTipoEmpresa.value = nuevoValor ? 'tabTipoEmpresa01' : 'tabTipoEmpresa02'
      },
      { immediate: true },
    )

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresas)

    return {
      btnDisabled,
      dataModel,
      dialogConfirmation,
      formRefFiscalBanco,
      formRefFiscalGral,
      formRefNoFiscalBanco,
      formRefNoFiscalGral,
      getCardHeight,
      headersAztecaInterbancario,
      inputFilters,
      isActiveAztecaBancario,
      isActiveAztecaInterbancario,
      isActiveBanorteTerceros,
      isActiveFondeadora,
      itemsAztecaInterbancario,
      itemsBanco,
      itemsClientesNomina,
      itemsEmpresaDatabase,
      itemsEmpresas,
      loading,
      mergeProps,
      modelEmpresa,
      modelTipoEmpresa,
      onDecision,
      onDeleteItemAztecaInterbancario,
      onInsertItemAztecaInterbancario,
      smAndDown,
      tabEmpresa,
      tabEmpresaNoFisc,
      validationRules,
      vbrePrincipalItems,
      vbtnActivarRegistro,
      vconPrincipalRef,
      vforFiltrosRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vtabTipoEmpresa,
      vtabTipoEmpresaRef,
      buscarEmpresasNomina,
      buscarDatosEmpresaNomina,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
