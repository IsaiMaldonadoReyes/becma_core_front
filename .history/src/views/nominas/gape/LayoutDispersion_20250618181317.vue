<template>
  <v-container ref="vconPrincipalRef" fluid style="height: 95% !important"> </v-container>
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

import draggable from "vuedraggable";

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
  name: "ParametrizacionForm",
  components: { BecSelect, BecAutocomplete, BecTextField, draggable },

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
    const modelProvSoc = ref<number | null>(null);
    const modelTarjetaFacil = ref<number | null>(null);
    const modelHonAsimilados = ref<number | null>(null);
    const modelGastosPorComprobar = ref<number | null>(null);
    const modelClasePrimaRiesgo = ref<number | null>(null);
    const modelPerioricidad = ref<number | null>(null);

    const itemsComprobacion = ref([
      { title: "Si", value: 0 },
      { title: "No", value: 1 },
    ]);

    const itemsClasePrimaRiesgo = ref([
      { title: "Media", value: 0 },
      { title: "Actualizada", value: 1 },
    ]);

    const itemsBaseFEE = ref([
      { title: "Percepciones brutas", value: 0 },
      { title: "Percepciones brutas más carca", value: 21 },
      { title: "Neto", value: 2 },
      { title: "Neto más carga social", value: 3 },
      { title: "FEE Neto + Bruto + CS", value: 4 },
    ]);

    // Este se obtiene de la base de datos campo dependiente
    const itemsPerioricidad = ref([
      { title: "Quicenal", value: 0 },
      { title: "Semanal", value: 1 },
    ]);

    const vforFiltrosRef = ref();
    const vforFiltrosRule = {
      required: (v: string) => !!v || "Este dato es requerido para continuar.",
      required2: (v: any) => (v != null && String(v).length > 0) || "Selecciona",
    };

    const itemsEmpresas2 = ref<Empresa[]>([]);
    const modelEmpresa2 = ref<Empresa>();

    const headers = ref<
      {
        key: string;
        align?: "start" | "center" | "end";
        title: string;
        sortable?: boolean;
        width?: string;
      }[]
    >([
      { title: "", key: "seleccionado", width: "5%", sortable: false },
      { title: "Concepto", key: "concepto", sortable: false },
      { title: "Tope", key: "tope", sortable: false },
      { title: "", key: "drag", sortable: false, align: "center" },
    ]);

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

    const myCustomUpdate = (nuevoValor: any) => {
      //alert(nuevoValor);
      //alert(modelSueldoIMSS.value); //✅ ya está actualizado gracias al emit
    };

    const reporte = rpt2VentasPorMarcas();

    const fetchEmpresas = async () => {
      try {
        await reporte.rptEmpresas();

        itemsEmpresas2.value = reporte.empresas.data;

        console.log(itemsEmpresas2.value);
      } catch (error) {
      } finally {
      }
    };

    return {
      modelGastosPorComprobar,

      headers,
      itemsSeleccionados,
      items,
      itemsEmpresas2,
      modelEmpresa2,
      myCustomUpdate,
      getCardHeight,
      itemsClasePrimaRiesgo,
      itemsComprobacion,
      itemsBaseFEE,
      itemsEmpresas,
      mergeProps,
      modelEmpresa,
      modelProvSoc,
      modelSueldoIMSS,
      modelPerioricidad,
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
