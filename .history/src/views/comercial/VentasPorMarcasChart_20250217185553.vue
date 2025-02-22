<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" location="right" :width="350">
      <v-card class="ma-5" elevation="0" height="calc(100% - 40px)">
        <v-tabs-items v-model="tabPrincipal">
          <!--Filtro venta por marca-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                color="primary"
                item-title="name"
                item-value="name"
                label="Empresa"
                chips
                closable-chips
                variant="outlined"
                clearable
                prepend-inner-icon="mdi-home-city"
              >
                <template v-slot:chip="{ props, item }">
                  <v-chip
                    v-bind="props"
                    :prepend-avatar="item.raw.avatar"
                    :text="item.raw.name"
                    color="primary"
                    variant="flat"
                  ></v-chip>
                </template>

                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :prepend-avatar="item.raw.avatar"
                    :subtitle="item.raw.group"
                    :title="item.raw.name"
                  ></v-list-item>
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
                    variant="outlined"
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
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-breadcrumbs :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-end justify-end">
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-divider vertical class="mr-5 border-opacity-25"></v-divider>
            <v-btn
              v-bind="attrs"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
              v-on="on"
              @click="exportToExcel()"
            >
              <v-icon size="24px" color="white">mdi-microsoft-excel</v-icon>
            </v-btn>
          </template>
          <span>Exportar información a .xlsx</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              min-width="48px"
              width="48px"
              height="48px"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
              @click="handleExportChartToPDF()"
            >
              <v-icon size="24px" color="white">mdi-file-pdf-box</v-icon>
            </v-btn>
          </template>
          <span>Exportar gráfica a .pdf</span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              @click.stop="drawer2 = !drawer2"
              min-width="48px"
              width="48px"
              height="48px"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon size="24px" color="white">
                {{ drawer2 ? 'mdi-page-previous' : 'mdi-page-previous-outline' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ drawer2 ? 'Cerrar menú de reportes' : 'Abrir menú de reportes' }}
          </span>
        </v-tooltip>

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              @click.stop="drawer = !drawer"
              min-width="48px"
              width="48px"
              height="48px"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon size="24px" color="white">
                {{ drawer ? 'mdi-page-next' : 'mdi-page-next-outline' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ drawer2 ? 'Cerrar panel de filtros' : 'Abrir panel de filtros' }}
          </span>
        </v-tooltip>
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

    const vautEmpresaItems = ref([])
    const vautEmpresaSelectedItem = ref({})

    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    }

    const autoUpdate = ref(true)
    const friends = ref([])
    const isUpdating = ref(false)
    const names = ref('Midnight Crew')

    const people = ref([
      { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
      { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
      { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
      { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
      // { divider: true },
      // { header: 'Group 2' },
      { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
      { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
      { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
      { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
    ])

    const title = ref('The summer breeze')

    return {
      autoUpdate,
      friends,
      isUpdating,
      names,
      people,
      title,
      getDialogContentPaddingTop,
      drawer,
      chartData,
      chartOptions,
      mergeProps,
      name,
      toRaw,
      vbrePrincipalItems,
      vautEmpresaItems,
      vautEmpresaSelectedItem,
    }
  },
})
</script>
