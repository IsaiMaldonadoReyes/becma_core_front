<template>
  <v-container :style="getDialogContentPaddingTop">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      flat
      :width="350"
      elevation="0"
      clipped
      class="border-0"
    >
      <v-card class="ma-5" height="calc(100% - 40px)">
        <v-tabs-items v-model="tabPrincipal">
          <!--Filtro venta por marca-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresaR2"
                :items="empresasR2"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menuR2"
                v-model="menuR2"
                :close-on-content-click="false"
                :return-value.sync="datesR2"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeTextR2"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Rango de fechas"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="datesR2"
                  range
                  scrollable
                  color="primary"
                  locale="es-MX"
                  show-week
                  year-icon="mdi-calendar-blank"
                  @change="listaMarcasComercial()"
                >
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menuR2 = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menuR2.save(datesR2)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="marca"
                :items="marcas"
                color="primary"
                item-text="cvalorclasificacion"
                item-value="cidvalorclasificacion"
                label="Marca"
                multiple
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
                @change="labelsGrafica2()"
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.cvalorclasificacion }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.cvalorclasificacion }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <div class="switch-container">
                <span>{{ labelFalse }}</span>
                <!-- Etiqueta izquierda -->
                <v-switch v-model="filtroTipoR2" inset @change="labelsGrafica2()"></v-switch>
                <!-- Switch -->
                <span>{{ labelTrue }}</span>
                <!-- Etiqueta derecha -->
              </div>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-navigation-drawer>
    <v-row dense>
      <v-col>
        <v-breadcrumbs class="text-h5" :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="border-opacity-25" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <Bar :options="chartOptions" :data="chartData" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export interface Elementos {
  codigo: string
  descripcion: string
  nombre: string
}

export default defineComponent({
  name: 'VentasPorMarcasChart',
  components: { Bar },

  setup() {
    // breadcrumbs
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

    // Bar

    const chartData = ref({
      labels: ['January', 'February', 'March'],
      datasets: [{ label: 'Dataset 1', data: [40, 20, 12] }],
    })

    const chartOptions = ref({ responsive: true })

    const drawer = ref(true)

    // Funcionalidad vuetify
    const { name } = useDisplay()

    const getDialogContentPaddingTop = computed(() => {
      const padding = {
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '0px',
      }

      switch (name.value) {
        case 'xs':
          break
        case 'sm':
          break
        case 'md':
        case 'lg':
          if (drawer.value) {
            padding.paddingRight = '350px'
          } else {
            padding.paddingRight = '0px'
          }
          break
        case 'xl':
          if (drawer.value) {
            padding.paddingRight = '350px'
          } else {
            padding.paddingRight = '0px'
          }
          break
      }
      return padding
    })

    return {
      getDialogContentPaddingTop,
      drawer,
      chartData,
      chartOptions,
      mergeProps,
      name,
      toRaw,
      vbrePrincipalItems,
    }
  },
})
</script>
