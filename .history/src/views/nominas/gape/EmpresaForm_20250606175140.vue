<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs
          :items="vbrePrincipalItems"
          divider="|"
          class="text-medium-emphasis"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-briefcase-account" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end overflow-auto">
        <v-divider class="mr-5 border-opacity-25" vertical />
        <v-tooltip bottom color="primary" interactive>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              disabled
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
                  disabled
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
              disabled
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
    <v-row ref="vrowClienteRef">
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
          hide-details="auto"
          item-color="primary"
          item-props
          item-title="nombre"
          item-value="id"
          label="Cliente"
          no-data-text="No hay información disponible"
          placeholder="Buscar"
          prepend-inner-icon="mdi-briefcase-account"
          variant="outlined"
          density="compact"
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
                  size="20"
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
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>
    <v-row ref="vtabMenuRef">
      <v-col class="my-0 py-0">
        <v-tabs
          v-model="vtabMenuModel"
          center-active
          class="text-medium-emphasis"
          color="primary"
          height="60"
          direction="vertical"
        >
          <v-tab
            v-for="tab in vtabMenuItems"
            :key="tab.value"
            :prepend-icon="tab.icon"
            :text="tab.title"
            :value="tab.value"
            class="text-none text-no-wrap"
            style="letter-spacing: 0.5px"
          >
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>

    <v-row class="overflow-auto" :style="getCardHeight">
      <v-col>
        <v-card elevation="0" color="transparent"> </v-card>
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
        title: "Empresa",
      },
      {
        disabled: false,
        href: "breadcrumbs_link_1",
        title: "Formulario",
      },
    ]);

    const vconPrincipalRef = ref();
    const vrowClienteRef = ref();

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
          vtabMenuRef.value.$el.clientHeight -
          vrowClienteRef.value.$el.clientHeight;
      }
    };

    const validateRfc = (value: string): true | string => {
      if (!value) return "El RFC es requerido";

      const rfcRegex = /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}([A\d])$/;

      return rfcRegex.test(value.toUpperCase()) ? true : "RFC no válido";
    };

    return {
      getCardHeight,
      itemsClasePrimaRiesgo,
      itemsComprobacion,
      itemsEmpresas,
      mergeProps,
      modelEmpresa,
      modelProvSoc,
      modelSueldoIMSS,
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
      vrowClienteRef,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
    };
  },
});
</script>
