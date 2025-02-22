<template>
  <v-container>
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

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      chartData,
      chartOptions,
      mergeProps,
      smAndDown,
      toRaw,
      vbrePrincipalItems,
    }
  },
})
</script>
