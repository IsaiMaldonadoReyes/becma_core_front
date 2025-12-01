<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <!-- vrowBarraDeAccionesRef -->
    <v-row ref="vrowBarraDeAccionesRef">
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-tooltip interactive location="bottom">
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
              :to="'/nominas/gape/empresaForm'"
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
                  :disabled="btnDisabled.tabBancos"
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
                              <empresa-tooltips name="ayudaEmpresaNomina" />
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
                              <empresa-tooltips name="ayudaRazonSocial" />
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
                              <empresa-tooltips name="ayudaRfc" />
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
                              <empresa-tooltips name="ayudaCorreoNotificacion" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <bec-text-field
                            v-model="dataModel.codigo_interno"
                            :disabled="btnDisabled.compCodigo"
                            :label="'Código interno'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateAlphanumericField(v, {
                                  required: true,
                                  min: 3,
                                  max: 10,
                                }),
                            ]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaCodigoInterno" />
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
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveFondeadora"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusFondeadora"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveFondeadora
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveFondeadora">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Fondeadora.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Fodeadora.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveFondeadora">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
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
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveAztecaInterbancario"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusAztecaInterbancario"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveAztecaInterbancario
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col
                                                  cols="11"
                                                  v-if="!isActiveAztecaInterbancario"
                                                >
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Azteca Interbancario.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Azteca Interbancario.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaInterbancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
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
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormAztecaInterbancario(
                                                  'onSave',
                                                  {},
                                                  'Nuevo',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormAztecaInterbancario(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationAztecaInterbancario(item)"
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

                                <!-- Azteca bancario -->
                                <v-expansion-panel
                                  class="border"
                                  collapse-icon="mdi-menu-up"
                                  expand-icon="mdi-menu-down"
                                >
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveAztecaBancario"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusAztecaBancario"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveAztecaBancario
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveAztecaBancario">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Azteca Bancario.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Azteca Bancario.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaBancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex align-center justify-center"
                                        md="8"
                                      >
                                        Azteca Bancario
                                      </v-col>
                                      <v-col
                                        v-if="expanded"
                                        class="d-flex align-center justify-end"
                                        cols="12"
                                        md="2"
                                      >
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormAztecaBancario('onSave', {}, 'Nuevo')
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      :headers="headersAztecaBancario"
                                      :hover="true"
                                      :items="itemsAztecaBancario"
                                      :mobile="smAndDown"
                                      hide-default-footer
                                      hide-default-header
                                      item-value="title"
                                    >
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormAztecaBancario(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationAztecaInterbancario(item)"
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

                                <!-- Banorte terceros -->
                                <v-expansion-panel
                                  class="border"
                                  collapse-icon="mdi-menu-up"
                                  expand-icon="mdi-menu-down"
                                >
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveBanorteTerceros"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusBanorte"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveBanorteTerceros
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveBanorteTerceros">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Banorte terceros.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Banorte terceros.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaBancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex align-center justify-center"
                                        md="8"
                                      >
                                        Banorte terceros
                                      </v-col>
                                      <v-col
                                        v-if="expanded"
                                        class="d-flex align-center justify-end"
                                        cols="12"
                                        md="2"
                                      >
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormBanorteTerceros(
                                                  'onSave',
                                                  {},
                                                  'Nuevo',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      :headers="headersBanorteTerceros"
                                      :hover="true"
                                      :items="itemsBanorteTerceros"
                                      :mobile="smAndDown"
                                      hide-default-footer
                                      hide-default-header
                                      item-value="title"
                                    >
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormBanorteTerceros(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationBanorte(item)"
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
                  :disabled="btnDisabled.tabBancos"
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
                            :label="'Razón Social *'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required]"
                            @keypress="inputFilters.onlyAlphanumericWithSpaces"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaRazonSocial" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12">
                          <bec-text-field
                            v-model="dataModel.rfc"
                            :disabled="btnDisabled.compNoFisRfc"
                            :label="'RFC *'"
                            :prepend-icon="'mdi-briefcase-account'"
                            :rules="[validationRules.required, validationRules.rfc]"
                            @keypress="inputFilters.onlyRFC"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaRfc" />
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
                              <empresa-tooltips name="ayudaCorreoNotificacion" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.codigo_interno"
                            :disabled="btnDisabled.compNoFisCodigo"
                            :label="'Código interno *'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateAlphanumericField(v, {
                                  required: true,
                                  min: 3,
                                  max: 10,
                                }),
                            ]"
                            @keypress="inputFilters.onlyAlphanumeric"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaCodigoInterno" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.mascara_codigo"
                            :disabled="btnDisabled.compNoFiscMascara"
                            :label="'Mascara del código *'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateLettersField(v, {
                                  required: true,
                                  min: 3,
                                  max: 10,
                                }),
                              (v: string) =>
                                /^[Xx]{3,10}$/.test(v) || 'Debe contener entre 3 y 10 X',
                            ]"
                            @keypress="inputFilters.onlyLetters"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaMascara" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.codigo_inicial"
                            :disabled="btnDisabled.compNoFiscCodigoInicial"
                            :label="'Código inicial *'"
                            :prepend-icon="'mdi-barcode'"
                            :rules="[
                              (v: any) =>
                                validationRules.validateNumericField(v, {
                                  required: true,
                                  min: 3,
                                  max: 10,
                                }),
                              (v: string) =>
                                new RegExp(`^\\d{${dataModel.mascara_codigo?.length ?? 0}}$`).test(
                                  v,
                                ) || `Debe tener ${dataModel.mascara_codigo?.length ?? 0} dígitos`,
                            ]"
                            @keypress="inputFilters.onlyNumbers"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaCodigoInicial" />
                            </template>
                          </bec-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="12">
                          <bec-text-field
                            v-model="dataModel.codigo_actual"
                            :disabled="btnDisabled.compNoFiscCodigoActual"
                            :label="'Código actual *'"
                            :prepend-icon="'mdi-barcode'"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaCodigoActual" />
                            </template>
                          </bec-text-field>
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                  </v-form>
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
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveFondeadora"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusFondeadora"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveFondeadora
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveFondeadora">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Fondeadora.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Fodeadora.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveFondeadora">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
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
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveAztecaInterbancario"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusAztecaInterbancario"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveAztecaInterbancario
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col
                                                  cols="11"
                                                  v-if="!isActiveAztecaInterbancario"
                                                >
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Azteca Interbancario.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Azteca Interbancario.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaInterbancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
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
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormAztecaInterbancario(
                                                  'onSave',
                                                  {},
                                                  'Nuevo',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormAztecaInterbancario(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationAztecaInterbancario(item)"
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

                                <!-- Azteca bancario -->
                                <v-expansion-panel
                                  class="border"
                                  collapse-icon="mdi-menu-up"
                                  expand-icon="mdi-menu-down"
                                >
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveAztecaBancario"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusAztecaBancario"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveAztecaBancario
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveAztecaBancario">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Azteca Bancario.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Azteca Bancario.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaBancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex align-center justify-center"
                                        md="8"
                                      >
                                        Azteca Bancario
                                      </v-col>
                                      <v-col
                                        v-if="expanded"
                                        class="d-flex align-center justify-end"
                                        cols="12"
                                        md="2"
                                      >
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormAztecaBancario('onSave', {}, 'Nuevo')
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      :headers="headersAztecaBancario"
                                      :hover="true"
                                      :items="itemsAztecaBancario"
                                      :mobile="smAndDown"
                                      hide-default-footer
                                      hide-default-header
                                      item-value="title"
                                    >
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormAztecaBancario(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationAztecaInterbancario(item)"
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

                                <!-- Banorte terceros -->
                                <v-expansion-panel
                                  class="border"
                                  collapse-icon="mdi-menu-up"
                                  expand-icon="mdi-menu-down"
                                >
                                  <v-expansion-panel-title class="border-b" v-slot="{ expanded }">
                                    <v-row>
                                      <v-col cols="12" md="2">
                                        <v-tooltip interactive location="bottom">
                                          <template #activator="{ props: tooltipProps }">
                                            <v-switch
                                              v-model="isActiveBanorteTerceros"
                                              v-bind="mergeProps(tooltipProps)"
                                              class="text-medium-emphasis"
                                              color="primary"
                                              density="compact"
                                              false-icon="mdi-bank-off"
                                              hide-details
                                              inset
                                              true-icon="mdi-bank"
                                              @click.stop
                                              @click="changeStatusBanorte"
                                            />
                                          </template>

                                          <template #default>
                                            <v-card color="transparent" elevation="0" class="py-3">
                                              <v-row>
                                                <v-col
                                                  cols="1"
                                                  class="d-flex align-center justify-center"
                                                >
                                                  <v-icon
                                                    class="mr-1"
                                                    color="white"
                                                    :icon="
                                                      !isActiveBanorteTerceros
                                                        ? 'mdi-bank-off'
                                                        : 'mdi-bank'
                                                    "
                                                  />
                                                </v-col>
                                                <v-col cols="11" v-if="!isActiveBanorteTerceros">
                                                  Haga clic aquí para <b>HABILITAR</b> el Banco
                                                  Banorte terceros.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  Haga clic aquí para <b>DESHABILITAR</b> el Banco
                                                  Banorte terceros.<br />
                                                </v-col>
                                              </v-row>

                                              <v-divider class="border-opacity-50 my-2 mx-4" />

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
                                                <v-col cols="11" v-if="isActiveAztecaBancario">
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>HABILITADO</b>, podrá generar el layout de
                                                  dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                                <v-col cols="11" v-else>
                                                  <span style="font-weight: bold"> Nota: </span>
                                                  si el banco se encuentra
                                                  <b>DESHABILITADO</b>, no podrá generar el layout
                                                  de dispersión de nómina correspondiente para esta
                                                  empresa.
                                                </v-col>
                                              </v-row>
                                            </v-card>
                                          </template>
                                        </v-tooltip>
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        class="d-flex align-center justify-center"
                                        md="8"
                                      >
                                        Banorte terceros
                                      </v-col>
                                      <v-col
                                        v-if="expanded"
                                        class="d-flex align-center justify-end"
                                        cols="12"
                                        md="2"
                                      >
                                        <v-tooltip
                                          bottom
                                          color="primary"
                                          interactive
                                          location="bottom"
                                        >
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              color="primary"
                                              flat
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              @click.stop="
                                                onOpenModalFormBanorteTerceros(
                                                  'onSave',
                                                  {},
                                                  'Nuevo',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-plus" size="24px" />
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
                                      :headers="headersBanorteTerceros"
                                      :hover="true"
                                      :items="itemsBanorteTerceros"
                                      :mobile="smAndDown"
                                      hide-default-footer
                                      hide-default-header
                                      item-value="title"
                                    >
                                      <template v-slot:item.activo_dispersion="{ item }">
                                        <v-chip
                                          :color="item.activo_dispersion ? 'primary' : 'grey'"
                                          label
                                          size="small"
                                          variant="flat"
                                        >
                                          {{
                                            item.activo_dispersion ? 'Habilitado' : 'Inhabilitado'
                                          }}
                                        </v-chip>
                                      </template>

                                      <template v-slot:item.acciones="{ item }">
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click.stop="
                                                onOpenModalFormBanorteTerceros(
                                                  'onSave',
                                                  item,
                                                  'Editar',
                                                )
                                              "
                                            >
                                              <v-icon color="white" icon="mdi-pencil" />
                                            </v-btn>
                                          </template>
                                          <span>Editar</span>
                                        </v-tooltip>
                                        <v-tooltip interactive location="bottom">
                                          <template v-slot:activator="{ props: tooltipProps }">
                                            <v-btn
                                              v-bind="mergeProps(tooltipProps)"
                                              class="mr-1"
                                              color="primary"
                                              height="40px"
                                              min-width="40px"
                                              width="40px"
                                              variant="elevated"
                                              @click="onDeleteConfirmationBanorte(item)"
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
                  </v-tabs-window-item>
                </v-tabs-window>
              </div>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>

    <banco-azteca-interbancario-modal-form
      :dialog-event="modalFormBancoAztecaInterbancario.evento"
      :dialog-items="modalFormBancoAztecaInterbancario.items"
      :dialog-title="modalFormBancoAztecaInterbancario.titulo"
      :dialog-view="modalFormBancoAztecaInterbancario.dialog"
      @cancel="onCloseModalFormAztecaInterbancario"
      @close="onCloseModalFormAztecaInterbancario"
      @save="onSaveModalFormAztecaInterbancario"
    />
    <banco-azteca-bancario-modal-form
      :dialog-event="modalFormBancoAztecaBancario.evento"
      :dialog-items="modalFormBancoAztecaBancario.items"
      :dialog-title="modalFormBancoAztecaBancario.titulo"
      :dialog-view="modalFormBancoAztecaBancario.dialog"
      @cancel="onCloseModalFormAztecaBancario"
      @close="onCloseModalFormAztecaBancario"
      @save="onSaveModalFormAztecaBancario"
    />

    <banco-banorte-terceros-modal-form
      :dialog-event="modalFormBancoBanorteTerceros.evento"
      :dialog-items="modalFormBancoBanorteTerceros.items"
      :dialog-title="modalFormBancoBanorteTerceros.titulo"
      :dialog-view="modalFormBancoBanorteTerceros.dialog"
      @cancel="onCloseModalFormBanorteTerceros"
      @close="onCloseModalFormBanorteTerceros"
      @save="onSaveModalFormBanorteTerceros"
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
} from 'vue'

import { useDisplay } from 'vuetify'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'
import { EmpresaTooltips } from '@/components/nomina/ayudas'

// import composables
import { useEmpresaModel } from '@/composables/nomina/gape/useEmpresa'

// import stores
import { useClienteStore, useEmpresaStore, useBancoStore } from '@/stores/modules/Nomina/gape'

import { useEmpresasStore } from '@/stores/modules/Core'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils

import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import router
import { useRouter } from 'vue-router'

// import views
import BancoAztecaInterbancarioModalForm from '@/views/nominas/gape/BancoAztecaInterbancarioModalForm.vue'
import BancoAztecaBancarioModalForm from '@/views/nominas/gape/BancoAztecaBancarioModalForm.vue'
import BancoBanorteTercerosModalForm from '@/views/nominas/gape/BancoBanorteTercerosModalForm.vue'

export interface AztecaInterbancario {
  id: number
  id_nomina_gape_empresa: number | null
  activo_dispersion: boolean | null
  cuenta_origen: string | null
  tipo_banco: string | null
}

export interface AztecaBancario {
  id: number
  id_nomina_gape_empresa: number | null
  activo_dispersion: boolean | null
  cuenta_origen: string | null
  tipo_banco: string | null
}

export interface BanorteTerceros {
  id: number
  id_nomina_gape_empresa: number | null
  activo_dispersion: boolean | null
  cuenta_origen: string | null
  clave_banco: string | null
}

export default defineComponent({
  name: 'EmpresaForm',
  components: {
    BecSelect,
    BecAutocomplete,
    BecTextField,
    EmpresaTooltips,
    BancoAztecaInterbancarioModalForm,
    BancoAztecaBancarioModalForm,
    BancoBanorteTercerosModalForm,
  },
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
    const bancoStore = useBancoStore()
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
      activarRegistro: false,
      crearRegistro: true,

      tabDatosGenerales: true,
      tabBancos: true,

      tabNoFisDatosGenerales: true,
      tabNoFisBancos: true,

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

      compNoFiscMascara: false,
      compNoFiscCodigoInicial: true,
      compNoFiscCodigoActual: true,
    })

    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

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

    const itemsAztecaInterbancario = ref<AztecaInterbancario[]>([])

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
        key: 'activo_dispersion',
        sortable: false,
        title: '',
        width: '20%',
      },
      {
        key: 'cuenta_origen',
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

    const itemsAztecaBancario = ref<AztecaBancario[]>([])

    const headersAztecaBancario = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'activo_dispersion',
        sortable: false,
        title: '',
        width: '20%',
      },
      {
        key: 'cuenta_origen',
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

    const itemsBanorteTerceros = ref<BanorteTerceros[]>([])

    const headersBanorteTerceros = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'activo_dispersion',
        sortable: false,
        title: '',
        width: '20%',
      },
      {
        key: 'cuenta_origen',
        align: 'center',
        sortable: false,
        title: '',
      },
      {
        key: 'clave_banco',
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

    //4. Reactive | modalForm
    const modalFormBancoAztecaInterbancario = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    const modalFormBancoAztecaBancario = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    const modalFormBancoBanorteTerceros = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    const itemsClientesNomina = computed(() => clienteStore.clientes)
    const itemsEmpresaDatabase = computed(() => empresasStore.empresas)

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

    watch(
      () => dataModel.value.mascara_codigo,
      (nuevaMascara) => {
        if (props.id !== undefined && props.id !== null) return
        validarMascaraYActualizarCampos(nuevaMascara)
      },
    )
    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)
      })

      await fetchClientes()
      await fetchSincronizarBases()

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
        btnDisabled.value.tabBancos = false

        btnDisabled.value.crearRegistro = false
        btnDisabled.value.compNoFiscMascara = true
        btnDisabled.value.compNoFiscCodigoInicial = true

        await fetchDatosEmpresasNominaPorClienteId(props.id)

        await buscarDatosBancosPorId(props.id)
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

    const validarMascaraYActualizarCampos = (mascara: string) => {
      const regexMascara = /^[Xx]{3,10}$/ // solo X o x, entre 3 y 10
      const esValida = regexMascara.test(mascara)

      btnDisabled.value.compNoFiscCodigoInicial = !esValida

      if (!esValida) {
        dataModel.value.codigo_inicial = ''
      }
    }

    const buscarDatosBancosPorId = async (id: any) => {
      await bancoStore.datosBancosPorCliente(props.id)

      itemsAztecaInterbancario.value = bancoStore.aztecaInter
      itemsAztecaBancario.value = bancoStore.aztecaBancario
      itemsBanorteTerceros.value = bancoStore.banorte

      isActiveFondeadora.value = bancoStore.bancosDispersion?.fondeadora ?? false
      isActiveAztecaInterbancario.value = bancoStore.bancosDispersion?.azteca_interbancario ?? false
      isActiveAztecaBancario.value = bancoStore.bancosDispersion?.azteca_bancario ?? false
      isActiveBanorteTerceros.value = bancoStore.bancosDispersion?.banorte ?? false
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
          const estado = empresaStore.empresa.estado

          await fetchEmpresasNominaPorClienteAsignadas(idClienteEdit)

          setEmpresa(empresaStore.empresa)
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

    const fetchEmpresasNominaPorClienteAsignadas = async (idCliente: any) => {
      try {
        await empresasStore.empresasNominasPorClienteAsignadas(idCliente)
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

    const changeStatusFondeadora = async () => {
      const datos = {
        id_nomina_gape_empresa: props.id,
        fondeadora: !isActiveFondeadora.value,
      }
      await bancoStore.upsertBancoDispersion(datos)
    }

    const changeStatusAztecaInterbancario = async () => {
      const datos = {
        id_nomina_gape_empresa: props.id,
        azteca_interbancario: !isActiveAztecaInterbancario.value,
      }
      await bancoStore.upsertBancoDispersion(datos)
    }

    const changeStatusAztecaBancario = async () => {
      const datos = {
        id_nomina_gape_empresa: props.id,
        azteca_bancario: !isActiveAztecaBancario.value,
      }
      await bancoStore.upsertBancoDispersion(datos)
    }

    const changeStatusBanorte = async () => {
      const datos = {
        id_nomina_gape_empresa: props.id,
        banorte: !isActiveBanorteTerceros.value,
      }
      await bancoStore.upsertBancoDispersion(datos)
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
      let idEmpresaCreada = null

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

        let titulo = 'Registro guardado'
        let mensaje = 'Los datos se guardaron de forma exitosa.'

        // Aquí va tu guardado real
        if (props.id !== undefined && props.id !== null) {
          await empresaStore.updateNominaGapeEmpresa(dataModel.value, props.id)
          mensaje = 'Los datos se actualizaron de forma exitosa.'
          titulo = 'Registro actualizado'

          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)

          router.push({ name: 'EmpresaList' })
        } else {
          dataModel.value.codigo_actual = dataModel.value.codigo_inicial
          const response = await empresaStore.storeNominaGapeEmpresa(dataModel.value)

          idEmpresaCreada = response.id

          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)

          if (idEmpresaCreada) {
            router.push({ path: `/nominas/gape/empresaForm/${idEmpresaCreada}` })
          }
        }

        await formRef.reset()
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

    type Eventos = 'onSave' | 'onEdit'
    const methodsModalFormAztecaInterbancario: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        modalFormBancoAztecaInterbancario.value.dialog = false
        //fnCargarListado()
      },
      onEdit: () => {
        modalFormBancoAztecaInterbancario.value.dialog = false
        //fnCargarListado()
      },
    }

    const methodsModalFormAztecaBancario: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        modalFormBancoAztecaBancario.value.dialog = false
        //fnCargarListado()
      },
      onEdit: () => {
        modalFormBancoAztecaBancario.value.dialog = false
        //fnCargarListado()
      },
    }

    const methodsModalFormBanorteTerceros: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        modalFormBancoBanorteTerceros.value.dialog = false
        //fnCargarListado()
      },
      onEdit: () => {
        modalFormBancoBanorteTerceros.value.dialog = false
        //fnCargarListado()
      },
    }

    const onDeleteConfirmationAztecaInterbancario = (
      item: AztecaInterbancario | AztecaBancario,
    ) => {
      let mensaje = `¿Está seguro de que desea eliminar el registro seleccionado? Esta acción no se puede deshacer.`
      let titulo = 'Eliminiar registro'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        () => onDeleteItemAztecaInterbancario(item),
        [],
        titulo,
        'alert',
      )
    }

    async function onDeleteItemAztecaInterbancario(item: AztecaInterbancario | AztecaBancario) {
      try {
        // Llamar a la API para eliminar los registros por sus IDs
        await bancoStore.deleteBancoAzteca(item.id) // Asegúrate de que esta función exista en tu store

        await buscarDatosBancosPorId(props.id)
        // Mostrar mensaje de éxito
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage,
          'Registro eliminado',
          'correct',
          '#438701',
          1,
        )
        // Refrescar la lista
        //fnCargarListado()
      } catch (error) {
        // Mostrar mensaje de error
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage,
          'Error al eliminar',
          'incorrect',
          '#B00000',
          1,
        )
      }
    }

    const onOpenModalFormAztecaInterbancario = (evento: string, items: object, titulo: string) => {
      if (titulo == 'Nuevo') {
        items = {
          id_nomina_gape_empresa: props.id,
        }
      }

      modalFormBancoAztecaInterbancario.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseModalFormAztecaInterbancario = async () => {
      modalFormBancoAztecaInterbancario.value.dialog = false
      await buscarDatosBancosPorId(props.id)
      //fnCargarListado()
    }

    const onSaveModalFormAztecaInterbancario = async (evento: Eventos) => {
      methodsModalFormAztecaInterbancario[evento]()
      await buscarDatosBancosPorId(props.id)
    }

    const onDeleteConfirmationBanorte = (item: BanorteTerceros) => {
      let mensaje = `¿Está seguro de que desea eliminar el registro seleccionado? Esta acción no se puede deshacer.`
      let titulo = 'Eliminiar registro'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        () => onDeleteItemBanorte(item),
        [],
        titulo,
        'alert',
      )
    }

    async function onDeleteItemBanorte(item: BanorteTerceros) {
      try {
        // Llamar a la API para eliminar los registros por sus IDs
        await bancoStore.deleteBancoBanorte(item.id) // Asegúrate de que esta función exista en tu store

        await buscarDatosBancosPorId(props.id)
        // Mostrar mensaje de éxito
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage,
          'Registro eliminado',
          'correct',
          '#438701',
          1,
        )
        // Refrescar la lista
        //fnCargarListado()
      } catch (error) {
        // Mostrar mensaje de error
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage,
          'Error al eliminar',
          'incorrect',
          '#B00000',
          1,
        )
      }
    }

    function onDeleteItemAztecaBancario(item: AztecaBancario) {
      itemsAztecaBancario.value = itemsAztecaBancario.value.filter((i) => i.id !== item.id)
    }

    const onOpenModalFormAztecaBancario = (evento: string, items: object, titulo: string) => {
      if (titulo == 'Nuevo') {
        items = {
          id_nomina_gape_empresa: props.id,
        }
      }

      modalFormBancoAztecaBancario.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseModalFormAztecaBancario = async () => {
      modalFormBancoAztecaBancario.value.dialog = false
      await buscarDatosBancosPorId(props.id)
    }

    const onSaveModalFormAztecaBancario = async (evento: Eventos) => {
      methodsModalFormAztecaBancario[evento]()
      await buscarDatosBancosPorId(props.id)
    }

    const onOpenModalFormBanorteTerceros = (evento: string, items: object, titulo: string) => {
      if (titulo == 'Nuevo') {
        items = {
          id_nomina_gape_empresa: props.id,
        }
      }
      modalFormBancoBanorteTerceros.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    const onCloseModalFormBanorteTerceros = async () => {
      modalFormBancoBanorteTerceros.value.dialog = false
      await buscarDatosBancosPorId(props.id)
    }

    const onSaveModalFormBanorteTerceros = async (evento: Eventos) => {
      methodsModalFormBanorteTerceros[evento]()
      await buscarDatosBancosPorId(props.id)
    }

    return {
      btnDisabled,
      buscarDatosEmpresaNomina,
      buscarEmpresasNomina,
      changeStatusFondeadora,
      dataModel,
      dialogConfirmation,
      formRefFiscalBanco,
      formRefFiscalGral,
      formRefNoFiscalBanco,
      formRefNoFiscalGral,
      getCardHeight,
      headersAztecaBancario,
      headersAztecaInterbancario,
      headersBanorteTerceros,
      inputFilters,
      isActiveAztecaBancario,
      isActiveAztecaInterbancario,
      isActiveBanorteTerceros,
      isActiveFondeadora,
      itemsAztecaBancario,
      itemsAztecaInterbancario,
      itemsBanco,
      itemsBanorteTerceros,
      itemsClientesNomina,
      itemsEmpresaDatabase,
      itemsEmpresas,
      loading,
      mergeProps,
      modalFormBancoAztecaBancario,
      modalFormBancoAztecaInterbancario,
      modalFormBancoBanorteTerceros,
      modelEmpresa,
      onCloseModalFormAztecaBancario,
      onCloseModalFormAztecaInterbancario,
      onCloseModalFormBanorteTerceros,
      onDecision,
      onDeleteConfirmationAztecaInterbancario,
      onDeleteConfirmationBanorte,
      onDeleteItemAztecaBancario,
      onDeleteItemAztecaInterbancario,
      onOpenModalFormAztecaBancario,
      onOpenModalFormAztecaInterbancario,
      onOpenModalFormBanorteTerceros,
      onSaveModalFormAztecaBancario,
      onSaveModalFormAztecaInterbancario,
      onSaveModalFormBanorteTerceros,
      smAndDown,
      tabEmpresa,
      tabEmpresaNoFisc,
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vforFiltrosRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      vtabTipoEmpresa,
      vtabTipoEmpresaRef,
      changeStatusAztecaInterbancario,
      changeStatusAztecaBancario,
      changeStatusBanorte,
    }
  },
})
</script>
<style scoped>
.draggable-row {
  cursor: grab;
}
</style>
