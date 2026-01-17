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
      <v-col cols="12" lg="12">
        <bec-autocomplete
          v-model="dataModel.id_nomina_gape_cliente"
          :disabled="btnDisabled.compCliente"
          :item-subtitle="(item) => `${item.codigo}`"
          :item-title="'nombre'"
          :item-value="'id'"
          :items="getItemsClientesNomina"
          :label="'Cliente'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :show-chips="false"
          @click:clear="console.log('onClickClear')"
          @update:model-value="buscarEmpresasNomina"
        >
          <template #tooltip>
            <empresa-tooltips name="ayudaFiltroCliente" />
          </template>
        </bec-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="d-lg-flex flex-lg-row" style="height: 100%">
          <!-- vtabVertical -->
          <v-tabs
            v-model="modelTabVertical"
            :direction="smAndDown ? 'horizontal' : 'vertical'"
            align-tabs="center"
            class="border rounded tab-right text-medium-emphasis"
            color="primary"
            show-arrows
            width="100px"
          >
            <v-tooltip
              v-for="item in itemsTabVertical"
              :key="item.value"
              :disabled="!item.tooltip"
              location="right"
            >
              <template #activator="{ props: tooltipProps }">
                <div v-bind="tooltipProps">
                  <v-tab
                    :disabled="!tabsHabilitados[item.value]"
                    :prepend-icon="item.icon"
                    :text="item.text"
                    :value="item.value"
                    :variant="modelTabVertical == item.value ? 'tonal' : 'text'"
                    class="text-none text-no-wrap"
                    min-width="100%"
                    style="letter-spacing: 0.5px"
                    @click="onClickTabVertical(item.value)"
                  />
                </div>
              </template>

              <template #default>
                <empresa-tooltips :name="item.tooltip" />
              </template>
            </v-tooltip>
          </v-tabs>

          <div class="flex-lg-grow-1 overflow-auto" :style="getCardHeight">
            <v-tabs-window v-model="modelTabVertical" :mobile="smAndDown">
              <!-- Esquemas de pago -->
              <v-tabs-window-item value="option-1">
                <v-row class="ml-2">
                  <v-col cols="12" class="">
                    <v-sheet border rounded>
                      <v-data-table
                        v-model="modelSeleccionadosCombinacionEsquema"
                        :headers="headersCombinacionEsquema"
                        :height="smAndDown ? undefined : getTableHeight"
                        :hover="true"
                        :items="itemsCombinacionEsquema"
                        :mobile="smAndDown"
                        :sticky="true"
                        eager
                        fixed-header
                        hide-default-footer
                        item-value="combinacion"
                        return-object
                        show-select
                      >
                        <template
                          v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
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
                                <span>Habilitar todo</span>
                              </v-tooltip>
                            </v-btn>
                          </v-btn-group>
                        </template>

                        <template
                          v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }"
                        >
                          <v-checkbox-btn
                            :model-value="isSelected(internalItem)"
                            color="primary"
                            @update:model-value="toggleSelect(internalItem)"
                          />
                        </template>

                        <template v-slot:item.estado="{ item }">
                          <v-chip
                            :color="item.estado ? 'primary' : 'grey'"
                            size="small"
                            label
                            variant="flat"
                          >
                            {{ item.estado ? 'Habilitado' : 'Inhabilitado' }}
                          </v-chip>
                        </template>

                        <template v-slot:item.esquemas="{ item }">
                          <bec-autocomplete
                            v-model="item.esquemas"
                            :items="itemsEsquemasDePago"
                            :label="'Esquemas de pago'"
                            hide-details
                            item-title="esquema"
                            item-value="id"
                            multiple
                            return-object
                            @update:model-value="onUpdateItemsEsquemasDePago(item)"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaEsquemasDePago" />
                            </template>
                          </bec-autocomplete>
                        </template>

                        <template v-slot:item.tope="{ item }">
                          <v-sheet border rounded class="my-2">
                            <v-data-table
                              :headers="headersTope"
                              :items="item.topes"
                              density="compact"
                              hide-default-footer
                              hide-default-header
                              item-key="id_nomina_gape_esquema"
                              no-data-text=""
                            >
                              <template v-slot:item.tope="{ item: tope }">
                                <bec-text-field
                                  v-model="tope.tope"
                                  :clearable="true"
                                  :label="'Tope de ' + tope.esquema"
                                  :placeholder="'Tope de ' + tope.esquema"
                                  class="my-4"
                                  @keypress="inputFilters.onlyDecimal"
                                  prefix="$"
                                >
                                </bec-text-field>
                              </template>

                              <template v-slot:item.drag="{ index, item: slotItem }">
                                <div style="pointer-events: auto">
                                  <v-tooltip location="bottom" :disabled="isDragging">
                                    <template #activator="{ props: tooltipProps }">
                                      <v-icon
                                        v-bind="mergeProps(tooltipProps)"
                                        :color="
                                          esFilaFija(slotItem as ItemsTopeEsquema)
                                            ? 'grey'
                                            : 'primary'
                                        "
                                        :draggable="!esFilaFija(slotItem as ItemsTopeEsquema)"
                                        class="draggable-row"
                                        icon="mdi-drag"
                                        style="cursor: grab"
                                        @dragover.prevent
                                        @dragstart="onDragStart(index, item.topes)"
                                        @drop="onDrop(index, item.topes)"
                                      />
                                    </template>
                                    <template #default>
                                      <empresa-tooltips name="ayudaInstruccionConcepto" />
                                    </template>
                                  </v-tooltip>
                                </div>
                              </template>

                              <template v-slot:no-data>
                                <v-card
                                  border
                                  class="ma-5 d-flex align-center justify-center"
                                  color="transparent"
                                  elevation="0"
                                >
                                  <v-card-text class="text-grey-darken-1">
                                    <v-icon
                                      class="mr-2"
                                      color="grey-lighten-1"
                                      icon="mdi-selection-search"
                                      size="24"
                                    />
                                    <span>No hay esquemas seleccionados</span>
                                  </v-card-text>
                                </v-card>
                              </template>
                            </v-data-table>
                          </v-sheet>
                        </template>

                        <template v-slot:item.eliminar="{ item }">
                          <v-tooltip bottom interactive location="bottom">
                            <template v-slot:activator="{ props: tooltipProps }">
                              <v-btn
                                v-bind="mergeProps(tooltipProps)"
                                class="me-2"
                                color="primary"
                                height="40px"
                                min-width="40px"
                                variant="flat"
                                width="40px"
                                @click="onDeleteCombinacionEsquemaConfirmation(item)"
                              >
                                <v-icon color="white" icon="mdi-delete" size="24px" />
                              </v-btn>
                            </template>
                            <span>Agregar nueva combinación de esquemas</span>
                          </v-tooltip>
                        </template>

                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title color="primary" class="text-primary text-body-1">
                              Configuración de las combinaciones de esquemas de pago
                            </v-toolbar-title>

                            <v-tooltip bottom interactive location="bottom">
                              <template v-slot:activator="{ props: tooltipProps }">
                                <v-btn
                                  v-bind="mergeProps(tooltipProps)"
                                  :disabled="
                                    !dataModel.id_nomina_gape_cliente || isNullRowCombinacionEsquema
                                  "
                                  class="me-2"
                                  color="primary"
                                  height="40px"
                                  min-width="40px"
                                  variant="flat"
                                  width="40px"
                                  @click="onAddRowCombinacionEsquema"
                                >
                                  <v-icon color="white" icon="mdi-plus" size="24px" />
                                </v-btn>
                              </template>
                              <span>Agregar nueva combinación de esquemas</span>
                            </v-tooltip>
                          </v-toolbar>
                        </template>

                        <template v-slot:no-data>
                          <v-card
                            :height="smAndDown ? undefined : getTableNoDataHeight"
                            border
                            class="ma-5 d-flex align-center justify-center"
                            color="transparent"
                            elevation="0"
                          >
                            <v-card-text class="text-grey-darken-1">
                              <v-icon
                                class="mr-2"
                                color="grey-lighten-1"
                                icon="mdi-selection-search"
                                size="40"
                              />
                              <span>No hay esquemas configurados</span>
                            </v-card-text>
                          </v-card>
                        </template>
                      </v-data-table>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-tabs-window-item>

              <!-- Datos empresa -->
              <v-form ref="formDatosEmpresa" v-model="formDatosEmpresaValido" validate-on="blur">
                <v-tabs-window-item value="option-2">
                  <v-row class="ml-2">
                    <v-col cols="12">
                      <v-divider class="border-opacity-25 ma-0 pa-0" />
                      <v-card-title color="primary" class="text-primary text-body-1">
                        Datos generales de la empresa
                      </v-card-title>
                      <v-divider class="border-opacity-25 ma-0 pa-0" />
                    </v-col>
                  </v-row>
                  <v-row class="mt-1 ml-2">
                    <v-col cols="12">
                      <bec-autocomplete
                        v-model="dataModel.id_empresa_database"
                        :disabled="btnDisabled.compEmpresa"
                        :item-subtitle="(item) => `${item.nombre_base}`"
                        :item-title="'nombre_empresa'"
                        :item-value="'id'"
                        :items="getItemsEmpresaDatabase"
                        :label="'Empresa CONTPAQi Nóminas *'"
                        :multiple="false"
                        :prepend-icon="'mdi-laptop'"
                        :return-object="false"
                        :rules="btnDisabled.compEmpresa ? [] : [validationRules.required2]"
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
                        :label="'Razón Social *'"
                        :prepend-icon="'mdi-card-account-details'"
                        :rules="btnDisabled.compRazonSocial ? [] : [validationRules.required]"
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
                        :label="'RFC *'"
                        :prepend-icon="'mdi-card-account-details'"
                        :rules="
                          btnDisabled.compRfc ? [] : [validationRules.required, validationRules.rfc]
                        "
                      >
                        <template #tooltip>
                          <empresa-tooltips name="ayudaRfc" />
                        </template>
                      </bec-text-field>
                    </v-col>
                    <v-col cols="12">
                      <bec-text-field
                        v-model="dataModel.correo_notificacion"
                        :clearable="true"
                        :disabled="btnDisabled.compCorreo"
                        :label="'Correo asignado para notificaciones'"
                        :prepend-icon="'mdi-email'"
                        :rules="
                          btnDisabled.compCorreo
                            ? []
                            : [validationRules.required, validationRules.emailIfNotEmpty]
                        "
                      >
                        <template #tooltip>
                          <empresa-tooltips name="ayudaCorreoNotificacion" />
                        </template>
                      </bec-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" md="12">
                      <bec-text-field
                        v-model="dataModel.mascara_codigo"
                        :clearable="true"
                        :disabled="btnDisabled.compNoFiscMascara"
                        :label="'Mascara del código *'"
                        :prepend-icon="'mdi-barcode'"
                        :rules="
                          btnDisabled.compNoFiscMascara
                            ? []
                            : [
                                (v: any) =>
                                  validationRules.validateLettersField(v, {
                                    required: true,
                                    min: 3,
                                    max: 10,
                                  }),
                                (v: string) =>
                                  /^[Xx]{3,10}$/.test(v) || 'Debe contener entre 3 y 10 X',
                              ]
                        "
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
                        :clearable="true"
                        :disabled="btnDisabled.compNoFiscCodigoInicial"
                        :label="'Código inicial *'"
                        :prepend-icon="'mdi-barcode'"
                        :rules="
                          btnDisabled.compNoFiscCodigoInicial
                            ? []
                            : [
                                (v: any) =>
                                  validationRules.validateNumericField(v, {
                                    required: true,
                                    min: 3,
                                    max: 10,
                                  }),
                                (v: string) =>
                                  new RegExp(
                                    `^\\d{${dataModel.mascara_codigo?.length ?? 0}}$`,
                                  ).test(v) ||
                                  `Debe tener ${dataModel.mascara_codigo?.length ?? 0} dígitos`,
                              ]
                        "
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
                        :label="'Código actual'"
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

              <!-- Parametrización -->
              <v-tabs-window-item value="option-3" eager>
                <v-row class="ml-2">
                  <v-col cols="12">
                    <v-sheet border rounded>
                      <v-data-table
                        v-model="itemsSeleccionados"
                        :headers="headersParametrizacion"
                        :height="smAndDown ? undefined : getTableHeight"
                        :hover="true"
                        :items="itemsParametrizacion"
                        :mobile="smAndDown"
                        :sticky="true"
                        color="transparent"
                        eager
                        fixed-header
                        hide-default-footer
                        item-value="Codigo"
                        return-object
                        show-select
                      >
                        <template
                          v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
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
                          v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }"
                        >
                          <v-checkbox-btn
                            :model-value="isSelected(internalItem)"
                            color="primary"
                            @update:model-value="toggleSelect(internalItem)"
                          />
                        </template>

                        <template v-slot:item.esActivo="{ item }">
                          <v-chip
                            :color="
                              itemsSeleccionados.some((i) => i === item.id) ? 'primary' : 'grey'
                            "
                            size="small"
                            label
                            variant="flat"
                          >
                            {{
                              itemsSeleccionados.some((i) => i === item.Codigo)
                                ? 'Habilitado'
                                : 'Inhabilitado'
                            }}
                          </v-chip>
                        </template>

                        <template v-slot:item.fee="{ item }">
                          <bec-text-field
                            v-model="dataModel.razon_social"
                            placeholder="0.00"
                            :rules="btnDisabled.compRazonSocial ? [] : [validationRules.required]"
                          >
                          </bec-text-field>
                        </template>

                        <template v-slot:item.baseFee="{ item }">
                          <bec-select
                            :items="itemsBaseFEE"
                            :item-title="'concepto'"
                            :item-value="'codigo'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                          >
                          </bec-select>
                        </template>

                        <template v-slot:item.provisiones="{ item }">
                          <bec-select
                            :items="itemsComprobacion"
                            :item-title="'concepto'"
                            :item-value="'codigo'"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                          >
                          </bec-select>
                        </template>

                        <template v-slot:item.prevision="{ item }">
                          <v-autocomplete
                            v-model="item.prevision"
                            :items="catalogoConceptosPrevision"
                            item-title="descripcion"
                            item-value="id"
                            return-object
                            clearable
                            hide-details
                            label="Previsión"
                            :disabled="!tieneEsquemaContpaqi(item.esquemas)"
                          />
                        </template>

                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title color="primary" class="text-primary text-body-1">
                              Configuración de la parametrización de las combinaciones de los
                              esquemas de pago
                            </v-toolbar-title>

                            <v-tooltip bottom interactive location="bottom">
                              <template v-slot:activator="{ props: tooltipProps }">
                                <v-btn
                                  v-bind="mergeProps(tooltipProps)"
                                  :disabled="
                                    !dataModel.id_nomina_gape_cliente || isNullRowCombinacionEsquema
                                  "
                                  class="me-2"
                                  color="primary"
                                  height="40px"
                                  min-width="40px"
                                  variant="flat"
                                  width="40px"
                                  @click="onAddRowCombinacionEsquema"
                                >
                                  <v-icon color="white" icon="mdi-plus" size="24px" />
                                </v-btn>
                              </template>
                              <span>Agregar nueva combinación de esquemas</span>
                            </v-tooltip>
                          </v-toolbar>
                        </template>

                        <template v-slot:no-data>
                          <v-card
                            :height="smAndDown ? undefined : getTableNoDataHeight"
                            border
                            class="ma-5 d-flex align-center justify-center"
                            color="transparent"
                            elevation="0"
                          >
                            <v-card-text class="text-grey-darken-1">
                              <v-icon
                                class="mr-2"
                                color="grey-lighten-1"
                                icon="mdi-selection-search"
                                size="40"
                              />
                              <span>No hay esquemas configurados</span>
                            </v-card-text>
                          </v-card>
                        </template>
                      </v-data-table>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-tabs-window-item>

              <!-- Bancos  -->
              <v-tabs-window-item value="option-4" eager>
                <v-row class="ml-2">
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

                <v-row class="mt-1 ml-2">
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
                                                  !isActiveFondeadora ? 'mdi-bank-off' : 'mdi-bank'
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
                                              <v-icon class="mr-1" color="white" icon="mdi-alert" />
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
                                              <b>DESHABILITADO</b>, no podrá generar el layout de
                                              dispersión de nómina correspondiente para esta
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
                                            <v-col cols="11" v-if="!isActiveAztecaInterbancario">
                                              Haga clic aquí para <b>HABILITAR</b> el Banco Azteca
                                              Interbancario.
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
                                              <v-icon class="mr-1" color="white" icon="mdi-alert" />
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
                                              <b>DESHABILITADO</b>, no podrá generar el layout de
                                              dispersión de nómina correspondiente para esta
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
                                    <v-tooltip bottom color="primary" interactive location="bottom">
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
                                    <v-divider vertical class="ml-5 mr-3 my-1 border-opacity-25" />
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
                                      {{ item.activo_dispersion ? 'Habilitado' : 'Inhabilitado' }}
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
                                              Haga clic aquí para <b>HABILITAR</b> el Banco Azteca
                                              Bancario.
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
                                              <v-icon class="mr-1" color="white" icon="mdi-alert" />
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
                                              <b>DESHABILITADO</b>, no podrá generar el layout de
                                              dispersión de nómina correspondiente para esta
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
                                    <v-tooltip bottom color="primary" interactive location="bottom">
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
                                    <v-divider vertical class="ml-5 mr-3 my-1 border-opacity-25" />
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
                                      {{ item.activo_dispersion ? 'Habilitado' : 'Inhabilitado' }}
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
                                            onOpenModalFormAztecaBancario('onSave', item, 'Editar')
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
                                              Haga clic aquí para <b>HABILITAR</b> el Banco Banorte
                                              terceros.
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
                                              <v-icon class="mr-1" color="white" icon="mdi-alert" />
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
                                              <b>DESHABILITADO</b>, no podrá generar el layout de
                                              dispersión de nómina correspondiente para esta
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
                                    <v-tooltip bottom color="primary" interactive location="bottom">
                                      <template v-slot:activator="{ props: tooltipProps }">
                                        <v-btn
                                          v-bind="mergeProps(tooltipProps)"
                                          color="primary"
                                          flat
                                          height="40px"
                                          min-width="40px"
                                          width="40px"
                                          @click.stop="
                                            onOpenModalFormBanorteTerceros('onSave', {}, 'Nuevo')
                                          "
                                        >
                                          <v-icon color="white" icon="mdi-plus" size="24px" />
                                        </v-btn>
                                      </template>
                                      <span>Agregar clave de banco ID</span>
                                    </v-tooltip>
                                    <v-divider vertical class="ml-5 mr-3 my-1 border-opacity-25" />
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
                                      {{ item.activo_dispersion ? 'Habilitado' : 'Inhabilitado' }}
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
                                            onOpenModalFormBanorteTerceros('onSave', item, 'Editar')
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
import type { Ref } from 'vue'
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

// import interface
import type { ConceptosPagoModel } from '@/interfaces/nomina/gape'
import type { BaseFeeModel, ClasePrimaRiesgoModel } from '@/interfaces/nomina/gape'

// import stores
import { useClienteStore, useEmpresaStore, useBancoStore } from '@/stores/modules/Nomina/gape'

import { useEmpresasStore } from '@/stores/modules/Core'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'

// import utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'
import {
  getDefaultConceptosPago,
  getDefaultBaseFee,
  getDefaultClasePrimaRiesgo,
} from '@/utils/nomina/gape'

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

interface EsquemaPago {
  id: number
  esquema: string
  contpaqi: boolean
}



interface ItemsCombinacionEsquema {
  estado: boolean
  combinacion: string
  esquemas: EsquemaPago[]
  topes: ItemsTopeEsquema[]
}

interface ItemsTopeEsquema {
  id: number
  id_nomina_gape_cliente: number
  id_nomina_gape_esquema: number
  esquema: string
  tope: number
  orden: number
}

interface ItemsCombinacionParametrizacion {
  combinacionKey: string
  combinacionTexto: string
  esquemas: EsquemaPago[]

  periodo: {
    id: number
    nombre: string
  }

  data: CombinacionParametrizacion

  // 👇 SOLO UNA previsión
  prevision: CombinacionPrevision | null
}

interface CombinacionParametrizacion {
  id: number
  estado: boolean
  id_nomina_gape_cliente: number
  id_nomina_gape_empresa: number
  id_nomina_gape_tipo_periodo: number
  idtipoperiodo: number
  id_nomina_gape_cliente_esquema_combinacion: number
  fee: number | null
  baseFee: string | null
  provisiones: string | null
}

interface CombinacionPrevision {
  id: number
  nomina_gape_empresa_periodo_combinacion_parametrizacion: number
  id_concepto: number
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
    //const dialogConfirmation = useDialogManagerStore()
    const dialogConfirmation = useDialogManagerStore()
    const { name, mobile, smAndDown } = useDisplay()

    const idEditar = ref(1)

    const router = useRouter()

    //4. Reactive | Funcionamiento general
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
    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

    const btnDisabled = ref({
      importarRegistros: true,
      descargarFormato: true,
      eliminarRegistros: true,
      guardarCambios: false,
      activarRegistro: false,
      crearRegistro: true,

      tabDatosGenerales: true,
      tabBancos: true,

      compTipoEmp: false,
      compCliente: false,
      compEmpresa: true,
      compRazonSocial: true,
      compRfc: true,
      compCorreo: false,

      compNoFiscMascara: false,
      compNoFiscCodigoInicial: true,
      compNoFiscCodigoActual: true,
    })

    const cardHeight = ref(0)

    type TabKey = 'option-1' | 'option-2' | 'option-3' | 'option-4'

    const itemsTabVertical = ref<{ value: TabKey; icon: string; text: string; tooltip: string }[]>([
      {
        value: 'option-1',
        icon: 'mdi-cash',
        text: 'Esquemas de pago',
        tooltip: 'ayudaEsquemasPago',
      },
      {
        value: 'option-2',
        icon: 'mdi-briefcase-account',
        text: 'Datos empresa',
        tooltip: 'ayudaDatosEmpresa',
      },
      {
        value: 'option-3',
        icon: 'mdi-list-box',
        text: 'Parametrización',
        tooltip: 'ayudaParametrizacion',
      },
      { value: 'option-4', icon: 'mdi-bank', text: 'Bancos', tooltip: 'ayudaBancos' },
    ])

    const handlersTabsVertical: Record<string, () => void> = {
      'option-1': onClickTabEsquemasDePago,
      'option-2': onClickTabDatosEmpresa,
      'option-3': onClickTabParametrizacion,
      'option-4': onClickTabBancos,
    }

    const modelTabVertical = ref(itemsTabVertical.value[0].value)

    //4. Reactive | Esquemas de pago
    const itemsEsquemasDePago = ref<EsquemaPago[]>([
      { id: 1, esquema: 'Sueldo IMSS', contpaqi: true },
      { id: 2, esquema: 'Honorarios asimilados', contpaqi: true },
      { id: 3, esquema: 'Fondo sindicato', contpaqi: false },
      { id: 4, esquema: 'Gastos por comprobar', contpaqi: false },
      { id: 5, esquema: 'Tarjeta fácil', contpaqi: false },
    ])

    const modelSeleccionadosCombinacionEsquema = ref<ItemsCombinacionEsquema[]>([
      {
        combinacion: '1',
        estado: true,
        esquemas: [{ id: 1, esquema: 'Sueldo IMSS', contpaqi: true }],
        topes: [
          {
            id: 1,
            id_nomina_gape_cliente: 1,
            id_nomina_gape_esquema: 1,
            esquema: 'Sueldo IMSS',
            tope: 0,
            orden: 1,
          },
        ],
      },
    ])

    const itemsCombinacionEsquema = ref<ItemsCombinacionEsquema[]>([
      {
        combinacion: '1',
        estado: true,
        esquemas: [{ id: 1, esquema: 'Sueldo IMSS', contpaqi: true }],
        topes: [
          {
            id: 1,
            id_nomina_gape_cliente: 1,
            id_nomina_gape_esquema: 1,
            esquema: 'Sueldo IMSS',
            tope: 0,
            orden: 1,
          },
        ],
      },
    ])

    const headersCombinacionEsquema = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'combinacion',
        align: 'center',
        sortable: false,
        title: '',
        width: '5%',
      },
      {
        key: 'estado',
        align: 'center',
        sortable: false,
        title: '',
        width: '5%',
      },
      {
        key: 'esquemas',
        align: 'center',
        sortable: false,
        title: 'Esquemas',
        width: '40%',
      },
      {
        key: 'tope',
        align: 'center',
        sortable: false,
        title: 'Topes',
        width: '40%',
      },
      {
        key: 'eliminar',
        align: 'center',
        sortable: false,
        title: '',
        width: '5%',
      },
    ])

    const isNullRowCombinacionEsquema = computed(() => {
      return itemsCombinacionEsquema.value.some((fila) => fila.esquemas.length === 0)
    })

    const headersTope = [
      { title: '', key: 'orden', width: 40 },
      { title: '', key: 'tope' },
      { title: '', key: 'drag', width: 40 },
    ]

    //4. Reactive | Datos empresa
    const loading = ref(false)

    const formDatosEmpresa = ref()

    const formDatosEmpresaValido = ref(false)

    const modelEmpresa = ref<Object>()

    const itemsEmpresas = ref<Object[]>([])

    //4. Reactive | Parametrización
    const itemsParametrizacion = ref<ItemsCombinacionParametrizacion[]>([])

    const itemsBaseFEE: Ref<BaseFeeModel[]> = ref(getDefaultBaseFee())

    const itemsComprobacion = ref([
      { concepto: 'Si', codigo: 'si' },
      { concepto: 'No', codigo: 'no' },
    ])

    const headersParametrizacion = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        title: string
        sortable?: boolean
        width?: string
      }[]
    >([
      {
        key: 'combinacion',
        align: 'center',
        sortable: false,
        title: 'Combinación',
        width: '5%',
      },
      {
        key: 'estado',
        sortable: false,
        title: '',
      },
      {
        key: 'esquemas',
        sortable: false,
        title: 'Esquemas',
        width: '20%',
      },
      {
        key: 'tipoPeriodo',
        title: 'Perioricidad',
        sortable: false,
        width: '5%',
      },
      {
        key: 'fee',
        align: 'center',
        title: 'FEE',
        sortable: false,
        width: '10%',
      },
      {
        key: 'baseFee',
        align: 'center',
        sortable: false,
        title: 'Base FEE',
        width: '20%',
      },
      {
        key: 'provisiones',
        sortable: false,
        align: 'center',
        title: 'Provisiones',
        width: '10%',
      },
    ])

    const itemsSeleccionados: Ref<string[]> = ref([])

    //4. Reactive | Bancos
    const formRefFiscalBanco = ref()

    const formRefNoFiscalGral = ref()

    const formRefNoFiscalBanco = ref()

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

    // 5. Computed properties | Funcionamiento general
    // Heights automáticos
    const getCardHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value = cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          15
      }
      return { height: `${alto.value}px !important` }
    })

    const getTableHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value = cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          85
      }

      return `${alto.value}px !important`
    })

    const getTableNoDataHeight = computed(() => {
      const alto = ref(0)
      if (vconPrincipalRef.value) {
        alto.value = cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vrowBarraDeAccionesRef.value.$el.clientHeight -
          vrowFiltrosRef.value.$el.clientHeight -
          85 -
          96
      }

      return `${alto.value}px !important`
    })

    // 5. Computed properties | Esquemas de pago
    const esValidaEstructuraTab1 = computed(() => {
      return (
        itemsCombinacionEsquema.value.length > 0 &&
        itemsCombinacionEsquema.value.every(
          (fila) =>
            fila.esquemas.length > 0 &&
            fila.topes.every((t) => esEsquemaContpaqi(t) || (t.tope && t.tope > 0)),
        )
      )
    })

    const hayFilasHabilitadas = computed(() => {
      return modelSeleccionadosCombinacionEsquema.value.length > 0
    })

    const esRegistroNuevo = computed(() => idEditar.value === 0)

    const getEsValidoTab1 = computed(() => {
      // Si la estructura no es válida → nunca pasa
      if (!esValidaEstructuraTab1.value) return false

      // 🆕 Registro nuevo → exigir selección
      if (esRegistroNuevo.value) {
        return hayFilasHabilitadas.value
      }

      // ✏️ Edición → no exigir selección
      return true
    })

    const combinacionesDuplicadas = computed(() => {
      const seen = new Set<number>()
      const duplicadas: ItemsCombinacionEsquema[] = []

      itemsCombinacionEsquema.value.forEach((fila) => {
        // 👉 Solo validar combinaciones de UN esquema
        if (fila.esquemas.length !== 1) return

        const idEsquema = fila.esquemas[0].id

        if (seen.has(idEsquema)) {
          duplicadas.push(fila)
        } else {
          seen.add(idEsquema)
        }
      })

      return duplicadas
    })

    const getEsValidoTab2 = computed(() => {
      return formDatosEmpresaValido.value
    })

    const tabsHabilitados = computed<Record<TabKey, boolean>>(() => ({
      'option-1': true,
      'option-2': getEsValidoTab1.value,
      'option-3': getEsValidoTab1.value && getEsValidoTab2.value,
      'option-4': getEsValidoTab1.value && getEsValidoTab2.value,
    }))

    const getItemsHabilitadosCombinacionEsquema = computed<EsquemaPago[]>(() => {
      const map = new Map<number, EsquemaPago>()

      modelSeleccionadosCombinacionEsquema.value.forEach((combinacion) => {
        combinacion.esquemas.forEach((esquema) => {
          if (!map.has(esquema.id)) {
            map.set(esquema.id, esquema)
          }
        })
      })

      return Array.from(map.values())
    })

    // 5. Computed properties | Datos Empresa
    const getItemsClientesNomina = computed(() => clienteStore.clientes)

    const getItemsEmpresaDatabase = computed(() => empresasStore.empresas)

    // 6. Watchers | Funcionamiento general
    watch(getEsValidoTab1, (valido) => {
      if (!valido && modelTabVertical.value !== 'option-1') {
        modelTabVertical.value = 'option-1'
      }
    })

    watch(getEsValidoTab2, (valido) => {
      if (!valido && modelTabVertical.value !== 'option-2') {
        modelTabVertical.value = 'option-2'
      }
    })

    watch(
      () => dataModel.value.mascara_codigo,
      (nuevaMascara) => {
        if (props.id !== undefined && props.id !== null) return
        validarMascaraYActualizarCampos(nuevaMascara)
      },
    )

    watch(
      () => itemsCombinacionEsquema.value,
      async (val) => {
        if (!esRegistroNuevo.value && val.length > 0) {
          await nextTick()
          await validateTabs()
        }
      },
      { immediate: true, deep: true },
    )

    watch(
      () => modelSeleccionadosCombinacionEsquema.value,
      (seleccionados) => {
        itemsCombinacionEsquema.value.forEach((fila) => {
          fila.estado = seleccionados.includes(fila)
        })
      },
      { deep: true },
    )

    // 6. Watchers | Esquemas de pago
    // Si hay filas en la tabla de combinaciones se mantienen los estatus de habilitados
    watch(
      () => itemsCombinacionEsquema.value.map((i) => i.combinacion),
      () => {
        const selectedKeys = new Set(
          modelSeleccionadosCombinacionEsquema.value.map((i) => i.combinacion),
        )

        // reconstruir selección con los objetos "reales" del array items
        modelSeleccionadosCombinacionEsquema.value = itemsCombinacionEsquema.value.filter((i) =>
          selectedKeys.has(i.combinacion),
        )
      },
      { deep: false },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(async () => {
      nextTick(() => {
        //window.addEventListener('resize', calcularDimensiones)
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
      //window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async) | Funcionamiento general
    const validateTabs = async (): Promise<boolean> => {
      // 🔹 Tab 1 (tabla)
      if (!getEsValidoTab1.value) {
        modelTabVertical.value = 'option-1'
        return false
      }

      // 🔹 Tab 2 (form)
      if (esRegistroNuevo.value) {
        const empresa = await formDatosEmpresa.value?.validate()
        if (!empresa?.valid) {
          modelTabVertical.value = 'option-2'
          return false
        }
      }

      // 🔹 Tab 3 (cuando lo actives)
      /*
      if (esRegistroNuevo.value) {
        const parametrizacion = await formParametrizacion.value?.validate()
        if (!parametrizacion?.valid) {
          modelTabVertical.value = 'option-3'
          return false
        }
      }
      */

      return true
    }

    const validateForm = async (tabFiscal: boolean, tabInfo: string) => {
      dialogConfirmation.onCloseDialogConfirmation()

      let formRef = null
      let idEmpresaCreada = null

      if (tabFiscal) {
        // Empresa FISCAL
        formRef = tabInfo == 'option-1' ? formDatosEmpresa.value : formRefFiscalBanco.value
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

    function onClickTabVertical(tab: string) {
      handlersTabsVertical[tab]?.()
    }

    function onClickTabEsquemasDePago() {
      console.log('Esquemas de pago')
    }

    function onClickTabDatosEmpresa() {
      // 🔴 Validar combinaciones duplicadas
      if (combinacionesDuplicadas.value.length > 0) {
        // puedes mostrar snackbar / toast
        alert('combinacionesDuplicadas')
        onDeleteRowDuplicateCombinacionEsquema()

        modelTabVertical.value = 'option-1'
        return
      }

      console.log('Datos empresa')

      const esquemas = getItemsHabilitadosCombinacionEsquema.value

      console.log('Esquemas habilitados:', esquemas)

      // 🔹 Flags de negocio
      const tieneContpaqi = esquemas.some((e) => e.contpaqi === true)
      const tieneNoContpaqi = esquemas.some((e) => e.contpaqi === false)

      // 🏢 Empresa CONTPAQi
      // Se habilita si existe al menos un esquema CONTPAQi
      btnDisabled.value.compEmpresa = !tieneContpaqi

      // 🧾 Razón social y RFC
      // Solo se habilitan si TODOS son NO CONTPAQi
      btnDisabled.value.compRazonSocial = tieneContpaqi
      btnDisabled.value.compRfc = tieneContpaqi

      // 📧 Correo → siempre habilitado
      btnDisabled.value.compCorreo = false

      // 🧩 Campos NO fiscales
      // Se habilitan si existe al menos un esquema NO CONTPAQi
      btnDisabled.value.compNoFiscMascara = !tieneNoContpaqi
      btnDisabled.value.compNoFiscCodigoInicial = !tieneNoContpaqi
    }

    function onClickTabParametrizacion() {
      console.log('Parametrización')

      const periodos = [
        { id: 1, tipoPeriodo: 'Semanal' },
        { id: 2, tipoPeriodo: 'Catorcenal' },
        { id: 3, tipoPeriodo: 'Quincenal' },
        { id: 4, tipoPeriodo: 'Mensual' },
      ]

      const resultado: CombinacionParametrizacion[] = []

      modelSeleccionadosCombinacionEsquema.value.forEach((itemCombinacion) => {
        const esquemasTexto = itemCombinacion.esquemas.map((e) => e.esquema).join(' + ')

        // 🔑 eliminar cualquier registro previo de ESTA combinación
        const filtrado = resultado.filter(
          (r) => r.id_nomina_gape_cliente_esquema_combinacion !== itemCombinacion.combinacion,
        )

        periodos.forEach((itemPeriodo) => {
          filtrado.push({
            id: 0,
            estado: true,
            id_nomina_gape_cliente: 1,
            id_nomina_gape_empresa: 1,
            id_nomina_gape_tipo_periodo: itemPeriodo.id,
            idtipoperiodo: itemPeriodo.id,

            // 🔑 ESTA es la clave
            id_nomina_gape_cliente_esquema_combinacion: itemCombinacion.combinacion,

            fee: 0,
            baseFee: '1',
            provisiones: '1',
            esquemas: esquemasTexto,
          })
        })

        resultado.push(...filtrado)
      })

      itemsParametrizacion.value = resultado
    }

    function onClickTabBancos() {
      console.log('Bancos')
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
        () => validateForm(fiscal, tabInfo), // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    // 8. Functions (fetch, metodos, async) | Esquemas de pago

    function generarFirmaCombinacion(esquemas: EsquemaPago[]): string | null {
      // 🔐 Solo validar duplicados si hay UN solo esquema
      if (esquemas.length === 1) {
        return String(esquemas[0].id)
      }

      // Combinaciones múltiples NO se validan como duplicadas
      return null
    }

    const getEsquemaById = (id: number): EsquemaPago | undefined => {
      return itemsEsquemasDePago.value.find((e) => e.id === id)
    }

    const esFilaFija = (tope: ItemsTopeEsquema): boolean => {
      const esquema = getEsquemaById(tope.id_nomina_gape_esquema)
      return esquema?.contpaqi === true
    }

    const isDragging = ref(false)
    let dragIndex: number | null = null

    const onDragStart = (index: number, items: ItemsTopeEsquema[]) => {
      if (esFilaFija(items[index])) return
      dragIndex = index
      isDragging.value = true
    }

    const onDrop = (index: number, items: ItemsTopeEsquema[]) => {
      if (dragIndex === null) return

      const dragged = items[dragIndex]
      const target = items[index]

      if (esFilaFija(dragged) || esFilaFija(target)) {
        dragIndex = null
        isDragging.value = false
        return
      }

      const item = items.splice(dragIndex, 1)[0]
      items.splice(index, 0, item)

      dragIndex = null
      isDragging.value = false

      ordenarTopesConContpaqiArriba(items)
    }

    const fixFixedRowPosition = (items: ItemsTopeEsquema[]) => {
      const fijos: ItemsTopeEsquema[] = []
      const normales: ItemsTopeEsquema[] = []

      items.forEach((t) => {
        esFilaFija(t) ? fijos.push(t) : normales.push(t)
      })

      items.splice(0, items.length, ...fijos, ...normales)

      // Reasignar orden
      items.forEach((t, index) => {
        t.orden = index + 1
      })
    }

    const ordenarTopesConContpaqiArriba = (topes: ItemsTopeEsquema[]) => {
      const contpaqi = topes.filter((t) => esEsquemaContpaqi(t))
      const normales = topes.filter((t) => !esEsquemaContpaqi(t))

      const ordenados = [...contpaqi, ...normales]

      // Reasignar orden consecutivo
      ordenados.forEach((t, index) => {
        t.orden = index + 1
      })

      return ordenados
    }

    const deshabilitarCampoTope = (
      tope: ItemsTopeEsquema,
      combinacion: ItemsCombinacionEsquema,
    ): boolean => {
      // 1️⃣ CONTPAQi → siempre deshabilitado
      if (esEsquemaContpaqi(tope)) return true

      // 2️⃣ No CONTPAQi y solo 1 esquema en la combinación
      if (!esEsquemaContpaqi(tope) && combinacion.esquemas.length === 1) return true

      // 3️⃣ En cualquier otro caso → habilitado
      return false
    }

    function esEsquemaContpaqi(item: ItemsTopeEsquema): boolean {
      const esquema = itemsEsquemasDePago.value.find((e) => e.id === item.id_nomina_gape_esquema)
      return esquema?.contpaqi === true
    }

    function onUpdateItemsEsquemasDePago(item: ItemsCombinacionEsquema) {
      const map = new Map<number, ItemsTopeEsquema>()

      // conservar topes existentes
      item.topes.forEach((t) => {
        map.set(t.id_nomina_gape_esquema, t)
      })

      // agregar nuevos topes
      item.esquemas.forEach((e, index) => {
        if (!map.has(e.id)) {
          map.set(e.id, {
            id: index,
            id_nomina_gape_esquema: e.id,
            esquema: e.esquema,
            id_nomina_gape_cliente: 0,
            tope: 0,
            orden: index + 1,
          })
        }
      })

      item.topes = ordenarTopesConContpaqiArriba(
        Array.from(map.values()).filter((t) =>
          item.esquemas.some((e) => e.id === t.id_nomina_gape_esquema),
        ),
      )

      // 🔑 asegurar que siga seleccionada
      if (!modelSeleccionadosCombinacionEsquema.value.includes(item)) {
        modelSeleccionadosCombinacionEsquema.value.push(item)
      }
    }

    function generarClaveCombinacion() {
      const existentes = itemsCombinacionEsquema.value.map((i) => i.combinacion)
      let index = 1

      while (existentes.includes(`${index}`)) {
        index++
      }

      return `${index}`
    }

    function onAddRowCombinacionEsquema() {
      if (isNullRowCombinacionEsquema.value) {
        return
      }

      const nuevaFila = {
        combinacion: generarClaveCombinacion(),
        estado: true,
        esquemas: [],
        topes: [],
      }

      itemsCombinacionEsquema.value.push(nuevaFila)
      if (!modelSeleccionadosCombinacionEsquema.value.includes(nuevaFila)) {
        modelSeleccionadosCombinacionEsquema.value = [
          ...modelSeleccionadosCombinacionEsquema.value,
          nuevaFila,
        ]
      }

      console.log(
        'Items:',
        itemsCombinacionEsquema.value.map((i) => i.combinacion),
      )

      console.log(
        'Seleccionados:',
        modelSeleccionadosCombinacionEsquema.value.map((i) => i.combinacion),
      )
    }

    function onDeleteCombinacionEsquemaConfirmation(item: ItemsCombinacionEsquema) {
      let mensaje = `¿Está seguro de que desea eliminar el registro seleccionado? Esta acción no se puede deshacer.`
      let titulo = 'Eliminiar registro'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        () => onDeleteCombinacionEsquema(item),
        [],
        titulo,
        'alert',
      )
    }

    async function onDeleteCombinacionEsquema(item: ItemsCombinacionEsquema) {
      try {
        const index = itemsCombinacionEsquema.value.indexOf(item)
        if (index === -1) return

        itemsCombinacionEsquema.value.splice(index, 1)

        // también la quitas de seleccionados si aplica
        /*modelSeleccionadosCombinacionEsquema.value =
          modelSeleccionadosCombinacionEsquema.value.filter(i => i !== fila)*/
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

    function onDeleteRowDuplicateCombinacionEsquema(): void {
      const seen = new Set<string>()

      itemsCombinacionEsquema.value = itemsCombinacionEsquema.value.filter((fila) => {
        const firma = generarFirmaCombinacion(fila.esquemas)

        // 👉 combinaciones múltiples siempre permitidas
        if (firma === null) return true

        // 👉 solo bloquear duplicados de UNA sola selección
        if (seen.has(firma)) {
          return false // ❌ eliminar duplicada
        }

        seen.add(firma)
        return true
      })

      // 🔄 sincronizar selección
      modelSeleccionadosCombinacionEsquema.value =
        modelSeleccionadosCombinacionEsquema.value.filter((fila) =>
          itemsCombinacionEsquema.value.includes(fila),
        )
    }

    // 8. Functions (fetch, metodos, async) | Datos empresa
    const buscarEmpresasNomina = async (codigo: number) => {
      resetModel(true)

      await fetchEmpresasNominaPorCliente(codigo)
    }

    const buscarDatosEmpresaNomina = async (codigo: number) => {
      resetModelEmpresa(true)

      const itemsEsquemasConContpaqi = new Set([1, 2, 3, 4])
      const itemsEsquemasSinContpaqi = new Set([5, 6])

      const conEsquemaContpaqi = modelEsquemasDePagoSeleccionados.value.some((item) =>
        itemsEsquemasConContpaqi.has(item.id),
      )

      const sinEsquemaContpaqi = modelEsquemasDePagoSeleccionados.value.some((item) =>
        itemsEsquemasSinContpaqi.has(item.id),
      )

      btnDisabled.value.compEmpresa = !conEsquemaContpaqi
      btnDisabled.value.compRazonSocial = !sinEsquemaContpaqi || conEsquemaContpaqi
      btnDisabled.value.compRfc = !sinEsquemaContpaqi || conEsquemaContpaqi
      btnDisabled.value.compNoFiscMascara = !sinEsquemaContpaqi
      btnDisabled.value.compNoFiscCodigoInicial = !sinEsquemaContpaqi

      const empresaSeleccionada = getItemsEmpresaDatabase.value.find((item) => item.id === codigo)
      const nombreBase = empresaSeleccionada?.nombre_base ?? ''

      await fetchDatosEmpresasNominaPorCliente(
        dataModel.value.id_nomina_gape_cliente,
        codigo,
        nombreBase,
      )
    }

    const validarMascaraYActualizarCampos = (mascara: string) => {
      const regexMascara = /^[Xx]{3,10}$/ // solo X o x, entre 3 y 10
      const esValida = regexMascara.test(mascara)

      btnDisabled.value.compNoFiscCodigoInicial = !esValida

      if (!esValida) {
        dataModel.value.codigo_inicial = ''
      }
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

    // 8. Functions (fetch, metodos, async) | Bancos
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

    const changeStatusFondeadora = async () => {
      const datos = {
        id_nomina_gape_empresa: props.id,
        fondeadora: !isActiveFondeadora.value,
      }
      await bancoStore.upsertBancoDispersion(datos)
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
      deshabilitarCampoTope,
      onDeleteCombinacionEsquemaConfirmation,
      onDeleteCombinacionEsquema,
      modelSeleccionadosCombinacionEsquema,
      tabsHabilitados,
      isNullRowCombinacionEsquema,
      onAddRowCombinacionEsquema,
      esEsquemaContpaqi,
      headersTope,
      onUpdateItemsEsquemasDePago,
      itemsCombinacionEsquema,
      esFilaFija,
      isDragging,
      onDrop,
      onDragStart,
      headersCombinacionEsquema,
      itemsBaseFEE,
      itemsComprobacion,
      onClickTabVertical,
      itemsParametrizacion,
      modelTabVertical,
      itemsTabVertical,
      itemsSeleccionados,
      headersParametrizacion,
      itemsEsquemasDePago,
      btnDisabled,
      buscarDatosEmpresaNomina,
      buscarEmpresasNomina,
      changeStatusFondeadora,
      dataModel,
      dialogConfirmation,
      formRefFiscalBanco,
      formDatosEmpresaValido,
      formDatosEmpresa,
      formRefNoFiscalBanco,
      formRefNoFiscalGral,
      getTableHeight,
      getTableNoDataHeight,
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
      getItemsClientesNomina,
      getItemsEmpresaDatabase,
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
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
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
