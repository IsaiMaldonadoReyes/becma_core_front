<template>
  <v-container ref="vconPrincipalRef" style="height: 95% !important">
    <v-row ref="vbrePrincipalRef" dense>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs
          :items="vbrePrincipalItems"
          divider="|"
          class="text-medium-emphasis"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-bank" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0"><v-divider class="border-opacity-25 ma-0 pa-0" /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" class="pa-3 pa-lg-12">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <bec-autocomplete
                  v-model="modelEmpresa"
                  :item-title="'nombre_empresa'"
                  :item-value="'id'"
                  :items="itemsEmpresas"
                  :label="'Cliente'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-briefcase-account'"
                  :return-object="false"
                  :tooltip="'Cliente'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="modelGastosPorComprobar"
                  :items="itemsBaseFEE"
                  :label="'Tipo de periodo'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-clock'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Este es un campo dependiente selecciones primero el cliente para mostrar los Tipos de periodos'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="modelGastosPorComprobar"
                  :items="itemsBaseFEE"
                  :label="'Periodo'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-calendar-text'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Periodo'"
                />
              </v-col>
              <v-col cols="12">
                <bec-select
                  v-model="modelGastosPorComprobar"
                  :items="itemsComprobacion"
                  :label="'Banco'"
                  :multiple="false"
                  :placeholder="'Seleccione'"
                  :prepend-icon="'mdi-bank'"
                  :rules="[(v) => !!v || 'Este campo es requerido']"
                  :tooltip="'Banco'"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" class="d-flex align-center justify-end">
                <v-btn
                  class="text-capitalize pa2"
                  color="primary"
                  prepend-icon="mdi-file-download"
                  text="Ejecutar"
                  variant="flat"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
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

import BecSelect from "@/components/core/becmaComponents/BecSelect.vue";
import BecAutocomplete from "@/components/core/becmaComponents/BecAutocomplete.vue";
import BecTextField from "@/components/core/becmaComponents/BecTextField.vue";

import { useDisplay } from "vuetify";
import { rpt2VentasPorMarcas } from "../../../stores/modules/Comercial/rpt2VentasPorMarcas";

interface Empresa {
  id: number;
  nombre_empresa: string;
  nombre_base: string;
}

export default defineComponent({
  name: "LayoutDispersion",
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

    // 3. Composables (funciones reutilizables de Vuetify)
    const { name, mobile, smAndDown } = useDisplay();

    // 4. Reactive
    const vbrePrincipalRef = ref();
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: "breadcrumbs_dashboard",
        title: "Layout de Bancos",
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
        title: "Quincenal",
        value: "tab01",
      },
      {
        icon: "mdi-chart-line",
        title: "Semanal",
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

    const vforFiltrosRule = {
      required: (v: string) => !!v || "Este dato es requerido para continuar.",
      required2: (v: any) => (v != null && String(v).length > 0) || "Selecciona",
    };

    const items = ref([
      { concepto: "Sueldo IMSS", tope: "5000" },
      { concepto: "Prev. Soc.", tope: "2000" },
      { concepto: "Fondos Sind.", tope: "" },
      { concepto: "Tarjeta Fácil", tope: "" },
      { concepto: "Hon. Asimilados", tope: "" },
      { concepto: "Gastos por comprobar", tope: "" },
    ]);

    const itemsSeleccionados = ref(["Sueldo IMSS"]);

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
        fetchEmpresas();
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", calcularDimensiones);
    });

    // 8. Functions (fetch, metodos, async)

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

    const myCustomUpdate = (nuevoValor: any) => {
      //alert(nuevoValor);
      //alert(modelSueldoIMSS.value); //✅ ya está actualizado gracias al emit
    };

    const reporte = rpt2VentasPorMarcas();

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas();

        itemsEmpresas.value = reporte.empresas.data;

        console.log(itemsEmpresas.value);
      } catch (error) {
      } finally {
      }
    };

    return {
      itemsSeleccionados,
      items,

      myCustomUpdate,
      getCardHeight,

      itemsEmpresas,
      mergeProps,
      modelEmpresa,

      modelSueldoIMSS,

      name,
      rfc,
      smAndDown,
      validateRfc,
      vbrePrincipalItems,
      vbrePrincipalRef,
      vbtnActivarModel,
      vbtnMenuExportarModel,
      vconPrincipalRef,

      vforFiltrosRule,
      vrowClienteRef,
      vtabMenuItems,
      vtabMenuModel,
      vtabMenuRef,
    };
  },
});
</script>
