<template>
  <v-container fluid ref="vconPrincipalRef" class="h-100">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-end">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|" class="text-medium-emphasis">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-end justify-end">
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-divider vertical class="mr-5 mt-2 border-opacity-25"></v-divider>
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              @click="fetchExcel"
            >
              <v-icon color="white" icon="mdi-microsoft-excel" size="24px" />
            </v-btn>
          </template>
          <span>Exportar información a .xlsx</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              class="mr-1"
              v-bind="props"
            >
              <v-icon size="24px" color="white">mdi-file-pdf-box</v-icon>
            </v-btn>
          </template>
          <span>Exportar gráfica a .pdf</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              @click.stop="vnavFiltrosIsOpen = !vnavFiltrosIsOpen"
            >
              <v-icon size="24px" color="white">
                {{ vnavFiltrosIsOpen ? 'mdi-filter-menu' : 'mdi-filter' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ vnavFiltrosIsOpen ? 'Cerrar panel de filtros' : 'Abrir panel de filtros' }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>
    <v-row ref="vtabGraficaRef">
      <v-col class="my-0 py-0">
        <v-tabs
          v-model="vtabGraficaSelected"
          color="primary"
          class="text-none text-medium-emphasis"
        >
          <v-tab v-for="tab in vtabMenuItems" :key="tab.value" :value="tab.value">
            <v-icon left class="pr-2">{{ tab.icon }}</v-icon>
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="5" class="pa-5 overflow-auto" :style="getCardHeight">
          <v-tabs-window v-model="vtabGraficaSelected">
            <v-tabs-window-item value="tab01" eager>
              <v-card>
                <v-card-title color="primary">Datos principales</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Código *"
                        placeholder="COD0001"
                        prepend-inner-icon="mdi-barcode"
                        variant="outlined"
                        class="mt-3"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código asignado al empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          v-model="modelFechas"
                          :mobile="smAndDown"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
                          label="Fecha de baja"
                          multiple="range"
                          prepend-icon=""
                          prepend-inner-icon="mdi-calendar"
                          title="Rango de fechas"
                          type="chip"
                          variant="outlined"
                          @update:modelValue="fetchMarcas"
                          class="mt-3"
                        >
                          <template v-slot:prepend>
                            <v-icon icon="mdi-information-outline" />
                          </template>
                        </v-date-input>
                      </v-locale-provider>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="modelEmpresa"
                        :disabled="false"
                        :items="itemsEmpresas"
                        :rules="[vforFiltrosRule.required]"
                        auto-select-first
                        chips
                        class="pt-3"
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
                        label="Tipo de contrato *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-draw-pen"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Apellido paterno"
                        placeholder=""
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Apellido materno"
                        placeholder="Apellido materno"
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Nombre(s)"
                        placeholder=""
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Tipo de periodo"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-clipboard-text-clock-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Salario diario"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Base de cotización"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-clock"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="SBC Parte fija"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="SBC Parte variable"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="SBC (Topado a 25 UMA)"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código identificador del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab02" eager>
              <v-card>
                <v-card-title color="primary">Datos generales</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4">
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
                        label="Departamento"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-toolbox-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span
                              >Identificador del <b>Departamento</b> al que pertenece el
                              empleado.</span
                            >
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
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
                        label="Puesto"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-tie"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span
                              >Identificador del <b>Puesto</b> al que pertenece el empleado.</span
                            >
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
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
                        label="Sindicalizado"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-check"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Tipo de prestación"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>
                              Identificador del <b>Tipo de prestación</b> que fue asignado al
                              empleado.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Base pago"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>
                              Indica el tipo de base de pago:
                              <br /><b>S =</b> Sueldo <br /><b>C =</b> Comisión <br /><b>D =</b>
                              Destajo <br /><b>O =</b> Sueldo/Comisión <br /><b>E =</b>
                              Sueldo/Destajo
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Método de pago"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-credit-card"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Turno de trabajo"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-briefcase-clock"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones del campo Marca(s) </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Zona de salario"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-marker"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>
                              Zona del salario del empleado:
                              <br /><b>A = </b> Zona A <br /><b>B = </b> Zona B <br /><b>C = </b>
                              Zona C
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Número de FONACOT"
                        placeholder="COD0001"
                        prepend-inner-icon="mdi-bank"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Número de la cuenta de <b>AFORE</b> del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Afore"
                        placeholder="COD0001"
                        prepend-inner-icon="mdi-piggy-bank"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Número de la cuenta de <b>AFORE</b> del empleado.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
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
                        label="Tipo de régimen fiscal *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-folder-key"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>
                              Clave del <b>Régimen Fiscal</b> en el que tributa el contribuyente, de
                              acuerdo con el catálogo publicado por el SAT.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clearable
                        label="Correo electrónico"
                        placeholder="usuario@gmail.com"
                        prepend-inner-icon="mdi-email"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Número de la cuenta de <b>AFORE</b> del empleado.</span>
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
                <v-card-title color="primary">Datos afiliatorios IMMS</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="Número de seguridad social"
                        placeholder="Código de 15 caracteres"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Número asignado al empleado por el Seguro Social (IMSS).</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
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
                        label="Registro patronal del IMSS"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-medication-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="U.M.F"
                        placeholder="U.M.F"
                        prepend-inner-icon="mdi-mother-nurse"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Unidad Medica Familiar.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
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
                        label="Estado civil"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-human-male-female"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" lg="3">
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
                        label="Sexo"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-gender-male-female"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          v-model="modelFechas"
                          :mobile="smAndDown"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
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
                        label="Entidad federativa de nacimiento"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-map-marker-radius"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
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
                        label="Ciudad de nacimiento"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-map-marker-radius"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="rfc"
                        :rules="[validateRfc]"
                        clearable
                        label="R.F.C."
                        placeholder="RFC"
                        prepend-inner-icon="mdi-file-key-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Unidad Medica Familiar.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="rfc"
                        :rules="[validateRfc]"
                        clearable
                        label="C.U.R.P."
                        placeholder="CURP"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Clave única de registro poblacional</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <v-checkbox color="primary" label="Extranjero sin CURP"> </v-checkbox>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="Dirección"
                        placeholder="Dirección"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Unidad Medica Familiar.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="Población"
                        placeholder="Población"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Unidad Medica Familiar.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
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
                        label="Entidad federativa de domicilio *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-medication-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombre_empresa"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.nombre_base"
                            :title="item.raw.nombre_empresa"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del <b>Registro Patronal</b></span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="C.P."
                        placeholder="Código postal"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código Postal</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        clearable
                        label="Teléfono"
                        placeholder="Teléfono"
                        prepend-inner-icon="mdi-phone"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Código Postal</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-divider />
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="rfc"
                        :rules="[validateRfc]"
                        clearable
                        label="Nombre del padre"
                        placeholder="Nombre del padre"
                        prepend-inner-icon="mdi-face-man"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Nombre del padre</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="rfc"
                        :rules="[validateRfc]"
                        clearable
                        label="Nombre de la madre"
                        placeholder="Nombre del padre"
                        prepend-inner-icon="mdi-face-woman"
                        variant="outlined"
                        color="primary"
                        clear-icon="mdi-close"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Nombre del padre</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab04" eager> Datos Sueldos y salarios</v-tabs-window-item>
            <v-tabs-window-item value="tab05" eager>Datos Cálculos</v-tabs-window-item>
            <v-tabs-window-item value="tab06" eager>Datos Pagos extras</v-tabs-window-item>
            <v-tabs-window-item value="tab07" eager>
              Historial de cambios de tipo de periodo
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
  onUnmounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from 'vue'

import { useDisplay } from 'vuetify'
import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'

import { sistemaStore } from '../../stores/modules/Core/sistema'
import { options } from 'node_modules/axios/index.cjs'

import { rpt2VentasPorMarcas } from '../../stores/modules/Comercial/rpt2VentasPorMarcas'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

interface Marca {
  cidvalorclasificacion: number
  cvalorclasificacion: string
}

interface Modo {
  subtitle: string
  title: string
  value: string
}

interface FiltroModel {
  empresa: object | null
  marcas: Array<{ cidvalorclasificacion: number; cvalorclasificacion: string }> | null
  modo: string | null
  fechas: string | null
}

interface FiltroItems {
  empresa: Array<{ id: number; nombre_empresa: string; nombre_base: string }>
  marca: Array<{ cidvalorclasificacion: number; cvalorclasificacion: string }> | null
  modo: Array<{ subtitle: string; title: string; value: string }>
}

export default defineComponent({
  name: 'EmpleadoForm',
  components: {},

  setup() {
    // 1.Imports
    // 2.Props y Emits
    // 3.Composables
    // 4.Reactive
    // 5.Computed
    // 6.Watchers
    // 7.Functions
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Panel de resultados',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Ventas por marcas',
      },
    ])
    const vbrePrincipalRef = ref()
    const vconPrincipalRef = ref()

    const vforFiltrosRef = ref()
    const vforFiltrosRule = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      required2: (v: any) => (v != null && String(v).length > 0) || 'Selecciona',
    }
    const vnavFiltrosIsOpen = ref(true)

    const vtabGraficaRef = ref()
    const vtabMenuItems = ref([
      {
        icon: 'mdi-card-account-details-outline',
        title: 'Principales',
        value: 'tab01',
      },
      {
        icon: 'mdi-chart-gantt',
        title: 'Generales',
        value: 'tab02',
      },
      {
        icon: 'mdi-chart-line',
        title: 'IMMS, Infonavit',
        value: 'tab03',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Sueldos y salarios',
        value: 'tab04',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Cálculos',
        value: 'tab05',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Pagos y extras',
        value: 'tab06',
      },
      {
        icon: 'mdi-chart-line',
        title: 'Hist. tipo periodo',
        value: 'tab07',
      },
    ])
    const vtabGraficaSelected = ref<any>('tabBarrasV')

    const cardHeight = ref(0)
    const chartHeight = ref(0)

    const filtroItems = ref<FiltroItems>({
      empresa: [],
      marca: null,
      modo: [
        {
          subtitle: 'Filtrar por cantidades totales de productos vendidos por marca.',
          title: 'Cantidad',
          value: 'cantidad',
        },
        {
          subtitle: 'Mostrar reporte por precio de los productos vendidos por marca.',
          title: 'Precio',
          value: 'precio',
        },
      ],
    })

    const modelMarca = ref<Marca[]>([])
    const itemsMarcas = ref<Marca[]>([])

    const modelEmpresa = ref<Empresa>()
    const itemsEmpresas = ref<Empresa[]>([])

    const modelModo = ref<string>()
    const itemsModos = ref<Modo[]>([
      {
        subtitle: 'Filtrar por cantidades totales de productos vendidos por marca.',
        title: 'Cantidad',
        value: 'cantidad',
      },
      {
        subtitle: 'Mostrar reporte por precio de los productos vendidos por marca.',
        title: 'Precio',
        value: 'precio',
      },
    ])

    const modelFechas = ref<string[]>([])

    const filtroModels = ref<FiltroModel>({
      empresa: null,
      marcas: null,
      modo: filtroItems.value.modo?.[0].value,
      fechas: null,
    })

    // Computed

    const getCardHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }
      return { height: `${cardHeight.value}px !important` }
    })

    const getChartHeight = computed(() => {
      if (vconPrincipalRef.value) {
        calcularDimensiones()
      }

      return { height: `${chartHeight.value}px !important` }
    })

    const getMarcas = computed(() => itemsMarcas.value)

    // Funcionalidad vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // Chart Js
    const chartBarrasV = ref<HTMLCanvasElement | null>(null)
    const chartBarrasH = ref<HTMLCanvasElement | null>(null)
    const chartLineal = ref<HTMLCanvasElement | null>(null)
    let chartInstanceV: Chart
    let chartInstanceH: Chart
    let chartInstanceLineal: Chart

    const chartData = ref<ChartData>({
      labels: [],
      datasets: [],
    })

    const getNextColor = (index: number) => {
      const CHART_COLORS = ['#BB3337', '#FF6000', '#ED3237', '#00335F', '#00A859', '#025595']

      const colorIndex = index % CHART_COLORS.length
      const variationIndex = Math.floor(index / CHART_COLORS.length)

      const baseHex = CHART_COLORS[colorIndex]

      const r = parseInt(baseHex.slice(1, 3), 16)
      const g = parseInt(baseHex.slice(3, 5), 16)
      const b = parseInt(baseHex.slice(5, 7), 16)

      // Función para variar ligeramente el color (más claro/oscuro)
      const vary = (value: number, factor: number) =>
        Math.min(255, Math.max(0, value + factor))
          .toString(16)
          .padStart(2, '0')

      // Calcula un factor cíclico para generar variaciones (+/-20 cada ciclo)
      const variation = (variationIndex % 2 === 0 ? 1 : -1) * 20 * Math.ceil(variationIndex / 2)

      const newR = vary(r, variation)
      const newG = vary(g, variation)
      const newB = vary(b, variation)

      return `#${newR}${newG}${newB}`
    }

    // Metodos
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    let delayed = false
    const chartOptions: ChartOptions = {
      animation: {
        onComplete: () => {
          delayed = true
        },
        delay: (context) => {
          let delay = 0
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100
          }
          return delay
        },
      },
      aspectRatio: 1,
      interaction: { mode: 'point' },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Ventas por marcas barra',
        },
        legend: {
          position: mobile.value ? 'top' : 'right',
          onHover: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string) + '4D'
            })
            legend.chart.update()
          },
          onLeave: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string).slice(0, -2)
            })
            legend.chart.update()
          },
        },
      },
      responsive: true,
      onClick: (e, elements, chart) => {
        if (elements.length > 0) {
          const clickedElement = elements[0]
          const datasetIndex = clickedElement.datasetIndex
          const index = clickedElement.index
          const value = chart.data.datasets[datasetIndex].data[index]
          const label = chart.data.labels?.[index]
          const legend = chart.legend?.legendItems?.[0].text

          alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)
        }
      },
    }
    const chartOptions2: ChartOptions = {
      animation: {
        onComplete: () => {
          delayed = true
        },
        delay: (context) => {
          let delay = 0
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100
          }
          return delay
        },
      },

      aspectRatio: 1,
      maintainAspectRatio: false,
      indexAxis: 'y',
      interaction: {
        mode: 'point',
      },
      plugins: {
        title: {
          display: true,
          text: 'Ventas por marcas',
        },
        legend: {
          position: mobile.value ? 'top' : 'right',
          onHover: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string) + '4D'
            })
            legend.chart.update()
          },
          onLeave: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string).slice(0, -2)
            })
            legend.chart.update()
          },
        },
      },
      responsive: true,
      onClick: (e, elements, chart) => {
        if (elements.length > 0) {
          const clickedElement = elements[0]
          const datasetIndex = clickedElement.datasetIndex
          const index = clickedElement.index
          const value = chart.data.datasets[datasetIndex].data[index]
          const label = chart.data.labels?.[index]
          const legend = chart.legend?.legendItems?.[0].text

          console.log(`Hiciste clic en: ${label} con valor ${value}`)
          alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)
        }
      },
    }
    const chartOptions3: ChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: mobile.value ? 'top' : 'right',
          onHover: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string) + '4D'
            })
            legend.chart.update()
          },
          onLeave: (evt, item, legend) => {
            legend.chart.data.datasets.forEach((dataset) => {
              dataset.backgroundColor =
                dataset.label === item.text
                  ? dataset.backgroundColor
                  : (dataset.backgroundColor as string).slice(0, -2)
            })
            legend.chart.update()
          },
        },
        title: {
          display: true,
          text: 'Ventas por marcas Lineal',
        },
      },
      responsive: true,
      onClick: (e, elements, chart) => {
        if (elements.length > 0) {
          const clickedElement = elements[0]
          const datasetIndex = clickedElement.datasetIndex
          const index = clickedElement.index
          const value = chart.data.datasets[datasetIndex].data[index]
          const label = chart.data.labels?.[index]
          const legend = chart.legend?.legendItems?.[0].text

          console.log(`Hiciste clic en: ${label} con valor ${value}`)
          alert(`Hiciste clic en: ${legend}: ${label} con valor ${value}`)
        }
      },
    }

    onMounted(() => {
      nextTick(() => {
        if (chartBarrasV.value) {
          chartInstanceV = new Chart(chartBarrasV.value, {
            type: 'bar',
            data: chartData.value,
            options: chartOptions,
          })
        }

        if (chartBarrasH.value) {
          chartInstanceH = new Chart(chartBarrasH.value, {
            type: 'bar',
            data: chartData.value,
            options: chartOptions2,
          })
        }

        if (chartLineal.value) {
          chartInstanceLineal = new Chart(chartLineal.value, {
            type: 'line',
            data: chartData.value,
            options: chartOptions3,
          })
        }

        window.addEventListener('resize', calcularDimensiones)

        fetchEmpresas()
      })
    })

    onBeforeUnmount(() => {
      if (chartInstanceV) chartInstanceV.destroy()
      if (chartInstanceH) chartInstanceH.destroy()
      if (chartInstanceLineal) chartInstanceLineal.destroy()
      window.removeEventListener('resize', calcularDimensiones)
    })

    const calcularDimensiones = () => {
      if (vconPrincipalRef.value) {
        cardHeight.value =
          vconPrincipalRef.value.$el.clientHeight -
          vbrePrincipalRef.value.$el.clientHeight -
          vtabGraficaRef.value.$el.clientHeight -
          80

        chartHeight.value = cardHeight.value - 45
      }
    }

    const exportStore = sistemaStore()
    const reporte = rpt2VentasPorMarcas()

    const fetchChartData = async () => {
      const isValidForm = await vforFiltrosRef.value?.validate()

      if (isValidForm.valid) {
        const fechaInicio = filtroModels.value.fechas?.[0]
          ? new Date(filtroModels.value.fechas[0])
          : null

        const fechaInicioFormateada = fechaInicio
          ? `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(2, '0')}-${String(fechaInicio.getDate()).padStart(2, '0')}`
          : ''

        const fechaFin = filtroModels.value.fechas?.[filtroModels.value.fechas.length - 1]
          ? new Date(filtroModels.value.fechas[filtroModels.value.fechas.length - 1])
          : null

        const fechaFinFormateada = fechaFin
          ? `${fechaFin.getFullYear()}-${String(fechaFin.getMonth() + 1).padStart(2, '0')}-${String(fechaFin.getDate()).padStart(2, '0')}`
          : ''

        const data = {
          empresa: modelEmpresa.value,
          marcas: modelMarca.value.map((m) => m.cidvalorclasificacion).join(', '),
          modo: modelModo.value,
          fechaInicio: fechaInicioFormateada,
          fechaFin: fechaFinFormateada,
        }

        try {
          await reporte.labelRpt2(data)

          const labels = reporte.label.data
          const months = labels.map(
            (item: any) => item.labels.charAt(0).toUpperCase() + item.labels.slice(1),
          )
          await reporte.dataRpt2(data)

          const dataset = reporte.dataset.data

          let index = 0

          let datasets = dataset.map((concepto: any) => {
            const data = months.map((mes: any) => parseFloat(concepto[mes.toLowerCase()]) || 0)
            const color = getNextColor(index++)
            return {
              label: concepto.marca,
              data: data,
              backgroundColor: color,
              borderColor: color,
              stack: 'stack_' + concepto.marca, // Agrupar por stack si es necesario
            }
          })

          chartInstanceV.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceV.update()

          chartInstanceH.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceH.update()

          chartInstanceLineal.data = {
            labels: months,
            datasets: datasets,
          }

          chartInstanceLineal.update()
        } catch (error) {
        } finally {
        }
      }
    }

    const fetchExcel = async () => {
      // Obtener los legends (nombres de los datasets) y agregar un primer elemento vacío
      const legends = ['', ...chartInstanceV.data.datasets.map((ds) => ds.label as string)]

      // Obtener los labels (eje X) de la gráfica
      const labels = chartInstanceV.data.labels as string[]

      // Inicializar la matriz con la primera fila de legends
      const transformedData: (string | number)[][] = [legends]

      // Recorrer los labels y construir cada fila
      for (let i = 0; i < labels.length; i++) {
        const row: (string | number)[] = [labels[i]] // Primer elemento de la fila es el label (Q1, Q2...)

        // Agregar los datos correspondientes de cada dataset en esta posición
        for (let j = 0; j < chartInstanceV.data.datasets.length; j++) {
          row.push(chartInstanceV.data.datasets[j].data[i] as number)
        }

        // Agregar la fila a la matriz transformada
        transformedData.push(row)
      }

      const backgroundColors = chartInstanceV.data.datasets.map((ds) => ds.backgroundColor)

      console.log(transformedData)

      /*const data = {
          info: transformedData,
          colors: backgroundColors.map((color) => rgbaToHex(color as string)),
        }*/

      const data = {
        info: transformedData,
        colors: backgroundColors.map((color) => (color as string).replace('#', '')),
        tipo: vtabGraficaSelected.value,
      }

      await exportStore.fetchExcel(data)

      console.log(exportStore.object)

      console.log(chartInstanceV.data.datasets)
      console.log(chartInstanceV.data.labels)
    }

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas()

        itemsEmpresas.value = reporte.empresas.data
      } catch (error) {
      } finally {
      }
    }

    const fetchMarcas = async () => {
      modelMarca.value = []
      itemsMarcas.value = []
      const fechaInicio = modelFechas.value?.[0] ? new Date(modelFechas.value[0]) : null

      const fechaInicioFormateada = fechaInicio
        ? `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(2, '0')}-${String(fechaInicio.getDate()).padStart(2, '0')}`
        : ''

      const fechaFin = modelFechas.value?.[modelFechas.value.length - 1]
        ? new Date(modelFechas.value[modelFechas.value.length - 1])
        : null

      const fechaFinFormateada = fechaFin
        ? `${fechaFin.getFullYear()}-${String(fechaFin.getMonth() + 1).padStart(2, '0')}-${String(fechaFin.getDate()).padStart(2, '0')}`
        : ''

      const data = {
        empresa: modelEmpresa.value,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
      }

      try {
        await reporte.marcasRpt2(data)

        itemsMarcas.value = reporte.object.data
      } catch (error) {
      } finally {
      }
    }

    const rfc = ref<string>('')

    const validateRfc = (value: string): true | string => {
      if (!value) return 'El RFC es requerido'

      const rfcRegex =
        /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}([A\d])$/

      return rfcRegex.test(value.toUpperCase()) ? true : 'RFC no válido'
    }

    return {
      rfc,
      validateRfc,
      modelFechas,
      modelModo,
      itemsModos,
      modelEmpresa,
      itemsEmpresas,
      modelMarca,
      itemsMarcas,
      chartBarrasH,
      chartBarrasV,
      chartLineal,
      fetchExcel,
      fetchChartData,
      fetchMarcas,
      filtroItems,
      filtroModels,
      getCardHeight,
      getChartHeight,
      getMarcas,
      mergeProps,
      name,
      validarFiltros,
      vbrePrincipalItems,
      vbrePrincipalRef,
      vconPrincipalRef,
      vforFiltrosRef,
      vforFiltrosRule,
      vnavFiltrosIsOpen,
      vtabMenuItems,
      vtabGraficaRef,
      vtabGraficaSelected,
      smAndDown,
    }
  },
})
</script>
