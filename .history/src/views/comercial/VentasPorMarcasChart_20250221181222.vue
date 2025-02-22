<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" location="right" :width="350">
      <v-card class="ma-5" elevation="0" height="calc(100% - 40px)">
        <v-card-text>
          <v-autocomplete
            v-model="friends"
            :disabled="isUpdating"
            :items="people"
            chips
            clear-icon="mdi-close"
            clearable
            color="primary"
            item-color="primary"
            item-title="name"
            item-value="name"
            label="Empresa"
            no-data-text="No hay información disponible"
            prepend-inner-icon="mdi-home-city"
            variant="outlined"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip v-bind="props" :text="item.raw.name" color="primary" variant="flat"></v-chip>
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
          <v-locale-provider locale="es-MX">
            <v-date-input
              v-model="model"
              :hide-header="false"
              clear-icon="mdi-close"
              clearable
              color="primary"
              label="Rango de fechas"
              max-width="368"
              multiple="range"
              prepend-icon=""
              prepend-inner-icon="mdi-calendar-multiselect"
              title="Rango de fechas"
              type="chip"
              variant="outlined"
            >
            </v-date-input>
          </v-locale-provider>
          <v-autocomplete
            v-model="friends"
            :disabled="isUpdating"
            :items="people"
            chips
            clear-icon="mdi-close"
            clearable
            closable-chips
            color="primary"
            item-color="primary"
            item-title="name"
            item-value="name"
            label="Marca(s)"
            multiple
            no-data-text="No hay información disponible"
            prepend-inner-icon="mdi-shopping"
            variant="outlined"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip v-bind="props" :text="item.raw.name" color="primary" variant="flat"></v-chip>
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
          <v-list
            v-model:selected="settingsSelection"
            lines="three"
            select-strategy="single-independent"
            color="primary"
            class="text-medium-emphasis"
          >
            <v-list-subheader>Mostrar por</v-list-subheader>
            <v-list-item
              v-for="item in settingsItems"
              :key="item.value"
              :subtitle="item.subtitle"
              :title="item.title"
              :value="item.value"
            >
              <template v-slot:prepend="{ isSelected }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-row dense class="mt-2">
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
            <v-divider vertical class="mr-5 border-opacity-25"></v-divider>
            <v-btn
              v-bind="props"
              class="mr-1"
              color="primary"
              height="48px"
              min-width="48px"
              width="48px"
            >
              <v-icon size="24px" color="white">mdi-microsoft-excel</v-icon>
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
              color="primary"
              @click.stop="drawer = !drawer"
              min-width="48px"
              width="48px"
              height="48px"
              v-bind="props"
            >
              <v-icon size="24px" color="white">
                {{ drawer ? 'mdi-filter-menu' : 'mdi-filter' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ drawer ? 'Cerrar panel de filtros' : 'Abrir panel de filtros' }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-divider class="border-opacity-25 ma-0 pa-0" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0">
        <v-tabs v-model="tab" stacked color="primary" class="text-medium-emphasis">
          <v-tab value="tab-1">
            <v-icon left>mdi-chart-bar</v-icon>
            Barras
          </v-tab>
          <v-tab>
            <v-icon left>mdi-chart-gantt</v-icon>
            Horizontal
          </v-tab>
          <v-tab>
            <v-icon left>mdi-chart-line</v-icon>
            Lineal
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="10" class="pa-5 fill-height">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="i in 3" :key="i" :value="'tab-' + i">
              <Bar :options="chartOptions" :data="chartData" height="100%" />
            </v-tabs-window-item>
          </v-tabs-window>
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
  ChartEvent,
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

    const chartOptions = ref({
      responsive: true,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      onClick: (event: ChartEvent) => {
        console.log('Evento click en el gráfico:', event)
      },
      options: {},
    })

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

    const menuR2 = ref(false)

    const select = ref(['Vuetify', 'Programming'])

    const items = ref(['Programming', 'Design', 'Vue', 'Vuetify'])
    const settingsItems = ref([
      {
        value: 'cantidad',
        title: 'Cantidad',
        subtitle: 'Filtrar por cantidades totales de productos vendidos por marca.',
      },
      {
        value: 'precio',
        title: 'Precio',
        subtitle: 'Mostrar reporte por precio de los productos vendidos por marca.',
      },
    ])

    const settingsSelection = ref([])
    const tab = ref(1)

    return {
      tab,
      settingsItems,
      settingsSelection,
      select,
      items,
      menuR2,
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
