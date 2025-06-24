<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-end">
        <v-breadcrumbs
          :items="vbrePrincipalItems"
          divider="|"
          class="text-medium-emphasis"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-end justify-end overflow-auto">
        <v-divider class="mr-5 mt-2 border-opacity-25" vertical />
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-upload</v-icon>
            </v-btn>
          </template>
          <span>Importar / Subir</span>
        </v-tooltip>

        <v-menu v-model="vbtnMenuExportarModel" :close-on-content-click="false">
          <template v-slot:activator="{ props: vbtnMenuExportarModel }">
            <v-tooltip bottom color="primary" interactive>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                  v-bind="mergeProps(vbtnMenuExportarModel, tooltip)"
                  class="mr-1"
                  color="primary"
                  height="48px"
                  min-width="48px"
                  width="48px"
                >
                  <v-icon size="24px" color="white">mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Exportar / Descargar</span>
            </v-tooltip>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                class="py-3 border-b"
                color="primary"
                title="Descargar formato de importación"
                value="cuenta"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-microsoft-excel" size="30" />
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              v-bind="props"
              class="mr-1"
            >
              <v-icon size="24px" color="white">mdi-floppy</v-icon>
            </v-btn>
          </template>
          <span>Guardar</span>
        </v-tooltip>

        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              @click.stop="vbtnActivarModel = !vbtnActivarModel"
            >
              <v-icon size="24px" color="white">
                {{
                  vbtnActivarModel ? "mdi-checkbox-blank-outline" : "mdi-checkbox-marked"
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            Marque la casilla para
            <b>
              <i>
                {{ vbtnActivarModel ? " ACTIVAR " : "DESACTIVAR" }}
              </i>
            </b>
            este registro
          </span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              v-bind="props"
            >
              <v-icon size="24px" color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar nuevo</span>
        </v-tooltip>

        <!--v-btn
          min-width="48px"
          width="48px"
          height="48px"
          color="primary"
          style="font-size: 18px"
          density="comfortable"
        >
          <v-tooltip>
            <template v-slot:activator="{ props: tooltip }">
              <v-checkbox-btn v-bind="mergeProps(tooltip)" />
            </template>
            <span>Marque la casilla para activar este registro.</span>
          </v-tooltip>
        </v-btn-->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>
    <v-row ref="vtabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs
          v-model="vtabMenuModel"
          color="primary"
          class="text-medium-emphasis"
          slider-color="primary"
        >
          <v-tab
            v-for="tab in vtabMenuItems"
            :key="tab.value"
            :value="tab.value"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
          >
            <v-icon left class="pr-5">{{ tab.icon }}</v-icon>
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="modelEmpresa"
          :disabled="false"
          :items="itemsEmpresas"
          :rules="[vforFiltrosRule.required]"
          auto-select-first
          chips
          clear-icon="mdi-close"
          clear-on-select
          clearable
          closable-chips
          color="primary"
          filter-mode="every"
          item-color="primary"
          item-props
          item-title="nombre"
          item-value="id"
          label="Cliente"
          no-data-text="No hay información disponible"
          placeholder="Buscar"
          prepend-inner-icon="mdi-home-account"
          variant="outlined"
        >
          <!--template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template-->

          <!--template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template-->

          <template v-slot:prepend>
            <v-tooltip interactive>
              <template v-slot:activator="{ props: tooltip }">
                <v-icon
                  icon="mdi-information-slab-circle-outline"
                  v-bind="mergeProps(tooltip)"
                />
              </template>
              <span>
                Ruta del archivo de la base de datos de la empresa del cliente.
              </span>
            </v-tooltip>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col>
        <v-card elevation="0" color="transparent">
          <v-tabs-window v-model="vtabMenuModel">
            <v-tabs-window-item value="tab01" eager>
              <v-card color="transparent">
                <v-card-title class="text-medium-emphasis">
                  <v-row>
                    <v-col cols="6" class="d-flex align-center">
                      Parametrización general
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-divider class="border-opacity-25"></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="4">
                      <v-select
                        v-model="modelSueldoIMSS"
                        :items="itemsComprobacion"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Sueldo IMSS"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-hospital"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Es el sueldo mensual y en cuota diaria bruto, con el cual
                              esta dado de alta el colaborador ante el IMSS.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-select
                        v-model="modelProvSoc"
                        :items="itemsComprobacion"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Prov. Soc."
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-injury"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Prov. Soc</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-select
                        :items="itemsComprobacion"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Tarjeta fácil"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-credit-card"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Tarjeta fácil</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-select
                        :items="itemsComprobacion"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Hon. Asimilados"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-hard-hat"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Hon. Asimilados</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-select
                        :items="itemsComprobacion"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Gastos por comprobar"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-file-text"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Gastos por comprobar</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab02" eager>
              <v-card>
                <v-card-title class="text-medium-emphasis">
                  Configuración de importador de incidencias
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="3">
                      <v-select
                        :items="itemsClasePrimaRiesgo"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        item-title="title"
                        item-value="value"
                        label="Clase de Prima de Riesgo"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-key"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.title"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Clase de Prima de Riesgo</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Valor de Prima de Riesgo"
                        placeholder="Valor númerico"
                        prepend-inner-icon="mdi-account-key"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Alimentar si la prima indica que es <b><i>ACTUALIZADA</i></b
                              >, en caso de que indique que es <b><i>MEDIA</i></b> no es
                              necesario alimentar.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-select
                        :items="['Quincenal', 'Semanal']"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        label="Perioricidad"
                        placeholder=""
                        prepend-inner-icon="mdi-cash-clock"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Primero selecciona el campo <b><i>Cliente</i></b> para
                              habilitar esta opción.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="FEE"
                        placeholder="Valor numérico"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Es el porcentaje de comisión que se le cobrara al cliente
                            </span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-select
                        :items="[
                          'Percepciones brutas',
                          'Percepciones brutas más carga',
                          'Neto',
                          'Neto más carga social',
                          'FEE Neto + Bruto + CS',
                        ]"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        label="Base FEE"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Es la base sobre la cual se comisionará al cliente.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-select
                        :items="['Si', 'No']"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        label="Provisiones"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-hand-coin"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Son las provisiones de las prestaciones de ley como
                              aguinaldo y prima vacacional que se tendrán que calcular e
                              ir provisionado de acuerdo con cada periodo de pago, cuando
                              aplique.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="ISN"
                        placeholder="Valor numérico"
                        prepend-inner-icon="mdi-bank-transfer-out"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Se requiere reporte de ISN mensual.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-select
                        :items="['Si', 'No']"
                        chips
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        item-color="primary"
                        label="Cuota sindical"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-refund"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Es el % de retención que se tiene que se tiene que realizar
                              a en la nómina fiscal, sobre sueldo o percepción bruta a los
                              trabajadores agremiados.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          :mobile="smAndDown"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
                          label="Periodo"
                          multiple="range"
                          prepend-icon=""
                          prepend-inner-icon="mdi-calendar"
                          title="Rango de fechas"
                          type="chip"
                          variant="outlined"
                        >
                          <template v-slot:prepend>
                            <v-tooltip interactive>
                              <template v-slot:activator="{ props: tooltip }">
                                <v-icon
                                  icon="mdi-information-slab-circle-outline"
                                  v-bind="mergeProps(tooltip)"
                                />
                              </template>
                              <span>Rango de fechas para periodo</span>
                            </v-tooltip>
                          </template>
                        </v-date-input>
                      </v-locale-provider>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="UMA Vigente"
                        placeholder="Valor numérico"
                        prepend-inner-icon="mdi-cash-sync"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Unidad de Medida y Actualización</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="% UMA Para subsidio"
                        placeholder="Valor numérico"
                        prepend-inner-icon="mdi-cash-sync"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>Porcentaje de Unidad de Medida y Actualización</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab03" eager>
              <v-card>
                <v-card-title color="primary">Usuarios</v-card-title>
                <v-divider></v-divider>
                <v-card-text> </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
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
} from "vue";

import { useDisplay } from "vuetify";

export default defineComponent({
  name: "EmpresaForm",
  components: {},

  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables de Vuetify)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables (funciones reutilizables de Vuetify)
    const { name, mobile, smAndDown } = useDisplay();

    // 4. Reactive
    const vbrePrincipalRef = ref();
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: "breadcrumbs_dashboard",
        title: "Formulario",
      },
      {
        disabled: false,
        href: "breadcrumbs_link_1",
        title: "Empresa",
      },
    ]);

    const vconPrincipalRef = ref();

    const vtabMenuRef = ref();
    const vtabMenuModel = ref<any>("tab01");
    const vtabMenuItems = ref([
      {
        icon: "mdi-badge-account-horizontal",
        title: "Generales",
        value: "tab01",
      },
      {
        icon: "mdi-chart-line",
        title: "Perioricidad",
        value: "tab02",
      },
    ]);

    const vbtnActivarModel = ref(true);
    const vbtnMenuExportarModel = ref(false);
    const cardHeight = ref(0);
    const rfc = ref<string>("");

    const modelEmpresa = ref<Object>();
    const itemsEmpresas = ref<Object[]>([]);

    const modelSueldoIMSS = ref<number | null>(null);
    const modelProvSoc = ref<number | null>(null);
    const modelTarjetaFacil = ref<number | null>(null);
    const modelHonAsimilados = ref<number | null>(null);
    const modelGastosPorComprobar = ref<number | null>(null);
    const modelClasePrimaRiesgo = ref<number | null>(null);

    const itemsComprobacion = ref([
      { title: "Si", value: 0 },
      { title: "No", value: 1 },
    ]);

    const itemsClasePrimaRiesgo = ref([
      { title: "Media", value: 0 },
      { title: "Actualizada", value: 1 },
    ]);

    // Este se obtiene de la base de datos campo dependiente
    const itemsPerioricidad = ref([
      { title: "Media", value: 0 },
      { title: "Actualizada", value: 1 },
    ]);

    const vforFiltrosRef = ref();
    const vforFiltrosRule = {
      required: (v: string) => !!v || "Este dato es requerido para continuar.",
      required2: (v: any) => (v != null && String(v).length > 0) || "Selecciona",
    };

    // 5. Computed properties
    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones();
      }
      return { height: `${cardHeight.value}px !important` };
    });

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      nextTick(() => {
        window.addEventListener("resize", calcularDimensiones);
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", calcularDimensiones);
    });

    // 8. Functions (fetch, metodos, async)
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate();
    };

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vbrePrincipalRef.value.$el.clientHeight -
          vtabMenuRef.value.$el.clientHeight;
      }
    };

    const validateRfc = (value: string): true | string => {
      if (!value) return "El RFC es requerido";

      const rfcRegex = /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}([A\d])$/;

      return rfcRegex.test(value.toUpperCase()) ? true : "RFC no válido";
    };

    return {
      getCardHeight,
      mergeProps,
      name,
      rfc,
      smAndDown,
      validarFiltros,
      validateRfc,
      vbrePrincipalItems,
      vbrePrincipalRef,
      vbtnActivarModel,
      vbtnMenuExportarModel,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
      modelEmpresa,
      itemsEmpresas,
      itemsComprobacion,
      itemsClasePrimaRiesgo,
      modelSueldoIMSS,
      modelProvSoc,
    };
  },
});
</script>
