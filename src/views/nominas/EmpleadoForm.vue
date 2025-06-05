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
              @click=""
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
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="dataModel.id_nomina_gape_empresa"
                        :disabled="false"
                        :items="itemsEmpresasNomina"
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
                        item-title="nombre_empresa"
                        item-value="id"
                        label="Cliente"
                        no-data-text="No hay información disponible"
                        placeholder="Buscar"
                        prepend-inner-icon="mdi-home-account"
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
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.codigoempleado"
                        :rules="[reglaMascarillaCodigo]"
                        class="mt-3"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Código *"
                        placeholder="XXXX"
                        prepend-inner-icon="mdi-barcode"
                        variant="outlined"
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
                          v-model="dataModel.fechaalta"
                          :mobile="smAndDown"
                          class="mt-3"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
                          label="Fecha de alta"
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
                      <v-autocomplete
                        v-model="dataModel.tipocontrato"
                        :disabled="false"
                        :items="itemsTipoContratoNomina"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="ClaveTipoContrato"
                        label="Tipo de contrato *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-draw-pen"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.ClaveTipoContrato"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Descripcion"
                            :title="item.raw.ClaveTipoContrato"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>
                              Seleccione para poder ver las opciones de los tipos de contrato
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.apellidopaterno"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: true, max: 80 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Apellido paterno *"
                        placeholder=""
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Apellido paterno del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.apellidomaterno"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: true, max: 80 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Apellido materno *"
                        placeholder="Apellido materno"
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Apellido materno del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.nombre"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: true, max: 90 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Nombre(s) *"
                        placeholder=""
                        prepend-inner-icon="mdi-badge-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Nombre del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.idtipoperiodo"
                        :disabled="false"
                        :items="itemsTipoPeriodoNomina"
                        :rules="[validationRules.required]"
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
                        item-title="nombretipoperiodo"
                        item-value="idtipoperiodo"
                        label="Tipo de periodo *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-clipboard-text-clock-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.nombretipoperiodo"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.idtipoperiodo"
                            :title="item.raw.nombretipoperiodo"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span
                              >Seleccione para poder ver las opciones de los tipos de periodos
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.sueldodiario"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Salario diario"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        @keypress="(e: any) => inputFilters.onlyDecimal(e, dataModel.sueldodiario)"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Sueldo diario del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.basecotizacionimss"
                        :disabled="false"
                        :items="itemsBaseCotizacion"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Base de cotización"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-clock"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las bases de cotización </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.sueldointegrado"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="SBC Parte fija"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                        @keypress="
                          (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldointegrado)
                        "
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Sueldo integrado del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        disabled
                        label="SBC Parte variable"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>SBC Parte variable</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        disabled
                        label="SBC (Topado a 25 UMA)"
                        placeholder=""
                        prepend-inner-icon="mdi-currency-usd"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>SBC (Topado a 25 UMA)</span>
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
                        v-model="dataModel.iddepartamento"
                        :disabled="false"
                        :items="itemsDepartamentoNomina"
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
                        item-title="descripcion"
                        item-value="iddepartamento"
                        label="Departamento"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-toolbox-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.iddepartamento"
                            :title="item.raw.descripcion"
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
                        v-model="dataModel.idpuesto"
                        :disabled="false"
                        :items="itemsPuestoNomina"
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
                        item-title="descripcion"
                        item-value="idpuesto"
                        label="Puesto"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-tie"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.idpuesto"
                            :title="item.raw.descripcion"
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
                        v-model="dataModel.tipoempleado"
                        :disabled="false"
                        :items="itemsTipoEmpleado"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Sindicalizado *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-check"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.TipoPrestacion"
                        :disabled="false"
                        :items="itemsTipoPrestacionNomina"
                        :rules="[validationRules.required]"
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
                        item-title="Nombre"
                        item-value="IDTabla"
                        label="Tipo de prestación *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Nombre"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.IDTabla"
                            :title="item.raw.Nombre"
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
                        v-model="dataModel.basepago"
                        :disabled="false"
                        :items="itemsBasePago"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Base pago *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-cash"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
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
                        v-model="dataModel.formapago"
                        :disabled="false"
                        :items="itemsFormaPago"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Método de pago *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-account-credit-card"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.idturno"
                        :disabled="false"
                        :items="itemsTurnoNomina"
                        :rules="[validationRules.required]"
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
                        item-title="descripcion"
                        item-value="idturno"
                        label="Turno de trabajo *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-briefcase-clock"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.idturno"
                            :title="item.raw.descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver las opciones </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.zonasalario"
                        :disabled="false"
                        :items="itemsZonaSalario"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Zona de salario *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-marker"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
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
                      <v-autocomplete
                        v-model="dataModel.TipoSemanaReducida"
                        :disabled="false"
                        :items="itemsTipoJornadaNomina"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="TipoSemanaReducida"
                        label="Tipo jornada / Semana reducida *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-cash-marker"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.TipoSemanaReducida"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Tipo de jornada o semana reducida </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.TipoRegimen"
                        :disabled="false"
                        :items="itemsTipoRegimen"
                        :rules="[validationRules.required]"
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
                        item-title="descripcion"
                        item-value="claveTipoRegimen"
                        label="Tipo de régimen fiscal *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-folder-key"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.claveTipoRegimen"
                            :title="item.raw.descripcion"
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
                        v-model="dataModel.NumeroFonacot"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: false,
                              min: 10,
                              max: 10,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Número de FONACOT"
                        placeholder="00000000000"
                        prepend-inner-icon="mdi-bank"
                        variant="outlined"
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Número de FONACOT</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.numeroafore"
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
                      <v-text-field
                        v-model="dataModel.CorreoElectronico"
                        :rules="[validationRules.emailIfNotEmpty]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Correo electrónico"
                        placeholder="usuario@domain.com"
                        prepend-inner-icon="mdi-email"
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Corrreo electrónico del empleado.</span>
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
                        v-model="dataModel.numerosegurosocial"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: true,
                              min: 11,
                              max: 11,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Número de seguridad social"
                        placeholder="Código de 11 caracteres"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyNumbers"
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
                        v-model="dataModel.cidregistropatronal"
                        :disabled="false"
                        :items="itemsRegistroPatronalNomina"
                        :rules="[validationRules.required]"
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
                        item-title="cregistroimss"
                        item-value="cidregistropatronal"
                        label="Registro patronal del IMSS"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-medication-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.cregistroimss"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.cidregistropatronal"
                            :title="item.raw.cregistroimss"
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
                        v-model="dataModel.umf"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="U.M.F"
                        placeholder="U.M.F"
                        prepend-inner-icon="mdi-mother-nurse"
                        variant="outlined"
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
                        v-model="dataModel.estadocivil"
                        :disabled="false"
                        :items="itemsEstadoCivil"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Estado civil"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-human-male-female"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Identificador del estado civil del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" lg="3">
                      <v-autocomplete
                        v-model="dataModel.sexo"
                        :disabled="false"
                        :items="itemsSexo"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Sexo"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-gender-male-female"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
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
                          v-model="dataModel.fechanacimiento"
                          :mobile="smAndDown"
                          :rules="[validationRules.required]"
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
                        v-model="dataModel.EntidadFederativa"
                        :disabled="false"
                        :items="itemsClaveEntidad"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="Codigo"
                        label="Entidad federativa de nacimiento"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-map-marker-radius"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.Codigo"
                            :title="item.raw.Descripcion"
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
                        v-model="dataModel.lugarnacimiento"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 40 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Ciudad de nacimiento"
                        placeholder="Ciudad de nacimiento"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Ciudad de nacimiento</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="dataModel.curpf"
                        :rules="[
                          (v: any) =>
                            validationRules.validateAlphanumericField(v, {
                              required: true,
                              max: 3,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="RFC"
                        placeholder="Homoclave"
                        prepend-inner-icon="mdi-file-key-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyAlphanumeric"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Homoclave de RFC.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="dataModel.curpi"
                        :rules="[validationRules.required]"
                        clear-icon="mdi-close"
                        color="primary"
                        label="C.U.R.P."
                        placeholder="CURP"
                        prepend-inner-icon="mdi-file-account-outline"
                        readonly
                        variant="outlined"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span
                              >Clave única de registro poblacional (A partir de apellido paterno,
                              materno y nombre)</span
                            >
                          </v-tooltip>
                        </template>
                      </v-text-field>
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
                      <v-text-field
                        v-model="dataModel.direccion"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 60 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Dirección"
                        placeholder="Dirección"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyAlphanumeric"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Direccion del empleado.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="dataModel.poblacion"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 60 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Población"
                        placeholder="Población"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyAlphanumeric"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Ciudad de residencia del empleado.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-autocomplete
                        v-model="dataModel.estado"
                        :disabled="false"
                        :items="itemsEntidadFederativaNomina"
                        :rules="[validationRules.required]"
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
                        item-title="Descripcion"
                        item-value="ClaveEstado"
                        label="Entidad federativa de domicilio *"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-medication-outline"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.ClaveEstado"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Entidad federativa de residencia del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="dataModel.codigopostal"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, { required: true, max: 5 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="C.P. *"
                        placeholder="Código postal"
                        prepend-inner-icon="mdi-file-account-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyNumbers"
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
                        v-model="dataModel.telefono"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: false,
                              min: 10,
                              max: 10,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Teléfono"
                        placeholder="Teléfono"
                        prepend-inner-icon="mdi-phone"
                        variant="outlined"
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Teléfono de contacto del empleado</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-divider />
                    <v-col cols="12" lg="3">
                      <v-text-field
                        v-model="dataModel.nombrepadre"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 60 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Nombre del padre"
                        placeholder="Nombre del padre"
                        prepend-inner-icon="mdi-face-man"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
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
                        v-model="dataModel.nombremadre"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 60 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Nombre de la madre"
                        placeholder="Nombre de la madre"
                        prepend-inner-icon="mdi-face-woman"
                        variant="outlined"
                        @keypress="inputFilters.onlyLetters"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Nombre de la madre</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
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
            <v-tabs-window-item value="tab04" eager>
              <v-card>
                <v-card-title color="primary">Datos sueldos y salarios</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.sueldovariable"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Sueldo variable"
                        placeholder="Sueldo variable"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="
                          (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldovariable)
                        "
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Sueldo variable.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          v-model="dataModel.fechasueldovariable"
                          :mobile="smAndDown"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
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
                          clearable
                          color="primary"
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
                      <v-text-field
                        v-model="dataModel.sueldopromedio"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Salario promedio"
                        placeholder="Salario promedio"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="
                          (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldopromedio)
                        "
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Sueldo promedio.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-locale-provider locale="es-MX">
                        <v-date-input
                          v-model="dataModel.fechasueldopromedio"
                          :mobile="smAndDown"
                          clear-icon="mdi-close"
                          clearable
                          color="primary"
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
                          clearable
                          color="primary"
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
                      <v-text-field
                        v-model="dataModel.sueldobaseliquidacion"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Salario base liquidación"
                        placeholder="Salario base liquidación"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="
                          (e: any) => inputFilters.onlyDecimal(e, dataModel.sueldobaseliquidacion)
                        "
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Salario base liquidación.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.ajustealneto"
                        :rules="[
                          (v: any) =>
                            validationRules.validatePositiveNumber(v, { required: false }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Saldo del ajuste al neto"
                        placeholder="Saldo del ajuste al neto"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="(e: any) => inputFilters.onlyDecimal(e, dataModel.ajustealneto)"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Saldo del ajuste al neto.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab05" eager>Datos Cálculos</v-tabs-window-item>
            <v-tabs-window-item value="tab06" eager>
              <v-card>
                <v-card-title color="primary">Datos Pagos extras</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="4">
                      <v-autocomplete
                        v-model="dataModel.bancopagoelectronico"
                        :disabled="false"
                        :items="itemsBancoNomina"
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
                        item-title="Descripcion"
                        item-value="ClaveBanco"
                        label="Banco para pago electronico"
                        no-data-text="No hay información disponible"
                        placeholder="Seleccione"
                        prepend-inner-icon="mdi-draw-pen"
                        variant="outlined"
                      >
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw.Descripcion"
                            color="primary"
                            variant="flat"
                          />
                        </template>

                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.ClaveBanco"
                            :title="item.raw.Descripcion"
                          />
                        </template>

                        <template v-slot:prepend>
                          <v-tooltip>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span> Seleccione para poder ver los bancos </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.sucursalpagoelectronico"
                        :rules="[
                          (v: any) =>
                            validationRules.validateAlphanumericField(v, {
                              required: false,
                              max: 50,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Sucursal para pago electrónico"
                        placeholder="Sucursal para pago electrónico"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyAlphanumeric"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Sucursal para pago electrónico.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.cuentapagoelectronico"
                        :rules="[
                          (v: any) =>
                            validationRules.validateLettersField(v, { required: false, max: 20 }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Numero de cuenta para pago electrónico"
                        placeholder="Numero de cuenta para pago electrónico"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyAlphanumeric"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Numero de cuenta para pago electrónico.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field
                        v-model="dataModel.ClabeInterbancaria"
                        :rules="[
                          (v: any) =>
                            validationRules.validateNumericField(v, {
                              required: false,
                              min: 18,
                              max: 30,
                            }),
                        ]"
                        clear-icon="mdi-close"
                        clearable
                        color="primary"
                        label="Clabe interbancaria"
                        placeholder="Clabe interbancaria"
                        prepend-inner-icon="mdi-hospital-box-outline"
                        variant="outlined"
                        @keypress="inputFilters.onlyNumbers"
                      >
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                            </template>
                            <span>Clabe interbancaria.</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-divider></v-divider>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
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
  nextTick,
  onBeforeUnmount,
  watch,
} from 'vue'

import { useDisplay } from 'vuetify'
//import { useNomGeneralesStore } from '../../stores/modules/Nomina/nomGenerales'

import { useEmpresasStore } from '../../stores/modules/Core/empresas'
import { useTipoContratoStore } from '../../stores/modules/Nomina/nomGenerales/SATCatTipoContrato'
import { useTipoPeriodoStore } from '../../stores/modules/Nomina/default/TipoPeriodo'
import { useDepartamentoStore } from '../../stores/modules/Nomina/default/Departamento'
import { usePuestoStore } from '../../stores/modules/Nomina/default/Puesto'
import { useTipoPrestacionStore } from '../../stores/modules/Nomina/default/TipoPrestacion'
import { useTurnoStore } from '../../stores/modules/Nomina/default/Turno'
import { useRegistroPatronalStore } from '../../stores/modules/Nomina/default/RegistroPatronal'
import { useEmpresaStore } from '../../stores/modules/Nomina/default/Empresa'

import { getDefaultSATCatBaseCotizacion } from '@/utils/nomina/nomGenerales/getDefaultSATCatBaseCotizacion'
import { getDefaultSATCatTipoEmpleado } from '@/utils/nomina/nomGenerales/getDefaultSATCatTipoEmpleado'
import { getDefaultSATCatBasePago } from '@/utils/nomina/nomGenerales/getDefaultSATCatBasePago'
import { getDefaultSATCatFormaPago } from '@/utils/nomina/nomGenerales/getDefaultSATCatFormaPago'
import { getDefaultSATCatZonaSalario } from '@/utils/nomina/nomGenerales/getDefaultSATCatZonaSalario'
import { useTipoRegimenStore } from '../../stores/modules/Nomina/nomGenerales/SATCatTipoRegimen'
import { getDefaultSATCatEstadoCivil } from '@/utils/nomina/nomGenerales/getDefaultSATCatEstadoCivil'
import { getDefaultSATCatSexo } from '@/utils/nomina/nomGenerales/getDefaultSATCatSexo'
import { getDefaultSATCatClaveEntidadFederativa } from '@/utils/nomina/nomGenerales/getDefaultSATCatClaveEntidadFederativa'
import { useEntidadFederativaStore } from '../../stores/modules/Nomina/nomGenerales/SATCatEntidadFederativa'
import { useBancoStore } from '../../stores/modules/Nomina/nomGenerales/SATCatBancos'
import { useTipoJornadaStore } from '../../stores/modules/Nomina/nomGenerales/IMSSCatTipoSemanaReducida'

import { useEmpleadoModel } from '@/composables/nomina/gape/useEmpleado'
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

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

    // import Stores
    //const nomGeneralesStore = useNomGeneralesStore()

    const empresasStore = useEmpresasStore()

    const tipoContratoStore = useTipoContratoStore()
    const tipoPeriodoStore = useTipoPeriodoStore()
    const departamentoStore = useDepartamentoStore()
    const puestoStore = usePuestoStore()
    const tipoPrestacionStore = useTipoPrestacionStore()
    const turnoStore = useTurnoStore()
    const tipoRegimenStore = useTipoRegimenStore()

    const empresaStore = useEmpresaStore()

    const registroPatronalStore = useRegistroPatronalStore()
    const entidadFederativaStore = useEntidadFederativaStore()
    const bancoStore = useBancoStore()
    const tipoJornadaStore = useTipoJornadaStore()

    // Composable del empleado
    const { dataModel, setEmpleado, resetModel } = useEmpleadoModel()

    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Formulario',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Empleado',
      },
    ])
    const vbrePrincipalRef = ref()
    const vconPrincipalRef = ref()

    const vforFiltrosRef = ref()

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

    // Funcionalidad vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // Metodos
    const validarFiltros = async () => {
      await vforFiltrosRef.value?.validate()
    }

    onMounted(() => {
      nextTick(() => {
        window.addEventListener('resize', calcularDimensiones)

        fetchEmpresasNomina()
      })
    })

    onBeforeUnmount(() => {
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

    const itemsEmpresasNomina = computed(() => empresasStore.empresas)

    const itemsTipoContratoNomina = computed(() => tipoContratoStore.tipoContrato)

    const itemsTipoPeriodoNomina = computed(() => tipoPeriodoStore.tipoPeriodo)

    const itemsDepartamentoNomina = computed(() => departamentoStore.departamento)

    const itemsBaseCotizacion = computed(() => getDefaultSATCatBaseCotizacion())

    const itemsPuestoNomina = computed(() => puestoStore.puesto)

    const itemsTipoEmpleado = computed(() => getDefaultSATCatTipoEmpleado())

    const itemsTipoPrestacionNomina = computed(() => tipoPrestacionStore.tipoPrestacion)

    const itemsBasePago = computed(() => getDefaultSATCatBasePago())

    const itemsFormaPago = computed(() => getDefaultSATCatFormaPago())

    const itemsTurnoNomina = computed(() => turnoStore.turno)

    const itemsZonaSalario = computed(() => getDefaultSATCatZonaSalario())

    const itemsTipoRegimen = computed(() => tipoRegimenStore.tipoRegimen)

    const itemsRegistroPatronalNomina = computed(() => registroPatronalStore.registroPatronal)

    const itemsEstadoCivil = computed(() => getDefaultSATCatEstadoCivil())

    const itemsSexo = computed(() => getDefaultSATCatSexo())

    const itemsClaveEntidad = computed(() => getDefaultSATCatClaveEntidadFederativa())

    const itemsEntidadFederativaNomina = computed(() => entidadFederativaStore.entidadFederativa)

    const itemsBancoNomina = computed(() => bancoStore.banco)

    const itemsTipoJornadaNomina = computed(() => tipoJornadaStore.tipoJornada)

    const reglaMascarillaCodigo = computed(() => {
      return validationRules.codeMask(empresaStore.empresa?.mascarillacodigo ?? '')
    })

    const fetchEmpresasNomina = async () => {
      try {
        await empresasStore.empresasNominas()
      } catch (error) {
        console.error('Error al cargar empresas nómina:', error)
      }
    }

    watch(
      () => dataModel.value.id_nomina_gape_empresa,
      async (idEmpresa) => {
        console.log('watch')
        if (idEmpresa) {
          await tipoContratoStore.catalogoTipoContrato(idEmpresa)

          await tipoPeriodoStore.catalogoTipoPeriodo(idEmpresa)

          await departamentoStore.catalogoDepartamento(idEmpresa)

          await puestoStore.catalogoPuesto(idEmpresa)

          await tipoPrestacionStore.catalogoTipoPrestacion(idEmpresa)

          await turnoStore.catalogoTurno(idEmpresa)

          await tipoRegimenStore.catalogoTipoRegimen(idEmpresa)

          await registroPatronalStore.catalogoRegistroPatronal(idEmpresa)

          await entidadFederativaStore.catalogoEntidadFederativa(idEmpresa)

          await bancoStore.catalogoBanco(idEmpresa)

          await empresaStore.catalogoEmpresa(idEmpresa)

          await tipoJornadaStore.catalogoTipoJornada(idEmpresa)
        } else {
          // Limpiar departamentos si se deselecciona la empresa
          //tipoContratoStore.tipoContrato = []
        }
      },
    )

    watch(
      () => [
        dataModel.value.apellidopaterno,
        dataModel.value.apellidomaterno,
        dataModel.value.nombre,
      ],
      ([paterno, materno, nombre]) => {
        if (paterno && materno && nombre) {
          dataModel.value.curpi = generarCurpParcial(paterno, materno, nombre)
        } else {
          dataModel.value.curpi = ''
        }
      },
      { immediate: true },
    )

    function generarCurpParcial(paterno: string, materno: string, nombre: string): string {
      const clean = (s: string) =>
        s
          .toUpperCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^A-Z]/g, '')

      const pa = clean(paterno)
      const ma = clean(materno)
      const no = clean(nombre)

      const primeraLetraP = pa.charAt(0)
      const primeraVocalInternaP = pa.slice(1).match(/[AEIOU]/)?.[0] || 'X'
      const primeraLetraM = ma.charAt(0) || 'X'
      const primeraLetraN =
        no
          .split(' ')
          .filter((n) => n !== 'JOSE' && n !== 'MARIA')[0]
          ?.charAt(0) ||
        no.charAt(0) ||
        'X'

      return (primeraLetraP + primeraVocalInternaP + primeraLetraM + primeraLetraN).toUpperCase()
    }

    return {
      itemsEmpresasNomina,
      itemsTipoContratoNomina,
      itemsTipoPeriodoNomina,
      itemsBaseCotizacion,
      itemsDepartamentoNomina,
      itemsPuestoNomina,
      itemsTipoEmpleado,
      itemsTipoPrestacionNomina,
      itemsBasePago,
      itemsFormaPago,
      itemsTurnoNomina,
      itemsZonaSalario,
      itemsTipoRegimen,
      itemsRegistroPatronalNomina,
      itemsEstadoCivil,
      itemsSexo,
      itemsClaveEntidad,
      itemsEntidadFederativaNomina,
      itemsBancoNomina,
      itemsTipoJornadaNomina,
      dataModel,
      getCardHeight,
      getChartHeight,
      mergeProps,
      name,
      validarFiltros,
      vbrePrincipalItems,
      vbrePrincipalRef,
      vconPrincipalRef,
      vforFiltrosRef,
      vnavFiltrosIsOpen,
      vtabMenuItems,
      vtabGraficaRef,
      vtabGraficaSelected,
      smAndDown,
      validationRules,
      inputFilters,
      reglaMascarillaCodigo,
    }
  },
})
</script>
