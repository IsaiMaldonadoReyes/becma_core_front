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
              @click="fetchCrearFormulasContpaq"
              >
              <!--:disabled="btnDisabled.importarRegistros"-->
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
          :label="'Cliente *'"
          :multiple="false"
          :prepend-icon="'mdi-account-box'"
          :return-object="false"
          :show-chips="false"
          @click:clear="console.log('onClickClear')"
          @update:model-value="buscarEmpresasNomina"
          :rules="[(v) => v !== null || 'Debe seleccionar un cliente']"
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
          >
            <v-tooltip v-for="item in itemsTabVertical" :key="item.value" :disabled="!item.tooltip">
              <template #activator="{ props: tooltipProps }">
                <div v-bind="tooltipProps">
                  <v-tab
                    :disabled="!tabsHabilitados[item.value]"
                    :prepend-icon="item.icon"
                    :text="item.text"
                    :value="item.value"
                    :variant="modelTabVertical == item.value ? 'tonal' : 'text'"
                    class="text-none text-no-wrap"
                    width="180"
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
                  <v-col cols="12">
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
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-btn
                                class="ml-2"
                                color="primary"
                                height="40px"
                                min-width="40px"
                                variant="flat"
                                width="40px"
                                @click.stop
                              >
                                <v-checkbox-btn
                                  v-bind="mergeProps(tooltip)"
                                  :indeterminate="someSelected && !allSelected"
                                  :model-value="allSelected"
                                  true-icon="mdi-checkbox-multiple-marked"
                                  @update:model-value="selectAll(!allSelected)"
                                />
                              </v-btn>
                            </template>
                            <template #default>
                              <empresa-tooltips name="ayudaBtnHabilitarTodo" />
                            </template>
                          </v-tooltip>
                        </template>

                        <template
                          v-slot:item.data-table-select="{
                            internalItem,
                            isSelected,
                            toggleSelect,
                            item,
                          }"
                        >
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-btn
                                class="ml-2"
                                color="primary"
                                height="40px"
                                min-width="40px"
                                variant="flat"
                                width="40px"
                                @click.stop
                              >
                                <v-checkbox-btn
                                  v-bind="mergeProps(tooltip)"
                                  :model-value="isSelected(internalItem)"
                                  @update:model-value="toggleSelect(internalItem)"
                                >
                                </v-checkbox-btn>
                              </v-btn>
                            </template>
                            <template #default>
                              <v-card
                                :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                class="pa-3"
                                color="transparent"
                                elevation="0"
                              >
                                <v-row>
                                  <v-col cols="2" class="d-flex align-center justify-center">
                                    <v-icon icon="mdi-information-slab-circle-outline" />
                                  </v-col>
                                  <v-col cols="10">
                                    {{ item.estado ? 'Deshabilitar' : 'Habilitar' }} combinación:
                                    <span style="font-weight: bold; color: #2a73c5">
                                      <i>{{ item.combinacion }}</i>
                                    </span>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </v-tooltip>
                        </template>

                        <template v-slot:item.estado="{ item }">
                          <v-chip
                            :color="item.estado ? 'primary' : 'grey'"
                            size="small"
                            label
                            variant="flat"
                          >
                            {{ item.estado ? 'Habilitado' : 'Deshabilitado' }}
                          </v-chip>
                        </template>

                        <template v-slot:item.esquemas="{ item }">
                          <bec-select
                            v-model="item.esquemas"
                            :clearable="true"
                            :closable-chips="true"
                            :hide-selected="true"
                            :items="itemsEsquemasDePago"
                            :label="'Esquemas de pago *'"
                            hide-details
                            item-title="esquema"
                            item-value="id"
                            multiple
                            return-object
                            @update:model-value="onUpdateItemsEsquemasDePago(item)"
                            :auto-select-first="true"
                          >
                            <template #tooltip>
                              <empresa-tooltips name="ayudaEsquemasDePago" />
                            </template>
                          </bec-select>
                        </template>

                        <template v-slot:item.topes="{ item }">
                          <v-sheet border rounded class="my-2">
                            <v-data-table
                              :headers="headersTope"
                              :items="item.topes"
                              density="compact"
                              hide-default-footer
                              hide-default-header
                              item-key="id_nomina_gape_esquema"
                            >
                              <template v-slot:item.tope="{ item: slotItem }">
                                <bec-text-field
                                  v-model="slotItem.tope"
                                  :clearable="true"
                                  :label="
                                    'Tope de ' +
                                    slotItem.esquema +
                                    (!esFilaFija(slotItem as TableTopeEsquema) ? ' *' : '')
                                  "
                                  :placeholder="'Tope de ' + slotItem.esquema"
                                  class="my-4"
                                  prefix="$"
                                  @keypress="inputFilters.onlyDecimal"
                                >
                                  <!--:disabled="deshabilitarCampoTope(tope, item)"-->
                                  <template #tooltip>
                                    <v-card
                                      v-if="esFilaFija(slotItem as TableTopeEsquema)"
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
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Instrucción:</span
                                          >
                                          la configuración del tope del esquema
                                          <b style="color: #2a73c5"
                                            ><i>{{ slotItem.esquema }}</i></b
                                          >
                                          es opcional. Puede configurarlo o dejarlo sin definir.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-alert-outline"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Advertencia:</span
                                          >
                                          los campos marcados con (<b style="color: #2a73c5"
                                            ><i>*</i></b
                                          >) son obligatorios para continuar con el proceso.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                    <v-card
                                      v-if="!esFilaFija(slotItem as TableTopeEsquema)"
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
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Instrucción:</span
                                          >
                                          ingrese el valor del tope de
                                          <b style="color: #2a73c5"
                                            ><i>{{ slotItem.esquema }}</i></b
                                          >.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2 mx-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon icon="mdi-cursor-default-click" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Evento:</span
                                          >
                                          al ingresar el valor de este campo, se habilitará el
                                          formulario
                                          <b style="color: #2a73c5"><i>Datos empresa</i></b
                                          >. Si no se ingresa ningún valor, dicho formulario
                                          permanecerá deshabilitado.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-alert-outline"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Advertencia:</span
                                          >
                                          los campos marcados con (<b style="color: #2a73c5"
                                            ><i>*</i></b
                                          >) son obligatorios para continuar con el proceso.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </template>

                              <template v-slot:item.drag="{ index, item: slotItem }">
                                <div style="pointer-events: auto">
                                  <v-tooltip location="bottom" :disabled="isDragging">
                                    <template #activator="{ props: tooltipProps }">
                                      <span
                                        v-bind="mergeProps(tooltipProps)"
                                        class="d-inline-block"
                                      >
                                        <v-btn
                                          :disabled="esFilaFija(slotItem as TableTopeEsquema)"
                                          :draggable="!esFilaFija(slotItem as TableTopeEsquema)"
                                          class="ml-2"
                                          color="primary"
                                          height="40px"
                                          min-width="40px"
                                          style="cursor: grab"
                                          variant="flat"
                                          width="40px"
                                          @click.stop
                                          @dragover.prevent
                                          @dragstart="onDragStart(index, item.topes)"
                                          @drop="onDrop(index, item.topes)"
                                        >
                                          <v-icon icon="mdi-drag" size="24px" />
                                        </v-btn>
                                      </span>
                                    </template>
                                    <template #default>
                                      <v-card
                                        v-if="esFilaFija(slotItem as TableTopeEsquema)"
                                        :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                        class="py-3"
                                        color="transparent"
                                        elevation="0"
                                      >
                                        <v-row>
                                          <v-col
                                            cols="1"
                                            class="d-flex align-center justify-center"
                                          >
                                            <v-icon
                                              class="mr-1"
                                              color="white"
                                              icon="mdi-lightbulb-on-outline"
                                            />
                                          </v-col>
                                          <v-col cols="11">
                                            <span style="font-weight: bold; color: #2a73c5"
                                              >Nota:</span
                                            >
                                            el esquema
                                            <b style="color: #2a73c5"
                                              ><i>{{ slotItem.esquema }}</i></b
                                            >
                                            corresponde a un esquema fiscal gestionado y
                                            sincronizado con el sistema <i>CONTPAQi Nóminas</i>. Por
                                            esta razón, su orden no puede ser modificado y se
                                            establece como el primer esquema de forma
                                            predeterminada; en consecuencia, el botón para arrastrar
                                            se muestra deshabilitado.
                                          </v-col>
                                        </v-row>
                                      </v-card>
                                      <v-card
                                        v-if="!esFilaFija(slotItem as TableTopeEsquema)"
                                        :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                        class="py-3"
                                        color="transparent"
                                        elevation="0"
                                      >
                                        <v-row>
                                          <v-col
                                            cols="1"
                                            class="d-flex align-center justify-center"
                                          >
                                            <v-icon icon="mdi-information-slab-circle-outline" />
                                          </v-col>
                                          <v-col cols="11">
                                            <span style="font-weight: bold; color: #2a73c5"
                                              >Instrucción:</span
                                            >
                                            arrastre y suelte el esquema de pago
                                            <b style="color: #2a73c5"
                                              ><i>{{ slotItem.esquema }}</i></b
                                            >
                                            para definir el orden de prorrateo. El sistema utilizará
                                            este orden durante el proceso de cálculo de la prenómina
                                            para determinar los excedentes.
                                          </v-col>
                                        </v-row>
                                      </v-card>
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
                            <template #default>
                              <v-card
                                :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                class="pa-3"
                                color="transparent"
                                elevation="0"
                              >
                                <v-row>
                                  <v-col cols="2" class="d-flex align-center justify-center">
                                    <v-icon icon="mdi-information-slab-circle-outline" />
                                  </v-col>
                                  <v-col cols="10">
                                    Eliminar combinación:
                                    <span style="font-weight: bold; color: #2a73c5">
                                      <i>{{ item.combinacion }}</i>
                                    </span>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </v-tooltip>
                        </template>

                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title color="primary" class="text-primary text-body-1">
                              Configuración de las combinaciones de esquemas de pago
                            </v-toolbar-title>

                            <v-tooltip>
                              <template v-slot:activator="{ props: tooltipProps }">
                                <span v-bind="mergeProps(tooltipProps)" class="d-inline-block">
                                  <v-btn
                                    :disabled="
                                      !dataModel.id_nomina_gape_cliente ||
                                      isNullRowCombinacionEsquema
                                    "
                                    class="me-4"
                                    color="primary"
                                    height="40px"
                                    min-width="40px"
                                    variant="flat"
                                    width="40px"
                                    @click="onAddRowCombinacionEsquema"
                                  >
                                    <v-icon color="white" icon="mdi-plus" size="24px" />
                                  </v-btn>
                                </span>
                              </template>
                              <template #default>
                                <empresa-tooltips name="ayudaBtnAddRowCombinacionEsquema" />
                              </template>
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
                        :clearable="false"
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
                            : [validationRules.emailIfNotEmpty]
                        "
                      >
                        <template #tooltip>
                          <empresa-tooltips name="ayudaCorreoNotificacion" />
                        </template>
                      </bec-text-field>
                    </v-col>
                    <v-col cols="12">
                      <bec-select
                        v-model="dataModel.formula_con_falta"
                        :item-title="'concepto'"
                        :item-value="'codigo'"
                        :items="itemsVerificacion"
                        :multiple="false"
                        :label="'¿Considerar faltas en fórmulas de cálculo? *'"
                        :placeholder="'Seleccione'"
                        :prepend-icon="'mdi-math-integral'"
                      >
                        <template #tooltip>
                          <empresa-tooltips name="ayudaFormulaConFalta" />
                        </template>
                      </bec-select>
                    </v-col>
                    <!--v-col cols="12" lg="6" md="12">
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
                    </v-col-->
                    <!--v-col cols="12" lg="6" md="12">
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
                                  `Debe contener exactamente ${dataModel.mascara_codigo?.length ?? 0} dígitos, conforme a la máscara del código definida.`,
                              ]
                        "
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template #tooltip>
                          <empresa-tooltips name="ayudaCodigoInicial" />
                        </template>
                      </bec-text-field>
                    </v-col-->
                    <!--v-col cols="12" lg="6" md="12">
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
                    </v-col-->
                  </v-row>
                </v-tabs-window-item>
              </v-form>

              <!-- Parametrización -->
              <v-tabs-window-item value="option-3" eager>
                <v-row class="ml-2">
                  <v-col cols="12">
                    <v-sheet border rounded>
                      <v-data-table
                        v-model="modelSeleccionadosCombinacionParametrizacion"
                        :headers="headersParametrizacion"
                        :height="smAndDown ? undefined : getTableHeight"
                        :hover="true"
                        :items="itemsCombinacionParametrizacion"
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

                        <template v-slot:item.itemsEsquemas="{ item }">
                          <template
                            v-for="(esquema, index) in item.itemsEsquemas"
                            :key="esquema.id"
                          >
                            <v-chip
                              :color="item.estado ? 'primary' : 'grey'"
                              size="small"
                              label
                              variant="flat"
                              class="ma-1"
                            >
                              {{ esquema.esquema }}
                            </v-chip>
                          </template>
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

                        <template v-slot:item.fee="{ item }">
                          <bec-text-field
                            v-model="item.fee"
                            :clearable="true"
                            :rules="btnDisabled.compRazonSocial ? [] : [validationRules.required]"
                            placeholder="0.00"
                            prefix="%"
                          >
                          </bec-text-field>
                        </template>

                        <template v-slot:item.baseFee="{ item }">
                          <bec-autocomplete
                            v-model="item.baseFee"
                            :disabled="!combinacionTieneContpaqi(item.combinacionKey)"
                            :item-title="'concepto'"
                            :item-value="'codigo'"
                            :items="itemsBaseFEE"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                          >
                          </bec-autocomplete>
                        </template>

                        <template v-slot:item.provisiones="{ item }">
                          <bec-select
                            v-model="item.provisiones"
                            :disabled="!combinacionTieneContpaqi(item.combinacionKey)"
                            :item-title="'concepto'"
                            :item-value="'codigo'"
                            :items="itemsComprobacion"
                            :multiple="false"
                            :placeholder="'Seleccione'"
                          >
                          </bec-select>
                        </template>

                        <template v-slot:item.previsiones="{ item }">
                          <bec-autocomplete
                            v-model="item.prevision"
                            :disabled="!combinacionTieneContpaqi(String(item.combinacionKey))"
                            :hide-selected="true"
                            :item-title="'descripcion'"
                            :item-value="'idconcepto'"
                            :items="itemsPrevisionSocial"
                            :multiple="true"
                            :placeholder="'Seleccione'"
                            :return-object="true"
                          >
                          </bec-autocomplete>
                        </template>

                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title color="primary" class="text-primary text-body-1">
                              Configuración de la parametrización de las combinaciones de los
                              esquemas de pago
                            </v-toolbar-title>
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
                <v-row
                  class="mx-2"
                  v-for="esquema in getItemsHabilitadosCombinacionEsquema"
                  :key="esquema.id"
                >
                  <v-col cols="12">
                    <v-sheet border rounded>
                      <v-data-table
                        v-model="modelSeleccionadosEsquemaBanco[esquema.id]"
                        :headers="headersBancos"
                        :hover="true"
                        :items="bancosPorEsquema[esquema.id]"
                        :mobile="smAndDown"
                        eager
                        hide-default-footer
                        item-value="id"
                        return-object
                        show-select
                      >
                        <template
                          v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
                        >
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-btn
                                class="ml-2"
                                color="primary"
                                height="40px"
                                min-width="40px"
                                variant="flat"
                                width="40px"
                                @click.stop
                              >
                                <v-checkbox-btn
                                  v-bind="mergeProps(tooltip)"
                                  :indeterminate="someSelected && !allSelected"
                                  :model-value="allSelected"
                                  true-icon="mdi-checkbox-multiple-marked"
                                  @update:model-value="selectAll(!allSelected)"
                                />
                              </v-btn>
                            </template>
                            <template #default>
                              <empresa-tooltips name="ayudaBtnHabilitarTodo" />
                            </template>
                          </v-tooltip>
                        </template>

                        <template
                          v-slot:item.data-table-select="{
                            internalItem,
                            isSelected,
                            toggleSelect,
                            item,
                          }"
                        >
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-btn
                                class="ml-2"
                                color="primary"
                                height="40px"
                                min-width="40px"
                                variant="flat"
                                width="40px"
                                @click.stop
                              >
                                <v-checkbox-btn
                                  v-bind="mergeProps(tooltip)"
                                  :model-value="isSelected(internalItem)"
                                  @update:model-value="toggleSelect(internalItem)"
                                >
                                </v-checkbox-btn>
                              </v-btn>
                            </template>
                            <template #default>
                              <v-card
                                :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                class="pa-3"
                                color="transparent"
                                elevation="0"
                              >
                                <v-row>
                                  <v-col cols="2" class="d-flex align-center justify-center">
                                    <v-icon icon="mdi-information-slab-circle-outline" />
                                  </v-col>
                                  <v-col cols="10">
                                    {{ item.estado ? 'Deshabilitar' : 'Habilitar' }} combinación:
                                    <span style="font-weight: bold; color: #2a73c5">
                                      <i>{{ item.combinacion }}</i>
                                    </span>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </template>
                          </v-tooltip>
                        </template>

                        <template v-slot:item.estado="{ item }">
                          <v-chip
                            :color="item.estado ? 'primary' : 'grey'"
                            size="small"
                            label
                            variant="flat"
                          >
                            {{ item.estado ? 'Habilitado' : 'Deshabilitado' }}
                          </v-chip>
                        </template>

                        <template v-slot:item.add="{ item }">
                          <v-tooltip v-if="item.tieneCuentasAdicionales">
                            <template v-slot:activator="{ props: tooltipProps }">
                              <span v-bind="mergeProps(tooltipProps)" class="d-inline-block">
                                <v-btn
                                  v-bind="mergeProps(tooltipProps)"
                                  color="primary"
                                  flat
                                  height="40px"
                                  min-width="40px"
                                  width="40px"
                                  @click.stop="onAddItemCuentaOrigen(item)"
                                >
                                  <v-icon color="white" icon="mdi-plus" size="24px" />
                                </v-btn>
                              </span>
                            </template>
                            <template #default>
                              <empresa-tooltips name="ayudaBtnAddRowCombinacionEsquema" />
                            </template>
                          </v-tooltip>
                        </template>

                        <template v-slot:item.cuentasOrigen="{ item }">
                          <v-sheet v-if="item.tieneCuentasAdicionales" border rounded class="my-2">
                            <v-data-table
                              :headers="headersCuentasOrigen"
                              :items="item.cuentasOrigen ?? []"
                              density="compact"
                              hide-default-footer
                              hide-default-header
                              item-key="id_nomina_gape_esquema"
                            >
                              <template v-slot:item.cuenta="{ item: slotItem }">
                                <bec-text-field
                                  v-model="slotItem.cuentaOrigen"
                                  :clearable="true"
                                  :label="'Cuenta de origen'"
                                  :placeholder="'Cuenta de origen'"
                                  class="my-4"
                                >
                                  <!--:disabled="deshabilitarCampoTope(tope, item)"-->
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
                                          <span style="font-weight: bold; color: #2a73c5"
                                            >Instrucción:</span
                                          >
                                          la configuración del tope del esquema
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </template>

                              <template v-slot:item.eliminar="{ item: slotItem }">
                                <v-tooltip bottom interactive location="bottom">
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      color="primary"
                                      height="40px"
                                      min-width="40px"
                                      variant="flat"
                                      width="40px"
                                      @click="onDeleteItemCuentaOrigenConfirmation(item, slotItem)"
                                    >
                                      <v-icon color="white" icon="mdi-delete" size="24px" />
                                    </v-btn>
                                  </template>
                                  <template #default>
                                    <v-card
                                      :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
                                      class="pa-3"
                                      color="transparent"
                                      elevation="0"
                                    >
                                      <v-row>
                                        <v-col cols="2" class="d-flex align-center justify-center">
                                          <v-icon icon="mdi-information-slab-circle-outline" />
                                        </v-col>
                                        <v-col cols="10">
                                          Eliminar combinación:
                                          <span style="font-weight: bold; color: #2a73c5">
                                            <i>{{ item.combinacion }}</i>
                                          </span>
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </v-tooltip>
                              </template>

                              <template v-slot:no-data>
                                <v-card
                                  border
                                  class="my-4 d-flex align-center justify-center"
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
                                    <span
                                      >No hay cuentas de origen configuradas para
                                      {{ item.banco }}</span
                                    >
                                  </v-card-text>
                                </v-card>
                              </template>
                            </v-data-table>
                          </v-sheet>
                        </template>

                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title color="primary" class="text-primary text-body-1">
                              Configuración de bancos del esquema {{ esquema.esquema }}
                            </v-toolbar-title>
                          </v-toolbar>
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
            </v-tabs-window>
          </div>
        </div>
      </v-col>
    </v-row>
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
import type { ConceptoModel } from '@/interfaces/nomina/default'
import type { BaseFeeModel, ClasePrimaRiesgoModel } from '@/interfaces/nomina/gape'

// import stores
import { useClienteStore, useEmpresaStore, useBancoStore } from '@/stores/modules/Nomina/gape'

import { useTipoPeriodoStore, useConceptoStore } from '@/stores/modules/Nomina/default'

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
import { id } from 'vuetify/locale'

interface EsquemaPago {
  id: number
  esquema: string
  contpaqi: boolean
}

interface TableCombinacionEsquema {
  estado: boolean
  combinacion: string
  esquemas: EsquemaPago[]
  topes: TableTopeEsquema[]
}

interface TableTopeEsquema {
  id: number
  id_nomina_gape_esquema: number
  esquema: string
  tope: number
  orden: number
}

interface CombinacionEsquema {
  id: number
  estado: boolean
  combinacion: string
  id_nomina_gape_cliente: number
  id_nomina_gape_empresa: number
  id_nomina_gape_esquema: number
  esquema: string
  tope: number
  orden: number
}

interface TableCombinacionParametrizacion {
  estado: boolean
  combinacionKey: string
  combinacionTexto: string
  itemsEsquemas: EsquemaPago[]
  esquemas: string

  idPeriodo: number
  periodo: string

  fee: number | null
  baseFee: string | null
  provisiones: string | null

  prevision: ConceptoModel[]
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
  idconcepto: number
}

interface TableEsquemaBanco {
  id: number
  estado: boolean
  banco: string
  cuentasOrigen: BancosCuentas[] | null
  tieneCuentasAdicionales: boolean
  combinacion: string
}

interface BancosCuentas {
  id: number
  cuentaOrigen: string
}

export default defineComponent({
  name: 'EmpresaForm',
  components: {
    BecSelect,
    BecAutocomplete,
    BecTextField,
    EmpresaTooltips,
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

    /**|  General */

    const pageSize = ref()

    // 3. Composables
    const { name, mobile, smAndDown } = useDisplay()
    const router = useRouter()
    const clienteStore = useClienteStore()
    const dialogConfirmation = useDialogManagerStore()
    const idEditar = computed(() => props.id !== undefined && props.id !== null)

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
    const vconPrincipalRef = ref()
    const vrowFiltrosRef = ref()

    const cardHeight = ref(0)

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

    // 5. Computed
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

    const esRegistroNuevo = computed(() => idEditar.value)

    const getItemsClientesNomina = computed(() => clienteStore.clientes)

    const tabsHabilitados = computed<Record<TabKey, boolean>>(() => {
      // ✏️ EDICIÓN → todo habilitado
      if (idEditar.value) {
        return {
          'option-1': true,
          'option-2': true,
          'option-3': true,
          'option-4': true,
        }
      }

      // 🆕 NUEVO → lógica actual
      return {
        'option-1': true,
        'option-2': getEsValidoTab1.value,
        'option-3': getEsValidoTab1.value && getEsValidoTab2.value,
        'option-4': getEsValidoTab1.value && getEsValidoTab2.value,
      }
    })

    // 6. Watchers
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
        //btnDisabled.value.compNoFiscMascara = true
        //btnDisabled.value.compNoFiscCodigoInicial = true

        await fetchDatosEmpresasNominaPorClienteId(props.id)
      }
      // new
      else {
      }
    })

    onBeforeUnmount(() => {
      //window.removeEventListener('resize', calcularDimensiones)
    })

    // 8. Functions (fetch, metodos, async)
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

    function onClickTabVertical(tab: string) {
      handlersTabsVertical[tab]?.()
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
        () => validateForm(), // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const fetchCrearFormulasContpaq = async () => {

      console.log('Creando fórmulas en Contpaq...')

      dialogConfirmation.onCloseDialogConfirmation()

      const payload = {
        empresa: { ...dataModel.value },
      }

      try {
        loading.value = true

        let titulo = 'Registro guardado'
        let mensaje = 'Los datos se guardaron de forma exitosa.'

        dataModel.value.codigo_actual = dataModel.value.codigo_inicial
        const response = await empresaStore.crearFormulasContpaq(payload)

        dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)
        //router.push({ name: 'EmpresaList' })

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

    /**|  Esquemas de pago */

    // 3. Composables
    // 4. Reactive
    const itemsEsquemasDePago = ref<EsquemaPago[]>([
      { id: 1, esquema: 'Sueldo IMSS', contpaqi: true },
      { id: 2, esquema: 'Asimilados', contpaqi: true },
      { id: 3, esquema: 'Sindicato', contpaqi: false },
      { id: 4, esquema: 'Gastos por comprobar', contpaqi: false },
      { id: 5, esquema: 'Tarjeta facil', contpaqi: false },
    ])
    const modelSeleccionadosCombinacionEsquema = ref<TableCombinacionEsquema[]>([])
    const itemsCombinacionEsquema = ref<TableCombinacionEsquema[]>([])
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
        key: 'topes',
        align: 'center',
        sortable: false,
        title: 'Topes',
        width: '40%',
      },
      {
        key: 'eliminar',
        align: 'end',
        sortable: false,
        title: '',
        width: '5%',
      },
    ])
    const isNullRowCombinacionEsquema = computed(() => {
      return itemsCombinacionEsquema.value.some((fila) => fila.esquemas.length === 0)
    })
    const headersTope = [
      { title: '', key: 'drag', width: 40 },
      { title: '', key: 'orden', width: 40 },
      { title: '', key: 'tope' },
    ]

    // 5. Computed
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
    const combinacionesDuplicadas = computed(() => {
      const seen = new Set<number>()
      const duplicadas: TableCombinacionEsquema[] = []

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

    // 6. Watchers
    watch(getEsValidoTab1, (valido) => {
      if (!valido && modelTabVertical.value !== 'option-1') {
        modelTabVertical.value = 'option-1'
      }
    })

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
    // 8. Functions (fetch, metodos, async)
    function onClickTabEsquemasDePago() {
      console.log('Esquemas de pago')
    }

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

    const esFilaFija = (tope: TableTopeEsquema): boolean => {
      const esquema = getEsquemaById(tope.id_nomina_gape_esquema)
      return esquema?.contpaqi === true
    }

    const isDragging = ref(false)
    let dragIndex: number | null = null

    const onDragStart = (index: number, items: TableTopeEsquema[]) => {
      if (esFilaFija(items[index])) return
      dragIndex = index
      isDragging.value = true
    }

    const onDrop = (index: number, items: TableTopeEsquema[]) => {
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

    const fixFixedRowPosition = (items: TableTopeEsquema[]) => {
      const fijos: TableTopeEsquema[] = []
      const normales: TableTopeEsquema[] = []

      items.forEach((t) => {
        esFilaFija(t) ? fijos.push(t) : normales.push(t)
      })

      items.splice(0, items.length, ...fijos, ...normales)

      // Reasignar orden
      items.forEach((t, index) => {
        t.orden = index + 1
      })
    }

    const ordenarTopesConContpaqiArriba = (topes: TableTopeEsquema[]) => {
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
      tope: TableTopeEsquema,
      combinacion: TableCombinacionEsquema,
    ): boolean => {
      // 1️⃣ CONTPAQi → siempre deshabilitado
      if (esEsquemaContpaqi(tope)) return true

      // 2️⃣ No CONTPAQi y solo 1 esquema en la combinación
      if (!esEsquemaContpaqi(tope) && combinacion.esquemas.length === 1) return true

      // 3️⃣ En cualquier otro caso → habilitado
      return false
    }

    function esEsquemaContpaqi(item: TableTopeEsquema): boolean {
      const esquema = itemsEsquemasDePago.value.find((e) => e.id === item.id_nomina_gape_esquema)
      return esquema?.contpaqi === true
    }

    function onValidateItemDuplicateEsquema(esquemas: EsquemaPago[]): EsquemaPago[] {
      const contpaqi = esquemas.filter((e) => e.contpaqi === true)

      // ✅ Caso válido
      if (contpaqi.length <= 1) {
        return esquemas
      }

      // ❌ Caso inválido: más de un CONTPAQi
      const mensaje =
        'En cada combinación solo es posible seleccionar un esquema de tipo CONTPAQi. Por este motivo, la selección duplicada se descartó automáticamente.'

      dialogConfirmation.onOpenDialogInformation(
        mensaje,
        'Selección no permitida',
        'alert',
        '#285697',
        2,
      )

      // 👉 conservar SOLO el último CONTPAQi + los NO CONTPAQi
      const ultimo = contpaqi[contpaqi.length - 1]

      return [ultimo, ...esquemas.filter((e) => !e.contpaqi)]
    }

    function onUpdateItemsEsquemasDePago(item: TableCombinacionEsquema) {
      // 🔴 1. Validar selección (máx. 1 CONTPAQi)
      item.esquemas = onValidateItemDuplicateEsquema(item.esquemas)

      const map = new Map<number, TableTopeEsquema>()

      // 🔵 2. Conservar topes existentes
      item.topes.forEach((t) => {
        map.set(t.id_nomina_gape_esquema, t)
      })

      // 🟢 3. Agregar nuevos topes
      item.esquemas.forEach((e, index) => {
        if (!map.has(e.id)) {
          map.set(e.id, {
            id: index,
            id_nomina_gape_esquema: e.id,
            esquema: e.esquema,
            tope: 0,
            orden: index + 1,
          })
        }
      })

      // 🟣 4. Filtrar + ordenar (CONTPAQi arriba)
      item.topes = ordenarTopesConContpaqiArriba(
        Array.from(map.values()).filter((t) =>
          item.esquemas.some((e) => e.id === t.id_nomina_gape_esquema),
        ),
      )

      // 🔑 5. Asegurar que la fila siga seleccionada
      if (!modelSeleccionadosCombinacionEsquema.value.includes(item)) {
        modelSeleccionadosCombinacionEsquema.value.push(item)
      }
    }

    function generarClaveCombinacion() {
      const existentes = itemsCombinacionEsquema.value.map((i) => String(i.combinacion))

      let index = 1

      while (existentes.includes(String(index))) {
        index++
      }

      return String(index)
    }

    function onAddRowCombinacionEsquema() {
      if (isNullRowCombinacionEsquema.value) {
        return
      }

      if (combinacionesDuplicadas.value.length > 0) {
        let mensaje =
          'Se detectó un registro duplicado. No se agregó una nueva fila y la fila duplicada fue eliminada.'

        dialogConfirmation.onOpenDialogInformation(
          mensaje,
          'Registro duplicado',
          'alert',
          '#285697',
          2,
        )
        onDeleteRowDuplicateCombinacionEsquema()

        modelTabVertical.value = 'option-1'
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

    function onDeleteCombinacionEsquemaConfirmation(item: TableCombinacionEsquema) {
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

    async function onDeleteCombinacionEsquema(item: TableCombinacionEsquema) {
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

    /**|  Datos empresa*/

    // 3. Composables
    const empresasStore = useEmpresasStore()
    const empresaStore = useEmpresaStore()
    const { dataModel, setEmpresa, resetModel, resetModelEmpresa } = useEmpresaModel()

    // 4. Reactive
    const loading = ref(false)
    const formDatosEmpresa = ref()
    const formDatosEmpresaValido = ref(false)
    const itemsEmpresas = ref<Object[]>([])
    const modelEmpresa = ref<Object>()

    // 5. Computed
    const getEsValidoTab2 = computed(() => {
      return formDatosEmpresaValido.value
    })

    const getItemsEmpresaDatabase = computed(() => empresasStore.empresas)

    // 6. Watchers
    watch(getEsValidoTab2, (valido) => {
      if (!valido && modelTabVertical.value !== 'option-2') {
        modelTabVertical.value = 'option-2'
      }
    })

    /*watch(
      () => dataModel.value.mascara_codigo,
      (nuevaMascara) => {
        if (props.id !== undefined && props.id !== null) return
        validarMascaraYActualizarCampos(nuevaMascara)
      },
    )*/

    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)
    function onClickTabDatosEmpresa() {
      // Validar combinaciones duplicadas
      if (combinacionesDuplicadas.value.length > 0) {
        let mensaje =
          'Se detectó un registro duplicado. La fila duplicada será eliminada automáticamente.'

        dialogConfirmation.onOpenDialogInformation(
          mensaje,
          'Registro duplicado',
          'alert',
          '#285697',
          2,
        )
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

      if (!tieneContpaqi) {
        dataModel.value.id_empresa_database = undefined
      }

      btnDisabled.value.compEmpresa = !tieneContpaqi

      // 🧾 Razón social y RFC
      // Solo se habilitan si TODOS son NO CONTPAQi
      btnDisabled.value.compRazonSocial = tieneContpaqi
      btnDisabled.value.compRfc = tieneContpaqi

      // 📧 Correo → siempre habilitado
      btnDisabled.value.compCorreo = false

      // 🧩 Campos NO fiscales
      // Se habilitan si existe al menos un esquema NO CONTPAQi
      //btnDisabled.value.compNoFiscMascara = !tieneNoContpaqi
      //btnDisabled.value.compNoFiscCodigoInicial = !tieneNoContpaqi
    }

    // 8. Functions (fetch, metodos, async) | Datos empresa
    const buscarEmpresasNomina = async (codigo: number) => {
      resetModel(true)

      await fetchEmpresasNominaPorCliente(codigo)
    }

    const buscarDatosEmpresaNomina = async (codigo: number) => {

      resetModelEmpresa(true)

      await tipoPeriodoStore.tipoPeriodoPorEmpresa(buildData())

      if (tipoPeriodoStore.tipoPeriodo.length === 0) {
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage || 'La empresa seleccionada no tiene periodos registrados. Por favor, registre al menos un periodo de su empresa dentro del sistema de CONTPAQi Nóminas para continuar.',
          'Empresa sin periodos registrados',
          'incorrect',
          '#B00000',
          1,
        )

        dataModel.value.id_empresa_database = null

        return
      } else {
        const empresaSeleccionada = getItemsEmpresaDatabase.value.find((item) => item.id === codigo)
        const nombreBase = empresaSeleccionada?.nombre_base ?? ''

        await fetchDatosEmpresasNominaPorCliente(
          dataModel.value.id_nomina_gape_cliente,
          codigo,
          nombreBase,
        )
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
          //dataModel.value.correo_notificacion = empresaStore.empresa.correo_notificacion ?? ''
          //dataModel.value.codigo_interno = empresaStore.empresa.codigo_interno ?? ''
        }
      } catch (error) {
        console.error('Error al cargar datps catálogos por empresa:', error)
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

    const fetchDatosEmpresasNominaPorClienteId = async (idEmpresa: number) => {
      try {
        const data = await empresaStore.empresasDatosNominasPorClienteId(idEmpresa)

        // 1️⃣ Empresa
        setEmpresa(data.empresa)

        fetchEmpresasNominaPorClienteAsignadas(data.empresa.id_nomina_gape_cliente)

        await conceptoStore.catalogoConceptoPrevision(buildData())

        // 2️⃣ Combinaciones
        //itemsCombinacionEsquema.value = data.combinaciones

        itemsCombinacionEsquema.value = data.combinaciones.map((c: any) => ({
          ...c,
          topes: c.topes.map((t: any) => ({
            id: t.id,
            id_nomina_gape_esquema: t.id_esquema,
            tope: t.tope,
            orden: t.orden,
          })),
        }))

        modelSeleccionadosCombinacionEsquema.value = data.combinaciones.filter((c: any) => c.estado)

        // todo ok arriba
        // 3️⃣ Parametrización (hidratar campos derivados)
        itemsCombinacionParametrizacion.value = data.parametrizacion.map((p: any) => {
          // 🔹 buscar combinación
          const combinacion = data.combinaciones.find((c: any) => c.combinacion == p.combinacionKey)

          const combinacionTexto = combinacion
            ? combinacion.esquemas.map((e: any) => e.esquema).join(' + ')
            : ''

          return {
            ...p,
            // 🔹 campos que la tabla necesita
            combinacionTexto,
            itemsEsquemas: combinacion?.esquemas ?? [],
            esquemas: combinacionTexto,

            // 🔹 asegurar periodo
            periodo: p.periodo ?? p.nombre_periodo ?? '',
          }
        })

        modelSeleccionadosCombinacionParametrizacion.value =
          itemsCombinacionParametrizacion.value.filter((p) => p.estado)

        // 4️⃣ Bancos
        bancosPorEsquema.value = Object.fromEntries(
          data.bancos.map((b: any) => [
            b.id_esquema,
            b.bancos.map((bk: any) => {
              const cuentas = (bk.cuentasOrigen ?? []).map((c: any) => ({
                cuentaOrigen: c.cuentaOrigen,
              }))

              return {
                ...bk,

                // 🔑 AQUÍ LA CLAVE
                tieneCuentasAdicionales:
                  cuentas.length > 0 || bk.banco === 'Banorte' || bk.banco === 'Azteca',

                cuentasOrigen: cuentas,
              }
            }),
          ]),
        )
      } catch (error) {
        console.error('Error al cargar empresa', error)
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

    /**|  Parametrización*/

    // 3. Composables
    const tipoPeriodoStore = useTipoPeriodoStore()
    const conceptoStore = useConceptoStore()

    // 4. Reactive
    const itemsCombinacionParametrizacion = ref<TableCombinacionParametrizacion[]>([])
    const headersParametrizacion = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'combinacionKey',
        align: 'center',
        sortable: false,
        title: '',
        width: '2%',
      },
      {
        key: 'estado',
        align: 'center',
        sortable: false,
        title: '',
        width: '5%',
      },
      {
        key: 'itemsEsquemas',
        sortable: false,
        align: 'center',
        title: 'Combinación de esquemas',
        width: '10%',
      },
      {
        key: 'periodo',
        align: 'center',
        sortable: false,
        title: 'Periodicidad',
        width: '5%',
      },
      {
        key: 'fee',
        align: 'center',
        sortable: false,
        title: 'FEE',
        width: '15%',
      },
      {
        key: 'baseFee',
        align: 'center',
        sortable: false,
        title: 'Base FEE',
        width: '25%',
      },
      {
        key: 'provisiones',
        align: 'center',
        sortable: false,
        title: 'Provisiones',
        width: '10%',
      },
      {
        key: 'previsiones',
        align: 'center',
        sortable: false,
        title: 'Previsiones',
        width: '20%',
      },
    ])
    const itemsBaseFEE: Ref<BaseFeeModel[]> = ref(getDefaultBaseFee())
    const itemsComprobacion = ref([
      { concepto: 'Si', codigo: 'si' },
      { concepto: 'No', codigo: 'no' },
    ])

    const itemsVerificacion = ref([
      { concepto: 'Si', codigo: true },
      { concepto: 'No', codigo: false },
    ])

    const modelSeleccionadosCombinacionParametrizacion = ref<TableCombinacionParametrizacion[]>([])

    // 5. Computed
    const itemsPrevisionSocial = computed(() => conceptoStore.concepto)

    // 6. Watchers

    // Clic en check de tabla cambia etiqueta habilitado / deshabilitado
    watch(
      () => modelSeleccionadosCombinacionParametrizacion.value,
      (seleccionados) => {
        itemsCombinacionParametrizacion.value.forEach((fila) => {
          fila.estado = seleccionados.includes(fila)
        })
      },
      { deep: true },
    )

    const buildData = (extras: any = {}) => {
      return {
        idCliente: dataModel.value.id_nomina_gape_cliente,
        idEmpresaDatabase: dataModel.value.id_empresa_database,
        ...extras,
      }
    }

    watch(
      () => itemsPrevisionSocial.value,
      (catalogo) => {
        if (!catalogo.length) return

        itemsCombinacionParametrizacion.value.forEach((item) => {
          if (!Array.isArray(item.prevision)) return

          item.prevision = item.prevision
            .map((p: any) => {
              // si ya es objeto completo, no tocar
              if (p.descripcion) return p

              return catalogo.find((c: any) => c.idconcepto === p.idconcepto)
            })
            .filter(Boolean)
        })
      },
      { immediate: true },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)
    async function onClickTabParametrizacion() {
      // Si tiene al menos una de cotpaq va a buscar a la base de contpaq los periodos

      await tipoPeriodoStore.tipoPeriodoPorEmpresa(buildData())

      const periodos = tipoPeriodoStore.tipoPeriodo

      await conceptoStore.catalogoConceptoPrevision(buildData())

      const resultado: TableCombinacionParametrizacion[] = []

      if (idEditar.value) {
        return
      }

      modelSeleccionadosCombinacionEsquema.value.forEach((combinacion) => {
        const combinacionTexto = combinacion.esquemas.map((e) => e.esquema).join(' + ')

        periodos.forEach((periodo) => {
          resultado.push({
            estado: true,

            combinacionKey: combinacion.combinacion,
            combinacionTexto: combinacionTexto,
            itemsEsquemas: combinacion.esquemas,
            esquemas: combinacionTexto, // 👈 ahora ES STRING

            idPeriodo: periodo.idtipoperiodo,
            periodo: periodo.nombretipoperiodo ?? '',

            fee: null,
            baseFee: !combinacionTieneContpaqi(combinacion.combinacion)
              ? getDefaultBaseFee2()
              : null,
            provisiones: null,

            prevision: [],
          })
        })
      })

      itemsCombinacionParametrizacion.value = resultado
    }

    function getDefaultBaseFee2(): string | null {
      return itemsBaseFEE.value.length ? itemsBaseFEE.value[0].codigo : null
    }

    const combinacionesConContpaqi = computed<Record<string, boolean>>(() => {
      const map: Record<string, boolean> = {}

      itemsCombinacionEsquema.value.forEach((c) => {
        map[c.combinacion] = c.esquemas.some((e) => e.contpaqi)
      })

      return map
    })

    function combinacionTieneContpaqi(combinacionKey: string): boolean {
      return combinacionesConContpaqi.value[combinacionKey] ?? false
    }

    /**|  Bancos*/
    // 3. Composables
    const bancoStore = useBancoStore()

    // 4. Reactive
    const modelSeleccionadosEsquemaBanco = ref<Record<number, TableEsquemaBanco[]>>({})

    const headersBancos = ref<
      {
        key: string
        align?: 'start' | 'center' | 'end'
        sortable?: boolean
        title: string
        width?: string
      }[]
    >([
      {
        key: 'estado',
        align: 'center',
        sortable: false,
        title: '',
        width: '5%',
      },
      {
        key: 'banco',
        sortable: false,
        align: 'center',
        title: 'Bancos',
        width: '20%',
      },
      {
        key: 'add',
        sortable: false,
        align: 'center',
        title: '',
        width: '5%',
      },
      {
        key: 'cuentasOrigen',
        align: 'center',
        sortable: false,
        title: 'Cuentas de origen',
        width: '70%',
      },
    ])

    const headersCuentasOrigen = [
      { title: '', key: 'cuenta', width: '95%' },
      { title: '', key: 'eliminar', width: '5%' },
    ]

    // 5. Computed
    // 6. Watchers
    watch(
      modelSeleccionadosEsquemaBanco,
      (seleccionadosPorEsquema) => {
        Object.entries(bancosPorEsquema.value).forEach(([idEsquema, bancos]) => {
          const seleccionados = seleccionadosPorEsquema[Number(idEsquema)] ?? []

          bancos.forEach((banco) => {
            banco.estado = seleccionados.includes(banco)
          })
        })
      },
      { deep: true },
    )

    watch(
      getItemsHabilitadosCombinacionEsquema,
      (esquemas) => {
        esquemas.forEach((esquema) => {
          if (!bancosPorEsquema.value[esquema.id]) {
            bancosPorEsquema.value[esquema.id] = crearBancosBase().map((b) => ({
              ...b,
              cuentasOrigen: [],
            }))
          }
        })
      },
      { immediate: true },
    )

    const bancosPorEsquema = ref<Record<number, TableEsquemaBanco[]>>({})

    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    function onClickTabBancos() {

    }

    function crearBancosBase(): TableEsquemaBanco[] {
      return [
        {
          id: 1,
          estado: true,
          banco: 'Fondeadora',
          cuentasOrigen: [],
          tieneCuentasAdicionales: false,
          combinacion: '',
        },
        {
          id: 2,
          estado: true,
          banco: 'Banorte',
          cuentasOrigen: [],
          tieneCuentasAdicionales: true,
          combinacion: '',
        },
        {
          id: 4,
          estado: true,
          banco: 'Azteca',
          cuentasOrigen: [],
          tieneCuentasAdicionales: true,
          combinacion: '',
        },
        {
          id: 5,
          estado: true,
          banco: 'Tarjeta facil',
          cuentasOrigen: [],
          tieneCuentasAdicionales: false,
          combinacion: '',
        },
      ]
    }

    //-----
    function onAddItemCuentaOrigen(item: TableEsquemaBanco) {
      if (!item.tieneCuentasAdicionales) return

      if (!item.cuentasOrigen) item.cuentasOrigen = []

      if (item.cuentasOrigen.some((c) => !c.cuentaOrigen.trim())) return

      item.cuentasOrigen.push({
        id: 1, // o uuid si prefieres
        cuentaOrigen: '',
      })
    }

    const cuentaOrigenAEliminar = ref<{
      banco: TableEsquemaBanco
      cuenta: { id: number; cuentaOrigen: string }
    } | null>(null)

    function onDeleteItemCuentaOrigenConfirmation(banco: TableEsquemaBanco, cuenta: BancosCuentas) {
      cuentaOrigenAEliminar.value = { banco, cuenta }

      const mensaje =
        '¿Está seguro de que desea eliminar el registro seleccionado? Esta acción no se puede deshacer.'
      const titulo = 'Eliminar registro'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        onDeleteItemCuentaOrigen,
        [],
        titulo,
        'alert',
      )
    }

    async function onDeleteItemCuentaOrigen() {
      try {
        if (!cuentaOrigenAEliminar.value) return

        const { banco, cuenta } = cuentaOrigenAEliminar.value

        if (!banco.cuentasOrigen) return

        banco.cuentasOrigen = banco.cuentasOrigen.filter((c) => c.id !== cuenta.id)

        cuentaOrigenAEliminar.value = null
      } catch (error) {
        dialogConfirmation.onOpenDialogInformation(
          bancoStore.responseMessage || 'Ocurrió un error inesperado',
          'Error al eliminar',
          'incorrect',
          '#B00000',
          1,
        )
      }
    }

    const validateForm = async () => {
      const combinacionesPayload = itemsCombinacionEsquema.value.map((c) => ({
        combinacion: c.combinacion,
        estado: c.estado,
        esquemas: c.esquemas.map((e) => ({
          id_esquema: e.id,
          esquema: e.esquema,
          contpaqi: e.contpaqi,
        })),
        topes: c.topes.map((t) => ({
          id: t.id,
          id_esquema: t.id_nomina_gape_esquema,
          tope: Number(t.tope),
          orden: t.orden,
        })),
      }))

      const parametrizacionPayload = itemsCombinacionParametrizacion.value.map((p) => ({
        estado: p.estado,
        combinacion_key: p.combinacionKey,
        combinacion_texto: p.combinacionTexto,
        id_periodo: p.idPeriodo,
        fee: p.fee ? Number(p.fee) : null,
        base_fee: p.baseFee,
        provisiones: p.provisiones,
        previsiones: p.prevision.map((pr) => ({
          idconcepto: pr.idconcepto,
        })),
      }))

      const bancosPayload = Object.entries(bancosPorEsquema.value).map(([idEsquema, bancos]) => ({
        id_esquema: Number(idEsquema),
        bancos: bancos.map((b) => ({
          banco: b.banco,
          estado: b.estado,
          cuentas_origen:
            b.cuentasOrigen?.map((c) => ({
              cuenta: c.cuentaOrigen,
            })) ?? [],
        })),
      }))

      const payload = {
        empresa: { ...dataModel.value },
        combinaciones: combinacionesPayload,
        parametrizacion: parametrizacionPayload,
        bancos: bancosPayload,
      }
      dialogConfirmation.onCloseDialogConfirmation()

      let formRef = null
      let idEmpresaCreada = null

      formRef = formDatosEmpresa.value

      if (!formRef) return

      const form = await formRef.validate()

      if (!form || !form.valid) return

      const hayParametrizacionValida = parametrizacionPayload.some((p) => {
        return (
          (p.combinacion_key && p.combinacion_key.trim() !== '') ||
          p.id_periodo !== null ||
          p.fee !== null ||
          (p.previsiones && p.previsiones.length > 0)
        )
      })

      console.log(parametrizacionPayload)
      console.log(hayParametrizacionValida)

      if (!hayParametrizacionValida) return

      try {
        loading.value = true

        let titulo = 'Registro guardado'
        let mensaje = 'Los datos se guardaron de forma exitosa.'

        // Aquí va tu guardado real
        if (props.id !== undefined && props.id !== null) {
          await empresaStore.updateNominaGapeEmpresa(payload, props.id)
          mensaje = 'Los datos se actualizaron de forma exitosa.'
          titulo = 'Registro actualizado'

          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)

          router.push({ name: 'EmpresaList' })
        } else {
          dataModel.value.codigo_actual = dataModel.value.codigo_inicial
          const response = await empresaStore.storeNominaGapeEmpresa(payload)

          //idEmpresaCreada = response.id

          dialogConfirmation.onOpenDialogInformation(mensaje, titulo, 'correct', '#438701', 2)
          router.push({ name: 'EmpresaList' })
          /*
          if (idEmpresaCreada) {
            router.push({ path: `/nominas/gape/empresaForm/${idEmpresaCreada}` })
          }*/
        }

        //await formRef.reset()
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

    return {
      fetchCrearFormulasContpaq,
      pageSize,
      bancosPorEsquema,
      onDeleteItemCuentaOrigenConfirmation,
      onAddItemCuentaOrigen,
      headersCuentasOrigen,
      getItemsHabilitadosCombinacionEsquema,
      headersBancos,
      combinacionTieneContpaqi,
      itemsPrevisionSocial,
      btnDisabled,
      buscarDatosEmpresaNomina,
      buscarEmpresasNomina,
      dataModel,
      deshabilitarCampoTope,
      dialogConfirmation,
      esEsquemaContpaqi,
      esFilaFija,
      formDatosEmpresa,
      formDatosEmpresaValido,
      getCardHeight,
      getItemsClientesNomina,
      getItemsEmpresaDatabase,
      getTableHeight,
      getTableNoDataHeight,
      headersCombinacionEsquema,
      headersParametrizacion,
      headersTope,
      inputFilters,
      isDragging,
      isNullRowCombinacionEsquema,
      itemsBaseFEE,
      itemsCombinacionEsquema,
      itemsComprobacion,
      itemsEmpresas,
      itemsEsquemasDePago,
      itemsCombinacionParametrizacion,
      modelSeleccionadosCombinacionParametrizacion,
      itemsTabVertical,
      loading,
      mergeProps,
      modelEmpresa,
      modelSeleccionadosEsquemaBanco,
      modelSeleccionadosCombinacionEsquema,
      modelTabVertical,
      onAddRowCombinacionEsquema,
      onClickTabVertical,
      onDecision,
      onDeleteCombinacionEsquema,
      onDeleteCombinacionEsquemaConfirmation,
      onDragStart,
      onDrop,
      onUpdateItemsEsquemasDePago,
      smAndDown,
      tabsHabilitados,
      validationRules,
      vbrePrincipalItems,
      vconPrincipalRef,
      vrowBarraDeAccionesRef,
      vrowFiltrosRef,
      itemsVerificacion,
    }
  },
})
</script>
